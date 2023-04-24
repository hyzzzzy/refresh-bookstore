import { main } from '../public/js/main.js';

// 가격 문자열에서 숫자만 반환하는 함수
function getPriceNumber(str) {
  return Number(str.replace(/,/g, '').slice(0, -1));
}

// 로컬스토리지에 'cart'데이터 저장(테스트)
const saveToCart = (data) => {
  localStorage.setItem('cart', JSON.stringify(data));
}
const saveToPurchase = (data) => {
  localStorage.setItem('purchase', JSON.stringify(data));
}

const orderList = document.querySelector('.orderList');
const bookTitle = document.querySelectorAll('.book-title a');
const author = document.querySelectorAll('.author')
const itemPrice = document.querySelectorAll('.item-price');

const booksPrice = document.querySelector('.booksPrice');
const deliveryFee = document.querySelector('.deliveryFee');
const totalCost = document.querySelector('.totalCost');

//예시데이터
let order = [
  {
    "title":"이펙티브 타입스크립트",
    "author":"댄 밴더캄",
    "publisher":"인사이트",
    "publication_date":"2021-06-08T15:00:00.000Z",
    "isbn":"9788966263134",
    "description":"타입스크립트는 타입 정보를 지닌 자바스크립트의 상위 집합으로, 자바스크립트의 골치 아픈 문제점들을 해결해 준다. 이 책은 《이펙티브 C++》와 《이펙티브 자바》의 형식을 차용해 타입스크립트의 동작 원리, 해야 할 것과 하지 말아야 할 것에 대한 구체적인 조언을 62가지 항목으로 나누어 담았다. 각 항목의 조언을 실제로 적용한 예제를 통해 연습하다 보면 타입스크립트를 효율적으로 사용하는 방법을 익힐 수 있다.",
    "price":25000,
    "image_path":"../product-images/9788966263134.png",
    "category":"프론트엔드",
    "amount":2,
  }
];
saveToCart(order);

let data = JSON.parse(localStorage.getItem('cart'));
// 책 정보
// bookTitle.forEach(e => e.innerText = order.title);
// author.forEach(e => e.innerText = order.author);
// itemPrice.forEach(e => e.innerText = `${order.price.toLocaleString()}원`);
data.forEach((data, idx) => {
  orderList.innerHTML +=
    `<div class="item">
    <a class="book-img" href="#">
      <img src="${data.image_path}" class="book-img" alt="${data.title}"/>
    </a>
    <div class="book__title__price">
      <div class="book-title">
        <a class="book-link" href="#">${data.title}</a>
        <div class="author">${data.author}</div>
      </div>
      <div class="amount">총 ${data.amount}권</div>
      <div class="item-price">${data.price.toLocaleString()}원</div>
    </div>
  </div>`
})

// 배송비 계산
function setDeliveryFee() {
  if (getPriceNumber(booksPrice.innerText) >= 50000) {
    deliveryFee.innerText = '0원';
  } else {
    deliveryFee.innerText = '3,000원';
  }
}
setDeliveryFee();

// 총 결제 금액 계산
function setTotalCost() {
  const totalCostNum = getPriceNumber(booksPrice.innerText) + getPriceNumber(deliveryFee.innerText);
  totalCost.innerText = `${totalCostNum.toLocaleString()}원`;
}
setTotalCost();

//////DB에서 사용자 정보 가져와 출력하기(미완성)

// 요청사항
const customRequestContainer = document.querySelector('.customRequestContainer');
const customRequestInput = document.querySelector(".customRequest");
const requestSelectBox = document.querySelector("#request__Select__Box");

// const requestOption = {
//   1: "배송 전 연락바랍니다.",
//   2: "부재 시 경비실에 맡겨주세요.",
//   3: "부재 시 문 앞에 놓아주세요.",
//   4: "부재 시 택배함에 넣어주세요.",
//   5: "직접 입력",
// };

