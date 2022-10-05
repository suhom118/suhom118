$(document).ready(function () {
  /*
        .lnb .menu .depth .btn_open를 클릭하면 
        .lnb .menu .depth에 open 클래스 추가
        .lnb .menu .depth .btn_close를 클릭하면
        .lnb .menu .depth에서 open 클래스 삭제

        <div class="depth">    ----- $(this).parents('.depth')
            <button class="btn_open"></button>   ----> 클릭한 요소 $(this)
        </div>
        <div class="depth">
            <button class="btn_open"></button>
        </div>
        --> depth 두개 
        .lnb .menu .depth 이라고 선택자를 주면 두개 모두에 적용됨.
        클릭한 요소를 선택하는 $(this)를 활용해서 depth를 선택

        .btn태그의 title을 1차메뉴 열기/닫기라고 문구수정

        .lnb .menu .depth에 open클래스가 있으면 열린상태,없으면 닫힌상태

    */
  let lnbSt;

  $('.lnb .menu .depth .btn').on('click', function () {
    lnbSt = $(this).parents('.depth').hasClass('open');
    if (lnbSt == true) {
      //열린상태 닫는기능
      $(this).parents('.depth').removeClass('open');
      $(this).attr('title', '메뉴열기');
      $(this).next('ul').slideUp(100);
    } else {
      //닫힌상태 열리는기능
      $(this).parents('.depth').addClass('open');
      $(this).attr('title', '메뉴닫기');
      $(this).next('ul').slideDown(100);
    }
  }); //lnb클릭이벤트종료
}); //document.ready 종료
