/* header, footer에 포함되는 jquery - 모든 페이지에 공통으로 적용되는 기능 */

$(document).ready(function(){
    //로딩됐을때 단한번 실행
    let pcMo; //pc일때 pc, 모바일때는 mobile 
    let winW;
    pcChk(); //함수실행
    topShow();
    $(window).resize(function(){ // 브라우저가 리사이즈 될때마다 실행
        pcChk(); //함수실행
        topShow();
    });//window.resize 종료

    function pcChk(){ //함수 선언
        winW = $(window).width();
        if(winW > 640){
            pcMo = 'pc';
        }else{
            pcMo = 'mobile';
        }
        //console.log(pcMo);
    }

    $('.header .gnb>ul>li').on('mouseenter focusin', function(){
        if(pcMo == 'pc'){
            $('.header').addClass('menu_open');
        }
    });
    $('.header').on('mouseleave', function(){
        $('.header').removeClass('menu_open');
    });
    $('.header .gnb>ul>li:last-child>ul>li:last-child>a').on('focusout', function(){
        $('.header').removeClass('menu_open');
    });

  let scrolling;
    scrollChk();//함수실행

    $(window).scroll(function(){
        scrollChk();//함수실행
    });

    function scrollChk(){ //함수의 선언
        scrolling = $(window).scrollTop();
        console.log(scrolling);
        if(scrolling > 0){
            $('.header').addClass('fixed');
        }else{
            $('.header').removeClass('fixed');
        }
    }

    $('.header .gnb .gnb_open').on('click', function(){
        $('.header').addClass('menu_mobile');
    });
    $('.header .gnb .gnb_close').on('click', function(){
        $('.header').removeClass('menu_mobile');
    });

    $('.header .gnb>ul>li>a').on('click', function(e){
        if(pcMo == 'mobile'){
            e.preventDefault();
            $(this).parents('li').toggleClass('sub_open');
        }
    });

    // top버튼이 스크롤을 제법 내렸을때 나오게 다시상단으로 올라가면 사라지게
    function topShow(){ //함수의 선언
        scrolling = $(window).scrollTop();
        console.log(scrolling);
        if(scrolling > 100){
            $('.aside.top').show();
            }    else{
                
            $('.aside.top').hide();
            }
    }
    // top버튼을 누르면 상단으로 스크롤
    $('aside.top').on('click', function(){
        $('html,body').animate({
            scrollTop:0
        }, 500)
    })
