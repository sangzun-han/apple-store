import React, { useEffect, useState } from "react";
import "./cartPage.css";
import clayful from "clayful/client-js";
import { useNavigate } from "react-router-dom";
import CartItem from "./section/cartItem";

const CartPage = ({ convertPrice }) => {
  const navigate = useNavigate();
  const [carts, setCarts] = useState({});
  const items = carts.items;

  const handleQuantity = (type, index) => {
    let newCart = { ...carts };
    const price =
      carts.items[index].price.original.raw / carts.items[index].quantity.raw;

    if (type === "plus") {
      newCart.items[index].price.original.raw += price;
      newCart.total.amount.raw += price;
      newCart.items[index].quantity.raw += 1;
      updateItemData(
        newCart.items[index]._id,
        newCart.items[index].quantity.raw
      );
      setCarts(newCart);
    } else {
      if (newCart.items[index].quantity.raw === 1) return;

      newCart.items[index].price.original.raw -= price;
      newCart.total.amount.raw -= price;
      newCart.items[index].quantity.raw -= 1;
      updateItemData(
        newCart.items[index]._id,
        newCart.items[index].quantity.raw
      );
      setCarts(newCart);
    }
  };

  const updateItemData = (itemId, quantity) => {
    const cart = clayful.Cart;
    const payload = {
      quantity: quantity,
    };
    const options = {
      customer: localStorage.getItem("accessToken"),
    };

    cart.updateItemForMe(itemId, payload, options, (err) => {
      if (err) {
        console.log(err.code);
        return;
      }
    });
  };

  const removeItemFromState = (itemId, price) => {
    let newCart = { ...carts };
    let filteredItems = newCart.items.filter((item) => item._id !== itemId);
    newCart.items = filteredItems;
    newCart.total.amount.raw = newCart.total.amount.raw - price;
    setCarts(newCart);
  };

  const handleItemDelete = (itemId, price) => {
    const cart = clayful.Cart;
    const options = {
      customer: localStorage.getItem("accessToken"),
    };

    cart.deleteItemForMe(itemId, options, (err) => {
      if (err) {
        console.log(err.code);
        return;
      }
      removeItemFromState(itemId, price);
    });
  };

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

  return (
    <div className="page_wrapper">
      <div className="shopping_cart">
        <h1 className="title">????????????</h1>
        <div className="shopping_cart_body">
          {items && items.length > 0 ? (
            items.map((item, index) => {
              return (
                <CartItem
                  key={item._id}
                  item={item}
                  index={index}
                  convertPrice={convertPrice}
                  handleQuantity={(type, index) => handleQuantity(type, index)}
                  handleItemDelete={(itemId, price) =>
                    handleItemDelete(itemId, price)
                  }
                />
              );
            })
          ) : (
            <p className="">????????? ????????? ????????? ????????????.</p>
          )}
        </div>

        {items && items.length > 0 && (
          <div className="bottom">
            <span className="total_price">
              ??????: ??? {convertPrice(carts.total.amount.raw)}
            </span>
            <button onClick={() => navigate("/payment")}>??????</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
