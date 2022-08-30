$(document).ready(function(){
    let wiwW=$(window).width()
    let docW=$(document).width()
    console.log(wiwW)
    console.log(docW)
    // $('header').addClass('fixed')
    // $('header').removeClass('fixed')
    // top버튼을 클릭했을때 상단으로 스크롤
    $('aside button').on('click',function(){
        console.log('눌렀어')
        $('html,body').animate({
            scrollTop:0
        },500)
    })
    let scrolling
    headerFixed()
    /*스크롤되면 header에 클래스 추가 
    1.scroll값이 0보다 크면 header에 fixed추가
    scroll값이 0이면 header에 fixed삭제
    로딩했을때 맨 처음
    /*스크롤할때마다실행*/  
    
    scrolling=$(window).scrollTop();
    $(window).scroll(function(){
        headerFixed()
    })
//함수의선언
    function headerFixed(){
        scrolling=$(window).scrollTop()
        if(scrolling>0){
            $('header').addClass('fixed')  
          }
          else{
           $('header').removeClass('fixed')  
          }
    }

/*
header nav에 마우스를 올리면
header에 open클래스를 추가
*/
    $('header nav>ul').on('mouseenter focusin',function(){
        $('header').addClass('open')
    })
    $('header').on('mouseleave',function(){
        $('header').removeClass('open')
    })
    $('header nav>ul>li:lastchild>ul>li').on('mouseleave focusout',function(){
        $('header').removeClass('open')
    })
})
