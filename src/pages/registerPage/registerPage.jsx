import clayful from "clayful/client-js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registerPage.css";
const RegisterPage = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const customer = clayful.Customer;
    const payload = {
      email: userInfo.email,
      password: userInfo.password,
      phone: userInfo.phone,
      name: {
        full: userInfo.name,
      },
    };

    customer.createMe(payload, (err) => {
      if (err) {
        console.log(err.code);
        return;
      } else navigate("/login");
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
            defaultValue={userInfo.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            defaultValue={userInfo.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            name="rePassword"
            defaultValue={userInfo.rePassword}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="이름"
            name="name"
            defaultValue={userInfo.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="전화번호"
            name="phone"
            defaultValue={userInfo.phone}
            onChange={handleChange}
          />

          <button type="submit">회원가입</button>
          <Link to="/login">이미 Apple ID가 있다면?</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
