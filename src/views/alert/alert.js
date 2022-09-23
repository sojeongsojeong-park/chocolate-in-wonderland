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
    if (redirect) {
      window.location.href = redirect;
    }
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

export const confirmModal = function (message, callback) {
  alertModal.style.display = "block";
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("alertModalContainer");

  const alertH2 = document.createElement("h2");
  const alertP = document.createElement("p");
  alertH2.textContent = message;
  alertH2.classList.add("alertH2");
  alertP.textContent = "⚠️";
  alertP.classList.add("alertP");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("alertButtonContainer");
  const cancelButtonForConfirm = document.createElement("button");
  cancelButtonForConfirm.textContent = "취소";
  cancelButtonForConfirm.classList.add("cancelButtonForConfirm");
  cancelButtonForConfirm.addEventListener("click", (e) => {
    e.preventDefault();
    alertModal.style.display = "none";
  });

  const confirmButtonForConfirm = document.createElement("button");
  confirmButtonForConfirm.textContent = "확인";
  confirmButtonForConfirm.classList.add("confirmButtonForConfirm");
  confirmButtonForConfirm.addEventListener("click", (e) => {
    e.preventDefault();
    alertModal.style.display = "none";
    callback();
  });

  buttonContainer.appendChild(cancelButtonForConfirm);
  buttonContainer.appendChild(confirmButtonForConfirm);
  alertContainer.appendChild(alertP);
  alertContainer.appendChild(alertH2);
  alertContainer.appendChild(buttonContainer);

  alertModal.appendChild(alertContainer);
};
