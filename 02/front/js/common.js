/* GNB & SNB inClude / menu Toggle ***********************************/
var pageUrl = location.href;
function includeLayout(){
	var includeArea = $('[data-include]');
	var self, url;
	$.each(includeArea, function() {
		self = $(this);
		url = self.data("include");
		self.load(url, function() {
			self.removeAttr("data-include");
		});
	});
}
/* ebd GNB & SNB inClude / menu Toggle ***********************************/
/* Popup ***********************************/
function popupOpen(btnId,dimClass,popupId){
	$("#"+btnId).bind('tap click', function(){
		if (dimClass === "") {
			$("#"+popupId).addClass('active');
		} else {
			$("."+dimClass).show();
			setTimeout(function(){
				$("#"+popupId).addClass('active');
			}, 100);
			$('html, body').css({'overflow' : 'hidden'});
		}
	});
}
function popupClose(btnId,dimClass,popupId){
	$("#"+btnId).bind('tap click', function(){
		if (dimClass === "") {
			$("#"+popupId).removeClass('active');
		} else {
			$("#"+popupId).removeClass('active');
			setTimeout(function(){
				$("."+dimClass).fadeOut();
			}, 200);
			$('html, body').css({'overflow' : 'auto'});
		}
	});
}
function newPopupOpen(btnId,popupName,popupURL,popupWidth,popupHeight){
	$("#"+btnId).bind('tap click', function(){
		window.open(popupURL, popupName, 'width='+popupWidth+'px,height='+popupHeight+'px,scrollbars=no');
		return false;
	});
}
/* end Popup ***********************************/
/* multSelect ***********************************/
var expanded = false;
function multSelect(btnSelect){
	$("#"+btnSelect).bind('tap click', function(){
		var checkboxes = $("#"+btnSelect).next('.checkArea');
		if (!expanded) {
			checkboxes.show();
			expanded = true;
		} else {
			checkboxes.hide();
			expanded = false;
			$(checkboxes).find('input').each(function() {
				if ($(this).is(":checked") == true){
					$("#"+btnSelect).removeClass('lCase');
				} else {
					$("#"+btnSelect).addClass('lCase');
				}
			});
		}
	});
}
/* end multSelect ***********************************/
$( document ).ready( function() {
	/* start Device 대응 사전 정의 ***********************************/
    var isMobile = function () {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    if (isMobile()){}
    var isMobile1 = function () {
		return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    };
    var isMobile2 = function () {
     return /Android/i.test(navigator.userAgent);
    };
    if (isMobile2()){
		$('body').addClass('androidCase');
    } else if (isMobile1()){
		$('body').addClass('iosCase');
    }
    var userAgent = window.navigator.userAgent;
    var isChrome = userAgent.indexOf('Chrome');
    var isChromeMobile = userAgent.indexOf('CriOS');
    var isSamsungBrowser = userAgent.indexOf('SamsungBrowser');
    var isWindows = userAgent.indexOf('Windows NT');
    var isEdge = userAgent.indexOf('Edge');
    var isIE = userAgent.indexOf('Trident');
    if (isEdge >= 0){
     $('body').addClass('edgeCase');// 엣지 브라우저 체크
    }
    /* end Device 대응 사전 정의 ***********************************/
		includeLayout(); // snb Load
    /* start 컴포넌트 및 공통 정의 ***********************************/
	$(".tabNav li button").click(function () {
		$(".tabNav li").removeClass("on");
		$(this).parent("li").addClass("on");
		var activeTab = $(this).attr("data-name");
		$('.tabData').hide();
		$('.tData' + activeTab).show();
	}); /* Tab */

	$('.cal').datepicker({
		language: 'kr',
		toggleSelected: false,
		dateFormat: 'yyyy-mm-dd',
		autoClose : true,
       navTitles: {
           days: 'yyyy<span>-</span> MM'
       }
	});
	$('.multyCal').datepicker({
		language: 'kr',
		toggleSelected: false,
		range: true,
		autoClose : true,
		multipleDatesSeparator: ' ~ ',
       navTitles: {
           days: 'yyyy<span>-</span> MM'
       }
	});// Date picker

	$('.selectSet select').change(function () {
		if(this.value == 'no'){
			$(this).parent().addClass('lCase');
		} else {
			$(this).parent().removeClass('lCase');
		}
	});// select label color Change

    /* end 컴포넌트 및 공통 정의 ***********************************/
});
