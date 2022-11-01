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
  // let gnbStu;
  // $(".header .gnb .gnb_open").on("click", function () {
  //   gnbStu = $(".header .gnb").hasClass("mobile_open");
  //   console.log(gnbStu);
  //   if (gnbStu == true) {
  //     $(".header .gnb").removeClass("mobile_open");
  //     console.log("1");
  //   } else {
  //     $(".header .gnb").addClass("mobile_open");
  //     console.log("2");
  //   }
  // });
  $(".header .gnb .gnb_open").on("click", function () {
    $(".header .gnb").toggleClass("mobile_open");
  });
});
