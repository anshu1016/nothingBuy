import React, { useEffect } from "react";
import { useData } from "../../context/DataContext";
import ProductCard from "../productCard/ProductCard";
import empty_wishlist from "../../assets/empty_wishlist.png";
import "./wishlist.css"
const WishList = () => {
  const {
    state: { wishlist },
  } = useData();
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      {wishlist?.length > 0 ? (
        <div>
          <h2 className="heading">My Wishlist({wishlist?.length})</h2>
          <div className="wishlist-container">
            {wishlist?.map((product) => (
              <ProductCard key={product._id} product={product} deleteIcon />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <img src={empty_wishlist} alt="empty_cart" height={250} width={250} />
          <h2 className="text-center top-margin">Your Wishlist is Empty </h2>
        </div>
      )}
    </>
  );
};

export default WishList;
