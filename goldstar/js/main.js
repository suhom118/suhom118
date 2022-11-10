$(document).ready(function () {
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
