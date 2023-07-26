import React, { useState } from 'react'
import "../cart.css";
import { AiFillHeart } from "react-icons/ai";
import { addToWishListService,removeFromWishListService,removeFromCartService,updateQtyFromCartService } from '../../../services/DataService';
import { useData } from '../../../context/DataContext';
import { remove, success } from '../../../services/ToastService';
const SingleCard = ({product}) => {
    const {
        dispatch,
        state: {  wishlist },
      } = useData();
      const [isDisabledWishlist, setIsDisabledWishlist] = useState(false);
      const token=localStorage.getItem("token")
  const { _id, image, itemName, oldPrice, newPrice, discount,qty } = product;

  const qtyHandler = (type) =>
    updateQtyFromCartService(product, _id, dispatch, type, token);
    const handleRemoveFromWishlist = () => {
        setIsDisabledWishlist(true);
        if (token) {
          removeFromWishListService(_id, dispatch, token);
          setTimeout(() => {
            setIsDisabledWishlist(false);
            remove("Removed from Wishlist!");
          }, 500);
        }
      };
      const handleAddToWishlist = () => {
        setIsDisabledWishlist(true);
        if (token) {
          addToWishListService(product, dispatch, token);
          success("Added To Wishlist!");
          setTimeout(() => {
            setIsDisabledWishlist(false);
          }, 1000);
        }
      };
      const handleRemove=()=>{
        console.log("remove clicked")
        setIsDisabledWishlist(true)
         if(token){
           removeFromCartService(_id, dispatch, token)
           remove("Removed from Cart!")
           setTimeout(()=>{
             setIsDisabledWishlist(false);
           },1000)
         }
       }
  return (
    <div>
       <div className="cartCard">
            <div className="image">
              <img
                src={image}
                alt="nothing phone"
              />
              <div className="like">
              {token && wishlist?.some((data) => data._id === _id) ? (
              <span
                className="liked cart-like-btn"
                onClick={handleRemoveFromWishlist}
              >
                <AiFillHeart />
              </span>
            ) : (
              <button
                onClick={handleAddToWishlist}
                disabled={isDisabledWishlist}
                className="like cart-like-btn wislist-like"
              >
                <AiFillHeart />
              </button>
            )}
              </div>
            </div>
            <div className="itemInformation">
              <div className="name">{itemName}</div>
              <div className="price">
                Rs{newPrice} <span className="strikeThrough">Rs{oldPrice}</span>
              </div>
              <p>Discount:{discount}% OFF</p>
              <div className="quantity">
                <span>  <button
              className="decrease-qty cursor-pointer"
              onClick={() => qtyHandler("decrement")}
              disabled={product.qty < 2}
            >-</button></span>{product.qty} <span> <button
            className="increase-qty cursor-pointer"
            onClick={() => qtyHandler("increment")}
          >+</button></span>
              </div>
              <div className="button">
                <button onClick={handleRemove} disabled={isDisabledWishlist} >Remove from Cart</button>
              </div>
            </div>
          </div>
    </div>
  )
}

export default SingleCard
