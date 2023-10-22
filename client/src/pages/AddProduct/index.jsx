import { Fragment } from "react";
import AddNew from './add-new';
function AddProduct() {
    return (
        <Fragment>
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#addnew">Add a new</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#menu1">Add with barcode</a>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane container active" id="addnew">
                    <AddNew />
                </div>
                <div className="tab-pane container fade" id="menu1">
                    <AddNew />
                </div>
            </div>
        </Fragment>
    );
}

export default AddProduct;