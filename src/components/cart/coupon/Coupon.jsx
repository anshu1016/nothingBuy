import React, { useState } from "react";
import { useData } from "../../../context/DataContext";
import { success } from "../../../services/ToastService";
import "./coupon.css"
const Coupon = ({ setIsHideBox }) => {
  const { setCouponInfo, couponInfo } = useData();
  const [couponDetails, setCouponDetails] = useState({
    coupon: "",
    amount: couponInfo.amount,
  });
  const handleApplyCoupon = () => {
    if (couponDetails.coupon) {
      setIsHideBox(true);
      setCouponInfo(couponDetails);
      success("Applied Coupon");
    }
  };
  return (
    <div className="coupon-modal">
      <div className="coupon-modal-content">
        <div className="coupon-modal-header">
          <h2>Apply Coupon</h2>
          <span onClick={() => setIsHideBox(true)} className="close-btn">&times;</span>
        </div>
        <div className="coupon-modal-body">
          <label>
            <input type="radio" name="coupon" value={10} onChange={() =>
              setCouponDetails({ coupon: "NEW_USER", value: 10 })
            } checked={couponDetails.value === 10} />
            10% OFF SALE
          </label>
          <label>
            <input type="radio" name="coupon" value={15} onChange={() =>
              setCouponDetails({ coupon: "SUMMER_SALE", value: 15 })
            } checked={couponDetails.value === 15} />
            15% OFF SALE
          </label>
        </div>
        <div className="coupon-modal-footer">
          <button onClick={handleApplyCoupon}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
