import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./paymentPage.css";
import clayful from "clayful/client-js";
import PostModal from "../../components/postModal";

const PaymentPage = ({ convertPrice }) => {
  const navigate = useNavigate();
  const [carts, setCarts] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [recvUserInfo, setRecvUserInfo] = useState({
    phone: "",
    name: "",
  });

  const [sendUserInfo, setSendUserInfo] = useState({
    phone: "",
    name: "",
  });

  const [address, setAddress] = useState({
    postCode: "",
    state: "",
    city: "",
    address: "",
    detailAddress: "",
    country: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [paymentMethod, setPayMethod] = useState("");

  const [show, setShow] = useState(false);

  const handleSendChange = (event) => {
    const { name, value } = event.target;
    setSendUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRecvChange = (event) => {
    const { name, value } = event.target;
    setRecvUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckBox = () => {
    if (isChecked) {
      setIsChecked(false);
      setRecvUserInfo({
        phone: "",
        name: "",
      });
    } else {
      setIsChecked(true);
      setRecvUserInfo({
        phone: sendUserInfo.phone,
        name: sendUserInfo.name,
      });
    }
  };

  const handlePayment = () => {
    const cart = clayful.Cart;
    const options = {
      customer: localStorage.getItem("accessToken"),
    };

    let items = [];
    carts.items.map((item) => {
      let itemVariable = {};
      itemVariable.bundleItems = item.bundleItems;
      itemVariable.product = item.product._id;
      itemVariable.quantity = item.quantity.raw;
      itemVariable.shippingMethod = item.shippingMethod._id;
      itemVariable.variant = item.variant._id;
      itemVariable._id = item._id;
      return items.push(itemVariable);
    });
    const payload = {
      items: items,
      currency: carts.currency.payment.code,
      paymentMethod: paymentMethod,
      address: {
        shipping: {
          name: {
            full: recvUserInfo.name,
          },
          mobile: recvUserInfo.phone,
          phone: recvUserInfo.phone,
          postcode: address.postCode,
          state: address.state,
          city: address.city,
          address1: address.address,
          address2: address.detailAddress,
          country: "KR",
        },

        billing: {
          name: {
            full: recvUserInfo.name,
          },
          mobile: recvUserInfo.phone,
          phone: recvUserInfo.phone,
          postcode: address.postCode,
          state: address.state,
          city: address.city,
          address1: address.address,
          address2: address.detailAddress,
          country: "KR",
        },
      },
    };

    cart.checkoutForMe("order", payload, options, (err, result) => {
      if (err) {
        console.log(err);
        console.log(err.code);
        return;
      } else {
        console.log(result.data);
        cart.emptyForMe(options, (err) => {
          if (err) console.log(err.code);
          navigate("/history");
        });
      }
    });
  };

  const getCartData = () => {
    const cart = clayful.Cart;
    const payload = {};
    const options = {
      customer: localStorage.getItem("accessToken"),
    };

    cart.getForMe(payload, options, (err, result) => {
      if (err) {
        console.log(err.code);
        return;
      } else setCarts(result.data.cart);
    });
  };

  const getPaymentData = () => {
    const payment = clayful.PaymentMethod;
    const options = {};

    payment.list(options, (err, result) => {
      if (err) {
        console.log(err.code);
        return;
      } else {
        setPaymentMethods(result.data);
      }
    });
  };

  const handleModal = () => {
    setShow(!show);
  };

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "")
        extraAddress += extraAddress !== "" ? `(${extraAddress})` : "";
      fullAddress += extraAddress !== "" ? `(${extraAddress})` : "";
    }

    handleModal();
    setAddress((prevState) => ({
      ...prevState,
      postCode: data.zonecode,
      state: data.sido,
      city: data.sigungu,
      address: fullAddress,
    }));
    console.log(data);
  };

  const handleDetailAddress = (event) => {
    setAddress((prevState) => ({
      ...prevState,
      detailAddress: event.target.value,
    }));
  };

  useEffect(() => {
    getCartData();
    getPaymentData();
  }, []);

  return (
    <div className="payment_wrapper">
      <div className="payment">
        <header className="payment_header">
          <div className="header_left">결제</div>
          <div className="header_right">
            <span className="price">
              금액 : {convertPrice(carts.total?.amount.raw + 2500)}원 (배송비
              2,500원)
            </span>
          </div>
        </header>

        <section className="section">
          <div className="section_left">
            <h5>주문자 정보</h5>
            <input
              type="text"
              name="name"
              placeholder="주문자명"
              defaultValue={sendUserInfo.name}
              onChange={handleSendChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="주문자 연락처"
              defaultValue={sendUserInfo.phone}
              onChange={handleSendChange}
            />
            <div className="checked">
              <input
                type="checkbox"
                name="sameInfo"
                id="sameInfo"
                onChange={handleCheckBox}
                checked={isChecked}
              />
              <label htmlFor="sameInfo">수취자 정보도 위와 동일합니다.</label>
            </div>
          </div>
          <div className="section_mid"></div>
          <div className="section_right">
            <h5>수취자 정보</h5>
            <input
              type="text"
              name="name"
              placeholder="수취자명"
              defaultValue={recvUserInfo.name}
              onChange={handleRecvChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="수취자 연락처"
              defaultValue={recvUserInfo.phone}
              onChange={handleRecvChange}
            />

            <h5>배송 정보</h5>
            <input
              type="text"
              readOnly
              value={address.address}
              placeholder="주소"
              onClick={() => setShow(true)}
            />
            <input
              type="text"
              name="detail_address"
              value={address.detailAddress}
              onChange={handleDetailAddress}
              placeholder="상세주소"
            />
            <input
              type="text"
              readOnly
              value={address.postCode}
              placeholder="우편번호"
            />

            <h5>결제</h5>
            <div className="payment_method">
              <select
                value={paymentMethod}
                onChange={(event) => setPayMethod(event.target.value)}
              >
                <option>결제 수단 선택</option>
                {paymentMethods.map((method) => (
                  <option key={method.slug} value={method.slug}>
                    {method.name}
                  </option>
                ))}
              </select>

              <button className="order_btn" onClick={handlePayment}>
                주문
              </button>
              {paymentMethod === "Deposit" && (
                <p>계좌번호 : 3333-11-241256 카카오뱅크</p>
              )}
            </div>

            <PostModal
              show={show}
              handleModal={handleModal}
              handlePostCode={handlePostCode}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentPage;
