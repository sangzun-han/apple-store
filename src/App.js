import "./app.css";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./pages/landingPage/ladingPage";
import RegisterPage from "./pages/registerPage/registerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
