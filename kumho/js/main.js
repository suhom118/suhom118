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
})
// document.ready종료