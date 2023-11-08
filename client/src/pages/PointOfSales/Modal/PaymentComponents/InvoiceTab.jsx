import ProductTab from "./ProductTab";
import DetailFee from "./DetailFee";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";

function InvoiceTab() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const downloadPDF = ()=>{
        const capture = document.querySelector('.capture-invoice');
        html2canvas(capture)
            .then((canvas) => {
                const imgData = canvas.toDataURL('img/png');
                const doc = new jsPDF('p','px','a4');
                const componentWidth = doc.internal.pageSize.getWidth();
                console.log(componentWidth);
                const componentHeight = doc.internal.pageSize.getHeight();
                doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
                doc.save("invoice.pdf");
            })
    }


    return ( 
        <div class="modal fade" id="invoiceModal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                
                    <div class="modal-header">
                    <h4 class="modal-title">Invoice Information</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <div class="modal-body capture-invoice">
                        <div className="row">
                            <div className="col">
                                <h2 className="text-uppercase">Invoice</h2>
                            </div>
                            <div className="col">
                                <p>Invoice Number: </p>
                                <p>Invoice Date: </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>Billing Information</p>

                                <div className="form-group">
                                    <label><strong>Company</strong></label>
                                    <br />
                                    <span>NodeJS POS</span>
                                </div>
                                <div className="form-group">
                                    <label><strong>Name Staff</strong></label>
                                    <br />
                                    <span>Nguyễn Minh Kỳ</span>
                                </div>
                                <div className="form-group">
                                    <label><strong>Address</strong></label>
                                    <br />
                                    <span>19 Nguyen Huu Tho, P. Tan Phong, D.7, Ho Chi Minh City</span>
                                </div>
                            </div>
                            <div className="col">
                                <p>Customer Information</p>

                                <div className="form-group">
                                    <label><strong>Phone</strong></label>
                                    <br />
                                    <span>0899910699</span>
                                </div>
                                <div className="form-group">
                                    <label><strong>Full of name</strong></label>
                                    <br />
                                    <span>Nguyễn Minh Kỳ</span>
                                </div>
                                <div className="form-group">
                                    <label><strong>Address</strong></label>
                                    <br />
                                    <span>19 Nguyen Huu Tho, P. Tan Phong, D.7, Ho Chi Minh City</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="text-center">
                                    <h3>Order Information</h3>
                                </div>
                                <ProductTab cart={cart}>
                                    <DetailFee />
                                </ProductTab>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button onClick={downloadPDF} type="button" class="btn btn-primary">Download as PDF</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        
        </div>
    );
}

export default InvoiceTab;