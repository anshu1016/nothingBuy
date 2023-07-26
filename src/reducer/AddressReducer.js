const initialAddressState = {
  address: [
    {
      id: "1",
      name: "Arun Shukla",
      Fulladdress: "250, Urban Estate,Near Gauri Shankar Mandir,Phagwara",

      state: "Punjab",

      pinCode: "144401",
      MobileNum: "9898989898",
      alternateMobileNum: "9876543210",
    },
  ],
  updatedId: null,
};

const AddressReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_NEW_ADDRESS":
      return {
        ...state,
        address: [...state.address, payload],
        updatedId: null,
      };
    case "REMOVE_ADDRESS":
      return {
        ...state,
        address: state.address.filter(({ id }, i) => payload !== id),
      };
    case "EDIT_ADDRESS":
      return {
        ...state,
        updatedId: payload,
      };
    case "UPDATE_ADDRESS":
      return {
        ...state,
        address: payload,
        updatedId: null,
      };
    default:
      return { ...state };
  }
};
export { AddressReducer, initialAddressState };
