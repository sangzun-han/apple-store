import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detailProductPage.css";
import clayful from "clayful/client-js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductInfo from "./section/productInfo";

const DetailProductPage = ({ convertPrice }) => {
  const params = useParams();
  const productId = params.productId;
  const [item, setItem] = useState({});

  useEffect(() => {
    const product = clayful.Product;
    const options = {};

    product.get(productId, options, (err, result) => {
      if (err) console.log("code : ", err.code);
      else setItem(result.data);
    });
  }, [productId]);
  return (
    <div className="page_wrapper">
      <Row>
        <Col md>
          <div>
            <img
              className="thumbnail"
              src={item.thumbnail?.url}
              alt={item.name}
            />
          </div>
        </Col>
        <Col md>
          <ProductInfo item={item} convertPrice={convertPrice} />
        </Col>
      </Row>
      <div
        className="product_description"
        dangerouslySetInnerHTML={{ __html: item.description }}
      ></div>
    </div>
  );
};

export default DetailProductPage;
