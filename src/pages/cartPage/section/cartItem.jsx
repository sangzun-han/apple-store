import React from "react";
import "./cartItem.css";

const CartItem = ({ item, convertPrice }) => {
  if (!item.product) return null;

  return (
    <div className="item">
      <div className="image">
        <img src={item.product.thumbnail.url} alt="item" />
      </div>

      <div className="description">
        <span>{item.product.name}</span>
        <span>ball High</span>
        <span>White</span>
      </div>

      <div className="quantity">
        <button className="minus_btn" type="button" name="button">
          -
        </button>
        <input type="text" readOnly name="name" value={item.quantity.raw} />
        <button className="plus_btn" type="button" name="button">
          +
        </button>
      </div>
      <div className="total_price">
        ₩ {convertPrice(item.price.original.raw)}
      </div>
      <div className="buttons">
        <span className="delete_btn">X</span>
      </div>
    </div>
  );
};

export default CartItem;
