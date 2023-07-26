import React, { useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import empty_cart from "../../assets/empty_cart.png";
import "./cart.css";
import { useData } from "../../context/DataContext";
import PriceCard from "./priceCard/PriceCard";
import SingleCard from "./singleCart/SingleCard";
const Cart = () => {
  const {
    state: { cart },
  } = useData();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="cartContainer">
      {cart?.length > 0 ? (
        <>
          <h4 className="heading">My Cart({cart?.length})</h4>
          <div className="contennnt">
            <div className="mainCards">
              {cart?.map((product) => (
                <SingleCard key={product._id} product={product} />
              ))}
            </div>
            <PriceCard />
          </div>
        </>
      ) : (
        <div className="text-center">
          <img src={empty_cart} alt="empty_cart" height={250} width={250} />
          <h2 className="text-center top-margin">Your Cart is Empty ☹️</h2>
        </div>
      )}
    </div>
  );
};
export default Cart;
