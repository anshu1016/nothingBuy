import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { SignupUser } from "../../services/AuthServices";
import { useData } from "../../context/DataContext";
import "./signup.css";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState();
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { dispatch } = useData();
  const navigate = useNavigate();
  const { setIsLogIn } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpDetails((prev) => ({ ...prev, [name]: value }));
  };
  const { firstName, lastName, email, password } = signUpDetails;
  const handleSignUp = () => {
    if (firstName && lastName && email && password && confirmPass) {
      if (password === confirmPass) {
        SignupUser(signUpDetails, navigate, setIsLogIn, dispatch);
        navigate("/");
      } else {
        toast.warn("Password does not match!");
      }
    } else {
      setTimeout(() => {
        toast.warn("Please fills all details!");
      }, 200);
    }
  };
  const handleConfirmPassword = (e) => {
    setConfirmPass(e.target.value);
  };
  useEffect(() => {
    setSignUpDetails((prevState) => ({
      ...prevState,
      email: prevState.email,
    }));
  }, [signUpDetails.email]);
  return (
    <div className="container">
      <form>
        <h2>Sign Up</h2>
        <div className="input-group">
          <label htmlFor="firstName">
            First Name
            <span>*</span>
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Enter your first name..."
            name="firstName"
            value={firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">
            Last Name
            <span>*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter your last name..."
            value={lastName}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">
            Email
            <span>*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email..."
            onChange={handleChange}
            name="email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">
            Password
            <span>*</span>
          </label>
          <input
            id="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Enter your password..."
            name="password"
            onChange={handleChange}
          />
          {signUpDetails.password &&
            (showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(false)}
                className="eyeIcon"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(true)}
                className="eyeIcon"
              />
            ))}
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">
            Confirm Password
            <span>*</span>
          </label>
          <input
            id="confirmPassword"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Confirm your password..."
            name="Confirm password"
            onChange={handleConfirmPassword}
            required
          />
          {signUpDetails.password &&
            (showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(false)}
                className="eyeIcon"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(true)}
                className="eyeIcon"
              />
            ))}
        </div>
        <button className="signupBtn" onClick={handleSignUp}>
          Sign Up
        </button>
        <NavLink to="/login">
          <p className="link">Already have an account? Login here</p>
        </NavLink>
      </form>
    </div>
  );
};

export default SignUp;
