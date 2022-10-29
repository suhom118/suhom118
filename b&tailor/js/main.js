$(document).ready(function(){
    const swiper = new Swiper('.visual .popup', { /* 팝업을 감싼는 요소의 class명 */

        effect: "fade", /* fade 효과 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 3000,
            disableOnInteraction: true,
        },

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.btn_paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
        },

    });// visual swiper

    /* visual popup의 정지버튼/재생버튼 
        하나의 버튼이 두가지 기능
        정지와 재생 기능을 구분하는 값.... 
        btn_stop 버튼에 play클래스가 없으면 일시정지
        play클래스가 있으면 재생
    */
    $('.visual .popup .btn_stop').on('click', function(){
        let popStatus = $(this).hasClass('play'); //true면 play가 있다는 이야기 - 재생기능실행
        if(popStatus == true){ //버튼의 상태가 play모양 - 현재 정지상태 - 재생기능을 실행
            swiper.autoplay.start();
            $(this).removeClass('play');
            $(this).text('일시정지');
        }else{//버튼의 상태가 일시정지 모양 - 현재 재생상태 - 일시정지 기능을 실행
            swiper.autoplay.stop();
            $(this).addClass('play');
            $(this).text('재생');
        }
    });//visual stop

    /* 
        이미지가 스크롤될때 오브젝트가 움직이는 효과
        움직이는 시작을 오브젝트가 화면에 나타나기 시작했을때부터 스크롤된 값을 계산해서 
        움직일 값으로 변환해줘야 함.
        1. 브라우저가 스크롤되는 값 - $(window).scrollTop();
        2. 오브젝트가 화면 하단에서 나타나기 시작하는 값 
           -- offset().top - 상단 맨 위에서부터 오브젝트까지의 거리값
           offset().top과 $(window).scrollTop값이 같아지는 시기는 
           오브젝트가 화면 상단에 딱 붙었때 입니다.
           --> 필요한건 오브젝트가 화면 하단에서 보이기 시작할때...
            두 값의 차이가 브라우저의 높이값....

            오브젝트가 화면 하단에서 나타나기 시작하는 값은 
            오브젝트의 offset().top - 윈도우의 높이값 만큼 스크롤 됐을때

        3. 오브젝트를 어떻게 움직일 방법 
           animate - transform X
           css로 transform: translate(); 움직일 예정
    */

    let winH;
    let moveVal;//오브젝트가 움직일값
    let offTop;
    let scrolling;
    
    /* objMove  : 실제 움직일 오브젝트
        objParent : 움직일 오브젝트의 기준이 되는 요소 (offset.top()을 계산할 오브젝트)
        moveDir : 스크롤방향 (left-좌우, top-위아래)
        moveRate : 움직일 속도/비율
    */
    objParallax($('.fabric .bg1 img'), $('.fabric .bg1'), 'top', 0.1);
    // objParallax($('.sns p'), $('.sns p'), 'left', 0.4);

    function objParallax(objMove, objParent, moveDir, moveRate){ //오브젝트를 움직이는 애니메이션 단 한번 셋팅
        objMove.css('transition','1s');
        moveAni(objMove, objParent, moveDir, moveRate);
        $(window).scroll(function(){
            moveAni(objMove, objParent, moveDir, moveRate);
        });
        $(window).resize(function(){
            moveAni(objMove, objParent, moveDir, moveRate);
        });
    }
    function moveAni(objMove, objParent, moveDir, moveRate){ //오브젝트를 실제 움직이는 함수 (반복실행)
        winH = $(window).height();
        offTop = objParent.offset().top;
        scrolling = $(window).scrollTop();
        moveVal = (scrolling - offTop + winH) * moveRate;
        //console.log(moveVal, 'moveVal');
        if(moveDir == 'left'){
            objMove.css('transform', 'translateX(-'+moveVal+'px)');
        }else{//top
            objMove.css('transform', 'translateY(-'+moveVal+'px)');
        }
    }

    

});//document.ready