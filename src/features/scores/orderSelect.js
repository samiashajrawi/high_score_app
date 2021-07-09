const OrderSelect = ({onChange}) => {
    return (
    <div className="select-container">
        <p>
        Display the top 10 of
        </p>
    <select onChange={onChange}>
        <option value="total">Total Points</option>
        <option value="avg">Avg. Points Per Click</option>
    </select>
  </div>
  );
}

export default OrderSelect