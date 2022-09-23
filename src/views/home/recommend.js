import { get } from "/api.js";
import { addCommas } from "/useful-functions.js";

// 상품 목록 받아오기
async function getProductList() {
  try {
    const productData = await get("/api/products");
    const productList = document.querySelector(".productList");

    for (let i = 0; i < 4; i++) {
      const productItem = document.createElement("div");
      productItem.setAttribute("class", "productItem");
      productItem.classList.add(productData[i].category.name);
      const aTag = document.createElement("a");
      aTag.setAttribute("href", `/detail/${productData[i]._id}`);

      const itemImg = document.createElement("img");
      const itemName = document.createElement("div");
      const itemPrice = document.createElement("div");
      itemImg.setAttribute("class", "itemImg");
      itemImg.setAttribute("src", `${productData[i].img}`);
      itemName.setAttribute("class", "itemName");
      itemPrice.setAttribute("class", "itemPrice");

      const nameText = document.createTextNode(`${productData[i].name}`);
      const priceText = document.createTextNode(
        `${addCommas(productData[i].price)}원`
      );
      itemName.appendChild(nameText);
      itemPrice.appendChild(priceText);

      aTag.appendChild(itemImg);
      aTag.appendChild(itemName);
      aTag.appendChild(itemPrice);
      productItem.appendChild(aTag);
      productList.appendChild(productItem);
    }
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

getProductList();
