// 線上點餐 ===================

// 線上點餐-加入購物車彈窗
const menuItems = document.querySelectorAll(".menu-list-item");
const cartPopUp = document.getElementById("cart-pop-up");
const cartCloseBtn = document.querySelector("#cart-pop-up .close-btn a");

if (cartPopUp) {
  function showPopUp(e) {
    if (e) e.preventDefault();
    cartPopUp.classList.add("show");
  }

  function closePopUp(e) {
    if (e) e.preventDefault();
    cartPopUp.classList.remove("show");
  }

  if (menuItems.length > 0) {
    menuItems.forEach(function (item) {
      item.addEventListener("click", showPopUp);
    });
  }

  if (cartCloseBtn) {
    cartCloseBtn.addEventListener("click", closePopUp);
  }
}

// 成功加入購物車彈窗
const addToCartBtn = document.getElementById("add-to-cart-btn");
const addSuccessMsg = document.querySelector(".add-success");

if (addToCartBtn && addSuccessMsg && cartPopUp) {
  
  function showAddSuccess(e) {
    if (e) e.preventDefault();
    
    cartPopUp.classList.remove("show");
    
    addSuccessMsg.classList.add("show");
    
    setTimeout(function () {
      addSuccessMsg.classList.remove("show");
    }, 2000);
  }

  addToCartBtn.addEventListener("click", showAddSuccess);
}

// 門市資訊 ===================

// 門市切換
const storeTabs = document.querySelectorAll(".store-name-list li");
const storeContents = document.querySelectorAll(".store-content");

if (storeTabs.length > 0 && storeContents.length > 0) {

  function changeStore(index) {
    storeTabs.forEach(function (tab) {
      tab.classList.remove("name-active");
    });

    storeContents.forEach(function (content) {
      content.classList.remove("show");
    });

    storeTabs[index].classList.add("name-active");
    storeContents[index].classList.add("show");
  }

  storeTabs.forEach(function (tab, index) {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      changeStore(index);
    });
  });
}

