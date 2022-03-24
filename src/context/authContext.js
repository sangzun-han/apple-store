import clayful from "clayful/client-js";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  const isAuthenticated = () => {
    const customer = clayful.Customer;

    const options = {
      customer: localStorage.getItem("accessToken"),
    };

    customer.isAuthenticated(options, (err, result) => {
      if (err) {
        console.log(err.code);
        setIsAuth(false);
        return;
      }
      if (result.data.authenticated) setIsAuth(true);
      else setIsAuth(false);
    });
  };

  const signOut = () => {
    setIsAuth(false);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const AuthContextData = {
    isAuth,
    isAuthenticated,
    signOut,
  };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
