import "./app.css";
import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "./context/authContext";

import LandingPage from "./pages/landingPage/ladingPage";
import RegisterPage from "./pages/registerPage/registerPage";
import LoginPage from "./pages/loginPage/loginPage";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
