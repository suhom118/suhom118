$(document).ready(function(){
    /*.lnb .menu .depth .btn_open을 클릭하면
      .lnb .menu .depth에 open 클래스추가 
      .lnb .menu .depth .btn_close을 클릭하면
      .lnb .menu .depth에 open 클래스 삭제 
    */ 
   $('.lnb .menu .depth .btn_open').on('click', function(){
        $(this).parents('.depth').addClass('open')
   })
   $('.lnb .menu .depth .btn_close').on('click', function(){
    $(this).parents('.depth').removeClass('open')
})



})
// document.ready 종료