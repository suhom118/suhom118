$(document).ready(function () {
  //브라우저를 스크롤 하면 header에 fixed 클래스 추가
  //$(window).scrollTop()
  //$(window).scroll()
  let scrolling;
  scrollChk();

  $(window).scroll(function () {
    scrollChk();
  });

  function scrollChk() {
    scrolling = $(window).scrollTop();
    // console.log(scrolling);
    if (scrolling > 0) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  }
});
