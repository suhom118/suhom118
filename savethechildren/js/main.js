$(document).ready(function(){

    // const myFullpage = new fullpage('#fullpage', {});  이렇게만 써도 fullpage는 기본 동작함

    const myFullpage = new fullpage('#fullpage', {  /* html에서 페이지 전체를 감싸는 요소 */

		navigation: true, /* 오른쪽에 각 페이지의 paging */
		navigationPosition: 'right', /* 위치 */
		navigationTooltips: ['메인', '보건통계', '사업소개', '현장소식', '지원사업'], /* 툴팁 */
		showActiveTooltip: false, /* 현재 활성화된 페이지의 툴팁 보이기 */

		afterLoad: function(origin, destination, direction, trigger){
			//console.log(destination.index);
			if((destination.index == 2)||(destination.index == 3)||(destination.index == 4)||(destination.index == 5)){
				$('.header').addClass('black');
				$('#fp-nav').addClass('black');
			}else{
				$('.header').removeClass('black');
				$('#fp-nav').removeClass('black');
			}
		},
		responsiveWidth: 640 /* fullpage를 적용시키지 않을 모바일 사이즈 */
	});//fullpage

	//count 숫자 count-up
	// $('.count .rate li .num strong').counterUp({
	// 	delay: 10,   /* 애니메이션이 작동되기 이전 대기 시간 */
	// 	time: 2000    /* 전체 애니메이션 시간 */
	// });//countup

});//document.ready