import React from "react";
import CloseButton from "react-bootstrap/CloseButton";
import "./cartItem.css";

const CartItem = ({
  item,
  index,
  convertPrice,
  handleQuantity,
  handleItemDelete,
}) => {
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
        <button
          className="minus_btn"
          type="button"
          name="button"
          onClick={() => handleQuantity("minus", index)}
        >
          -
        </button>
        <input type="text" readOnly name="name" value={item.quantity.raw} />
        <button
          className="plus_btn"
          type="button"
          name="button"
          onClick={() => handleQuantity("plus", index)}
        >
          +
        </button>
      </div>
      <div className="total_price">
        ₩ {convertPrice(item.price.original.raw)}
      </div>
      <div className="buttons">
        <CloseButton
          onClick={() => handleItemDelete(item._id, item.price.original.raw)}
        />
      </div>
    </div>
  );
};

export default CartItem;
