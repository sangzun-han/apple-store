import React, { useContext, useEffect } from "react";
import "../css/header.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { AuthContext } from "../context/authContext";
const Header = () => {
  const { isAuthenticated, signOut, isAuth } = useContext(AuthContext);

  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);

  return (
    <div className="nav-wrapper fixed-top navbar navbar-toggleable-sm navbar-expand-md">
      <div className="container">
        <Navbar className="w-100" collapseOnSelect expand="lg" variant="dark">
          <Navbar.Brand href="/">
            <img src="/images/icons/logo-sm.png" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-justified w-100 nav-fill">
              <Nav.Link href="#">스토어</Nav.Link>
              <Nav.Link href="#">Mac</Nav.Link>
              <Nav.Link href="#">iPad</Nav.Link>
              <Nav.Link href="#">iPhone</Nav.Link>
              <Nav.Link href="#">Watch</Nav.Link>
              <Nav.Link href="#">Airpods</Nav.Link>
              <Nav.Link href="#">액세서리</Nav.Link>
              <Nav.Link href="#">고객지원</Nav.Link>
              {isAuth ? (
                <>
                  <Nav.Link onClick={signOut}>로그아웃</Nav.Link>
                  <Nav.Link href="/user/cart">
                    <img src="/images/icons/cart-sm.png" alt="cart" />
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">로그인</Nav.Link>
                  <Nav.Link href="/login">
                    <img src="/images/icons/cart-sm.png" alt="cart" />
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
