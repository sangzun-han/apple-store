import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clayful from "clayful/client-js";
import { AuthContext } from "../../context/authContext";
import "./loginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const customer = clayful.Customer;

    const payload = {
      email: loginInfo.email,
      password: loginInfo.password,
    };

    customer.authenticate(payload, (err, result) => {
      if (err) {
        console.log(err.code);
        alert("아이디나 비밀번호를 확인해주세요");
        return;
      } else {
        localStorage.setItem("customerUid", result.data.customer);
        localStorage.setItem("accessToken", result.data.token);
        navigate("/");
        isAuthenticated();
      }
    });
  };
  return (
    <div className="auth_wrapper">
      <form onSubmit={handleSubmit}>
        <div className="logo">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <div className="register_input">
          <input
            type="email"
            placeholder="이메일"
            name="email"
            defaultValue={loginInfo.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            defaultValue={loginInfo.password}
            onChange={handleChange}
          />
          <p>
            Apple ID는 iTunes, App store, iCloud에 로그인할 때 사용하는 이메일
            주소입니다.
          </p>
          <button type="submit">로그인</button>
          <Link to="/register">Apple ID가 없다면?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
