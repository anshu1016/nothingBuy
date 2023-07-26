import React, { useEffect, useState } from "react";
import "./checkout.css";
import { BsFillTelephoneFill, BsPlusCircleFill } from "react-icons/bs";
import { BiSolidCoupon } from "react-icons/bi";
import { useData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { removeFromCartService } from "../../services/DataService";
import { warning } from "../../services/ToastService";
const Checkout = () => {
  const {
    state: { cart },
    dispatch,orderState, orderDispatch,
    addressState: { address },
  } = useData();
  const { priceDetails, totalPrice, couponDiscount, discount, totalItems } =
  orderState;
  console.log(orderState,"order",address,"address");
  const [selectedAddress, setSelectedAddress] = useState(address[0]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/productlisting");
    }
  }, []);
  const handleAddress = (addressInfo) => {
    setSelectedAddress(addressInfo);
  };
  const token = localStorage.getItem("userToken");
  const cartItemsId = cart.map(({ _id }) => _id);
  
  const handleSubmit = () => {
    var options = {
      key: "rzp_test_gZUyFL8iSOmzRO",
      key_secret: "NhxYofCc6J74MYtxV4N736G8",
      amount: totalPrice * 100,
      currency: "INR",
      name: "NothingBuy",
      description: "for testing purpose",
      handler: function (response) {
        localStorage.setItem("payment_key", response.razorpay_payment_id);
        cartItemsId?.forEach((_id) => removeFromCartService(_id, dispatch, token));
        orderDispatch({ type: "ORDER_PLACED_ITEMS", payload: cart });
        navigate("/orderPlaced");
      },
      prefill: {
        name: "Arun Shukla",
        email: "arunshukla98710@gmail.com",
        contact: "6239419039",
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#2e2e2e",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };
  const handlePlaceorder = () => {
    if (selectedAddress) {
      orderDispatch({ type: "Selected_Address", payload: selectedAddress });

      handleSubmit();
    } else {
      navigate("/profile");
      warning("Please Add Your Address");
    }
  };
  return (
    <div className="checkOutContainer">
      <div className="addressSide">
      {address?.map((addressData, i) => {
          const {
            id,
            name,
           Fulladdress,
            state,
            alternateMobileNum,

            pinCode,
            MobileNum,
          } = addressData;
          return (
        <div className="addressBlock"  key={id}
        onClick={() => handleAddress(addressData)}>
          <input type="radio" name="address" id="address"   onChange={() => handleAddress(addressData)}
                    checked={selectedAddress.id === id} />
          <label htmlFor="address">
            <h3 className="name">{name}</h3>
            <p className="address">
             {Fulladdress}, {state},India, Pin:{pinCode}
            </p>
            <p className="mobile"><BsFillTelephoneFill />: {MobileNum},{alternateMobileNum}</p>
          </label>
        </div>)})}
        
        {/* // <div className="addAddressForm">
        //   <BsPlusCircleFill /> <span>Add new Address</span>
        // </div> */}
      </div>
      <div className="chekOutPrice">
        <h4>Order Details</h4>
        <div className="prices">
          <span>Item</span>
          <span>Quantity</span>
        </div>  {cart?.map(({ itemName, qty, _id }) => (
            <div
              className="prices"
              key={_id}
            >
              <span>{itemName}</span>
              <span>{qty}</span>
            </div>
          ))}
      <hr/>
        <h4 className="hading">Price Details</h4>
       
        <div className="pricesBlock">
          <div className="prices">
            <span>Prices for ({totalItems} items):</span>
            <span>Rs {priceDetails}</span>
          </div>
          <div className="prices">
            <span>Discount:</span>
            <span>- Rs{discount}</span>
          </div>
          <div className="prices">
            <span>Clupon Aplllied:</span>
            <span>- Rs{couponDiscount}</span>
          </div>
         
          <div className="prices">
            <span>Delivery:</span>
            <span>Rs 100</span>
          </div>
        </div>
        <hr />
        <div className="totalPrices">
          <span>Total:</span>
          <span>Rs {totalPrice?.toFixed(2)}</span>
        </div>
        <div className="recieveraddress">
        {selectedAddress &&<div>
          <h4>Deliver To</h4>
          <hr/>
          <label htmlFor="address">
            <h3 className="name">{selectedAddress.name}</h3>
            <p className="address">
             {selectedAddress.Fulladdress}, {selectedAddress.state},India, Pin:{selectedAddress.pinCode}
            </p>
            <p className="mobile"><BsFillTelephoneFill />: {selectedAddress.MobileNum},{selectedAddress.alternateMobileNum}</p>
          </label>
        </div>
        }
          </div>   
        <div className="placeButton">
          <button onClick={handlePlaceorder}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
