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
  }); //visual stop

  //이미지가 스크롤될때 오브젝트가 움직이는 효과
  //움직이는 시작을 오브젝트가 화면에 나타나기 시작했을때부터 스크롤된값을 계산해서
  //움직일 값으로 변환해줘야함
  //1.브라우저가 스크롤되는값-  $(window).scrollTop()
  //2.오브젝트가 화면 하단에서 나타나기 시작하는 값--offset().top - window().height두값의 차이가 브라우저의 높이값
  //3.오브젝트를 어떻게 움직일 방법-css로 transform:translate()

  let offTop;
  let scrolling;
  let winH;
  let objMove = $(".fabric .bg1 img"); //실제 움직일 오브젝트

  let objParent = $(".fabric .bg1"); //움직일 오브젝트의 기준이 되는요소
  let moveVal; //오브젝트가 움직일값
  let moveDir = "left"; //스크롤 방향(left or top)
  let moveRate = 0.1; //움직일 속도
  objMove.css("transition", "0.5s");

  objScroll();
  $(window).scroll(function () {
    objScroll();
  });
  function objScroll() {
    scrolling = $(window).scrollTop();
    // console.log(offTop, "offTop");
    // console.log(scrolling, "scrolling");
    // console.log(winH, "winH");
    winH = $(window).height();
    offTop = objParent.offset().top;
    moveVal = (scrolling - offTop + winH) * moveRate;
    console.log(moveVal, "moveVal");
    objMove.css("transform", "translate(0,-" + moveVal + "px)");

    moveVal = scrolling - offTop + winH;
    objMove = $(".fabric .bg2");
    objMove.css("transform", "translate(0,-" + moveVal + "px)");
  }
});
