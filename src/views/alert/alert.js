const alertModal = document.querySelector("#alertModal");

export const makingAlertModal = function (message, redirect) {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("alertModalContainer");

  const alertH2 = document.createElement("h2");
  const alertP = document.createElement("p");
  alertH2.textContent = message;
  alertH2.classList.add("alertH2");
  alertP.textContent = "⚠️";
  alertP.classList.add("alertP");

  const alertButton = document.createElement("button");
  alertButton.textContent = "확인";
  alertButton.classList.add("alertButton");
  alertButton.addEventListener("click", (e) => {
    e.preventDefault();
    alertModal.style.display = "none";
    window.location.href = redirect;
  });

  alertContainer.appendChild(alertP);
  alertContainer.appendChild(alertH2);
  alertContainer.appendChild(alertButton);

  alertModal.appendChild(alertContainer);
};

alertModal.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target == alertModal) {
    alertModal.style.display = "none";
  }
});
