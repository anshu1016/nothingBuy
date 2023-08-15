import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { DataReducer, initialState } from "../reducer/DataReducer";
import {
  getAllProducts,
  getAllCategories,
  getAllCart,
} from "../services/DataService";
import { OrderReducer, initialOrderState } from "../reducer/OrderReducer";
import { AddressReducer, initialAddressState } from "../reducer/AddressReducer";

const DataContext = createContext();
const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);
  const [orderState, orderDispatch] = useReducer(
    OrderReducer,
    initialOrderState
  );
  const [isLoading, setIsLoading] = useState(true);
  const [couponInfo, setCouponInfo] = useState({ coupon: "", amount: 0 });
  const [addressState, addressDispatch] = useReducer(
    AddressReducer,
    initialAddressState
  );
  const [values, setValues] = useState({
    id: "",
    name: "",
    Fulladdress: "",
    state: "",
    pinCode: "",
    MobileNum: "",
    alternateMobileNum: "",
  });
  const [isHideBox, setisHideBox] = useState(false);

  const getCarts = async () => {
    try {
      const response = await fetch("/api/user/cart", {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("userToken"),
        },
      });
      console.log(response, "getallcart response");
      const data = await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllCategories(dispatch, setIsLoading);
    getAllProducts(dispatch, setIsLoading);
    // getAllCart(dispatch, setIsLoading);
    getCarts();

  }, []);
  console.log(state);
  return (
    <div>
      <DataContext.Provider
        value={{
          state,
          dispatch,
          isLoading,
          setIsLoading,
          couponInfo,
          setCouponInfo,
          orderDispatch,
          orderState,
          addressState,
          addressDispatch,
          initialAddressState,
          isHideBox,
          setisHideBox,
          values,setValues
        }}
      >
        {children}
      </DataContext.Provider>
    </div>
  );
};
const useData = () => useContext(DataContext);
export { useData, DataContextProvider };
