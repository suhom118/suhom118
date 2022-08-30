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
        // $(window).scrollTop(0)
        $('html,body').animate({
            scrollTop:0
        },500)
    })

    
    /*스크롤되면 header에 클래스 추가 
    1.scroll값이 0보다 크면 header에 fixed추가
    scroll값이 0이면 header에 fixed삭제*/
    // 로딩했을때 맨 처음
    let scrolling=$(window).scrollTop()
    /*스크롤할때마다실행*/  
    $(window).scroll(function(){      
        if(scrolling>0){
          $('header').addClass('fixed')  
        }else{
         $('header').removeClass('fixed')  
        }
    })



    function
})

