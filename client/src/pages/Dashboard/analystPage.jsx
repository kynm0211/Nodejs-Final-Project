import React, { useState, useEffect, useRef } from 'react';
import OrderItem from '../../components/OrderList/OrderItem';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { forEach } from 'lodash';
import Num2VND from '../../components/Num2VND';
import { format } from 'date-fns';
import axios from 'axios';

function BodyAnalyst({ orders, fetch }) {
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [ordersData, setOrders] = useState(orders);

    
    const chartRef = useRef(null);

    var orderTotalPrice = 0;

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };
    
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };
    
    useEffect(() => {

        setOrders(orders);
    }, [orders]);

    useEffect(() => {
        if (!ordersData || ordersData.length === 0) {
            return;
        }


        const dataForChart = {
            labels: ordersData.map((order) => format(new Date(order.created_date), 'yyyy-MM-dd')),
            datasets: [
            {
                label: 'Price value',
                data: ordersData.map((order) => order.total),
                borderColor: '#8884d8',
                borderWidth: 2,
                fill: true,
            },
            ],
        };

        const options = {
            scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'yyyy-MM-dd',
                },
                title: {
                    display: true,
                    text: 'Day',
                    font: {
                        size: 15,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Value(₫)',
                    font: {
                        size: 15,
                    },
                },
            },
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'ORDERS VALUE CHART',
                    font: {
                        size: 24,
                    },
                },
            },
        };

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('myChart');
        if (ctx) {
            const newChart = new Chart(ctx, {
            type: 'line',
            data: dataForChart,
            options: options,
            });
            chartRef.current = newChart;
        }

        updateChartWithData(dataForChart);
    }, [orders, ordersData]);


    forEach(ordersData, (order) => {
        orderTotalPrice += order.total;
    });


    const updateChart = async () => {
        const data = await fetchData(startDate, endDate);
        if (data) {
            setOrders(data); 
            updateChartWithData(data);
        }
    };

    const fetchData = async (startDate, endDate) => {
        try {
            const url = `/api/orders-analyst/byDay?startDate=${startDate}&endDate=${endDate}`;
            const headers = {
                'Authorization': localStorage.getItem('token'),
            };
    
            const response = await axios.get(url, { headers });
            
            if (response.data.code === 0) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return null;
        }
    };
    
    
    

    const updateChartWithData = () => {
        if (ordersData && ordersData.length > 0) {
            const dataForChart = {
                labels: ordersData.map((order) => format(new Date(order.created_date), 'yyyy-MM-dd')),
                datasets: [
                    {
                        label: 'Price value',
                        data: ordersData.map((order) => order.total),
                        borderColor: '#8884d8',
                        borderWidth: 2,
                        fill: true,
                    },
                ],
            };
    
            if (chartRef.current) {
                chartRef.current.data.labels = dataForChart.labels;
                chartRef.current.data.datasets[0].data = dataForChart.datasets[0].data;
                chartRef.current.update();
            }
        }
    };
    
    
    
    
    
    

    return (
    <div>
        <div className="row my-3 d-flex justify-content-center align-items-center">
            <span className="border p-4 text-bold">Total value: {Num2VND(orderTotalPrice)} </span>
            <span className="border p-4 text-bold">Total orders: {Num2VND(orderTotalPrice)} </span>
            <canvas id="myChart" className="chart-container"></canvas>
            <div className="col-sm-12 col-md-12 col-lg-12 mt-3">
        <div className="input-group ">
                <span className="input-group-text">From</span>
                <input
                    type="date"
                    className="form-control"
                    aria-label="From date"
                    value={startDate}
                    onChange={handleStartDateChange}
                />
                <span className="input-group-text">To</span>
                <input
                    type="date"
                    className="form-control"
                    aria-label="To date"
                    value={endDate}
                    onChange={handleEndDateChange}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={updateChart}>
                    Go
                </button>
            </div>
        </div>
        </div>

        <div className="row my-3">
        <div className="col-sm-12 col-md-12 col-lg-8">
            <div className="form-outline mb-4">
            <input
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                className="form-control"
                id="datatable-search-input"
                placeholder="Search"
            />
            <blockquote className="blockquote-footer">
                Enter the order number for searching
            </blockquote>
            </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-3">
            <div className="form-group">
            <select className="form-control" id="exampleFormControlSelect1">
                <option value="1">a-z</option>
                <option value="2">z-a</option>
                <option value="3">Highest Price</option>
                <option value="4">Lowest Price</option>
            </select>
            <blockquote className="blockquote-footer">
                Sort by{' '}
                <i className="fa-solid fa-arrow-down-a-z"></i>
            </blockquote>
            </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-1">
            <button
            className="btn btn-sm bg-main text-main"
            onClick={() => fetch()}
            >
            <i className="fa-solid fa-rotate-right mr-1"></i>
            Refresh
            </button>
        </div>
        </div>
        <div className="row">
        <div className="col-12 center-table">
            <table className="table table-hover table-bordered table-responsive-sm table-responsive-md table-striped rounded text-center">
            <thead className="bg-main text-main">
                <tr>
                <th scope="col">Order</th>
                <th scope="col">Order Number</th>
                <th scope="col">Total</th>
                <th scope="col">Quantity</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Option</th>
                </tr>
            </thead>
            <tbody>
                {ordersData &&
                ordersData
                    .filter(
                    (order) =>
                        order.order_number &&
                        order.order_number
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                    .map((order, index) => (
                    <OrderItem key={index} index={index + 1} item={order} />
                    ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
    );
}

export default BodyAnalyst;
