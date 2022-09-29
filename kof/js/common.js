$(document).ready(function(){


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
