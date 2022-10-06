$(document).ready(function(){
    let winW;
    let pcMobile;
    deviceChk();
    $(window).resize(function(){
        deviceChk();
    });
    function deviceChk(){
        winW = $(window).width();

        if(winW > 640){ //브라이저 넓이가 640px 보다 크면
            pcMobile = 'pc';
        }else{ //브라우저의 넓이가 640px 이하면
            pcMobile = 'mobile';
        }//if 
    }// function deviceChk

    $('.container .sub_tit .lnb .lnb_open').on('click', function(){
        if(pcMobile == 'mobile'){
            $('.container .sub_tit .lnb').addClass('open');
        }
    });
    $('.container .sub_tit .lnb .lnb_close').on('click', function(){
        if(pcMobile == 'mobile'){
            $('.container .sub_tit .lnb').removeClass('open');
        }
    });
});