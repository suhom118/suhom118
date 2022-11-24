$(document).ready(function () {
  const myFullpage = new fullpage("#fullpage", {
    /* html에서 페이지 전체를 감싸는 요소 */

    navigation: true /* 오른쪽에 각 페이지의 paging */,
    navigationPosition: "right" /* 위치 */,
    navigationTooltips: [
      "Main",
      "TheLiter",
      "Menu",
      "Interview",
      "Franchise",
      "News",
    ] /* 툴팁 */,
    showActiveTooltip: false /* 현재 활성화된 페이지의 툴팁 보이기 */,

    // scrollOverflow: false,

    afterLoad: function (origin, destination, direction, trigger) {
      //console.log(destination.index);
      if (
        destination.index == 2 ||
        destination.index == 3 ||
        destination.index == 4 ||
        destination.index == 5
      ) {
        $(".header").addClass("black");
        $("#fp-nav").addClass("black");
      } else {
        $(".header").removeClass("black");
        $("#fp-nav").removeClass("black");
      }
    },
    responsiveWidth: 1000 /* fullpage를 적용시키지 않을 모바일 사이즈 */,
  }); //fullpage
  const swiper = new Swiper(".visual .popup", {
    /* 팝업을 감싼는 요소의 class명 */

    effect: "fade" /* fade 효과 */,

    autoplay: {
      /* 팝업 자동 실행 */ delay: 4000,
      disableOnInteraction: true,
    },

    loop: true /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */,

    pagination: {
      /* 몇개의 팝업이 있는지 보여주는 동그라미 */ el: ".btn_paging" /* 해당 요소의 class명 */,
      clickable: true /* 클릭하면 해당 팝업으로 이동할 것인지 값 */,
    },
  }); // visual swiper

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

  let wiwW;
  let pcMo;
  let scrolling;
  deviceChk();
  topShow();

  // 브라우저가 리사이즈될때마다 실행
  $(window).resize(function () {
    deviceChk();
  });

  $(window).scroll(function () {
    topShow(); //top버튼 보이는 함수
  });
  /* top 버튼을 누르면 상단으로 스크롤 */
  $("aside.top").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });

  /* 스크롤을 어느정도 내리면 aside나타나고, 다시 상단으로 올라면 aisde 사라짐 */

  function topShow() {
    //함수의 선언
    scrolling = $(window).scrollTop();
    console.log(scrolling);
    if (pcMo == "pc") {
      if (scrolling > 400) {
        $("aside.top").fadeIn();
      } else {
        $("aside.top").fadeOut();
      }
    }
  }
  function deviceChk() {
    winW = $(window).width();

    if (winW > 640) {
      //브라이저 넓이가 640px 보다 크면
      pcMo = "pc";
      console.log(pcMo);
    } else {
      //브라우저의 넓이가 640px 이하면
      pcMo = "mobile";
      console.log(pcMo);
    } //if
  } // function deviceChk

  /*
      메뉴에 마우스를 오버하면 header에 menu_open클래스 추가
      pc에서만 (window width640초과면 pc)
      메뉴: .header .gnb>ul>li
      */

  $(".header .gnb>ul>li").on("mouseenter focusin", function () {
    // (비교연산자는equal두개)
    if (pcMo == "pc") {
      $(".header .gnb").addClass("menu_open");
    }
    // if문
  });

  // mouseenter
  /* 이벤트 핸들러는 pc와 모바일 상관없이준다
      단 실행을 pc일때만 실행하게된다
      pc일때만 on을 주려고하면 안된다*/

  $(".header").on("mouseleave", function () {
    $(".header .gnb").removeClass("menu_open");
  });
  $(".header .gnb>ul>li:last-child>ul>li:last-child>a").on(
    "focusout",
    function () {
      $(".header .gnb").removeClass("menu_open");
    }
  );

  /*
      .header .gnb .gnb_open을 클릭하면 header에 menu_mobile클래스추가
      .header .gnb .gnb_close를 클릭하면 header에 menu_mobile클래스삭제
      단모바일일때만 작동 (gnb_open이 pc에서 숨겨져있는 버튼)
      header에 menu_mobile이라는 스타일이 적용된 상태에서 pc로 전환
      됐을때도 고려해야함
  */
  $(".header .gnb .gnb_open").on("click", function () {
    $("header .gnb").toggleClass("menu_mobile");
  });

  /*1차 메뉴를 클릭했을때(.header .gnb>ul>li)
      클릭한 li에만 sub_open 클래스 추가(메뉴열기)
      만약에 현재 열려있는 상태면 닫기(sub_open 삭제)
      만약에 현재 닫혀있는 상태면 열기(sub_open 추가)
      서브메뉴는 직접닫기 전에는 모두 열린상태를 유지(여러메뉴가 동시에 열릴수 있음)
      pc에서는 1차메뉴를 클릭하면 첫번째 하위메뉴로 이동
      모바일에서는 1차메뉴를 클릭하면 하위메뉴를 열어야함
  
       */
  $(".header .gnb>ul>li").on("click", function (e) {
    if (pcMo == "mobile") {
      /*해당요소를 클릭했을때 기본적으로 발생하는 이벤트를취소
           a태그의 href를 작동시키지않음
          */
      e.preventDefault();
      /*4개의 1차메뉴li중에서 클릭한 li를 this라고함*/
      $(this).children("ul").toggleClass("sub_open");
    }
  });

  // $(".biz .cnt_wrap .list > ul > li:nth-child(1)").on("click", function (e) {
  //   e.preventDefault();
  //   $(".biz .cnt_wrap .focus > ul > li:nth-child(1)").addClass("show");
  //   $(".biz .cnt_wrap .focus > ul > li:not(:nth-child(1))").removeClass("show");
  // });
  // $(".biz .cnt_wrap .list > ul > li:nth-child(2)").on("click", function (e) {
  //   e.preventDefault();
  //   $(".biz .cnt_wrap .focus > ul > li:nth-child(2)").addClass("show");
  //   $(".biz .cnt_wrap .focus > ul > li:not(:nth-child(2))").removeClass("show");
  // });
  // $(".biz .cnt_wrap .list > ul > li:nth-child(3)").on("click", function (e) {
  //   e.preventDefault();
  //   $(".biz .cnt_wrap .focus > ul > li:nth-child(3)").addClass("show");
  //   $(".biz .cnt_wrap .focus > ul > li:not(:nth-child(3))").removeClass("show");
  // });
  // $(".biz .cnt_wrap .list > ul > li:nth-child(4)").on("click", function (e) {
  //   over;
  //   e.preventDefault();
  //   $(".biz .cnt_wrap .focus > ul > li:nth-child(4)").addClass("show");
  //   $(".biz .cnt_wrap .focus > ul > li:not(:nth-child(4))").removeClass("show");
  // });
  // $(".biz .cnt_wrap .list > ul > li:nth-child(5)").on("click", function (e) {
  //   e.preventDefault();
  //   $(".biz .cnt_wrap .focus > ul > li:nth-child(5)").addClass("show");
  //   $(".biz .cnt_wrap .focus > ul > li:not(:nth-child(5))").removeClass("show");
  // });
  // $(".biz .cnt_wrap .list > ul > li:nth-child(6)").on("click", function (e) {
  //   e.preventDefault();
  //   $(".biz .cnt_wrap .focus > ul > li:nth-child(6)").addClass("show");
  //   $(".biz .cnt_wrap .focus > ul > li:not(:nth-child(6))").removeClass("show");
  // });
  for (let i = 1; i < 7; i++) {
    $(".biz .cnt_wrap .list > ul > li:nth-child(" + i + ")").on(
      "click",
      function (e) {
        e.preventDefault();
        $(".biz .cnt_wrap .focus > ul > li:nth-child(" + i + ")").addClass(
          "show"
        );

        $(
          ".biz .cnt_wrap .focus > ul > li:not(:nth-child(" + i + "))"
        ).removeClass("show");
      }
    );
  }
  for (let i = 1; i < 7; i++) {
    $(".biz .cnt_wrap .list > ul > li:nth-child(" + i + ")").on(
      "click",
      function (e) {
        e.preventDefault();
        $(".biz .cnt_wrap .list > ul > li:nth-child(" + i + ")").addClass(
          "active"
        );
        $(
          ".biz .cnt_wrap .list > ul > li:not(:nth-child(" + i + "))"
        ).removeClass("active");
      }
    );
  }
});
