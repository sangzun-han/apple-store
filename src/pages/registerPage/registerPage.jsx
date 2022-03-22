import clayful from "clayful/client-js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./registerPage.module.css";

const RegisterPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const customer = clayful.Customer;

    const payload = {
      userId: id,
      password: password,
    };

    customer.createMe(payload, (err, result) => {
      if ((err.code = "duplicated-user-id"))
        alert("이미 가입된 아이디 입니다.");
      else {
        console.log("result data : ", result.data);
      }
    });
  };

  return (
    <div className={styles.auth_wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <img src="/images/logo.png" alt="logo" />
        </div>
        <div className={styles.register_input}>
          <input
            type="text"
            placeholder="아이디"
            name="id"
            defaultValue={id}
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
