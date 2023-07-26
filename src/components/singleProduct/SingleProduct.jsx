import React,  { useEffect, useState } from "react";
import { AiFillStar, AiFillHeart } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import "./singleProduct.css";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  loginTocontinue,
  remove,
  success,
} from "../../services/ToastService";
import { useData } from "../../context/DataContext";
import { addToWishListService, addtoCartService, removeFromWishListService } from "../../services/DataService";
const SingleProduct = () => {
  const { id } = useParams();
  const {
    state: { cart, wishlist, products },
    dispatch,
  } = useData();
  let location = useLocation();
  const [isDisabled, setISDisabled] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const product = products?.find((prod) => prod?.id === id) || {};

  const handleAddToCart = () => {
    setISDisabled(true);
    if (token) {
      addtoCartService(product, dispatch, token, navigate, location);
      success("Added To Cart!");
      setTimeout(() => setISDisabled(false), 1500);
    } else {
      navigate("/login", { state: { from: location } });
      loginTocontinue("Login To Continue");
    }
  };
  const handleAddToWishlist = () => {
    setISDisabled(true);
    if (token) {
      addToWishListService(product, dispatch, token);
      success("Added To Wishlist!");
      setTimeout(() => setISDisabled(false), 1500);
    } else {
      navigate("/login", { state: { from: location } });
      loginTocontinue("Login To Continue");
    }
  };
  const handleRemoveFromWishlist = () => {
    setISDisabled(true);
    if (token) {
      removeFromWishListService(product._id, dispatch, token);
      remove("Removed from Wishlist!");
      setTimeout(() => setISDisabled(false), 1500);
    }
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
    reviews,
    description,
    delivery_time
  } = product;
  return (
    <>
   { product && <div className="singleProductContainer">
      <div className="productImage">
        <img
          src={image}
          alt="Product"
        />
        <div className="likeButton">
        {token && wishlist.some((prod) => prod._id === product._id) ? (
                  <span
                    className="cart-like-btn liked"
                    onClick={handleRemoveFromWishlist}
                    disabled={isDisabled}
                  >
                    <AiFillHeart />
                  </span>
                ) : (
                  <button
                    className="cart-like-btn like wislist-like"
                    onClick={handleAddToWishlist}
                    disabled={isDisabled}
                  >
                    <AiFillHeart />
                  </button>
                )}
        </div>
       {isTrending && <div className="tag">Trending</div>}
        <div className="rating ">
                <AiFillStar className="star-color-productDetail" />
                <span>{rating}</span>
              </div>
      </div>
      <div className="productDetails">
        <h2 className="productName">{itemName}</h2>
        <div className="productSpecs">
          <div className="reviews">{reviews} Reviews</div>
          <div className="color">Color: {color}</div>
          <div className="priceBlock">
            <div className="discountedPrice">Rs {oldPrice}</div>
            <div className="originalPrice">Rs {newPrice}</div>
            <div className="discountPercentage">{discount}% OFF</div>
          </div>
          <div className="availability">{inStock ? "Few Piece Available":"Sorry This is out of stock"}</div>
          <div className="description">
            {description}
          </div>
          <div className="deliveryTime">Estimated Delivery: {delivery_time}</div>
        </div>
        <div className="buttons">
          <button className="addToCartButton"> {token && cart.some((data) => data._id === product._id) ? (
                  <NavLink to="/cart">
                    <p className="go-to-cart">
                      Go To Cart <BsCartCheck className="icon-size" />
                    </p>
                  </NavLink>
                ) : product.inStock ? (
                  <p
                    className="add-to-cart sm-fontsize"
                    onClick={handleAddToCart}
                    disabled={isDisabled}
                  >
                    Add To Cart
                  </p>
                ) : (
                  <button className="go-to-cart disabled-element" disabled>
                    Out Of Stock
                  </button>
                )}</button>
          <button className="buyNowButton">  {token && wishlist.some((data) => data._id === product._id) ? (
                  <NavLink to={"/wishlist"}>
                    <p className="go-to-cart liked">
                      Go To Wishlist <AiFillHeart />
                    </p>
                  </NavLink>
                ) : (
                  <p
                    onClick={handleAddToWishlist}
                    className="add-to-cart sm-fontsize "
                    disabled={isDisabled}
                  >
                    Add To Wishlist <AiFillHeart />
                  </p>
                )}</button>
        </div>
      </div>
    </div>}
    </>
  );
};

export default SingleProduct;
