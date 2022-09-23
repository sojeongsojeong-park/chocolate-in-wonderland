import { makingAlertModal } from "../../alert/alert.js";
import * as Api from "/api.js";

const path = window.location.pathname.split("/");
const postId = path[path.length - 2];

async function getData() {
  try {
    const data = await Api.get(`/boards/notice/post/${postId}`);
    console.log(data);

    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const content = document.querySelector("#content");

    title.value = data.title;
    author.value = data.author.fullName;
    content.textContent = data.content;
  } catch (err) {
    console.error(err.stack);
  }
}

getData();

const addButton = document.querySelector("#addButton");
addButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  const patchData = {
    title,
    content,
  };

  try {
    const patching = await Api.patch(
      `/boards/notice/post`,
      `${postId}`,
      patchData
    );
  } catch (err) {
    console.error(err.stack);
  }
  alertModal.style.display = "block";
  makingAlertModal("게시글이 수정되었습니다.", "/boardlist");
});
