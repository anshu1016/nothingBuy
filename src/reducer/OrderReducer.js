const initialOrderState =  {
    priceDetails: 0,
  discount: 0,
  couponDiscount: 0,
  totalOldPrice:0,
  totalPrice: 0,
  totalItems: 0,
  selectedAddress: {},
  OrderPlacedItems: [],
  }
  
 const OrderReducer = (state, { type, payload }) => {
  const { totalOldPrice, totalPrice, couponDiscount, discount, totalItems } =
    payload;
  switch (type) {
    case "CHECKOUT":
      return {
        ...state,
        priceDetails: totalOldPrice,
        totalPrice,
        couponDiscount,
        discount,
        totalItems,
      };

    case "Selected_Address":
      return {
        ...state,
        selectedAddress: payload,
      };
    case "ORDER_PLACED_ITEMS":
      return {
        ...state,
        OrderPlacedItems: payload,
      };
    default:
      return { ...state };
  }
};
export {OrderReducer,initialOrderState}