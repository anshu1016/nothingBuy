import "./App.css";
import AddressForm from "./components/addressForm/AddressForm";
import Cart from "./components/cart/Cart";
import Category from "./components/category/Category";
import Checkout from "./components/checkout/Checkout";
import Explore from "./components/explore/Explore";
import Footer from "./components/footer/Footer";
import Marquee from "./components/marquee/Marquee";
import {NavBar} from "./components/navbar/NavBar";
import Profile from "./components/profile/Profile";
import SingleProduct from "./components/singleProduct/SingleProduct";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { injectStyle } from "react-toastify/dist/inject-style";
import { Filters } from "./components/filters/Filters";
import Login from "./features/login/Login";
import SignUp from "./features/signUp/SignUp";
import Home from "./features/home/Home";
import RequireAuth from "./requireAuth/RequireAuth";
import Coupon from "./components/cart/coupon/Coupon";
import PriceCard from "./components/cart/priceCard/PriceCard";
import WishList from "./features/wishlist/WishList";
import Loading from "./features/loading/Loading";
import { useData } from "./context/DataContext";
import NoPageFound from "./features/noPageFound/NoPageFound";
import { ToastContainer } from "react-toastify";
function App() {
  const { isLoading } = useData();
  return (
    <div className="App">
      
      {isLoading && <Loading />}
      <div>
        <NavBar/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productlisting" element={<Explore />} />
        <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/wishlist"
            element={
              <RequireAuth>
                <WishList />
              </RequireAuth>
            }
          />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
           <Route
            path="/checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
          <Route
            path="/orderPlaced"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="/*" element={<NoPageFound />} />
        </Routes>
        {/* <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
      </div>
    </div>
  );
}

export default App;
