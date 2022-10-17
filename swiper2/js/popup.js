$(document).ready(function(){
    const swiper = new Swiper('.visual1', {

        loop: true, //마지막 팝업 -> 1번 팝업으로 자연스럽게 넘기기 (지우면 마지막 팝업에서 next 안눌림)
        effect: "fade", //fade 효과로 팝업 넘김 (좌우 슬라이드 - slide)

        autoplay: { //자동실행
            delay: 3000, //하나의 팝업이 머무는 시간
            disableOnInteraction: false,
        },
        
        // 팝업의 숫자대로 동그라미를 그려주거나 2/5 팝업 수를 표시하는 요소
        pagination: {
            el: '.ctrl_paging',
            clickable: true, //동그라미일때 동그라미를 클릭하게 해주는 것 
            type: "fraction", //숫자로 팝업 수 표시
        },
        
        navigation: {
            nextEl: '.ctrl_next', //다음버튼
            prevEl: '.ctrl_prev',
        },
    });

    $('.visual1 .ctrl_stop').on('click', function(){
        swiper.autoplay.stop();  /* 일시정지 기능 */
    });
    $('.visual1 .ctrl_play').on('click', function(){
        swiper.autoplay.start();  /* 재생 기능 */
    });
});