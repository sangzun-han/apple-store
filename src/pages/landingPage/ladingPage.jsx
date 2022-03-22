import React from "react";
import clayful from "clayful/client-js";

const LandingPage = () => {
  const product = clayful.Product;
  const options = {
    query: {
      page: 1,
    },
  };

  product.list(options, (err, response) => {
    if (err) {
      console.log(err.isClayful);
      console.log(err.model);
      console.log(err.method);
      console.log(err.status);
      console.log(err.headers);
      console.log(err.code);
      console.log(err.message);
    } else {
      console.log(response.status);
      console.log(response.headers);
      console.log(response.data);
    }
  });

  return (
    <div>
      <h1>Lading</h1>
    </div>
  );
};

export default LandingPage;
