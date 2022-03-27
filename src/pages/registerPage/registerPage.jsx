import clayful from "clayful/client-js";
import React, { useEffect, useState } from "react";
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
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [rePasswordValid, setRePasswordValid] = useState(null);
  const [valid, setValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleValidEmail = (event) => {
    const reg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    setEmailValid(reg.test(event.target.value));
  };

  const handleValidPassword = (event) => {
    const reg = /^[a-zA-Z0-9]{8,}$/;
    setPasswordValid(reg.test(event.target.value));
  };

  const handleSamePassword = () => {
    if (userInfo.password !== userInfo.rePassword) setRePasswordValid(false);
    else setRePasswordValid(true);
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
        if (err.code === "duplicated-email") alert("이미 가입된 이메일입니다.");
        return;
      } else navigate("/login");
    });
  };

  useEffect(() => {
    if (emailValid && passwordValid && rePasswordValid) setValid(true);
    else setValid(false);
  }, [emailValid, passwordValid, rePasswordValid]);

  return (
    <div className="register_wrapper">
      <form onSubmit={handleSubmit}>
        <div className="logo">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <div className="register_input">
          <div className="pos">
            <input
              type="email"
              placeholder="이메일"
              name="email"
              defaultValue={userInfo.email}
              onChange={handleChange}
              onBlur={handleValidEmail}
            />
            <span className="err">
              {emailValid === null
                ? ""
                : !emailValid
                ? "이메일 형식에 맞지 않습니다."
                : ""}
            </span>
          </div>
          <div className="pos">
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              defaultValue={userInfo.password}
              onChange={handleChange}
              onBlur={handleValidPassword}
            />
            <span className="err">
              {passwordValid === null
                ? ""
                : !passwordValid
                ? "비밀번호는 최소 8자리 이상이어야 합니다."
                : ""}
            </span>
          </div>
          <div className="pos">
            <input
              type="password"
              placeholder="비밀번호 확인"
              name="rePassword"
              defaultValue={userInfo.rePassword}
              onChange={handleChange}
              onBlur={handleSamePassword}
            />
            <span className="err">
              {rePasswordValid === null
                ? ""
                : !rePasswordValid
                ? "비밀번호가 일치하지 않습니다."
                : ""}
            </span>
          </div>
          <input
            type="text"
            placeholder="이름"
            name="name"
            defaultValue={userInfo.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="전화번호 (숫자만 입력해주세요)"
            name="phone"
            defaultValue={userInfo.phone}
            onChange={handleChange}
          />
          {valid ? (
            <button className="activate" type="submit">
              회원가입
            </button>
          ) : (
            <button className="register_btn" type="submit" disabled={true}>
              회원가입
            </button>
          )}

          <Link to="/login">이미 Apple ID가 있다면?</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
