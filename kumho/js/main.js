$(document).ready(function(){ 

    
    $('.biz .list ul li').on('mouseenter', function(){
        $('.biz .list ul').addClass('over')
        $(this).addClass('active')
    })
    $('.biz .list ul li').on('mouseleave', function(){
        $('.biz .list ul').removeClass('over')
        $(this).removeClass('active')
    })

})
//document.ready 종료