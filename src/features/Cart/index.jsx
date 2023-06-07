import { useSelector } from "react-redux";
import { cartTotalSelector } from "./selectors";

CartFeature.propTypes = {};

function CartFeature() {
  const totalPrice = useSelector(cartTotalSelector);

  return <div>Cart Feature: {totalPrice}</div>;
}

export default CartFeature;
