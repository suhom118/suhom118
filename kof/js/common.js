$(document).ready(function(){

    let winW = $(window).width();
    let pcMobile; //현재 pc모드인지 mobile모드인지 저장하는 변수

    if(winW > 640){
        pcMobile = 'pc';
        console.log(pcMobile);
    }else{
        pcMobile = 'mobile';
        console.log(pcMobile);
    }

    $(window).resize(function(){
        winW = $(window).width();
        if(winW > 640){
            pcMobile = 'pc';
            console.log(pcMobile);
        }else{
            pcMobile = 'mobile';
            console.log(pcMobile);
        }
    });

    /*
        .header .lang .open 클릭했을 때
        1. ul이 나타나야함
        2. open 숨김, close 나타야함
        --> .header .lang 에 lang_open 클래스를 추가

        .header .lang .close 클릭하면
        --> .header .lang 에 lang_open 클래스를 삭제
    */
    $('.header .lang .open').on('click', function(){
        $('.header .lang').addClass('lang_open');
    });
    $('.header .lang .close').on('click', function(){
        $('.header .lang').removeClass('lang_open');
    });

    /* 
        메뉴 (.header .gnb > ul > li > a)에 마우스를 오버했을때 
        header에  menu_open 클래스 추가

        메뉴 (.header)에 마우스를 아웃했을때 (벗어났을때)
        header에 menu_open 클래스 삭제
    */
    $('.header .gnb > ul > li > a').on('mouseenter focusin', function(){
        if(pcMobile == 'pc'){
            $('.header').addClass('menu_open');
        }
    });
    $('.header').on('mouseleave', function(){
        $('.header').removeClass('menu_open');
    });
    $('.header .gnb > ul > li:last-child > ul > li:last-child > a').on('focusout', function(){
        $('.header').removeClass('menu_open');
    });

    /*
        .header .gnb .open 을 클릭하면
        header에 menu_mobile 클래스 추가

        .header .gnb .close 를 클릭하면
        header에 menu_mobile 클래스 삭제
    */

    $('.header .gnb .open').on('click', function(){
        if(pcMobile == 'mobile'){
            $('.header').addClass('menu_mobile');
        }
    });
    $('.header .gnb .close').on('click', function(){
        $('.header').removeClass('menu_mobile');
    });

    /*
        1차메뉴를 클릭해서
            --> li를 클릭할때 실행을 하면 하위메뉴를 클릭할때도 이벤트가 발생
                1차 메뉴를 클릭하는 것과 하위메뉴를 클릭하는 건 구분
                이 이벤트는 1차메뉴를 클릭할때만 작동해야함.
                1차메뉴를 클릭하는 이벤트를 1차 메뉴의 a에 줘야함. 
                --> class는 a를 감싸는 li에 줘야함 
            닫혀있으면 li에 sub_open 클래스를 추가
            열려있으면 li에 sub_open 클래스를 삭제
        --> toggle 

        <li>                           --- $(this).parents('li')
            <a href="#n">1차메뉴</a>   ---- 이벤트 대상 $(this)
            <ul>
                <li><a href="#n">2차메뉴</a></li>
            </ul>
        </li>
    */
    $('.header .gnb > ul > li > a').on('click', function(e){
        if(pcMobile == 'mobile'){
            e.preventDefault(); 
            /* 1차메뉴를 클릭했을때 a href로 페이지가 이동하는 현상을 막기 */
            $(this).parents('li').toggleClass('sub_open');
        }
    });

    /* .footer .family .btn_open를 클릭하면 
        .footer .family에 open 클래스가 추가
        .footer .family .btn_close를 클릭하면 
        .footer .family에서 open 클래스를 삭제
    */
    $('.footer .family .btn_open').on('click', function(){
        $('.footer .family').addClass('open');
    });

    $('.footer .family .btn_close').on('click', function(){
        $('.footer .family').removeClass('open');
    });

});//document.write