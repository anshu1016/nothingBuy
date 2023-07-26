import React from "react";
import { useData } from "../../../context/DataContext";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const { dispatch } = useData();
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    console.log("clicked")
    navigate("/productlisting");
    dispatch({ type: "CLEAR_ALL_FILTERS" });
    dispatch({ type: "FILTER_BY_CATEGORIES", payload: category.categoryName });
    console.log(category.categoryName,"nameeee")
  };
  return (
    <div className="categoryy" onClick={ handleCategoryClick}>
      <div className="imagee">
        <img src={category.img} alt="phone" />
      </div>
      <div className="imageContent">
        <h4>New Arrival</h4>
        <h3>Nothing Phone (1)</h3>
        <p>{category.description}</p>
        <button>Shop Now</button>
      </div>
    </div>
  );
};

export default CategoryCard;
