import { makingAlertModal, confirmModal } from "../../alert/alert.js";
import { addCommas } from "/useful-functions.js";

const displaying = document.querySelector(".shoppingListBox");

const payProductQuantity = document.querySelector("#payProductQuantity");
const payProductPrice = document.querySelector("#payProductPrice");
const payShippingPrice = document.querySelector("#payShippingPrice");
const payTotalPrice = document.querySelector("#payTotalPrice");
let totalPriceArrForPay = [];
let totalQuantityArrForPay = [];

const localStorageItem = JSON.parse(localStorage.getItem("cartList"));

// 로딩시 페이지 구현
const displayData = () => {
  for (let i = 0; i < localStorageItem.length; i++) {
    const productContainer = document.createElement("div");
    productContainer.classList.add("selectedProduct");

    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.name = "check";
    inputCheck.checked = "true";
    inputCheck.classList.add("selectedCheckBox");
    inputCheck.addEventListener("click", (e) => individualCheck(e));

    const pushProductImage = document.createElement("img");
    pushProductImage.src = localStorageItem[i].img;
    pushProductImage.classList.add("chocolateImg");
    pushProductImage.alt = "chocolate1";

    const pushProductName = document.createElement("div");
    pushProductName.classList.add("SelectedProductName");
    pushProductName.textContent = localStorageItem[i].name;
    const id = document.createElement("span");
    id.classList.add("id");
    id.textContent = localStorageItem[i].id;
    id.style.display = "none";

    const modifynumb = document.createElement("div");
    modifynumb.classList.add("modifyProductQuantity");

    const minusBtn = document.createElement("button");
    minusBtn.classList.add("minusProductQuantity");
    minusBtn.textContent = "-";
    minusBtn.addEventListener("click", (event) => {
      minusQuantity(event, localStorageItem[i].id);
    });

    const productQuantityNumb = document.createElement("p");
    productQuantityNumb.classList.add("productQuantityNumb");
    productQuantityNumb.textContent = localStorageItem[i].quantity;
    const changeQuantity = document.createElement("p");
    changeQuantity.classList.add("productQuantity");
    changeQuantity.textContent = localStorageItem[i].quantity;

    const plusBtn = document.createElement("button");
    plusBtn.classList.add("plusProductQuantity");
    plusBtn.textContent = "+";
    plusBtn.addEventListener("click", () => {
      plusQuantity(localStorageItem[i].id);
    });

    const priceBox = document.createElement("div");
    priceBox.classList.add("selectedPrice");

    const priceSpan = document.createElement("span");
    priceSpan.classList.add("productPriceSpan");
    priceSpan.textContent = `${addCommas(localStorageItem[i].price)} 원`;
    const xIcon = document.createElement("i");
    xIcon.classList.add("fas");
    xIcon.classList.add("fa-thin");
    xIcon.classList.add("fa-xmark");
    const equalIcon = document.createElement("i");
    equalIcon.classList.add("fas");
    equalIcon.classList.add("fa-thin");
    equalIcon.classList.add("fa-equals");

    const totalPriceSpan = document.createElement("span");
    totalPriceSpan.classList.add("totalPrice");
    totalPriceSpan.textContent = `${addCommas(
      localStorageItem[i].price * localStorageItem[i].quantity
    )} 원`;

    const trashIconContiner = document.createElement("div");
    trashIconContiner.classList.add("deleteIcon");
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fas");
    trashIcon.classList.add("fa-trash-can");
    trashIcon.addEventListener("click", deleteData);
    trashIconContiner.appendChild(trashIcon);

    productContainer.appendChild(inputCheck);
    productContainer.appendChild(pushProductImage);
    productContainer.appendChild(pushProductName);
    productContainer.appendChild(id);
    modifynumb.appendChild(minusBtn);
    modifynumb.appendChild(changeQuantity);
    modifynumb.appendChild(plusBtn);
    priceBox.appendChild(priceSpan);
    priceBox.appendChild(xIcon);
    priceBox.appendChild(productQuantityNumb);
    priceBox.appendChild(equalIcon);
    priceBox.appendChild(totalPriceSpan);

    productContainer.appendChild(modifynumb);
    productContainer.appendChild(priceBox);
    productContainer.appendChild(trashIconContiner);

    displaying.appendChild(productContainer);

    makingFullPayArray(i);
  }
};

displayData();
setPayBox();

function makingFullPayArray(i) {
  totalPriceArrForPay.push(
    Number(localStorageItem[i].price) * Number(localStorageItem[i].quantity)
  );
  totalQuantityArrForPay.push(Number(localStorageItem[i].quantity));
}

//결제 정보창 초기 설정
function setPayBox() {
  const totalPriceForPay = totalPriceArrForPay.reduce(
    (prev, next) => prev + next,
    0
  );
  const totalQuantityInPayBox = totalQuantityArrForPay.reduce(
    (prev, next) => prev + next,
    0
  );
  const shippingPrice = 3000;

  payProductQuantity.innerText = totalQuantityInPayBox;
  payProductPrice.innerText = addCommas(totalPriceForPay);
  payShippingPrice.innerText = addCommas(shippingPrice);
  payTotalPrice.innerText = addCommas(shippingPrice + totalPriceForPay);

  totalPriceArrForPay = [];
  totalQuantityArrForPay = [];
}

