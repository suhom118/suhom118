$(document).ready(function(){

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
    */

    $('.lnb .menu .depth .btn_open').on('click', function(){
        $(this).parents('.depth').addClass('open');
    });
    $('.lnb .menu .depth .btn_close').on('click', function(){
        $(this).parents('.depth').removeClass('open');
    });

});//document.ready 종료