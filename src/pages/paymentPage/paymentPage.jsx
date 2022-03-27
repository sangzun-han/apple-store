import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentInfo from "./section/paymentInfo";
import clayful from "clayful/client-js";
import "./paymentPage.css";

const PaymentPage = ({ convertPrice }) => {
  const navigate = useNavigate();
  const [carts, setCarts] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [paymentMethod, setPayMethod] = useState("");
  const [show, setShow] = useState(false);
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
    setTimeout(() => {
      setAddress((prevState) => ({
        ...prevState,
        postCode: data.zonecode,
        state: data.sido,
        city: data.sigungu,
        address: fullAddress,
      }));
    }, 100);
  };

  const handleDetailAddress = (event) => {
    setAddress((prevState) => ({
      ...prevState,
      detailAddress: event.target.value,
    }));
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

  useEffect(() => {
    getCartData();
    getPaymentData();
  }, []);

  return (
    <div className="payment_wrapper">
      <PaymentInfo
        carts={carts}
        show={show}
        setShow={setShow}
        sendUserInfo={sendUserInfo}
        recvUserInfo={recvUserInfo}
        address={address}
        isChecked={isChecked}
        paymentMethods={paymentMethods}
        paymentMethod={paymentMethod}
        setPayMethod={setPayMethod}
        handleSendChange={handleSendChange}
        handleRecvChange={handleRecvChange}
        handlePayment={handlePayment}
        handleCheckBox={handleCheckBox}
        handlePostCode={handlePostCode}
        handleDetailAddress={handleDetailAddress}
        handleModal={handleModal}
        convertPrice={convertPrice}
      />
    </div>
  );
};

export default PaymentPage;
