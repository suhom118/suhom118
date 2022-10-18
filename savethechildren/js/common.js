/* header, footer에 포함되는 jquery - 모든 페이지에 공통으로 적용되는 기능 */

$(document).ready(function () {
  //로딩됐을때 단한번 실행
  let pcMo; //pc일때 pc, 모바일때는 mobile
  let winW;
  pcChk(); //함수실행

  $(window).resize(function () {
    // 브라우저가 리사이즈 될때마다 실행
    pcChk(); //함수실행
    topShow();
  }); //window.resize 종료

  function pcChk() {
    //함수 선언
    winW = $(window).width();
    if (winW > 640) {
      pcMo = 'pc';
    } else {
      pcMo = 'mobile';
    }
    //console.log(pcMo);
  }

  $('.header .gnb>ul>li').on('mouseenter focusin', function () {
    if (pcMo == 'pc') {
      $('.header').addClass('menu_open');
    }
  });
  $('.header').on('mouseleave', function () {
    $('.header').removeClass('menu_open');
  });
  $('.header .gnb>ul>li:last-child>ul>li:last-child>a').on(
    'focusout',
    function () {
      $('.header').removeClass('menu_open');
    }
  );

  let scrolling;
  scrollChk(); //함수실행

  $(window).scroll(function () {
    scrollChk(); //함수실행
    topShow(); //top버튼 보이는 함수
  });

  function scrollChk() {
    //함수의 선언
    scrolling = $(window).scrollTop();
    console.log(scrolling);
    if (scrolling > 0) {
      $('.header').addClass('fixed');
    } else {
      $('.header').removeClass('fixed');
    }
  }

  $('.header .gnb .gnb_open').on('click', function () {
    $('.header').addClass('menu_mobile');
  });
  $('.header .gnb .gnb_close').on('click', function () {
    $('.header').removeClass('menu_mobile');
  });

  $('.header .gnb>ul>li>a').on('click', function (e) {
    if (pcMo == 'mobile') {
      e.preventDefault();
      $(this).parents('li').toggleClass('sub_open');
    }
  });

  /* top 버튼을 누르면 상단으로 스크롤 */
  $('aside.top').on('click', function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      500
    );
  });

  /* 스크롤을 어느정도 내리면 aside나타나고, 다시 상단으로 올라면 aisde 사라짐 */
  topShow();
  function topShow() {
    //함수의 선언
    scrolling = $(window).scrollTop();
    console.log(scrolling);
    if (pcMo == 'pc') {
      if (scrolling > 400) {
        $('aside.top').fadeIn();
      } else {
        $('aside.top').fadeOut();
      }
    }
  }
}); //document.ready 종료
