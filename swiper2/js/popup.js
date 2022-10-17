$(document).ready(function () {
  const swiper = new Swiper('.popup', {
    /* 팝업을 감싼는 요소의 class명 */
    effect: 'fade' /* fade 효과 */,
    autoplay: {
      /* 팝업 자동 실행 */ delay: 3000,
      disableOnInteraction: true,
    },

    loop: true /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */,

    pagination: {
      /* 몇개의 팝업이 있는지 보여주는 동그라미 */
      el: '.btn_paging' /* 해당 요소의 class명 */,
      clickable: true /* 클릭하면 해당 팝업으로 이동할 것인지 값 */,
    },

    navigation: {
      /* 이전, 다음 버튼 */
      nextEl: '.btn_next' /* 다음 버튼의 클래스명 */,
      prevEl: '.btn_prev',
    },
  }); //swiper 세팅

  $('.popup .ctrl_wrap .btn_stop').on('click', function () {
    if ($(this).hasClass('play') == true) {
      swiper.autoplay.start(); /* 재생 기능*/
      $(this).removeClass('play');
      $(this).text('일시정지');
    } else {
      swiper.autoplay.stop(); /* 일시정지 기능 */
      $(this).addClass('play');
      $(this).text('재생');
    }
  });
  const swiper_banner = new Swiper('.banner1', {
    /* 팝업을 감싸는 요소의 class명 */
    slidesPerView: 1 /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */,
    spaceBetween: 16 /* 팝업과 팝업 사이 여백 */,
    breakpoints: {
      500: {
        /* 640px 이상일때 적용 */ slidesPerView: 2,
        spaceBetween: 16,
      },
      800: {
        /* 768px 이상일때 적용 */ slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        /* 1024px 이상일때 적용 */ slidesPerView: 4,
        spaceBetween: 40,
      },
      1280: {
        /* 1280px 이상일때 적용 */ slidesPerView: 5,
        spaceBetween: 40,
      },
    },
  });
  swiper.autoplay.stop(); /* 일시정지 기능 */
  swiper.autoplay.start(); /* 재생 기능 */

  const swiper_banner2 = new Swiper('.banner2', {
    /* 팝업을 감싼는 요소의 class명 */
    slidesPerView: 'auto' /* li의 넓이 비율로 안함 - css에서 준 넓이대로 함 */,
    spaceBetween: 16 /* li와 li사이 - 제일 작은 여백 */,

    breakpoints: {
      640: {
        /* 640px 이상이 되면 적용 */ spaceBetween: 30,
      },
      1024: {
        /* 1024px 이상이 되면 적용 */ spaceBetween: 40,
      },
    },
  });
  swiper.autoplay.stop(); /* 일시정지 기능 */
  swiper.autoplay.start(); /* 재생 기능 */
});
