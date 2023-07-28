import React, { useState } from "react";
import "./addressForm.css";
import { useData } from "../../context/DataContext";
import { success, warning } from "../../services/ToastService";
import { ImCross } from "react-icons/im";

const AddressForm = ({handleCloseAddressForm,openAddress,setOpenAddress}) => {
  // State to store form input values

  const {
    setisHideBox,
    addressDispatch,
    addressState: { address, updatedId },
    setValues,
    values,
  } = useData();
  console.log(address,updatedId,"TRYTRY")
  const saveCondition = updatedId ? true : false;
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Handle form submission

  // Handle random data generation (for demo purposes)
  const handleRandomData = () => {
    setValues({
      name: "Aadit Shukla",
      MobileNum: "37867658",
      pinCode: "13232",
      Fulladdress: "123, Sample Street",
      alternateMobileNum: "9876543210",
      state: "State1", // Replace with your desired state value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("save clicked", values);
    if (
      values.name &&
      values.state &&
      values.Fulladdress &&
      values.pinCode &&
      values.MobileNum &&
      values.alternateMobileNum
    ) {
      if (saveCondition) {
        const updatedData = address.map((data, i) =>
          data.id === updatedId ? values : data
        );
        addressDispatch({ type: "UPDATE_ADDRESS", payload: updatedData });
        setisHideBox(false);
        success("Address Updated successfully!");
      } else {
        setisHideBox(false);
        addressDispatch({ type: "ADD_NEW_ADDRESS", payload: values });
        setValues((prev) => ({
          ...prev,
          id: new Date().getTime().toString(),
          name: "",
          Fulladdress: "",
          state: "",
          country: "",
          pinCode: "",
          MobileNum: "",
          alternateMobileNum: "",
        }));
        success("Address Added successfully!");
        setOpenAddress(false)
      }
    } else {
      warning("Please provide all the necessary details");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleCrossClick =() =>{
    setisHideBox(false)
    setOpenAddress(false)
  }
  const handleCancelButton =() =>{
    setOpenAddress(false)
    setisHideBox(false)
  }
  return (
    <div className="addAddressForm">
      <form onSubmit={handleSubmit}>
        <h2>
          Add Address{" "}
          <button
            className="cross-address-btn"
            onClick={ handleCrossClick}
          >
            <ImCross />
          </button>
        </h2>
        <div className="formRow">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            required
          />
          <input
            id="mobileNumber"
            type="text"
            name="MobileNum"
            placeholder="Mobile Number"
            value={values.MobileNum}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formRow">
          <input
            id="pincode"
            type="text"
            name="pinCode"
            placeholder="Pincode"
            value={values.pinCode}
            onChange={handleChange}
            required
          />
          {/* <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required /> */}
        </div>

        <textarea
          id="address"
          name="Fulladdress"
          placeholder="Address"
          value={values.Fulladdress}
          onChange={handleChange}
          required
        ></textarea>

        <div className="formRow">
          <input
            id="alternatePhone"
            type="text"
            name="alternateMobileNum"
            placeholder="Alternate Phone"
            value={values.alternateMobileNum}
            onChange={handleChange}
          />
          <input
            id="state"
            type="text"
            name="state"
            value={values.state}
            onChange={handleChange}
            placeholder="State"
            required
          />
        </div>

        <div>
          <button type="submit" className="addButton" onClick={handleSave}>
            Add
          </button>
          <button
            type="button"
            className="resetButton"
            onClick={() =>
              setValues({
                name: "",
                MobileNum: "",
                pinCode: "",
                Fulladdress: "",
                alternateMobileNum: "",
                state: "",
              })
            }
          >
            Reset
          </button>
          <button
            type="button"
            className="randomDataButton"
            onClick={handleRandomData}
          >
            Random Data
          </button>
          <button
            type="button"
            className="cancelButton"
            onClick={() => handleCancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
