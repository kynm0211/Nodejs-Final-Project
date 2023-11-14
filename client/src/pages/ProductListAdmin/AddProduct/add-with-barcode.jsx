function AddwBarcode() {
    return ( 
        <div className="card">
            <div className="card-header text-center text-uppercase">
                <h3>Add With Barcode</h3>
            </div>
            <div className="card-body">
            <form action="/action_page.php">
                <div className="form-group">
                    <label>Barcode:</label>
                    <input type="text" className="form-control" placeholder="Enter barcode" id="barcode" />
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input type="number" className="form-control" placeholder="Enter a number of the product" id="quantity" />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
            </div>
            <div className="card-footer">Footer</div>
        </div>
    );
}

export default AddwBarcode;