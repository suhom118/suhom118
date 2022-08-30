

    /*언제:스크롤을 내렸을때
     누구를:header $('header')
     어떻게:fixed클래스 추가 addClass()fixed클래스 제거 removeClass()    

     다시 위로 올라갔을때 fixed클래스를 삭제해야함
     $(window).scrollTop();-얼만큼 스크롤 되었는지 계산해주는값
     스크롤 값을 계산해서 
     스크롤을 200보다 많이하면 fixed를 추가하고
     200이하면 삭제
*/

let scrolling=$(window).scrollTop();
$(window).scroll(function(){
    scrolling=$(window).scrollTop();
 
    if(scrolling>0){
        $('header').addClass('fixed');
    }else{
        $('header').removeClass('fixed')
    }
})