$(document).ready(function(){ 
    // 모든 html요소가 로딩된 이후에 jquery를 실행

    /*
        visual영역의 높이를 브라우저의 높이와 동일하게 설정
        window.height
        > 브라우저가 리사이즈 될때마다 높이를 다시 설정
        > visual문구는 높이의 위아래 가운데 쯤에 배치
    */
    let winH = $(window).height();
    $('.visual .cnt_h').height(winH); // visual의 높이를 window의 높이로 설정
    console.log('window의 높이' + winH);

    $(window).resize(function(){ //브라우저가 리사이즈 될때마다 실행
        winH = $(window).height();
        $('.visual .cnt_h').height(winH); // visual의 높이를 window의 높이로 설정
        console.log('window의 높이' + winH);
    });

    
});//document.ready 종료