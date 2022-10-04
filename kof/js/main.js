$(document).ready(function(){
    /* 공지사항 보도자료 탭 교체
    탭 제목을  클릭하면 해당 탭이 보여야함
    보이는 탭의 li에"만" active클래스
    
    클릭대상:.notice ul li 
    실행:클릭한 li에 active클래스 추가 = $(this)
    */
    $('.notice ul li ').on('click', function(){
        /*우선 모든active를 지우고 내가선택한this에만 active를 다시줌*/
        $('.notice ul li').removeClass('active')
        $(this).addClass('active')
    })


