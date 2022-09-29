// header footer에 포함되는jquery
$(document).ready(function(){
    let pcMo//pc일때 pc 모바일일때는 모바일
    let winW
    pcChk()
    
    if(winW>640){
        pcMo='pc'
    }else{
        pcMo='Mobile'
    }

    // console.log(pcMo)

    $(window).resize(function(){
        pcChk()
        
    })//window.resize종료

    function pcChk(){
        winW=$(window).width()
        if(winW>640){
            pcMo='pc'
        }else{
            pcMo='Mobile'
        }
        // console.log(pcMo)
    }
    $('.header .gnb>ul>li').on('mouseenter focusin', function(){
        if(pcMo=='pc'){
            $('.header').addClass('menu_open')
        }
    })
    $('.header').on('mouseleave', function(){
        $('.header').removeClass('menu_open')
    })
    $('.header .gnb>ul>li:last-child>ul>li:last-child>a').on('focusout', function(){
        $('.header').removeClass('menu_open')
    })



    $(document).ready(function(){
        let scrolling = $(window).scrollTop();
        $(window).scroll(function(){
            scrolling = $(window).scrollTop();
            console.log(scrolling);
            if(scrolling > 0){
               $('header').addClass('fixed'); 
            }else{
                $('header').removeClass('fixed');
            }
        });
    });
    $('.header .gnb .gnb_open').on ('click', function(){
        $('.header').addClass('menu_mobile')
    })
    $('.header .gnb .gnb_close').on ('click', function(){
        $('.header').removeClass('menu_mobile')
    })



    $('.header .gnb>ul>li>a').on('click', function(e){
        if(pcMo == 'Mobile'){
            e.preventDefault()
            $(this).parents('li').toggleClass('sub_open')
        }
    })

})//document.ready종료
