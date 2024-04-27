/* popup */
$(function(){		
	$(".open-popup").click(function(){
		var popup_name = $(this).attr("data-popup");
		$("."+popup_name).show();
	});
	$(".close-popup").click(function(){
		var popup_name = $(this).attr("data-popup");
		$("."+popup_name).hide();
	});
	$(".open_pop_deposit").click(function(){
		$(".pop_bg").css('display','block');
		$(".pop_deposit").css('display','block');
	});
	$(".open_pop_buyCrown").click(function(){
		$(".pop_bg").css('display','block');
		$(".pop_buyCrown").css('display','block');
	});
	$(".open_pop_sendCrown").click(function(){
		$(".pop_bg").css('display','block');
		$(".pop_sendCrown").css('display','block');
	});
	$(".open_pop_buy").click(function(){
		$(".pop_bg").css('display','block');
		$(".pop_buy").css('display','block');
	});
	$(".open_pop_inquiry").click(function(){
		$(".pop_bg").css('display','block');
		$(".pop_inquiry").css('display','block');
	});
	$(".pop_close").click(function(){
		$(".pop_bg").css('display','none');
		$(".pop_wrap").css('display','none');
	});		
});

