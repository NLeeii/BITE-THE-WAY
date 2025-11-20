// 線上點餐-加入購物車彈窗
let menuItems = document.querySelectorAll(".menu-list-item");
let popUp = document.getElementById("cart-pop-up");
function showPopUp(e) {
  if (e) e.preventDefault();
  popUp.classList.add("show");
}

menuItems.onclick = showPopUp;

menuItems.forEach(function (e) {
  e.addEventListener("click", showPopUp);
})

let closeBtn = document.querySelector(".close-btn");
function closePopUp(e) {
  if (e) e.preventDefault();
  popUp.classList.remove("show");
}
closeBtn.addEventListener("click", closePopUp);

// 成功加入購物車彈窗
let addToCart = document.getElementById("add-to-cart-btn");
let addSuccess = document.querySelector(".add-success");

function showAddSuccess(e) {
  if (e) e.preventDefault();
  popUp.classList.remove("show");
  addSuccess.classList.add("show");
  setTimeout(function () {
    addSuccess.classList.remove("show");
  }, 2000);
}

addToCart.addEventListener("click", showAddSuccess);


