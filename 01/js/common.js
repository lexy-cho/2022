$(function(){
	$(document).on("click",".global-history-back",function(){
		history.back(-1);
	})
	$(document).on("click",".coming-soon",function(){
		alert("준비중입니다.")
	})
	$(document).on("click",".coming-soon2",function(){
		$('.popup_wrap1').show();
		$('.txt_pop').text('서비스 준비중입니다.');
		$('.popup_wrap2').hide();
	})
	$(document).on("click",".home",function(){
		location.href = realPath+"/";
	})
	$(document).on("click",".go-login",function(){
		// location.href = realPath+"/";
		location.href = realPath+"/logout";
	})
	$(document).on("click",".go-findpw",function(){
		location.href = realPath+"/login/findpw";
	})
	$(document).on("click",".go-findid",function(){
		location.href = realPath+"/login/findid";
	})
	$(document).on("click",".logout",function(){
		location.href = realPath+"/logout";
	})
	$(document).on("click",".setting",function(){
		bridgeOpenOptionPage()
	})
});

function gohome () {
	location.href = realPath+"/";
}

// member, member_report 페이지 달력 왼쪽, 오른쪽 화살표 눌렀을 시 이미지 색 변경
$(document).on("click", ".cal_arrow_left", function(){
	$(".cal_arrow_left").css("background", "url('"+realPath+"/resources/images/tap_condi_arrow_left_p.svg')");
	setTimeout(function(){
		$(".cal_arrow_left").css("background", "url('"+realPath+"/resources/images/tap_condi_arrow_left.svg')");
	}, 200);
});
$(document).on("click", ".cal_arrow_right", function(){
	$(".cal_arrow_right").css("background", "url('"+realPath+"/resources/images/tap_condi_arrow_right_p.svg')");
	setTimeout(function(){
		$(".cal_arrow_right").css("background", "url('"+realPath+"/resources/images/tap_condi_arrow_right.svg')");
	}, 200);
});
$(document).on("click", ".cal_arrow_left2", function(){
	$(".cal_arrow_left2").css("background", "url('"+realPath+"/resources/images/tap_condi_arrow_left_p.svg')");
	setTimeout(function(){
		$(".cal_arrow_left2").css("background", "url('"+realPath+"/resources/images/tap_condi_arrow_left.svg')");
	}, 200);
});
$(document).on("click", ".cal_arrow_right2", function(){
	$(".cal_arrow_right2").css("background", "url('"+realPath+"/resources/images/tap_condi_arrow_right_p.svg')");
	setTimeout(function(){
		$(".cal_arrow_right2").css("background", "url('"+realPath+"/resources/images/tap_condi_arrow_right.svg')");
	}, 200);
});

// 시간표, 납입현황 양 옆 화살표 눌렀을 시 색 바뀜
$(document).ready(function(){
	$(".date_sel_left img").on("click", function(){
		$(".date_sel_left img").attr("src", realPath+"/resources/images/previous_press1.png");
		setTimeout(function(){
			$(".date_sel_left img").attr("src", realPath+"/resources/images/previous_1.png");
		}, 200);
	});

	$(".date_sel_right img").on("click", function(){
		$(".date_sel_right img").attr("src", realPath+"/resources/images/next_press_1.png");
		setTimeout(function(){
			$(".date_sel_right img").attr("src", realPath+"/resources/images/next_1.png");
		}, 200);
	});
});

/* 등급 */
var GRP_CD_INFO = {
	"BASIC" : 24
	,"PRE" : 25
	,"PLAT" : 26
	,"PERFECT" : 27
	,"LIGHT" : 28
	,"MINI" : 29
}


var reading_global = {
	MM : function (str,mon,i){
		var month = 0;
		/* 달력 날짜 */
		var date = new Date();
		date.setDate(1);
		date.setMonth(date.getMonth() + mon);

		/* 배정/계약 날짜 */
		var start_date = new Date(str);

		var year_diff = date.getYear() - start_date.getYear();

		if( year_diff >= 0 ){
			month =  (year_diff * 12);
			var mon_diff = date.getMonth() - start_date.getMonth();
			month = month + mon_diff;
			month++;
		}

		month = month + (i-48);
		month = ( (month < 10) ? "0"+month : month);

		return month;
	},
	YY : function (str){

		var mon = Number(str.replace("0",""));
		var year = Math.floor(mon / 3);
		if(mon % 3 == 0)
			year--;
		year = ((year < 10) ? "0"+year : year);
		return year;
	},
	STAND_MM : function (mm){
		var mm = parseInt(mm) - 1;
		return (48 + (parseInt(mm / 3) * 3));
	}



}


