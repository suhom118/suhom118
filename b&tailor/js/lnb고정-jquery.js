$(document).ready(function(){
    let fixLnb = $('.lnb');
    let fixHeader = $('.header');
    let lnbTop;
    let headerH;
    let lnbScroll;

    lnbFix();
    $(window).scroll(function(){
        lnbFix();
    });
    $(window).resize(function(){
        lnbFix();
    });
    function lnbFix(){
        lnbTop = fixLnb.offset().top;
        headerH = fixHeader.height();
        lnbScroll = $(window).scrollTop();
        if(lnbScroll >= lnbTop-headerH){
            fixLnb.addClass('fixed');
        }else{
            fixLnb.removeClass('fixed');
        }
    }
});