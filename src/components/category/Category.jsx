import React from "react";
import "./category.css";

import { useData } from "../../context/DataContext";
import CategoryCard from "./categoryCard/CategoryCard";

const Category = () => {
 const {state:{categories}} = useData();
  
  return (
    <div className="categoryContainer">
      <h4 className="title">Shop By Category</h4>
      
      <div className="cardss" >
      {categories?.map((category) => (
          <CategoryCard category={category} key={category._id} />
        ))}
          </div>
       </div>
      
     
     
      
    
  );
};

export default Category;
// {categories.map((category)=>
//   <div className="categoryy"   onClick={()=>handleCategoryClick(category)}>
//    <div className="imagee">
//      <img src={category.img} alt="phone" />  
//    </div>
//    <div className="imageContent">
//     <h4>New Arrival</h4>
//     <h3>Nothing Phone (1)</h3>
//     <p>{category.description}</p>
//     <button>Shop Now</button>