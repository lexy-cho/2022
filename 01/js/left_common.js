//메뉴 아이콘 눌렀을 시 메뉴 나타나고 사라지고
$(function(){
	$(".header_menu > img").click(function(){
	    $(".nav_all_wrap, .nav_bg").stop().fadeIn();
	});
	$(".nav_close > img").click(function(){
	    $(".nav_all_wrap, .nav_bg").stop().fadeOut();
	});
	//메뉴 안의 컨텐츠 이미지 변경
	$(".member_icon").mouseover(function(){
	    $(".member_icon2 > img").attr("src",realPath+"/resources/images/nav_member_focus.png");
	});
	$(".member_icon").mouseout(function(){
	    $(".member_icon2 > img").attr("src",realPath+"/resources/images/nav_member.png");
	});
	$(".study_icon").mouseover(function(){
	    $(".study_icon2 > img").attr("src",realPath+"/resources/images/nav_study_focus.png");
	});
	$(".study_icon").mouseout(function(){
	    $(".study_icon2 > img").attr("src",realPath+"/resources/images/nav_study.png");
	});
	$(".library_icon").mouseover(function(){
	    $(".library_icon2 > img").attr("src",realPath+"/resources/images/nav_library_focus.png");
	});
	$(".library_icon").mouseout(function(){
	    $(".library_icon2 > img").attr("src",realPath+"/resources/images/nav_library.png");
	});
	$(".visit_icon").mouseover(function(){
	    $(".visit_icon2 > img").attr("src",realPath+"/resources/images/nav_visit_focus.png");
	});
	$(".visit_icon").mouseout(function(){
	    $(".visit_icon2 > img").attr("src",realPath+"/resources/images/nav_visit.png");
	});
	$(".pay_icon").mouseover(function(){
	    $(".pay_icon2 > img").attr("src",realPath+"/resources/images/nav_pay_focus.png");
	});
	$(".pay_icon").mouseout(function(){
	    $(".pay_icon2 > img").attr("src",realPath+"/resources/images/nav_pay.png");
	});
	$(".mypage_icon").mouseover(function(){
	    $(".mypage_icon2 > img").attr("src",realPath+"/resources/images/nav_mypage_focus.png");
	});
	$(".mypage_icon").mouseout(function(){
	    $(".mypage_icon2 > img").attr("src",realPath+"/resources/images/nav_mypage.png");
	});
	$(".logout_icon").mouseover(function(){
	    $(".logout_icon2 > img").attr("src",realPath+"/resources/images/nav_logout_focus.png");
	});
	$(".logout_icon").mouseout(function(){
	    $(".logout_icon2 > img").attr("src",realPath+"/resources/images/nav_logout.png");
	});

	//달력 눌렀을 시 나타나고 사라지고
	$(".calendar_calenda_wrap > img").click(function(){
//	    $(".calendar_all_wrap").stop().fadeIn();
	    $(".calendar_all_wrap").show();
	});
	$(document).on("click", ".calendar_close > img", function(){
	    $(".calendar_all_wrap").stop().fadeOut();
	    $(".calendar_all_wrap").hide();
	});

	//검색창에 커서가 있을 시 돋보기 사라지고 커서 없으면 나타나고
	$(".search_wrap > input").mouseover(function(){
	    $(".search_icon").hide();
	});
	$(".search_wrap > input").mouseout(function(){
	    $(".search_icon").show();
	});

	//관리 회원 수 화살표 누르면 아래에 컨텐츠 수 나타나고 사라지고, 화살표 모양 바뀌고
	$(".num_arrow_show").click(function(){
	    if($(".num_arrow_show").hasClass("num_arrow_show")){
	        $(".num_arrow_show").addClass("num_arrow_hide").removeClass("num_arrow_show");
	        $(".header_num_table").stop().fadeIn();
	    }else if($(".num_arrow_hide").hasClass("num_arrow_hide")){
	        $(".num_arrow_hide").addClass("num_arrow_show").removeClass("num_arrow_hide");
	        $(".header_num_table").stop().fadeOut();
	    }
	});
})