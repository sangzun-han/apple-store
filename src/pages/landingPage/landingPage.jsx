import React, { useEffect, useState } from "react";
import clayful from "clayful/client-js";
import "./landingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const product = clayful.Product;
  const [items, setItems] = useState([]);

  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const options = {
      query: {
        page: 1,
      },
    };

    product.list(options, (err, response) => {
      if (err) {
        console.log("message : ", err.message);
        return;
      } else {
        console.log("status : ", response.status);
        console.log(response.data);
        setItems(response.data);
      }
    });
  }, [product]);

  const renderCards = items.map((item) => {
    return (
      <div key={item._id} className="grid-product">
        <Link to={`/product/${item._id}`}>
          <img src={item.thumbnail.url} alt={item.name} />
          <div className="grid-detail">
            <p className="headline">{item.name}</p>
            <p> {convertPrice(item.price.original.convertedRaw)}원</p>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div>
      <section className="welcome">
        <h1>좋아하는 Apple 제품을 구입하는 가장 좋은 방법</h1>
      </section>

      <section className="product-grid">
        <div className="grid-container">
          <h2>Product</h2>
          <div className="grid">{renderCards}</div>
        </div>
      </section>

      <section className="first-hightlight-wrapper">
        <div className="container">
          <div className="new-alert">New</div>

          <div className="title-wraper bold black">MacBook Air</div>

          <div className="description-wrapper black">
            Twice the speed. Twice the storage.
          </div>

          <div className="price-wrapper grey">From $999.</div>

          <div className="links-wrapper">
            <ul>
              <li>
                <Link to="/">Learn more</Link>
              </li>
              <li>
                <Link to="/">Buy</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="second-hightlight-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="left-side-wrapper col-sm-12 col-md-6">
              <div className="left-side-container">
                <div className="title-wraper">iPhone 11</div>
                <div className="description-wraper">
                  Just the right amount of everything.
                </div>
                <div className="price-wrapper">
                  From $18.70/mo. or $499 with trade‑in.<sup>1</sup>
                </div>

                <div className="links-wrapper">
                  <ul>
                    <li>
                      <Link to="/">Learn more</Link>
                    </li>
                    <li>
                      <Link to="/">Apply now</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="right-side-wrapper col-sm-12 col-md-6">
              <div className="right-side-container">
                <div className="title-wraper white">
                  Get the latest CDC response to COVID-19.
                </div>

                <div className="links-wrapper white">
                  <ul>
                    <li>
                      <Link to="/">Watch the PSA</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fourth-hightlight-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="left-side-wrapper col-sm-12 col-md-6">
              <div className="left-side-container">
                <div className="top-logo-wrapper">
                  <div className="logo-wrapper">
                    <img src="/images/icons/arcade.png" alt="apple" />
                  </div>
                </div>
                <div className="description-wraper white">
                  Agent 8 is a small hero on a big mission.
                </div>
                <div className="links-wrapper">
                  <ul>
                    <li>
                      <Link to="/">
                        Play now<sup>2</sup>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">Learn about Apple Arcade</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="right-side-wrapper col-sm-12 col-md-6">
              <div className="right-side-container">
                <div className="title-wraper">
                  Apple Card Monthly Installments
                </div>
                <div className="description-wraper">
                  Pay for your next iPhone over time, interest-free with Apple
                  Card.
                </div>
                <div className="links-wrapper">
                  <ul>
                    <li>
                      <Link to="/">Learn more</Link>
                    </li>
                    <li>
                      <Link to="/">Apply now</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
