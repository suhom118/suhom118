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
  }); // visual swiper

  /* visual popup의 정지버튼/재생버튼 
        하나의 버튼이 두가지 기능
        정지와 재생 기능을 구분하는 값.... 
        btn_stop 버튼에 play클래스가 없으면 일시정지
        play클래스가 있으면 재생
    */
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

  /* 
        이미지가 스크롤될때 오브젝트가 움직이는 효과
        움직이는 시작을 오브젝트가 화면에 나타나기 시작했을때부터 스크롤된 값을 계산해서 
        움직일 값으로 변환해줘야 함.
        1. 브라우저가 스크롤되는 값 - $(window).scrollTop();
        2. 오브젝트가 화면 하단에서 나타나기 시작하는 값 
           -- offset().top - 상단 맨 위에서부터 오브젝트까지의 거리값
           offset().top과 $(window).scrollTop값이 같아지는 시기는 
           오브젝트가 화면 상단에 딱 붙었때 입니다.
           --> 필요한건 오브젝트가 화면 하단에서 보이기 시작할때...
            두 값의 차이가 브라우저의 높이값....

            오브젝트가 화면 하단에서 나타나기 시작하는 값은 
            오브젝트의 offset().top - 윈도우의 높이값 만큼 스크롤 됐을때

        3. 오브젝트를 어떻게 움직일 방법 
           animate - transform X
           css로 transform: translate(); 움직일 예정
    */

  let winH;
  let moveVal; //오브젝트가 움직일값
  let offTop;
  let scrolling;

  /* objMove  : 실제 움직일 오브젝트
        objParent : 움직일 오브젝트의 기준이 되는 요소 (offset.top()을 계산할 오브젝트)
        moveDir : 스크롤방향 (left-좌우, top-위아래)
        moveRate : 움직일 속도/비율
    */
  objParallax($(".fabric .bg1 img"), $(".fabric .bg1"), "top", 0.1);
  // objParallax($('.sns p'), $('.sns p'), 'left', 0.4);

  function objParallax(objMove, objParent, moveDir, moveRate) {
    //오브젝트를 움직이는 애니메이션 단 한번 셋팅
    objMove.css("transition", "1s");
    moveAni(objMove, objParent, moveDir, moveRate);
    $(window).scroll(function () {
      moveAni(objMove, objParent, moveDir, moveRate);
    });
    $(window).resize(function () {
      moveAni(objMove, objParent, moveDir, moveRate);
    });
  }
  function moveAni(objMove, objParent, moveDir, moveRate) {
    //오브젝트를 실제 움직이는 함수 (반복실행)
    winH = $(window).height();
    offTop = objParent.offset().top;
    scrolling = $(window).scrollTop();
    moveVal = (scrolling - offTop + winH) * moveRate;
    //console.log(moveVal, 'moveVal');
    if (moveDir == "left") {
      objMove.css("transform", "translateX(-" + moveVal + "px)");
    } else {
      //top
      objMove.css("transform", "translateY(-" + moveVal + "px)");
    }
  }

  //.product .list가 상단에 도달했을때: 콘텐츠 보일 시작점
  let fixObj = $(".product .list .tit"); //고정요소
  let fixArea = $(".product .list"); //고정요소를 감쌀요소
  let fixTop = 150;
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
  //인스타팝업
  const swiperInsta = new Swiper(".insta .list", {
    /* 팝업을 감싼는 요소의 class명 */
    slidesPerView: 2 /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */,
    spaceBetween: 10 /* 팝업과 팝업 사이 여백 */,
    breakpoints: {
      838: {
        /* 640px 이상일때 적용 */ slidesPerView: 2,
        spaceBetween: 20,
      },
      1000: {
        /* 768px 이상일때 적용 */ slidesPerView: 3,
        spaceBetween: 30,
      },

      1338: {
        /* 1280px 이상일때 적용 */ slidesPerView: 4,
        spaceBetween: 40,
      },
      1440: {
        /* 1280px 이상일때 적용 */ slidesPerView: 6,
        spaceBetween: 40,
      },
    },
  });
  swiper.autoplay.stop(); /* 일시정지 기능 */
  swiper.autoplay.start(); /* 재생 기능 */
}); //document.ready
