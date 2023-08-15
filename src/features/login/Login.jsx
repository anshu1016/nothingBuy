import React, { useState } from "react";
import "./login.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginUser, guestLoginhandler } from "../../services/AuthServices";
import { useAuth } from "../../context/AuthContext";
import { VscEyeClosed, VscEye } from "react-icons/vsc";

const Login = () => {
  
  const { setIsLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleEye, setToggleEye] = useState(false);
  const { dispatch } = useAuth();
  
  return (
    <div>
    <form
      className="login-form-container"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="login-form-innerContainer">
        <h1 className="login-header">Sign In</h1>
        <div className="">
          <div className="login-email">
            <input
              type="text"
              placeholder="username"
              className="input-email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="login-password relative">
            <input
              type={toggleEye ? "text" : "password"}
              placeholder="password"
              className="input-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {password && (
              <p
                className="eye-icon"
                onClick={() => setToggleEye(!toggleEye)}
              >
                {toggleEye ? <VscEye /> : <VscEyeClosed />}
              </p>
            )}
          </div>
        </div>

        <button
          className="login-btn"
          onClick={() =>
            LoginUser(
              email,
              password,
              setIsLoggedIn,
              navigate,
              dispatch,
              location
            )
          }
        >
          Login
        </button>

        <button
          className="login-guest-btn"
          onClick={() =>
            guestLoginhandler(
              setEmail,
              setPassword,
              setIsLoggedIn,
              dispatch,
              location,
              navigate
            )
          }
        >
          Login as Guest
        </button>

        <NavLink className="login-signup-link" to="/signup">Don't have an account? SignUp </NavLink>
      </div>
    </form>
  </div>
  );
};

export default Login;
