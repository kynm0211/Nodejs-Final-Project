import {Link} from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
function ProductItem({index, product,refreshProducts}) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const openConfirmModal = () => {
        setShowConfirmModal(true);
      };
      
      const closeConfirmModal = () => {
        setShowConfirmModal(false);
      };

      const handleRemoveProduct = () => {

        axios.delete(`/api/product/delete/${product.barcode}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        })
        .then(response => {
          const res = response.data;
          if (res.code === 0) {
            refreshProducts()
          }
        })
        .catch(error => {
          console.log(error);
        });
      };
      
      
      

    function formatCurrencyVND(value) {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0,
            });
    
            return formatter.format(numericValue);
        } else {
            return 'Invalid Number';
        }
    }
    return ( 
        <tr>
            <th scope="row">{product.barcode}</th>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{formatCurrencyVND(product.import_price)}</td>
            <td>{formatCurrencyVND(product.retail_price)}</td>
            <td>{new Date(product.creation_date).toLocaleDateString()}</td>
            <td>
                <Link to={"/product/"+product.barcode} type="button" className="btn btn-outline-primary btn-sm m-1">
                    <i className="fa-solid fa-circle-info mr-2"></i>
                    Details
                </Link>
                <Link to={"/product/edit/"+product.barcode} type="button" className="btn btn-outline-secondary btn-sm m-1">
                    <i className="fa-regular fa-pen-to-square mr-2"></i>
                    Edit
                </Link>
                <button
                    type="button"
                    className="btn btn-danger btn-sm m-1"
                    onClick={openConfirmModal}
                    >
                    <i className="fa-solid fa-trash mr-2"></i>
                    Remove
                </button>
                {/* Modal xác nhận */}
                <Modal show={showConfirmModal} onHide={closeConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa sản phẩm này?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeConfirmModal}>
                    Hủy
                    </Button>
                    <Button variant="danger" onClick={handleRemoveProduct}>
                    Xóa
                    </Button>
                </Modal.Footer>
                </Modal>
            </td>
        </tr>
     );
}

export default ProductItem;