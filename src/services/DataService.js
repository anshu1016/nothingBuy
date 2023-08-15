import axios from "axios";
const getAllCategories = async (dispatch, setIsLoading) => {
  try {
    const {
      status,
      data: { categories },
    } = await axios.get("/api/categories");
    if (status === 200 || status === 201) {
      dispatch({ type: "ALL_CATEGORIES", payload: categories });
    }
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};

const getAllProducts = async (dispatch, setIsLoading) => {
  try {
    const {
      status,
      data: { products },
    } = await axios.get("/api/products");
    if (status === 200 || status === 201) {
      dispatch({ type: "ALL_PRODUCTS", payload: products });
    }
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};
const getAllCart = async (dispatch,setIsLoading) => {
  try {
    const response = await fetch("/api/user/cart", {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("userToken"),
      },
    });
    const data = await response.json();
    console.log(data,"cartDATA")
    dispatch({ type: "ALL_CART_ITEMS", payload: data.cart });
  } catch (error) {
    console.log(error);
  } finally {
   setIsLoading(false)
  }
};
const getProductDetails = async (_id, setIsLoading, dispatch) => {
  try {
    const {
      status,
      data: { product },
    } = await axios.get(`/api/products/${_id}`);
    if (status === 200 || status === 201) {
      dispatch({ type: "INDIVIDUAL_PRODUCT", payload: product });
    }
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};

const addtoCartService = async (product, dispatch, token, setIsLoading) => {
  try {
   
    const response = await fetch("/api/user/cart", {
      method: "POST",
      body: JSON.stringify({ product }),
      headers: {
        authorization: token,
      },
    });
    console.log(response,"add to cart service respopnse")
    const data = await response.json();
    console.log(data,"ADDTOCARTSERVICE CLICKED")
    dispatch({ type: "CART_METHODS", payload: data.cart });
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};
const removeFromCartService = async (_id, dispatch, token) => {
  console.log(_id,token,dispatch,"JUST_TRY_SERVICE");
  try {
    const response = await fetch(`/api/user/cart/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
console.log(response,"response")
    const data = await response.json();
console.log(data,"cartREMOVEDATA")
    dispatch({ type: "CART_METHODS", payload: data.cart });
  } catch (err) {
    console.log(err);
  } 
};
const moveToWishListService = async (
  product,
  dispatch,
  _id,
  token,
  setIsLoading
) => {
  try {
    const response = await fetch(`/api/user/wishlist/`, {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: JSON.stringify({ product }),
    });
    const data = await response.json();
    dispatch({ type: "WISHLIST_METHODS", payload: data.wishlist });
    removeFromCartService(_id, dispatch, token);
  } catch (err) {
    console.log(err);
  } 
};

const updateQtyFromCartService = async (
  product,
  _id,
  dispatch,
  type,
  token
) => {
  try {
    const response = await fetch(`/api/user/cart/${_id}`, {
      method: "POST",
      body: JSON.stringify({ action: { type } }),
      headers: {
        authorization: token,
      },
    });

    const data = await response.json();

    dispatch({ type: "UPDATE_QTY_IN_CART", payload: data.cart });
  } catch (err) {
    console.log(err);
  } 
};
const addToWishListService = async (product, dispatch, token, setIsLoading) => {
  try {
    const response = await fetch("/api/user/wishlist", {
      method: "POST",
      body: JSON.stringify({ product }),
      headers: {
        authorization: token,
      },
    });
    const data = await response.json();

    dispatch({ type: "WISHLIST_METHODS", payload: data.wishlist });
  } catch (err) {
    console.log(err);
  } 
};
const removeFromWishListService = async (_id, dispatch, token) => {
  console.log("service clicked remove")
  try {
    const response = await fetch(`/api/user/wishlist/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    const data = await response.json();
    console.log(data,"data wishlist")
    dispatch({ type: "WISHLIST_OPERATION", payload: data.wishlist });
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllCategories,
  getAllProducts,
  getProductDetails,
  addtoCartService,
  removeFromCartService,
  moveToWishListService,
  updateQtyFromCartService,
  addToWishListService,
  removeFromWishListService,
  getAllCart,
};