var global = {
		MM:function(){
			var date = new Date(); 
			var month = new String(date.getMonth()+1); 

			return month;
		},
		YYYYMM:function(gubun){
			var date = new Date(); 
			var year = date.getFullYear(); 
			var month = new String(date.getMonth()+1); 

			// 한자리수일 경우 0을 채워준다. 
			if(month.length == 1){ 
			  month = "0" + month; 
			} 
			return year + gubun + month;
		},
		YYYYMMDD:function(gubun){
			var date = new Date(); 
			var year = date.getFullYear(); 
			var month = new String(date.getMonth()+1); 
			var day = new String(date.getDate());
			// 한자리수일 경우 0을 채워준다. 
			if(month.length == 1){ 
				month = "0" + month; 
			} 
			if(day.length == 1){ 
				day = "0" + day; 
			} 
			return year + gubun + month + gubun + day;
		},
		YYYYMMd:function(str){
			var date = new Date(str.substring(0, 4), parseInt(str.substring(4))-1); 
			var year = date.getFullYear(); 
			var month = new String(date.getMonth()+1); 
			
			// 한자리수일 경우 0을 채워준다. 
			if(month.length == 1){ 
				month = "0" + month; 
			} 
			return year + "." + month;
		},
		YYYYMMDDd:function(str){
			var date = new Date(str.substring(0, 4), parseInt(str.substring(4, 6))-1, str.substring(6)); 
			var year = date.getFullYear(); 
			var month = new String(date.getMonth()+1); 
			var day = new String(date.getDate());
			// 한자리수일 경우 0을 채워준다. 
			if(month.length == 1){ 
				month = "0" + month; 
			} 
			if(day.length == 1){ 
				day = "0" + day; 
			} 
			return year + "." + month + "." + day;
		},
		DD:function(str){
			var date = new Date(str.substring(0, 4), parseInt(str.substring(4, 6))-1, str.substring(6)); 
			var year = date.getFullYear(); 
			var month = new String(date.getMonth()+1); 
			var day = new String(date.getDate());
			
			return day;
		},
		MMs:function(mon){
			var date = new Date();
			date.setDate(1);
			date.setMonth(date.getMonth() + mon)
			var month = new String(date.getMonth()+1);
			return month;
		},
		YYYYMMs:function(mon, gubun){
			var date = new Date();
			date.setDate(1);
			date.setMonth(date.getMonth() + mon)
			var month = new String(date.getMonth()+1); 
			
			var year = date.getFullYear();
			date.setFullYear(date.getFullYear());
			year = date.getFullYear();
			

			// 한자리수일 경우 0을 채워준다. 
			if(month.length == 1){ 
			  month = "0" + month; 
			} 
			return year + gubun + month;
		},
		YYYYMMDDs:function(str, min, gubun){
			var date = new Date(str.substring(0, 4), parseInt(str.substring(4, 6))-1, str.substring(6, 8), str.substring(8, 10), str.substring(10)); 
			date.setHours(date.getHours());
			date.setMinutes(parseInt(date.getMinutes())+parseInt(min));
			var hours = date.getHours(); 
			var minutes = date.getMinutes();
			
			// 한자리수일 경우 0을 채워준다. 
			if(hours < 10){ 
				hours = "0" + hours; 
			} 
			if(minutes < 10){ 
				minutes = "0" + minutes; 
			} 
			
			return hours + gubun + minutes;
		},
		comma:function(str) {
		    str = String(str);
		    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
		},
		hipn:function(str) {
			return str.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-");
		},
		YYYYMMDD_FIRST_:function(str, gubun){
			var now = new Date(str.substring(0, 4), parseInt(str.substring(4, 6))-1); 
			var date = new Date(now.getYear(), now.getMonth(), 1);
			var year = now.getFullYear(); 
			var month = new String(date.getMonth()+1); 
			var day = new String(date.getDate());
			if(month.length == 1){ 
				month = "0" + month; 
			}
			if(day.length == 1){ 
				day = "0" + day; 
			}
			return year + gubun + month + gubun + day;
		},
		YYYYMMDD_FIRST:function(gubun){
			var now = new Date();
			var date = new Date(now.getYear(), now.getMonth(), 1);
			var year = now.getFullYear(); 
			var month = new String(date.getMonth()+1); 
			var day = new String(date.getDate());
			if(month.length == 1){ 
				month = "0" + month; 
			}
			if(day.length == 1){ 
				day = "0" + day; 
			}
			return year + gubun + month + gubun + day;
		},
		YYYYMMDD_LAST_:function(str, gubun){
			var now = new Date(str.substring(0, 4), parseInt(str.substring(4, 6))-1); 
			var date = new Date(now.getYear(), now.getMonth()+1, 0);
			var year = now.getFullYear(); 
			var month = new String(date.getMonth()+1); 
			var day = new String(date.getDate());
			if(month.length == 1){ 
				month = "0" + month; 
			}
			if(day.length == 1){ 
				day = "0" + day; 
			}
			return year + gubun + month + gubun + day;
		},
		YYYYMMDD_LAST:function(gubun){
			var now = new Date();
			var date = new Date(now.getYear(), now.getMonth()+1, 0);
			var year = now.getFullYear(); 
			var month = new String(date.getMonth()+1); 
			var day = new String(date.getDate());
			if(month.length == 1){ 
				month = "0" + month; 
			}
			if(day.length == 1){ 
				day = "0" + day; 
			}
			return year + gubun + month + gubun + day;
		}
}
	function $ComTimer(){
	    //prototype extend
	}
 
	$ComTimer.prototype = {
	    comSecond : ""
	    , fnCallback : function(){}
	    , timer : "" 
	    , domId : ""  
	    , fnTimer : function(){
	        var m = Math.floor(this.comSecond / 60) + ":" + ( ((this.comSecond % 60)<10) ? "0"+(this.comSecond % 60) : (this.comSecond % 60) );	// 남은 시간 계산
	        this.comSecond--;					// 1초씩 감소
	        console.log(m);
	        this.domId.innerText = m;
	        if (this.comSecond < 0) {			// 시간이 종료 되었으면..
	            clearInterval(this.timer);		// 타이머 해제
	            alert("인증시간이 초과하였습니다\n다시 인증해주시기 바랍니다.")
	        }
	    }
	    ,fnStop : function(){
	        clearInterval(this.timer);
	    }

	}