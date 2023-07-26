export const initialState = {
  filters: {
    searchValue: null,
    sort: null,
    selectedCategories: [],
    selectedColor: [],
    selectedSizes: [],
    selectedMemory: [],
    individualProduct: [],
    rating: null,
    price: null,
    inStock: false,
  },
  categories: [],
  products: [],
  originalProducts: [],
  cart: [],
  wishlist: [],
  productId: null,
};
export const DataReducer = (state, { type, payload }) => {

  switch (type) {
    case "ALL_CATEGORIES":
      return {
        ...state,
        categories: payload,
      };
    case "ALL_PRODUCTS":
      return {
        ...state,
        products: payload,
        originalProducts: payload,
      };
    case "ALL_CART_ITEMS":
      console.log(payload, "cartPAYLOAD");
      return {
        ...state,
        cart: payload,
      };
    case "FILTER_BY_RATING":
      return {
        ...state,
        filters: { ...state.filters, rating: payload },
      };
    case "FILTER_BY_PRICE_RANGE":
      return {
        ...state,
        filters: { ...state.filters, price: payload },
      };
    case "FILTER_BY_MEMORY":
      return {
        ...state,
        filters: {
          ...state.filters,
          selectedMemory: state.filters.selectedMemory.includes(payload)
            ? state.filters.selectedMemory.filter(
                (memory) => memory !== payload
              )
            : [...state.filters.selectedMemory, payload],
        },
      };
    case "FILTER_BY_COLOR":
      return {
        ...state,
        filters: {
          ...state.filters,
          selectedColor: state.filters.selectedColor.includes(payload)
            ? state.filters.selectedColor.filter((color) => color !== payload)
            : [...state.filters.selectedColor, payload],
        },
      };
    case "FILTER_BY_CATEGORIES":
      return {
        ...state,
        filters: {
          ...state.filters,
          selectedCategories: state.filters.selectedCategories.includes(payload)
            ? state.filters.selectedCategories.filter(
                (category) => category !== payload
              )
            : [...state.filters.selectedCategories, payload],
        },
      };
    case "SORT_BY_PRICE":
      return {
        ...state,
        filters: { ...state.filters, sort: payload },
      };
    case "IN_STOCK":
      return {
        ...state,
        filters: {
          ...state.filters,
          inStock: !state.filters.inStock,
        },
      };
    case "CLEAR_ALL_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          selectedCategories: [],
          selectedColor: [],
          selectedMemory: [],
          inStock: false,
          sort: null,
          price: null,
          rating: null,
        },
      };
    case "UPDATE_QTY_IN_CART":
      return {
        ...state,
        cart: payload,
      };
    case "CART_METHODS":
      return {
        ...state,
        cart: payload,
      };
    case "WISHLIST_METHODS":
      return {
        ...state,
        wishlist: payload,
      };
    case "INDIVIDUAL_PRODUCT":
      return { ...state, individualProduct: payload };
    
    default:
      return { ...state };
  }
};
