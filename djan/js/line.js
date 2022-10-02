let horizontalBar = document.getElementById("horizontal-underline");
let horizontalMenus = document.querySelectorAll(".header .gnb>ul>li>a");

function horizontalIndicator(e) {
  horizontalBar.style.left = e.offsetLeft + "px";
  horizontalBar.style.width = e.offsetWidth + "px";
  horizontalBar.style.top = e.offsetTop + e.offsetHeight + "px";
}

horizontalMenus.forEach((menu) =>
  menu.addEventListener("click", (e) => horizontalIndicator(e.currentTarget))
);
