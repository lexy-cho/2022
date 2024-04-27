// $(function(){
// 	$(document).on("click",".global-history-back",function(){
// 		history.back(-1);
// 	})
// 	//리딩스쿨 메인으로
// 	$(document).on("click",".go-reading-main",function(){
// 		location.href = realPath+"/school/"+f_cncp_cd+"?cont_num="+cont_num+"&divnum="+divnum+"&assign_weekday="+assign_weekday+"&assign_time_from="+assign_time_from+"&item_name_ed="+item_name_ed+"&f_cncp_cd="+f_cncp_cd+"&month="+month ;
// 	})
// 	$(document).on("click",".btn_close",function(){
// 		history.back(-1);
// 	})
// 	$(document).on("click",".coming-soon",function(){
// 		alert("준비중입니다.")
// 	})
// 	//업무관리
// 	$(".go-otreport").click(function(){
// 		location.href= realPath+"/ot/report";
// 	})
// 	//시간표
// 	$(".go-schedule").click(function(){
// 		location.href= realPath+"/timetable";
// 	})
// 	//납입현황
// 	$(".go-paylist").click(function(){
// 		location.href= realPath+"/pay/list";
// 	})
//
//
// 	//부모상담리스트로 이동
// 	$(document).on("click", ".go-counsellist", function(){
// 		location.href=realPath+"/counsel/list";
// 	});
// });
//
// // 공지사항, 교사지침서, 코디상담자료, 교사교육, 신입교육 홈버튼 페이지 로그아웃 눌렀을 때
// $(document).ready(function(){
// 	$(".home").click(function(){
// 		$(".home > img").attr("src", realPath+"/resources/images/m_home_p.png");
// 		location.href = realPath+"/";
// 	});
//
// 	$(".logout").click(function(){
// 		var returnValue = confirm("로그아웃 하시겠습니까?");
// 		if(returnValue){
// 			location.href = realPath+"/logout";
// 			sessionStorage.clear();
// 		}
// 	});
// });
//
// // member, member_report 페이지 달력 왼쪽, 오른쪽 화살표 눌렀을 시 이미지 색 변경
// $(document).on("click", ".cal_arrow_left img", function(){
// 	$(".cal_arrow_left img").attr("src", realPath+"/resources/images/left_press_1.png");
// 	setTimeout(function(){
// 		$(".cal_arrow_left img").attr("src", realPath+"/resources/images/left_1.png");
// 	}, 200);
// });
// $(document).on("click", ".cal_arrow_right img", function(){
// 	$(".cal_arrow_right img").attr("src", realPath+"/resources/images/right_press_1.png");
// 	setTimeout(function(){
// 		$(".cal_arrow_right img").attr("src", realPath+"/resources/images/right_1.png");
// 	}, 200);
// });
//
// // 시간표, 납입현황 양 옆 화살표 눌렀을 시 색 바뀜
// $(document).ready(function(){
// 	$(".date_sel_left img").on("click", function(){
// 		$(".date_sel_left img").attr("src", realPath+"/resources/images/previous_press1.png");
// 		setTimeout(function(){
// 			$(".date_sel_left img").attr("src", realPath+"/resources/images/previous_1.png");
// 		}, 200);
// 	});
//
// 	$(".date_sel_right img").on("click", function(){
// 		$(".date_sel_right img").attr("src", realPath+"/resources/images/next_press_1.png");
// 		setTimeout(function(){
// 			$(".date_sel_right img").attr("src", realPath+"/resources/images/next_1.png");
// 		}, 200);
// 	});
// 	$.views.converters("dec",
//             function(val) {
//               return global.comma(val);
//             }
//           );
// 	$.views.converters("hipn",
//             function(val) {
//               return global.hipn(val);
//             }
//           );
// 	$.views.converters("YYYYMMd",
//             function(val) {
//               return global.YYYYMMd(val);
//             }
//           );
// 	$.views.converters("YYYYMMDDd",
//             function(val) {
//               return global.YYYYMMDDd(val);
//             }
//           );
// });
//
// /* 등급 */
// var GRP_CD_INFO = {
// 	"BASIC" : 24
// 	,"PRE" : 25
// 	,"PLAT" : 26
// 	,"PERFECT" : 27
// 	,"LIGHT" : 28
// 	,"MINI" : 29
// }
//
//
// var reading_global = {
// 	MM : function (mon,i){ //리딩스쿨 개월,계약한 개월(48, 60, 72, 84 등 학습계약개월)
// 		var month = 0;
// 		month = mon + (i-48);
// 		month = ( (month < 10) ? "0"+month : month);
// 		return month;
// 	},
// 		/*MM : function (str,mon,i){
// 			var month = 0;
// 			/!* 달력 날짜 *!/
// 			var date = new Date();
// 			date.setDate(1);
// 			date.setMonth(date.getMonth() + mon);
//
// 			/!* 배정/계약 날짜 *!/
// 			var start_date = new Date(str);
//
// 			var year_diff = date.getYear() - start_date.getYear();
//
// 			console.log("year_diff :" + year_diff);
// 			if( year_diff >= 0 ){
// 				month =  (year_diff * 12);
//
// 				var mon_diff = date.getMonth() - start_date.getMonth();
// 				month = month + mon_diff;
// 				month++;
// 				console.log("month :" + month);
//
// 			}
//
// 			month = month + (i-48);
// 			month = ( (month < 10) ? "0"+month : month);
// 			console.log("month :" + month);
//
// 			return month;
// 		},*/
// 		YY : function (str){
//
// 			var mon = Number(str.replace("0",""));
// 			var year = Math.floor(mon / 3);
// 			if(mon % 3 == 0)
// 				year--;
// 			year = ((year < 10) ? "0"+year : year);
// 			return year;
// 		},
// 		STAND_MM : function (mm){
// 			var mm = parseInt(mm) - 1;
// 			return (48 + (parseInt(mm / 3) * 3));
// 		}
//
//
//
// }
//
//
//
// var global = {
// 		MM:function(){
// 			var date = new Date();
// 			var month = new String(date.getMonth()+1);
//
// 			// 한자리수일 경우 0을 채워준다.
// 			if(month.length == 1){
// 			  month = "0" + month;
// 			}
// 			return month;
// 		},
// 		MMs:function(mon){
// 			var date = new Date();
//
// 			date.setMonth(mon)
// 			var month = new String(date.getMonth());
// 			// 한자리수일 경우 0을 채워준다.
// 			if(month.length == 1){
// 			  month = "0" + month;
// 			}
// 			return month;
// 		},
// 		YYYYMM:function(gubun){
// 			var date = new Date();
// 			var year = date.getFullYear();
// 			var month = new String(date.getMonth()+1);
//
// 			// 한자리수일 경우 0을 채워준다.
// 			if(month.length == 1){
// 			  month = "0" + month;
// 			}
// 			return year + gubun + month;
// 		},
// 		YYYYMMDD:function(gubun){
// 			var date = new Date();
// 			var year = date.getFullYear();
// 			var month = new String(date.getMonth()+1);
// 			var day = new String(date.getDate());
// 			// 한자리수일 경우 0을 채워준다.
// 			if(month.length == 1){
// 				month = "0" + month;
// 			}
// 			if(day.length == 1){
// 				day = "0" + day;
// 			}
// 			return year + gubun + month + gubun + day;
// 		},
// 		YYYYMMd:function(str){
// 			var date = new Date(str.substring(0, 4), parseInt(str.substring(4))-1);
// 			var year = date.getFullYear();
// 			var month = new String(date.getMonth()+1);
//
// 			// 한자리수일 경우 0을 채워준다.
// 			if(month.length == 1){
// 				month = "0" + month;
// 			}
// 			return year + "." + month;
// 		},
// 		YYYYMMDDd:function(str){
// 			var date = new Date(str.substring(0, 4), parseInt(str.substring(4, 6))-1, str.substring(6));
// 			var year = date.getFullYear();
// 			var month = new String(date.getMonth()+1);
// 			var day = new String(date.getDate());
// 			// 한자리수일 경우 0을 채워준다.
// 			if(month.length == 1){
// 				month = "0" + month;
// 			}
// 			if(day.length == 1){
// 				day = "0" + day;
// 			}
// 			return year + "." + month + "." + day;
// 		},
// 		YYYYMMs:function(mon, gubun){
// 			var date = new Date();
// 			date.setDate(1);
// 			date.setMonth(date.getMonth() + mon)
// 			var month = new String(date.getMonth()+1);
// 			var year = date.getFullYear();
// 			date.setFullYear(date.getFullYear());
// 			year = date.getFullYear();
//
// 			// 한자리수일 경우 0을 채워준다.
// 			if(month.length == 1){
// 			  month = "0" + month;
// 			}
// 			return year + gubun + month;
// 		},
// 		YYYYMMDDs:function(str, min, gubun){
// 			var date = new Date(str.substring(0, 4), parseInt(str.substring(4, 6))-1, str.substring(6, 8), str.substring(8, 10), str.substring(10));
// 			date.setHours(date.getHours());
// 			date.setMinutes(parseInt(date.getMinutes())+parseInt(min));
// 			var hours = date.getHours();
// 			var minutes = date.getMinutes();
//
// 			// 한자리수일 경우 0을 채워준다.
// 			if(hours < 10){
// 				hours = "0" + hours;
// 			}
// 			if(minutes < 10){
// 				minutes = "0" + minutes;
// 			}
//
// 			return hours + gubun + minutes;
// 		},
// 		comma:function(str) {
// 		    str = String(str);
// 		    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
// 		},
// 		hipn:function(str) {
// 			return str.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-");
// 		},
// 		YYYYMMDD_FIRST:function(gubun){
// 			var now = new Date();
// 			var date = new Date(now.getYear(), now.getMonth(), 1);
// 			var year = now.getFullYear();
// 			var month = new String(date.getMonth()+1);
// 			var day = new String(date.getDate());
// 			if(month.length == 1){
// 				month = "0" + month;
// 			}
// 			if(day.length == 1){
// 				day = "0" + day;
// 			}
// 			return year + gubun + month + gubun + day;
// 		},
// 		YYYYMMDD_LAST:function(gubun){
// 			var now = new Date();
// 			var date = new Date(now.getYear(), now.getMonth()+1, 0);
// 			var year = now.getFullYear();
// 			var month = new String(date.getMonth()+1);
// 			var day = new String(date.getDate());
// 			if(month.length == 1){
// 				month = "0" + month;
// 			}
// 			if(day.length == 1){
// 				day = "0" + day;
// 			}
// 			return year + gubun + month + gubun + day;
// 		}
// }
//
// function portDelete()
// {
//
// 	var param ={
// 		"f_idx" : global_idx
// 	}
//
// 	ajaxCallPost(realPath+"/api/v1/shool/delete_schoolnote", param, function(res) {
//
// 		if (!res.success){
// 			alert('삭제하지 못했습니다. 조금 있다가 다시 시도해 주세요.');
// 		}else{
// 			$('#pupDelPort > .cardBg').hide();
// 			$('#pupDelFinished').fadeIn(300);
// 			$('#pupDelPort > .dim').click(function(){
// 				$('#pupDelFinished').hide();
// 				$('.dim').hide();
// 				history.back(-1);
// 				history.back(-1);
// 			});
// 			setTimeout(function(){
// 				$('#pupDelFinished').hide();
// 				$('.dim').hide();
// 				history.back(-1);
// 				history.back(-1);
// 			}, 4000);
// 		}
// 	});
// }
