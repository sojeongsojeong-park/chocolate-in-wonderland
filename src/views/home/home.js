import { get } from "/api.js";
import { makingAlertModal } from "../../alert/alert.js";

async function makeLiFunction() {
  try {
    const categoryData = await get("/api/categories");
    const categoryUl = document.querySelector("#categoryList");

    const allBtnLi = document.createElement("li");
    allBtnLi.textContent = "전체보기";
    allBtnLi.classList.add("allBtn");
    allBtnLi.addEventListener("click", () => {
      window.location.href = "/productlist";
      allBtnLi.classList.add("selectCategory");
    });
    categoryUl.appendChild(allBtnLi);

    categoryData.forEach((e) => {
      const liForCategory = document.createElement("li");
      liForCategory.textContent = e.name;
      liForCategory.classList.add(e.name);
      liForCategory.addEventListener("click", () => {
        sessionStorage.setItem("category", e.name);
        liForCategory.classList.add("selectCategory");
        window.location.href = "/productlist";
      });
      categoryUl.appendChild(liForCategory);
    });
  } catch (err) {
    console.error(err.stack);
    alertModal.style.display = "block";
    makingAlertModal(
      `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`,
      "/"
    );
  }
}
makeLiFunction();

const viewMore = document.querySelector(".viewMore");
viewMore.addEventListener("click", () => {
  window.location.href = "/productlist";
});
