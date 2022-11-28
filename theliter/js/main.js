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
      "Blend",
      "News",
      "footer",
    ] /* 툴팁 */,
    showActiveTooltip: false /* 현재 활성화된 페이지의 툴팁 보이기 */,

    // scrollOverflow: false,
    afterLoad: function (origin, destination, direction, trigger) {
      if (destination.index >= 1) {
        /* index가 2면 슬라이드는 세번째 슬라이드입니다. index 수는 0/1/2/3 */
        console.log("3번째 슬라이드가 로딩 되었을때");
        $(".header").addClass("display");
      } else {
        $(".header").removeClass("display");
      }
    },
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

  // 브라우저가 리사이즈될때마다 실행
  $(window).resize(function () {
    deviceChk();
  });

  // $(window).scroll(function () {
  //   topShow(); //top버튼 보이는 함수
  // });
  /* top 버튼을 누르면 상단으로 스크롤 */
  // $("aside.top").on("click", function () {
  //   $("html, body").animate(
  //     {
  //       scrollTop: 0,
  //     },
  //     500
  //   );
  // });

  /* 스크롤을 어느정도 내리면 aside나타나고, 다시 상단으로 올라면 aisde 사라짐 */

  // function topShow() {
  //   //함수의 선언
  //   scrolling = $(window).scrollTop();
  //   console.log(scrolling);
  //   if (pcMo == "pc") {
  //     if (scrolling > 400) {
  //       $("aside.top").fadeIn();
  //     } else {
  //       $("aside.top").fadeOut();
  //     }
  //   }
  // }
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

  for (let i = 1; i < 5; i++) {
    $(".menu .inner .left .txt li:nth-child(" + i + ") button").on(
      "click",
      function (e) {
        e.preventDefault();
        $(".menu .inner .left .txt li:nth-child(" + i + ")").addClass(
          "actived"
        );

        $(".menu .inner .left .txt li:not(:nth-child(" + i + "))").removeClass(
          "actived"
        );
      }
    );
  }
  //버튼누르면 actived 클래스추가
  for (let i = 1; i < 5; i++) {
    $(".menu .inner .left .txt li:nth-child(" + i + ") button").on(
      "click",
      function (e) {
        e.preventDefault();
        $(".menu .inner .left .bg li:nth-child(" + i + ")").addClass("actived");
        $(".menu .inner .left .bg li:not(:nth-child(" + i + "))").removeClass(
          "actived"
        );
      }
    );
  }

  for (let i = 1; i < 5; i++) {
    $(".menu .inner .left .txt li:nth-child(" + i + ") button").on(
      "click",
      function (e) {
        e.preventDefault();
        $(".menu .inner .left .centerbg li:nth-child(" + i + ")").addClass(
          "actived"
        );
        $(
          ".menu .inner .left .centerbg li:not(:nth-child(" + i + "))"
        ).removeClass("actived");
      }
    );
  }
  //버튼누르면 가운데 이미지 교체
  for (let i = 1; i < 5; i++) {
    $(".menu .inner .left .txt li:nth-child(" + i + ") button").on(
      "click",
      function (e) {
        e.preventDefault();
        $(".menu .inner .right .bg li:nth-child(" + i + ")").addClass(
          "actived"
        );
        $(".menu .inner .right .bg li:not(:nth-child(" + i + "))").removeClass(
          "actived"
        );
      }
    );
  }
  //버튼누르면 오른쪽 이미지 교체
  for (let i = 1; i < 5; i++) {
    $(".menu .inner .left .txt li:nth-child(" + i + ") button").on(
      "click",
      function (e) {
        e.preventDefault();
        $(".menu .inner .left .bg li:nth-child(" + i + ")").addClass("actived");
        $(".menu .inner .left .bg li:not(:nth-child(" + i + "))").removeClass(
          "actived"
        );
      }
    );
  }
});
