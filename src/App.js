import "./app.css";
import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "./context/authContext";

import Header from "./components/header";
import LandingPage from "./pages/landingPage/landingPage";
import RegisterPage from "./pages/registerPage/registerPage";
import LoginPage from "./pages/loginPage/loginPage";
import DetailProductPage from "./pages/detailProductPage/detailProductPage";
import CartPage from "./pages/cartPage/cartPage";
import PaymentPage from "./pages/paymentPage/paymentPage";
import HistoryPage from "./pages/historyPage/historyPage";

function App() {
  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <AuthContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage convertPrice={convertPrice} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/product/:productId"
          element={<DetailProductPage convertPrice={convertPrice} />}
        />
        <Route
          path="/user/cart/"
          element={<CartPage convertPrice={convertPrice} />}
        />
        <Route
          path="/payment"
          element={<PaymentPage convertPrice={convertPrice} />}
        />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
