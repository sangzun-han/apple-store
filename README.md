# 애플스토어

## 애플스토어

- 애플스토어는 clayful api를 이용한 오픈마켓입니다.

## 개발환경

`React`

라이브러리 : `react-router-dom@6`, `clayful api`, `react-daum-postcode` `axios`

## 페이지 기능

### 메인페이지
<div align="center">
  <img src="https://user-images.githubusercontent.com/57563053/160284310-29f3afd0-2062-4dc8-b396-4a5194a921df.gif" width="400" />
</div>

### 회원가입,로그인
<div align="center">
  <img alt="signup" src="https://user-images.githubusercontent.com/57563053/160284520-351b4ec5-b86f-4dbf-b423-da6aee4541a6.png" width="400">
  <img alt="login" src="https://user-images.githubusercontent.com/57563053/160284524-e1292623-76d8-4666-80ee-2cf10b44a367.png" width="400">
</div>

1. 로그인이 실패하면 `alert` 창이 나타납니다.
2. 이메일 focus에서 벗어나면 유효성 검사가 진행됩니다.
3. 비밀번호는 숫자,문자를 포함한 8자리 이상이어야 합니다.
4. 이메일,비밀번호,비밀번호 확인에 대한 유효성검사가 완료되면 회원가입 버튼이 활성화 됩니다.

### 상품페이지
<div align="center">
  <img width="400" alt="product" src="https://user-images.githubusercontent.com/57563053/160284820-249f5137-ca68-4dfe-bdd9-2ad82d43c6f5.png">
  <img width="400" alt="product1" src="https://user-images.githubusercontent.com/57563053/160284959-db25d4d2-efdd-40cb-9161-26f97cf8b094.png">

</div>

1. `장바구니에 담기`를 클릭하면 상품을 장바구니에 담고 알람이 등장합니다.
2. `바로 구매`를 누르면 상품을 장바구니에 담고 장바구니 페이지로 이동합니다.


### 장바구니
<div align="center">
  <img width="400" alt="cart" src="https://user-images.githubusercontent.com/57563053/160285184-3c005611-18e9-49c0-849e-172b22307b29.png" />
</div>

1. 수량을 조절하면 `상품의 가격*수량`으로 가격이 변합니다.
2. 모든 상품의 가격의 합이 총금액으로 합산됩니다.
3. `결제` 버튼을 누르면 결제페이지로 이동합니다.

### 결제
<div align="center">
  <img width="400" alt="pay" src="https://user-images.githubusercontent.com/57563053/160285473-b8946bd2-6b3b-4d5d-a531-a25a119ba490.png">
  <img width="400" alt="cart1" src="https://user-images.githubusercontent.com/57563053/160285781-263b5205-b7b9-4db1-86c1-ebcdfba78adf.png">
  <img width="400" alt="result" src="https://user-images.githubusercontent.com/57563053/160286316-5f0553d0-b842-4dce-8674-cc0756821de1.png">
</div>



1. `수취자 정보도 위와 동일합니다.` 를 체크하면 수취자 정보가 주문자 정보와 동일하게 변경됩니다.
2. `배송정보`의 주소는 `react-daum-postcode`를 이용해서 주소를 찾습니다.
3. `결제방식`에서 무통장입금을 선택하면 `주문` 버튼 아래에 계좌번호가 나타납니다.
4. `주문` 버튼을 누르면 `clayful`에 데이터가 전송됩니다.