// "직접 입력" 선택 시 input칸 보이게 함
function handleRequestChange(e) {
  const type = e.target.value;

  if (type === "5") {
    customRequestContainer.style.display = "flex";
    customRequestInput.focus();
  } else {
    customRequestContainer.style.display = "none";
  }
}

requestSelectBox.addEventListener("change", handleRequestChange);


// 결제하기 버튼 클릭
const payBtn = document.querySelector(".paymentButton button");

// function payBtnClick() {
//   // if (
//   //   !userName.value.trim() ||
//   //   !userPhoneNumber.value ||
//   //   !userPostCode.value ||
//   //   !userStreetAddress.value
//   // ) {
//   //   return alert("배송지 정보를 모두 입력해주세요");
//   // }

//   const requestType = requestSelectBox.value;
//   let request;
//   // 요청사항의 종류에 따라 request 문구가 달라짐
//   if (requestType === "0") {
//     request = "요청사항 없음.";
//   } else if (requestType === "5") {
//     request = customRequestInput.value;
//   } else {
//     request = requestOption[requestType];
//   }

//   // 기존에 휴대폰번호와 주소가 없다면 주문할 때 배송지와 휴대폰번호로 기존 유저정보 업데이트

//   if (!phoneNumber || !postCode) {
//     // 전화번호
//     if (userPhoneNumber.value !== "") {
//       // 숫자만 매칭
//       const numberCheck = userPhoneNumber.value.split("");
//       let result = [];
//       numberCheck.forEach((number) => {
//         const pattern = /[0-9]/g;
//         result.push(number.match(pattern));
//       });

//       // 숫자가 아닌 다른값이 들어가 있을 경우
//       if (result.includes(null)) {
//         return alert("휴대폰번호를 잘못 입력하셨습니다. 숫자만 입력하세요.");
//       }
//       // 길이가 아닐 경우
//       if (numberCheck.length < 10) {
//         return alert("휴대폰번호를 잘못 입력하셨습니다. 다시 입력해주세요.");
//       }
//     }

//     fetch(`/api/users/${_id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         phoneNumber: `${userPhoneNumber.value}`,
//         postCode: `${userPostCode.value}`,
//         streetAddress: `${userStreetAddress.value}`,
//         extraAddress: `${userExtraAddress.value}`,
//       }),
//     })
//       .then(async (res) => {
//         const json = await res.json();

//         if (res.ok) {
//           return json;
//         }

//         return Promise.reject(json);
//       })
//       .then((userInfoChange) => {})
//       .catch((err) => {
//         alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`);
//       });
//   }

//   fetch(`/api/orders`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       buyer: `${_id}`,
//       productList: `${productAllIdArr}`,
//       countList: `${productAllAmountArr}`,
//       shippingStatus: "배송전",
//       shippingPostCode: `${userPostCode.value}`,
//       shippingStreetAddress: `${userStreetAddress.value}`,
//       shippingExtraAddress: `${userExtraAddress.value}`,
//       shippingRequestMessage: `${request}`,
//       totalAmount: `${convertToNumber(totalPriceHTML.innerHTML)}`,
//       recipientName: `${userName.value}`,
//       recipientPhoneNumber: `${userPhoneNumber.value}`,
//     }),
//   })
//     .then(async (res) => {
//       const json = await res.json();

//       if (res.ok) {
//         return json;
//       }

//       return Promise.reject(json);
//     })
//     .then((data) => {
//       data.productList.forEach((product) => {
//         deleteIndexedDBdata(DATABASE_NAME, version, objectStore, product);
//       });

//       alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.");
//       window.location.href = "/orders/complete";
//     })
//     .catch((err) => {
//       alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`);
//     });
// }


// 버튼클릭이벤트 함수(임시)
function payBtnClick() {
  alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.");
  saveToPurchase(localStorage.getItem('cart'));
  localStorage.removeItem('cart');
  window.location.href = "/orders/complete";
}
payBtn.addEventListener("click", payBtnClick);


main();