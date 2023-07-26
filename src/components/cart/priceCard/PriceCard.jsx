import React, { useState } from "react";
import { useData } from "../../../context/DataContext";
import { remove } from "../../../services/ToastService";
import { RiCoupon3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import Coupon from "../coupon/Coupon";

const PriceCard = () => {
  const {
    state: { cart },

    dispatch,
    couponInfo,
    setCouponInfo,
    orderDispatch,
  } = useData();
  const totalNewPrice = cart
    .reduce((acc, curr) => curr.newPrice * curr.qty + acc, 0)
    .toFixed(2);
  const totalOldPrice = cart
    .reduce((acc, curr) => curr.oldPrice * curr.qty + acc, 0)
    .toFixed(2);
  const [isHideBox, setIsHideBox] = useState(true);
  const couponDiscount = ((totalNewPrice * couponInfo.value) / 100).toFixed(2);

  const totalPrice = totalNewPrice - couponDiscount;

  const handlerRemoveCoupon = () => {
    setCouponInfo({ coupon: "", amount: 0 });
    remove("Coupon Remove successfully!");
  };
  const handleCheckoutSubmit = () => {
    orderDispatch({
      type: "CHECKOUT",
      payload: {
        totalOldPrice,
        totalPrice,
        couponDiscount,
        discount,
        totalItems,
      },
    });

    dispatch({ type: "CLEAR_CART" });
  };
  const discount = (totalOldPrice - totalNewPrice).toFixed(2);
  const totalItems = cart.length;
  return (
    <div>
      <div className="totalCard">
        <h4>Cart Price Details</h4>
        <hr />
        <div className="totalItems">
          <div className="item">
            <div className="itemName">Price for {cart?.length} items:</div>
            <div className="itemPrice">Rs {totalOldPrice}</div>
          </div>
          <div className="item">
            <div className="itemName">Discount</div>
            <div className="itemPrice">-Rs {discount}</div>
          </div>
          <div className="item">
            <div className="itemName">Coupon Discount:</div>
            <div className="itemPrice">-Rs {couponDiscount}</div>
          </div>
          {couponInfo.name && (
            <div className="item">
              <p className="color-green" style={{ color: "green" }}>
                {" "}
                <RiCoupon3Line /> {couponInfo.coupon}
              </p>
              <span onClick={handlerRemoveCoupon}>
                <RxCross2 />
              </span>
            </div>
          )}
        </div>
        <hr />
        <div className="finalBlock">
          <div className="itemName">Total Price </div>
          <div className="itemPrice">Rs ₹{totalPrice.toFixed(2)}</div>
        </div>
        <div className="finalBlock">
          <div className="itemName">Have a Coupon?</div>
          <div className="itemPrice" onClick={() => setIsHideBox(false)} style={{ cursor:"pointer",color:"white",backgroundColor:"green",padding:"5px",fontSize:"12px"}}>
            Apply
          </div>
        </div>
        <p style={{ color: "green" }}>
          {" "}
          You will save ₹ {(totalOldPrice - totalPrice).toFixed(2)} on this
          order
        </p>
        <NavLink to={"/checkout"}>
          <button
            className="checkout-btn cursor-pointer"
            onClick={handleCheckoutSubmit}
            style={{
              cursor:"pointer",color:"white",backgroundColor:"green",padding:"5px",fontSize:"16px"
            }}
          >
            Checkout
          </button>
        </NavLink>
        {!isHideBox && <Coupon setIsHideBox={setIsHideBox} />}
      </div>
    </div>
  );
};

export default PriceCard;
