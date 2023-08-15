import React, { useState } from "react";
import "../../components/explore/explore.css";
import { AiOutlineHeart,AiFillStar, AiFillHeart } from "react-icons/ai";
import { BsCartCheck, BsCartPlus } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { loginTocontinue, remove, success } from "../../services/ToastService";
import { FaRupeeSign } from "react-icons/fa"; // new import for rupee icon

import {
  addToWishListService,
  removeFromWishListService,
  addtoCartService,
} from "../../services/DataService";

import { useData } from "../../context/DataContext";

const ProductCard = ({ product, deleteIcon }) => {
  console.log(deleteIcon,"deleteIcon")
  const token = localStorage.getItem("token");
  const [isDisabled, setIsDisabled] = useState(false);
  console.log(token, "token");
  const navigate = useNavigate();
  let location = useLocation();
  const {
    state: { wishlist, cart },
    dispatch,setIsLoading
  } = useData();
  console.log(wishlist, "wishlist");
  const handleProductClick = async (_id) => {
    navigate(`/product/${_id}`);
  };
  const handleAddToCart = () => {
    setIsDisabled(true);
    console.log(_id,"cartClicked")
    if (token) {
      addtoCartService(product, dispatch, token,setIsLoading, navigate, location);
      success("Added To Cart!");
      setTimeout(() => setIsDisabled(false), 1500);
    } else {
      navigate("/login", { state: { from: location } });
      loginTocontinue("Login To Continue");
    }
  };
  const handleAddToWishlist = () => {
    setIsDisabled(true);
    if (token) {
      addToWishListService(product, dispatch, token);
      success("Added To Wishlist!");
      setTimeout(() => setIsDisabled(false), 1500);
    } else {
      navigate("/login", { state: { from: location } });
      loginTocontinue("Login To Continue");
    }
  };
  const handleRemoveFromWishlist = () => {
    console.log("remove clicked",_id)
    setIsDisabled(true);
    if (token) {
      removeFromWishListService(_id, dispatch, token);
      remove("Removed from Wishlist!");
      setTimeout(() => setIsDisabled(false), 1500);
    }
    console.log("first")
    console.log(_id)
    setIsDisabled(true)

  console.log(token,"wishlist token")
  removeFromWishListService(_id,dispatch,token)

  };
  const {
    _id,
    image,
    rating,
    color,
    itemName,
    oldPrice,
    newPrice,
    discount,
    isTrending,
    inStock,
  } = product;
  return (
    <div className="productCardContainer">
      <div className="mainCard">
        <div className="img">
          <img
            src={image}
            alt={itemName}
            onClick={() => handleProductClick(_id)}
          />{" "}
          <div className="like">
            {token && wishlist?.some((data) => data._id === _id) ? (
              <span
                className="cart-like-btn liked"
                onClick={handleRemoveFromWishlist} 
              >
                {!deleteIcon && <AiFillHeart />}
                {deleteIcon && <RiDeleteBin5Line/>}
              </span>
            ) : (
              <button
                className="cart-like-btn like wislist-like"
                onClick={handleAddToWishlist}
                disabled={isDisabled}
              >
                <AiOutlineHeart />
              </button>
            )}
          </div>
          {isTrending && <div className="tag">Trending</div>}
          <div className="rating">
            {rating} <AiFillStar />
          </div>
        </div>
        <div className="information"  >
          <p>{itemName}</p>
          <div className="color">
            {color}
            <div
              className={`colorIcon- ${color === "White" ? "white" : "black"}`}
            ></div>
          </div>
          <div className="rateBlock">
            <div className="price">
              <FaRupeeSign />
              {newPrice}{" "}
              <span className="strikeThrough">
                <FaRupeeSign />
                {oldPrice}
              </span>
            </div>
            <div className="discount">{discount}%OFF</div>
          </div>
          {token && cart?.some((data) => data._id === product._id) ? (
            <NavLink to="/cart">
              <button className=" button go-to-cart ">
                Go To Cart <BsCartCheck className="icon-size" />
              </button>
            </NavLink>
          ) : inStock ? (
            <button
            className={`button ${inStock ? "add-to-cart" : "go-to-cart"}`}
            onClick={handleAddToCart}
            disabled={isDisabled}
          >
            Add To Cart <BsCartPlus className="icon-size" />
          </button>
          ) : (
            <button className=" button go-to-cart disabled-element " disabled>
              Out Of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
