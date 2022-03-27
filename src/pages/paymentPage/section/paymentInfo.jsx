import React from "react";
import PostModal from "../../../components/postModal";

const PaymentInfo = ({
  carts,
  show,
  setShow,
  sendUserInfo,
  recvUserInfo,
  address,
  isChecked,
  paymentMethods,
  paymentMethod,
  setPayMethod,
  handleSendChange,
  handleRecvChange,
  handleCheckBox,
  handlePayment,
  handlePostCode,
  handleDetailAddress,
  handleModal,
  convertPrice,
}) => {
  return (
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
            value={recvUserInfo.name}
            onChange={handleRecvChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="수취자 연락처"
            value={recvUserInfo.phone}
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
            name="detailAddress"
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
  );
};

export default PaymentInfo;
