import React, { useEffect, useState } from "react";
import "./explore.css";
import { AiOutlineHeart } from "react-icons/ai";
import { Filters } from "../filters/Filters";

import empty from "../../assets/empty.jpeg";
import ProductCard from "../../features/productCard/ProductCard";
import { useData } from "../../context/DataContext";
const Explore = () => {
  // State variables
  const [showFilters, setShowFilters] = useState(false);
  const {
    state: { products, filters },
    setIsLoading,
  } = useData();
  const {
    searchValue,
    sort,
    selectedCategories,
    selectedColor,

    selectedMemory,
    rating,
    price,
    inStock,
  } = filters;

  // Function to filter the product data based on the selected filters
  const modifiedData = () => {
    let filteredData = [...products];
    // console.log(products,"productssss")
    if (searchValue) {
      filteredData = filteredData.filter((product) =>
        product.itemName.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    if (!inStock) {
      filteredData = filteredData.filter((product) => product.inStock);
    }
    if (price) {
      filteredData = filteredData.filter(
        (product) => product.newPrice <= price
      );
    }
    if (sort) {
      filteredData = filteredData.sort((a, b) =>
        sort === "LOW_TO_HIGH"
          ? a.newPrice - b.newPrice
          : b.newPrice - a.newPrice
      );
    }
    if (selectedCategories.length > 0) {
      filteredData = filteredData.filter((prod) =>
        selectedCategories.some((category) => category === prod.category)
      );
    }
    if (selectedColor.length > 0) {
      filteredData = filteredData.filter((prod) =>
        selectedColor.some((color) => color === prod.color)
      );
    }

    if (selectedMemory.length > 0) {
      filteredData = filteredData.filter((prod) =>
        selectedMemory.some((storage) => storage === prod.storage)
      );
    }
    if (rating) {
      filteredData = filteredData.filter((prod) => prod.rating >= rating);
    }
    return filteredData;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  // Rendering the component
  return (
    <div className="explorePage">
      <div className={`filters ${showFilters ? "open" : ""}`}>
        {/* Rendering the Filters component */}
        <Filters />
      </div>

      <div className="content">
        {/* Displaying search results or all products */}
        <h4 className="content-header">
          {searchValue ? "Search Results for" : "Showing All Products"}
          {searchValue ? (
            <strong>{searchValue}</strong>
          ) : (
            `(${modifiedData()?.length} products)`
          )}
        </h4>

        <div className="products-container">
          {/* Displaying a message and image if no products are found */}
          {modifiedData()?.length === 0 && (
            <div className="no-products">
              <img src={empty} alt="empty_product" height={200} width={200} />
              <h2>Product not found ☹️</h2>
            </div>
          )}

          {/* Mapping over the filtered product data and rendering ProductCard components */}
          {modifiedData()?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
