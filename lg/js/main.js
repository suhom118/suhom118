$(document).ready(function () {
  let scrolling = $(window).scrollTop();
  $(window).scroll(function () {
    scrolling = $(window).scrollTop();
    console.log(scrolling);
    if (scrolling > 0) {
      $("header").addClass("fixed");
    } else {
      $("header").removeClass("fixed");
    }
  });
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
});
