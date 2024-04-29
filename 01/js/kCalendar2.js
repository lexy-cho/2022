/* Kurien / Kurien's Blog / http://blog.kurien.co.kr */
/* 주석만 제거하지 않는다면, 어떤 용도로 사용하셔도 좋습니다. */
var globalCallback2;
var isCurrentMonth2 = true;
var comple_read_idx = 0;
var today = new Date();

function kCalendar2(id, date, list, MM, prnt, callback) {
	if(callback) globalCallback2 = callback;
	var kCalendar2 = document.getElementById(id);
	
	//월교체시  if
	if( typeof( date ) !== 'undefined' && date != null ) {
		date = date.split('-');
		date[1] = date[1] - 1; 
		date = new Date(date[0], date[1], date[2]);
	} else {
		var date = new Date();
		date.setDate(1);
	}
	
	var currentYear = date.getFullYear();
	//년도를 구함
	
	var currentMonth = date.getMonth() + 1;
	var compareMonth = date.getMonth() + 1;
	//연을 구함. 월은 0부터 시작하므로 +1, 12월은 11을 출력
	
	var currentDate = today.getDate();
	//오늘 일자.
	
	date.setDate(1);
	var currentDay = date.getDay();
	//이번달 1일의 요일은 출력. 0은 일요일 6은 토요일
	
	var dateString = new Array('1', '2', '3', '4', '5', '6', '7');
	var lastDate = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if( (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 )
		lastDate[1] = 29;
	//각 달의 마지막 일을 계산, 윤년의 경우 년도가 4의 배수이고 100의 배수가 아닐 때 혹은 400의 배수일 때 2월달이 29일 임.
	
	var currentLastDate = lastDate[currentMonth-1];
	var week = Math.ceil( ( currentDay + currentLastDate ) / 7 );
	//총 몇 주인지 구함.
	
	if(currentMonth != 1)
		var prevDate = currentYear + '-' + ( currentMonth - 1 ) + '-' + currentDate;
	else
		var prevDate = ( currentYear - 1 ) + '-' + 12 + '-' + currentDate;
	//만약 이번달이 1월이라면 1년 전 12월로 출력.
	
	if(currentMonth != 12) 
		var nextDate = currentYear + '-' + ( currentMonth + 1 ) + '-' + currentDate;
	else
		var nextDate = ( currentYear + 1 ) + '-' + 1 + '-' + currentDate;
	//만약 이번달이 12월이라면 1년 후 1월로 출력.

	
	if( currentMonth < 10 )
		var currentMonth = '0' + currentMonth;
	//10월 이하라면 앞에 0을 붙여준다.
	
	var calendar = '';
	
	calendar += '<table>';
	calendar += '	<tbody>';
	
	var dateNum = 1 - currentDay;
	$(".cal_arrow_left2").attr("data-id", id);
	$(".cal_arrow_left2").attr("data-date", prevDate);
	
	$(".cal_arrow_right2").attr("data-id", id);
	$(".cal_arrow_right2").attr("data-date", nextDate);
	
	for(var i = 0; i < week; i++) {
		calendar += '			<tr>';
		for(var j = 0; j < 7; j++, dateNum++) {
			
			//마지막날 이후의
			if( dateNum < 1 || dateNum > currentLastDate ) {
				calendar += '		<td class="' + dateString[j] + '"><div class="box"><div class="content"><div class="content-items"></div></div></div></td>';
				continue;
			}
			
			var tempCurrentMonth = currentMonth;
//			if(tempCurrentMonth < 10) tempCurrentMonth = "0"+tempCurrentMonth; 
			
			var tempDateNum = dateNum;
			if(tempDateNum < 10) tempDateNum = "0"+tempDateNum; 
			
			var class_check = currentYear+""+tempCurrentMonth;
			 console.log(list.length +" 갯수");
			if(list.length > 0){
				//현재날짜표시
				if(currentMonth == (today.getMonth() + 1) && currentDate == dateNum){
					calendar += '		<td class="global-day roll_today';
					
					for(var xi = 0; xi < list.length ; xi++){
						if(class_check >= list[xi].assign_mont_s && class_check <= list[xi].assign_mont_e){
							var assign_weekday = list[xi].assign_weekday; //1일요일
							if(dateString[j] == assign_weekday){
								calendar += '		roll_sel';
							}
						} 
					}
					calendar += '">' + dateNum + '</td>';
				}else{
					calendar += '		<td class="global-day';
					
					for(var xi = 0; xi < list.length ; xi++){
						if(class_check >= list[xi].assign_mont_s && class_check <= list[xi].assign_mont_e){
							var assign_weekday = list[xi].assign_weekday; //1일요일
							if(dateString[j] == assign_weekday){
								calendar += '		roll_sel';
							}
						}
					}
					calendar += '">' + dateNum + '</td>';
				}
				
			}else{
					//현재날짜표시 
			if(currentMonth == (today.getMonth() + 1) && currentDate == dateNum){
				calendar += '		<td class="global-day2 roll_today"    /*onclick="kCalendar2Event('+dateNum+','+ currentMonth+','+currentYear+',this);"*/>' + dateNum + '</td>';
			}else{
				calendar += '		<td class="global-day2" /* onclick="kCalendar2Event('+dateNum+','+ currentMonth+','+currentYear+',this);"*/>' + dateNum + '</td>';
			}
			} 
		}
		calendar += '			</tr>';
	}
	
	calendar += '			</tbody>';
	calendar += '		</table>';
	
	calendar += '		<div class="roll_num">';
	if(list.length > 0){
		/* 수업 데이터 있을때 */
	calendar +=	'<div class="comple_read"><div class="num_txt_gray">최근 완료 수업</div><select class="comple_read_sel">';
		for(var i=0; i<prnt.length; i++){

			var mm = (prnt[i].f_date).substring(4,6);
			var nn = (prnt[i].f_date).substring(6,8);
			var idx = prnt[i].f_idx;
			if(i == 0)
				comple_read_idx = idx;
/*
			var timedate = new Date('2021-01-01 '+prnt[i].f_time);
			timedate.setTime(timedate.getTime() + 1000 * 60 * 20);
			var time = timedate.getHours() + ":" + ("00" + timedate.getMinutes()).slice(-2);*/
			/*if(i == 0){
				calendar += '<option value="'+idx+'" selected>최근 완료 수업</option>'
			}else{*/
				calendar += '<option value="'+idx+'">'+mm+'월'+nn+'일 ('+list[0].assign_time_from+'~'+list[0].assign_time_to+')'+'</option>'

			//}
		}
		calendar += '</select></div>';

	}else{
		/* 수업 데이터 없을때 */
	calendar += '<div class="comple_read"><div class="num_txt_gray">최근 완료 수업</div><select class="comple_read_sel">';
		for(var i=0; i<prnt.length; i++){
			var mm = (prnt[i].f_date).substring(4,6);
			var nn = (prnt[i].f_date).substring(6,8);
			var idx = prnt[i].f_idx;
			if(i == 0)
				comple_read_idx = idx;

			var timedate = new Date('2021-01-01 '+prnt[i].f_time);
			timedate.setTime(timedate.getTime() + 1000 * 60 * 20);
			var time = timedate.getHours() + ":" + ("00" + timedate.getMinutes()).slice(-2);

			calendar += '<option value="'+idx+'">'+mm+'월'+nn+'일 ('+prnt[i].f_time+'~'+time+')'+'</option>'

		}
		calendar += '</select></div>';

	} 
	calendar += '		</div>';
	
	kCalendar2.innerHTML = calendar;
	
	
	//동적으로 현재날짜에 액티브하기
	var tempDate = new Date();
	var tempYear = tempDate.getFullYear();
	var tempMonth = tempDate.getMonth() + 1;

	if(tempMonth < 10) {
		tempMonth = "0"+tempMonth;
	}

	var tempDate = tempDate.getFullYear()+tempDate.getMonth()+tempDate.getDate();
	
	if(tempYear == currentYear && tempMonth == currentMonth){
		$( '.global-day2:contains("'+tempDate+'")' ).addClass( 'roll_sel');
	}else{
		$( '.global-day2' ).removeClass( 'roll_sel');
	}
	
	//tr의 첫요소 빨간색으로 변경 첫요소는 일요일이다.
	var trs = $(".cal_table_wrap").find("tbody").find("tr");
	for(var i = 0 ; i < trs.length ;i++){
		trs.eq(i).find("td").eq(0).addClass("cal_txt_red")
	}

	init_check_T();
}

	

function kCalendar2Event(day,month,year,obj){
	if(month < 10) month = "0"+month;
	if(day < 10) day = "0"+day;

	$(".global-day2").removeClass("roll_sel");
	$(obj).addClass("roll_sel");

	globalCallback2(year,month,day);
}