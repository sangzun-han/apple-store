import clayful from "clayful/client-js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/registerPage.css";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const customer = clayful.Customer;

    const payload = {
      email: email,
      password: password,
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
            defaultValue={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            defaultValue={password}
            onChange={handlePasswordChange}
          />
          {/* <input
            type="password"
            placeholder="비밀번호 확인"
            name="password"
            defaultValue=""
          />
          <input type="email" placeholder="이름" name="email" defaultValue="" /> */}

          <button type="submit">회원가입</button>
          <Link to="/login">이미 Apple ID가 있다면?</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
