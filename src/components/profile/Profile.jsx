import React, { useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import "./profile.css";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import AddressForm from "../addressForm/AddressForm";
import { remove } from "../../services/ToastService";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState("profile");
  const {
    orderState: { totalPrice, selectedAddress, OrderPlacedItems },
    isHideBox,
    setisHideBox,
    addressState: { address },
    addressDispatch,
    setValues,
  } = useData();

  const HandleNewAddress = () => {
    setisHideBox(!isHideBox);
    setValues((prev) => ({
      id: new Date().getTime(),
      name: "",
      Fulladdress,
      state: "",
      country: "",
      postalCode: "",
      MobileNum: "",
    }));
  };

  const { setIsLoggedIn } = useAuth();
  const [toggleBtn, setToggleBtn] = useState(true);

  const removeHandler = (id) => {
    addressDispatch({ type: "REMOVE_ADDRESS", payload: id });
    remove("Address Removed Successfully!");
  };

  const editHandler = (editId) => {
    setisHideBox(!isHideBox);
    console.log(editId, "editid");
    setValues(() => address.find((data, i) => data.id === editId));
    addressDispatch({ type: "EDIT_ADDRESS", payload: editId });
  };

  const payment_key = localStorage.getItem("payment_key");
  const { name, Fulladdress, state, pinCode, MobileNum } = selectedAddress;

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const logOutHandler = () => {
    setIsLoggedIn(null);
    localStorage.clear();
  };

  var userJson = localStorage.getItem("user");
  if (userJson) {
    var user = JSON.parse(userJson);
  } else {
    localStorage.removeItem("socialUser");
  }

  return (
    <div className="profileContainer">
      {isHideBox && <AddressForm setisHideBox={setisHideBox} />}
      <div className="profileOptions">
        <div
          className={`profileOption ${
            selectedSection === "profile" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("profile")}
        >
          Profile
        </div>
        <div
          className={`profileOption ${
            selectedSection === "address" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("address")}
        >
          Address
        </div>
        <div
          className={`profileOption ${
            selectedSection === "orderHistory" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("orderHistory")}
        >
          Order History
        </div>
      </div>
      {selectedSection === "profile" && (
        <div className="profileBlock">
          <div className="name">
            Name:{" "}
            <span>
              {user?.firstName} {user?.lastName}
            </span>
          </div>
          <div className="email">
            Email: <span>{user?.email}</span>
          </div>
          <button onClick={logOutHandler}>Log Out</button>
        </div>
      )}
      {selectedSection === "address" && (
        <div className="addressBlock">
          {address.map(
            (
              {
                id,
                name,
                street,
                Fulladdress,
                country,
                pinCode,
                MobileNum,
                alternateMobileNum,
              },
              i
            ) => (
              <div className="addressBlockk">
                <div className="addressName">{name}</div>
                <div className="phone">
                  <BsFillTelephoneFill />{" "}
                  <span>
                    {MobileNum}, {alternateMobileNum}
                  </span>
                </div>
                <div className="properAddress">
                  <div className="street">{Fulladdress}</div>
                  <div className="state">
                    {state}, {pinCode}
                  </div>
                  <div className="country">India</div>
                </div>

                <div className="buttons">
                  <button className="edit" onClick={() => editHandler(id)}>
                    Edit
                  </button>
                  <button className="remove" onClick={() => removeHandler(id)}>
                    Remove
                  </button>
                  <button
                    onClick={HandleNewAddress}
                    className="add-new-address-btn"
                  >
                    + Add New Address
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
      {selectedSection === "orderHistory" && (
        <div className="orderHistoryBlock">
          <div className="orderGroup">
            {OrderPlacedItems.map(
              ({ _id, image, itemName, oldPrice, newPrice, discount, qty }) => (
                <NavLink
                  className={"navlink-address-setting"}
                  to={"/orderPlaced"}
                >
                  <div>
                    {" "}
                    <img src={image} alt={itemName} />
                    <div className="details">
                      {" "}
                      <h4 className="margin-bottom-1">{itemName}</h4>
                      <p className=" font-sm">Total Quantity: {qty}</p>
                      <div className="productPrices">
                        <span className="newPrice">₹{newPrice}</span>
                        <span className="strikeThrought">₹{oldPrice}</span>
                        <p className="discount">({discount}%OFF)</p>
                      </div>
                    </div>
                  </div>
                </NavLink>
              )
            )}
            <div>
              <h4>Order Confirmed</h4>
              <div className="orderDetails">
                <p>Payment Id: {payment_key}</p>
                <p>Total Amount : ₹ {totalPrice.toFixed(2)}</p>
                <label htmlFor="address">
                  <h3 className="name">{name}</h3>
                  <p className="address">
                    {Fulladdress}, {state},India, Pin:{pinCode}
                  </p>
                  <p className="mobile">
                    <BsFillTelephoneFill />: {MobileNum}
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
