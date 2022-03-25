import React, { useState } from "react";
import "./productInfo.css";

const ProductInfo = ({ item }) => {
  const [count, setCount] = useState(1);
  if (!item) return;

  return (
    <div>
      <p className="new">New</p>
      <h1 className="name">{item.name}</h1>

      <h5>
        {item.summary} 개별 판매 가격 {item.price?.original.formatted}
      </h5>
      <div className="quantity_wrapper">
        <p className="quantity">수량</p>
        <button className="plus_btn" type="button" name="button">
          +
        </button>
        <input type="text" readOnly name="number" value={count} />

        <button className="minus_btn" type="button" name="button">
          -
        </button>

        <br />
        <h3>총 상품 금액: {item.price?.original.raw * count}원</h3>
        <br />

        <div className="product_info_action">장바구니에 담기</div>
        <div className="product_info_action">바로 구매</div>
      </div>
    </div>
  );
};

export default ProductInfo;
