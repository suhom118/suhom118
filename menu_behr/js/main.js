$(document).ready(function(){
// html요소가 모두다 로딩된이후에 jquery실행



    // 로딩됐을때 한번만실행
    let wiwW
    let pcMobile
    // deviceChk라는 이름을 갖은 함수호출
    deviceChk()
    
    // 브라우저가 리사이즈될때마다 실행
    $(window).resize(function(){
        deviceChk()
    })

    function deviceChk(){
        wiwW=$(window).width()
        if(wiwW>640){
            pcMobile='pc'
            console.log(pcMobile)
        }else{
            pcMobile='mobile'
            console.log(pcMobile)
        }
    }
    // function deviceChk

    /*
    메뉴에 마우스를 오버하면 header에 menu_open클래스 추가
    pc에서만 (window width640초과면 pc)
    메뉴: .header .gnb>ul>li
    */

    
   $('.header .gnb>ul>li').on('mouseenter focusin',function(){
    // (비교연산자는equal두개)
        if(pcMobile=='pc'){
        $('.header').addClass('menu_open')
        }
        // if문
    })
    
    // mouseenter
    /* 이벤트 핸들러는 pc와 모바일 상관없이준다
    단 실행을 pc일때만 실행하게된다
    pc일때만 on을 주려고하면 안된다*/
    
    $('.header').on('mouseleave',function(){
        $('.header').removeClass('menu_open')
    })
    $('.header .gnb>ul>li:last-child>ul>li:last-child>a').on('focusout',function(){
        $('.header').removeClass('menu_open')
    })

/*
    .header .gnb .gnb_open을 클릭하면 header에 menu_mobile클래스추가
    .header .gnb .gnb_close를 클릭하면 header에 menu_mobile클래스삭제
    단모바일일때만 작동 (gnb_open이 pc에서 숨겨져있는 버튼)
    header에 menu_mobile이라는 스타일이 적용된 상태에서 pc로 전환
    됐을때도 고려해야함
*/
    $('.header .gnb .gnb_open').on('click',function(){
        $('header').addClass('menu_mobile')
    })
    $('.header .gnb .gnb_close').on('click',function(){
        $('header').removeClass('menu_mobile')
    })

    /*1차 메뉴를 클릭했을때(.header .gnb>ul>li)
    클릭한 li에만 sub_open 클래스 추가(메뉴열기)
    만약에 현재 열려있는 상태면 닫기(sub_open 삭제)
    만약에 현재 닫혀있는 상태면 열기(sub_open 추가)
    서브메뉴는 직접닫기 전에는 모두 열린상태를 유지(여러메뉴가 동시에 열릴수 있음)
    pc에서는 1차메뉴를 클릭하면 첫번째 하위메뉴로 이동
    모바일에서는 1차메뉴를 클릭하면 하위메뉴를 열어야함

     */
    $('.header .gnb>ul>li').on('click',function(e){
        if(pcMobile=='mobile'){
        /*해당요소를 클릭했을때 기본적으로 발생하는 이벤트를취소
         a태그의 href를 작동시키지않음
        */
        e.preventDefault()
        /*4개의 1차메뉴li중에서 클릭한 li를 this라고함*/
        $(this).toggleClass('sub_open')
        }

    })
})
// document.ready 