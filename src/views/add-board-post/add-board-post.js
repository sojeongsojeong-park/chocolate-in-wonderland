import { makingAlertModal } from "../../alert/alert.js";
import * as Api from "/api.js";

const userId = sessionStorage.getItem("userId");
console.log(userId);

async function getData() {
  // userId로 접속중인 유저데이터 호출
  const user = await Api.get(`/api/users/${userId}/name`);
  console.log(user.fullName);

  let author = document.querySelector("#author");
  author.value = user.fullName;
}
getData();

const addButton = document.querySelector("#addButton");
addButton.addEventListener("click", async (e) => {
  e.preventDefault();
  alertModal.style.display = "block";

  //데이터 백으로 넘기는 작업
  let title = document.querySelector("#title").value;
  let author = userId;
  let content = document.querySelector("#content").value;

  let data = {
    title,
    author,
    content,
  };

  try {
    const sendData = await Api.post("/boards/notice/post", data);
    makingAlertModal("글이 등록되었습니다.", "/boardlist");
  } catch (err) {
    console.error(err.stack);
    alertModal.style.display = "block";
    makingAlertModal(
      `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
    );
  }
});
