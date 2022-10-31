$(document).ready(function () {
  let wiwW = $(window).width();
  let docW = $(document).width();
  console.log(wiwW);
  console.log(docW);
  // $('header').addClass('fixed')
  // $('header').removeClass('fixed')
  // top버튼을 클릭했을때 상단으로 스크롤
  $("aside button").on("click", function () {
    console.log("눌렀어");
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });
  // 로딩했을때 맨 처음
  let scrolling;
  headerFixed();
  /*스크롤되면 header에 클래스 추가 
    1.scroll값이 0보다 크면 header에 fixed추가
    scroll값이 0이면 header에 fixed삭제*/

  // 스크롤할때마다실행
  scrolling = $(window).scrollTop();
  $(window).scroll(function () {
    headerFixed();
  });
  //함수의선언
  function headerFixed() {
    scrolling = $(window).scrollTop();
    if (scrolling > 0) {
      $("header").addClass("fixed");
    } else {
      $("header").removeClass("fixed");
    }
  }

  /*
header nav에 마우스를 올리면
header에 open클래스를 추가
*/
  $("header nav>ul").on("mouseenter focusin", function () {
    $("header").addClass("open");
  });
  $("header").on("mouseleave", function () {
    $("header").removeClass("open");
  });
  $("header nav > ul > li:last-child > ul > li:last-child").on("focusout", function () {
    $("header").removeClass("open");
  });

  //.product h2 상단에 도달했을때: 콘텐츠 보일 시작점
  let fixObj = $(".product h2"); //고정요소
  let fixArea = $(".product"); //고정요소를 감쌀요소
  let fixTop = 140;
  let fixBtm = 80;

  let fixEnd = fixArea.offset().top + fixArea.height() - fixObj.height() - fixBtm; //끝나는 지점
  let fixStart = fixArea.offset().top - fixTop;
  console.log(fixStart, "fixStart");
  console.log(fixEnd, "fixEnd");

  $(window).scroll(function () {
    objFixed();
  });
  function objFixed() {
    console.log(scrolling);
    fixStart = fixArea.offset().top - fixTop;
    fixEnd = fixArea.offset().top + fixArea.height() - fixObj.height() - fixBtm - fixTop;

    if ((scrolling >= fixStart) & (scrolling < fixEnd)) {
      fixObj.addClass("fixed");
      fixObj.removeClass("end");
    } else if (scrolling < fixStart) {
      fixObj.removeClass("fixed");
      fixObj.removeClass("end");
    } else {
      fixObj.addClass("end");
      fixObj.removeClass("fixed");
    }
  }
});