//버튼을 누르면 증가, 감소
function plusQuantity(id) {
  localStorageItem.forEach((product) => {
    if (product.id == id) {
      product.quantity = Number(product.quantity) + 1;
    }
  });
  localStorage.setItem("cartList", JSON.stringify(localStorageItem));
  while (displaying.hasChildNodes()) {
    displaying.removeChild(displaying.firstChild);
  }
  displayData();
  setPayBox();
}

function minusQuantity(event, id) {
  const targetProduct = localStorageItem.filter(
    (product) => product.id === id
  )[0];
  if (targetProduct.quantity <= 1) {
    event.target.disabled = true;
    //confirm문으로 낱개 삭제 넣기!
    return;
  }

  localStorageItem.forEach((product) => {
    if (product.id == id) {
      product.quantity = Number(product.quantity) - 1;
    }
  });
  localStorage.setItem("cartList", JSON.stringify(localStorageItem));
  while (displaying.hasChildNodes()) {
    displaying.removeChild(displaying.firstChild);
  }
  displayData();
  setPayBox();
}

//전체선택 구현
const allSelectedCheckbox = document.querySelector("#allSelectedCheckbox");
const selectedCheckBox = document.querySelectorAll(".selectedCheckBox");

allSelectedCheckbox.addEventListener("click", selectAll);
function selectAll() {
  console.log(allSelectedCheckbox);
  if (allSelectedCheckbox.checked) {
    selectedCheckBox.forEach((i) => {
      i.checked = true;
    });
    for (let i = 0; i < localStorageItem.length; i++) {
      makingFullPayArray(i);
    }
    setPayBox();
  }
  if (!allSelectedCheckbox.checked) {
    selectedCheckBox.forEach((i) => {
      i.checked = false;
    });
    totalPriceArrForPay = [];
    totalQuantityArrForPay = [];
    setPayBox();
  }
}

// 전체말고 선택창
function individualCheck(e) {
  const checkedProductBox = document.querySelectorAll(
    ".selectedCheckBox:checked"
  );
  const checkedProduct = [];
  checkedProductBox.forEach((box) => {
    if (box.checked) {
      checkedProduct.push(box.parentElement.querySelector(".id").innerText);
    }
  });
  if (!e.target.checked) {
    allSelectedCheckbox.checked = false;
    makingFilteredCartForCheckBox(checkedProduct);
    setPayBox();
  }
  if (e.target.checked) {
    makingFilteredCartForCheckBox(checkedProduct);
    setPayBox();
    if (checkedProduct.length === localStorageItem.length) {
      allSelectedCheckbox.checked = true;
    }
  }
}
function makingFilteredCartForCheckBox(checkedProduct) {
  const filteredCart = [];
  //중첩 반복문 어떻게 해결할 수 있을까?
  localStorageItem.forEach((product) => {
    for (let i = 0; i < checkedProduct.length; i++) {
      if (product.id === checkedProduct[i]) {
        filteredCart.push(product);
      }
    }
  });
  for (let i = 0; i < filteredCart.length; i++) {
    totalPriceArrForPay.push(
      Number(filteredCart[i].price) * Number(filteredCart[i].quantity)
    );
    totalQuantityArrForPay.push(Number(filteredCart[i].quantity));
  }
}

// 휴지통 버튼을 누르면 localStorage에서 데이터 삭제
function deleteData(item) {
  const targetid = item.path[2].querySelector(".id").innerText;

  let newStorageItem;
  const deleteFunc = () => {
    const findNotDelete = localStorageItem.filter((e) => e.id !== targetid);
    newStorageItem = findNotDelete;
    localStorage.clear();
    localStorage.setItem("cartList", JSON.stringify(newStorageItem));

    alertModal.style.display = "block";
    makingAlertModal("삭제되었습니다.", "/cart");
  };
  confirmModal("정말 삭제하시겠습니까?", deleteFunc);
}

//선택 삭제 클릭하면 선택된 항목 삭제
const deletePart = document.querySelector("#deletePart");

deletePart.addEventListener("click", deletePartFunc);

function deletePartFunc() {
  const deleteChecked = document.querySelectorAll(".selectedCheckBox");

  // 체크가 되어있는 id값

  const deleteCallBack = () => {
    let newStorageItem = localStorageItem;
    for (let i = 0; i < deleteChecked.length; i++) {
      if (deleteChecked[i].checked == true) {
        newStorageItem = newStorageItem.filter(
          (e) =>
            e.id !== deleteChecked[i].parentNode.querySelector(".id").innerText
        );
      }
    }

    localStorage.clear();
    localStorage.setItem("cartList", JSON.stringify(newStorageItem));

    alertModal.style.display = "block";
    makingAlertModal("삭제되었습니다.", "/cart");
  };

  confirmModal("정말 삭제하시겠습니까?", deleteCallBack);
}

// 결제버튼 클릭시
const buyButton = document.querySelector("#buyButton");
buyButton.addEventListener("click", () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    alertModal.style.display = "block";
    makingAlertModal("상품 구매는 로그인한 유저만 가능합니다.", "/login");
    return;
  }
  let setLocalStorage = [];
  localStorageItem.forEach((x) => {
    if (Number(x.quantity) !== 0) {
      setLocalStorage.push(x);
    }
  });
  if (setLocalStorage.length !== 0) {
    localStorage.setItem("cartList", JSON.stringify(setLocalStorage));
    window.location.href = "/order";
  } else {
    alertModal.style.display = "block";
    makingAlertModal("상품수량을 확인하세요", "/cart");
  }
});
