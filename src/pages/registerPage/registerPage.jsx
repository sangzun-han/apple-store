import React from "react";
import { Link } from "react-router-dom";
import styles from "./registerPage.module.css";

const RegisterPage = () => {
  return (
    <div className={styles.auth_wrapper}>
      <form>
        <div className={styles.logo}>
          <img src="/images/logo.png" alt="logo" />
        </div>
        <div className={styles.register_input}>
          <input
            type="text"
            placeholder="아이디"
            name="email"
            defaultValue=""
          />
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            defaultValue=""
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            name="password"
            defaultValue=""
          />
          <input type="email" placeholder="이름" name="email" defaultValue="" />

          <button type="submit">회원가입</button>
          <Link to="/login">이미 Apple ID가 있다면?</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
