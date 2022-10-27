$(document).ready(function () {
  const swiper = new Swiper(".visual .popup", {
    /* 팝업을 감싼는 요소의 class명 */

    effect: "fade" /* fade 효과 */,

    autoplay: {
      /* 팝업 자동 실행 */ delay: 3000,
      disableOnInteraction: true,
    },

    loop: true /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */,

    pagination: {
      /* 몇개의 팝업이 있는지 보여주는 동그라미 */ el: ".btn_paging" /* 해당 요소의 class명 */,
      clickable: true /* 클릭하면 해당 팝업으로 이동할 것인지 값 */,
    },
  }); //visual swiper
  //visual popup 정지/재생

  $(".visual .popup .btn_wrap .btn_stop span.play").on("click", function () {
    let popStatus = $(".visual .popup .btn_wrap .btn_stop").hasClass("stop");
    if (popStatus == true) {
      swiper.autoplay.start(); /* 재생 기능 */
      $(".visual .popup .btn_wrap .btn_stop").removeClass("stop");
    }
  });
  $(".visual .popup .btn_wrap .btn_stop span.pause").on("click", function () {
    let popStatus = $(".visual .popup .btn_wrap .btn_stop").hasClass("stop");
    if (popStatus == false) {
      swiper.autoplay.stop();
      $(".visual .popup .btn_wrap .btn_stop").addClass("stop");
    }
  });
  let scrolling;
  let moveTop;
  let objName = $(".fabric .inner");
  fabScroll();
  fabScroll2();
  $(window).scroll(function () {
    //스크롤할때마다 실행
    fabScroll();
    fabScroll2();
  });
  function fabScroll() {
    //스크롤 값을 계산해서 fabric의 이미지를 움직일 함수
    //스크롤값을 요소의 위치값으로 변경해서 스타일을 적용
    //요소가 화면의 하단에 등장했을때부터 스크롤 한값을 새로계산
    scrolling = $(window).scrollTop();
    objName.position().top;
    console.log(objName.position().top);
    moveTop = scrolling * 0.2;
    objName.css("transform", "translate(0,-" + moveTop + "px)");
  }
  function fabScroll2() {
    //스크롤 값을 계산해서 fabric의 이미지를 움직일 함수
    scrolling = $(window).scrollTop();

    moveTop = scrolling * 0.1;
    $(".fabric .bg2 img").css("transform", "translate(0,-" + moveTop + "px)");
  }
});
