import React, { useEffect, useState } from "react";
import "./cartPage.css";
import clayful from "clayful/client-js";
import { useNavigate } from "react-router-dom";
import CartItem from "./section/cartItem";

const CartPage = ({ convertPrice }) => {
  const navigate = useNavigate();
  const [carts, setCarts] = useState({});

  useEffect(() => {
    const cart = clayful.Cart;

    const payload = {};

    const options = {
      customer: localStorage.getItem("accessToken"),
    };

    cart.getForMe(payload, options, (err, result) => {
      if (err) {
        console.log(err.code);
        return;
      } else {
        setCarts(result.data.cart);
      }
    });
  }, []);

  const items = carts.items;

  return (
    <div className="page_wrapper">
      <div className="shopping_cart">
        <h1 className="title">장바구니</h1>
        <div className="shopping_cart_body">
          {items && items.length > 0 ? (
            items.map((item, index) => {
              return (
                <CartItem
                  key={item._id}
                  item={item}
                  convertPrice={convertPrice}
                />
              );
            })
          ) : (
            <p className="">카드에 상품이 하나도 없습니다.</p>
          )}
        </div>

        {items && items.length > 0 && (
          <div className="bottom">
            <span className="total_price">
              금액: ₩ {convertPrice(carts.total?.amount.raw)}
            </span>
            <button onClick={() => navigate("/payment")}>결제</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
