import React, { useState } from "react";
import "./addressForm.css";
import { useData } from "../../context/DataContext";
import { success, warning } from "../../services/ToastService";
import { ImCross } from "react-icons/im";

const AddressForm = () => {
  // State to store form input values
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    pincode: "",
    city: "",
    address: "",
    alternatePhone: "",
    state: "",
  });

  const {
    setisHideBox,
    addressDispatch,
    addressState: { address, updatedId },
    setValues,
    values,
  } = useData();
  const saveCondition = updatedId ? true : false;
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to handle the form submission, like sending the data to a backend server or performing any required action.
    console.log(formData);
    // Reset the form after submission
    setFormData({
      name: "",
      mobileNumber: "",
      pincode: "",
      city: "",
      address: "",
      alternatePhone: "",
      state: "",
    });
  };

  // Handle random data generation (for demo purposes)
  const handleRandomData = () => {
    setValues({
      name: "Aadit Shukla",
      MobileNum: "37867658",
      pinCode: "13232",

      Fulladdress: "123, Sample Street",
      alternatePhone: "9876543210",
      state: "State1", // Replace with your desired state value
    });
  };

  const handleSave = () => {
    if (
      values.name &&
      values.state &&
      values.Fulladdress &&
      values.postalCode &&
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
      }
    } else {
      warning("Please provide all the necessary details");
    }
  };

  return (
    <div className="addAddressForm">
      <form onSubmit={handleSubmit}>
        <h2>
          Add Address{" "}
          <button
            className="cross-address-btn"
            onClick={() => setisHideBox(false)}
          >
            <ImCross />
          </button>
        </h2>
        <div className="formRow">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={values.MobileNum}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formRow">
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={values.pinCode}
            onChange={handleChange}
            required
          />
          {/* <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required /> */}
        </div>

        <textarea
          id="address"
          name="address"
          placeholder="Address"
          value={values.Fulladdress}
          onChange={handleChange}
          required
        ></textarea>

        <div className="formRow">
          <input
            type="text"
            name="alternatePhone"
            placeholder="Alternate Phone"
            value={values.alternateMobileNum}
            onChange={handleChange}
          />
          <input
            type="text"
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
            onClick={() => setisHideBox(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
