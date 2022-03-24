import "./app.css";
import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "./context/authContext";

import LandingPage from "./pages/landingPage/landingPage";
import RegisterPage from "./pages/registerPage/registerPage";
import LoginPage from "./pages/loginPage/loginPage";
import Header from "./components/header";

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
