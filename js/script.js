// 初始化 AOS 動畫
AOS.init();

// 首頁 ======================
// 漢堡slider
if (document.querySelector('.burger-slider')) {

  const swiper = new Swiper('.burger-slider', {
    // 1. 基本設定
    loop: true,           // 無限循環 (滑到最後一張接第一張)
    centeredSlides: true, // 設定為 true，Active 的那張會置中
    speed: 600,           // 滑動速度 (毫秒)
    grabCursor: true,     // 滑鼠移上去變成手掌形狀

    // 2. RWD 斷點設定 (Mobile First)
    breakpoints: {
      // 手機版 (小於 768px)
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // 平板 (大於等於 768px)
      768: {
        slidesPerView: 2, // 顯示 2 張 (實際上因為 centeredSlides，會是中間一張，兩邊各半張)
        spaceBetween: 30,
      },
      // 電腦 (大於等於 1024px)
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 50,
      },
      // 電腦 (大於等於 1200px)
      1200: {
        slidesPerView: 3,
        spaceBetween: 50,
      }
    },

    // 3. 圓點設定
    pagination: {
      el: '.swiper-pagination',
      clickable: true, // 允許點擊圓點切換
    },

    // 4. 左右按鈕箭頭設定
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}


// 線上點餐 ===================

// 線上點餐-加入購物車彈窗
const menuItems = document.querySelectorAll('.menu-list-item');
const cartPopUp = document.getElementById('cart-pop-up');
const cartCloseBtn = document.querySelector('#cart-pop-up .close-btn a');
// const popContent = document.querySelector('.add-to-cart-pop');

if (cartPopUp) {
  function showPopUp(e) {
    if (e) e.preventDefault();
    cartPopUp.classList.add('show');
  }

  function closePopUp(e) {
    if (e) e.preventDefault();
    cartPopUp.classList.remove('show');
  }

  if (menuItems.length > 0) {
    menuItems.forEach(function (item) {
      item.addEventListener('click', showPopUp);
    });
  }

  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', closePopUp);
  }

  cartPopUp.addEventListener('click', function (e) {
    if (e.target === this) { // e.target是"使用者實際點到的元素" // this等同是e.currentTarget，目前監聽的元件
      closePopUp();
    }
  });
}

// 餐點營養資訊fold-wrap
const foldButton = document.querySelector('.fold-header button');
const foldContent = document.querySelector('.fold-content');
const foldIcon = document.querySelector('.fold-header button span');
const foldHeader = document.querySelector('.fold-header');

if (foldButton && foldContent) {
  foldButton.addEventListener('click', function (e) {
    e.preventDefault();
    foldContent.classList.toggle('show');
    if (foldContent.classList.contains('show')) {
      foldIcon.style.transform = 'rotate(180deg)';
      foldHeader.style.borderRadius = '10px 10px 0 0';
      foldHeader.style.border = '1px solid #bbb';
    } else {
      foldIcon.style.transform = 'rotate(0)';
      foldHeader.style.borderRadius = '10px';
      foldHeader.style.border = '1px solid var(--color-black)';
    }
  })
}

// 食材加購金額計算
const addOnCheckbox = document.querySelectorAll('input[name="add-on"]');
const originalPrice = document.getElementById('original-price');
const basePrice = parseInt(originalPrice.innerText);

if (addOnCheckbox) {
  addOnCheckbox.forEach(function (option) {
    option.addEventListener('change', function () {
      calculateTotal();
    })
  })
}

// 餐點數量顯示
const quantityBtnPlus = document.getElementById('quantity-btn-plus');
const quantityBtnMinus = document.getElementById('quantity-btn-minus');
const addToquantity = document.querySelector('input[name="add-to-quantity"]');

if (quantityBtnPlus && quantityBtnMinus) {
  quantityBtnPlus.addEventListener('click', function () {
    let result = parseInt(addToquantity.value) + 1;
    addToquantity.value = result;
    calculateTotal();
  })

  quantityBtnMinus.addEventListener('click', function () {
    let result = parseInt(addToquantity.value) - 1;
    if (parseInt(addToquantity.value) < 2) {
      result = 1;
    }
    addToquantity.value = result;
    calculateTotal();
  })
}

// 總金額計算
function calculateTotal() {
  let currentQuantity = addToquantity.value;
  
  let price = basePrice; // 每觸發一次change事件，金額都要回到原價
  addOnCheckbox.forEach(function (box) { // 使用forEach()取代for，寫法更精簡，且確定每個都會元素都會被檢查一次
    if (box.checked) {
      price += parseInt(box.value);
    }
  })
  let total = price * currentQuantity;
  originalPrice.innerText = total;
}

// 成功加入購物車彈窗
const addToCartBtn = document.getElementById('add-to-cart-btn');
const addSuccessMsg = document.querySelector('.add-success');

if (addToCartBtn && addSuccessMsg && cartPopUp) {

  function showAddSuccess(e) {
    if (e) e.preventDefault();

    cartPopUp.classList.remove('show');

    addSuccessMsg.classList.add('show');

    setTimeout(function () {
      addSuccessMsg.classList.remove('show');
    }, 2000);
  }

  addToCartBtn.addEventListener('click', showAddSuccess);
}

// 門市資訊 ===================

// 門市切換
const storeTabs = document.querySelectorAll('.store-name-list li');
const storeContents = document.querySelectorAll('.store-content');

if (storeTabs.length > 0 && storeContents.length > 0) {

  function changeStore(index) {
    storeTabs.forEach(function (tab) {
      tab.classList.remove('name-active');
    });

    storeContents.forEach(function (content) {
      content.classList.remove('show');
    });

    storeTabs[index].classList.add('name-active');
    storeContents[index].classList.add('show');
  }

  storeTabs.forEach(function (tab, index) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      changeStore(index);
    });
  });
}

