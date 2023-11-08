function DetailFee() {

    const cartDetail = JSON.parse(localStorage.getItem('cartDetail')) || {};
    return ( 
        <table className="table table-sm table-bordered w-25 ml-auto m-3">
            <tbody>
                <tr>
                    <th>Subtotal</th>
                    <td>{formatCurrencyVND(cartDetail.subTotal)}</td>
                </tr>
                <tr>
                    <th>Tax rate</th>
                    <td>{cartDetail.tax} %</td>
                </tr>
                <tr>
                    <th>Tax fee</th>
                    <td>{formatCurrencyVND(cartDetail.taxfee)}</td>
                </tr>
                <tr>
                    <th>Total of quantity</th>
                    <td>{cartDetail.count}</td>
                </tr>
                <tr>
                    <th>Total</th>
                    <td>{formatCurrencyVND(cartDetail.total)}</td>
                </tr>
            </tbody>
        </table>
    );

    // Convert to currency
  function formatCurrencyVND(value) {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      });

      return formatter.format(numericValue);
    } else {
      return "Invalid Number";
    }
  }
}

export default DetailFee;