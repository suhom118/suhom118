// 모든html요소가 로딩된 이후에 jquery를 실행
$(document).ready(function(){
    /*visual영역의 높이를 브라우저의 높이와 동일하게 설정
    브라우저가 리사이즈 될때마다 높이를 다시설정
    visual문구는 높이의 위아래 가운데 쯤에 배치
    */

   let winH=$(window).height()

    $('.visual .cnt_h').height(winH)

   console.log('window의높이'+winH)

   $(window).resize(function(){
    winH=$(window).height()

    $('.visual .cnt_h').height(winH)
   })

   /*.header .lang .open 클릭했을때
   1.ul이 보여야되고
   2.open이 안보이고 close가 보여야됨 
   .header .lang에 lang_open 클래스를추가
   3..header .lang .close를 클릭하면
    .header .lang에 lang_open 클래스를 삭제*/
   $('header .lang .open').on('click',function(){
    $('header .lang').addClass('lang_open')
   })

   $('header .lang .close').on('click',function(){
    $('header .lang').removeClass('lang_open')
   })

})
// document.ready종료