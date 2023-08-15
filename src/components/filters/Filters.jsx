import React, { useState } from "react";
import { MdFilterAlt } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import "./filters.css";
import { AiFillStar } from "react-icons/ai";
import { useData } from "../../context/DataContext";

export const Filters = () => {
  const [isFilters, setIsFilters] = useState(true);
  const [priceRange, setPriceRange] = useState(1500);
  const {
    dispatch,
    state: {
      filters: {
        sort,
        selectedCategories,
        selectedMemory,
        inStock,
        selectedColor,
        rating,
        price,
      },
    },
  } = useData();

  const handleRangeChange = (value) => {
    dispatch({ type: "FILTER_BY_RATING", payload: value });
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
    dispatch({ type: "FILTER_BY_PRICE_RANGE", payload: e.target.value });
  };

  const handleMemoryFilter = (memory) => {
    dispatch({ type: "FILTER_BY_MEMORY", payload: memory });
  };

  return (
    <div>
       <div onClick={() => setIsFilters((prev) => !prev)} className="btn-box">
        {isFilters ? (
          <span className="hide-filters">
            <RxCross1 />{" "}
          </span>
        ) : (
          <div>
            <button className="filter-btn">
              <span className="filters-head">Filters</span>
              <MdFilterAlt className="filter-icon" />
            </button>
          </div>
        )}
      </div>

      <div className="filters-box" style={{ display: isFilters ? "flex" : "none" }}>
        <div className="filters-top">
          <h2>Filters</h2>
          <button onClick={() => dispatch({ type: "CLEAR_ALL_FILTERS" })} className="clear-filters font-1-3">
            Clear
          </button>
        </div>

        <div className="filter-group">
        <h4 className="font-1-2 top-margin margin-bottom-1"> Price Range</h4>
        <div className="bottom-margin-md">
          <input
            type="range"
            className="ratings-box flex justify-between"
            onChange={handlePriceRangeChange}
            value={price}
            min="20000"
            max="100000"
            step={20000}
            style={{ width: "100%" }}
          />

          {["20K", "40K", "60K", "80K", "100K"].map((data) => (
            <span
              className={`price-num ${priceRange === data && "font-bold"}`}
              key={data}
              style={{ width: "100%", padding: "6px", marginLeft: "10px" }}
            >
              {data}
            </span>
          ))}
        </div>

        <div>
          <label className="cursor-pointer top-margin bottom-margin-md display-inline-block ">
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "IN_STOCK" })}
              checked={inStock}
            />
            <span className="out-of-stock-input">Include Out of Stock</span>
          </label>
        </div>

        <hr style={{        width: "100%", height: "2px" }} />

{/* Color */}
<h4 className="font-1-2 top-margin margin-bottom-1">Color:</h4>
<div className="flex direction-column">
  {["White", "Black"].map((color) => (
    <label key={color}>
      <input
        type="checkbox"
        className="bottom-margin-md font-roboto cursor-pointer"
        onChange={() =>
          dispatch({ type: "FILTER_BY_COLOR", payload: color })
        }
        checked={selectedColor.includes(color)}
      /> 
      <span className="display-inline-block bottom-margin-md">
        {color}
      </span>
    </label>
  ))}
</div>

<hr style={{ width: "100%", height: "2px" }} />

{/* Price */}
<h4 className="font-1-2 top-margin margin-bottom-1">Price</h4>
<label className="bottom-margin-md">
  <input
    type="radio"
    name="sort"
    onChange={() => dispatch({ type: "SORT_BY_PRICE", payload: "LOW_TO_HIGH" })}
    className="cursor-pointer"
    checked={sort === "LOW_TO_HIGH"}
  />
  <span className="display-inline-block bottom-margin-md">
    Low To High
  </span>
</label>

<label className="bottom-margin-md">
  <input
    type="radio"
    name="sort"
    className="cursor-pointer"
    onChange={() => dispatch({ type: "SORT_BY_PRICE", payload: "HIGH_TO_LOW" })}
    checked={sort === "HIGH_TO_LOW"}
  />
  <span className="display-inline-block bottom-margin-md">High To Low</span>
</label>

<hr style={{ width: "100%", height: "2px" }} />

{/* Categories */}
<h4 className="font-1-2 top-margin margin-bottom-1">Categories:</h4>
<div className="flex direction-column">
  {["Mobile", "Earphones", "Accessories"].map((category) => (
    <label key={category}>
      <input
        type="checkbox"
        className="bottom-margin-md font-roboto cursor-pointer"
        onChange={() =>
          dispatch({ type: "FILTER_BY_CATEGORIES", payload: category })
        }
        checked={selectedCategories.includes(category)}
      /> 
      <span className="display-inline-block bottom-margin-md">
        {category}
      </span>
    </label>
  ))}
</div>

<hr style={{ width: "100%", height: "2px" }} />

{/* Ratings */}
<h4 className="font-1-2 top-margin margin-bottom-1">Ratings:</h4>
<div className="ratings-box">
  {[3, 4, 5].map((num) => (
    <label key={num}>
      <input
        type="radio"
        className="bottom-margin-md radio-rating cursor-pointer"
        onChange={() => handleRangeChange(num)}
        value={num}
        name={"group1-rating"}
        checked={rating === num}
      />
      {num} 
      <span className="star-color">
        <AiFillStar />
      </span> 
      &above 
    </label>
  ))}
</div>

<hr style={{ width: "100%", height: "2px" }} />

{/* Memory Specification */}
<h4 className="font-1-2 top-margin margin-bottom-1">Memory Specifications:</h4>
<div className="flex direction-column">
  {["8GB 128GB", "8GB 256GB", "12GB 128GB", "12GB 256GB"].map((memory) => (
    <label key={memory}>
      <input
        type="checkbox"
        className="bottom-margin-md font-roboto cursor-pointer"
        checked={selectedMemory.includes(memory)}
        onChange={() => handleMemoryFilter(memory)}
      />
      <span className="display-inline-block bottom-margin-md">
        {memory}
      </span>
    </label>
  ))}
</div>
</div>
{/* ... (existing code) */}
</div>
</div>
);
};
