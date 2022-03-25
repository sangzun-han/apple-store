import clayful from "clayful/client-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailProductPage = () => {
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
    <div>
      <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
    </div>
  );
};

export default DetailProductPage;
