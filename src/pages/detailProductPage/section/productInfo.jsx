import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { Alert } from "react-bootstrap";
import clayful from "clayful/client-js";
import "./productInfo.css";

const ProductInfo = ({ item, convertPrice }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const { isAuth } = useContext(AuthContext);

  const handleQuantity = (type) => {
    if (type === "plus") setCount((prev) => prev + 1);
    else {
      if (count === 1) return;
      setCount((prev) => prev - 1);
    }
  };

  const handleCart = (type) => {
    if (!isAuth) {
      alert("로그인 해주세요");
      navigate("/login");
      return;
    } else {
      const cart = clayful.Cart;
      const payload = {
        product: item._id,
        variant: item.variants[0]._id,
        quantity: count,
        shippingMethod: item.shipping.methods[0]._id,
      };
      const options = {
        customer: localStorage.getItem("accessToken"),
      };

      cart.addItemForMe(payload, options, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        if (type === "cart") {
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 2000);
        } else {
          setTimeout(() => {
            navigate("/user/cart");
          }, 1000);
        }
      });
    }
  };
  if (!item) return;

  return (
    <div>
      {show && (
        <Alert variant="info">
          <Alert.Heading>상품이 장바구니에 담겼습니다</Alert.Heading>
          <p>장바구니에서 확인해주세요</p>
        </Alert>
      )}
      <p className="new">New</p>
      <h1 className="name">{item.name}</h1>

      <h5>
        {item.summary} 판매 가격
        <span className="price"> {item.price?.original.formatted}</span>
      </h5>
      <div className="quantity_wrapper">
        <p className="quantity">수량</p>
        <button
          className="plus_btn"
          type="button"
          name="button"
          onClick={() => handleQuantity("minus")}
        >
          -
        </button>
        <input type="text" readOnly name="number" value={count} />

        <button
          className="minus_btn"
          type="button"
          name="button"
          onClick={() => handleQuantity("plus")}
        >
          +
        </button>

        <br />
        <h3>
          결제 예정 금액 : {convertPrice(item.price?.original.raw * count)}원
        </h3>
        <br />

        <div className="product_info_action" onClick={() => handleCart("cart")}>
          장바구니에 담기
        </div>
        <div className="product_info_action" onClick={() => handleCart("pay")}>
          바로 구매
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
