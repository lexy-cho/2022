/* Kurien / Kurien's Blog / http://blog.kurien.co.kr */
/* 주석만 제거하지 않는다면, 어떤 용도로 사용하셔도 좋습니다. */
var globalCallback;
var isCurrentMonth = true;

var today = new Date();

function kCalendar(id, date, callback) {
	if(callback) globalCallback = callback;
	var kCalendar = document.getElementById(id);
	
	//월교체시  if
	if( typeof( date ) !== 'undefined' && date != null ) {
		date = date.split('-');
		date[1] = date[1] - 1;
		date = new Date(date[0], date[1], date[2]);
	} else {
		var date = new Date();
	}
	
	var currentYear = date.getFullYear();
	//년도를 구함
	
	var currentMonth = date.getMonth() + 1;
	var compareMonth = date.getMonth() + 1;
	//연을 구함. 월은 0부터 시작하므로 +1, 12월은 11을 출력
	
	var currentDate = date.getDate();
	//오늘 일자.
	
	date.setDate(1);
	var currentDay = date.getDay();
	//이번달 1일의 요일은 출력. 0은 일요일 6은 토요일
	
	var dateString = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
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
	
	calendar += '<div class="cal_close"></div>';
	calendar += '<div class="cal_head">';
	calendar += '	<span class="cal_head_arrow_left"onclick="kCalendar(\'' +  id + '\', \'' + prevDate + '\')"></span>';
	calendar += '	<span class="cal_head_txt_year">'+currentYear+'년</span>';
	calendar += '	<span class="cal_head_txt_month">'+currentMonth+'월</span>';
	calendar += '	<span class="cal_head_arrow_right" onclick="kCalendar(\'' + id + '\', \'' + nextDate + '\')"></span>';
	calendar += '</div>';
	calendar += '<div class="cal_bar"></div>';
	
	calendar += '<div class="cal_table_wrap">';
	calendar += '	<table>';
	calendar += '		<thead>';
	calendar += '			<tr>';
	calendar += '				<td>일</td>';
	calendar += '				<td>월</td>';
	calendar += '				<td>화</td>';
	calendar += '				<td>수</td>';
	calendar += '				<td>목</td>';
	calendar += '				<td>금</td>';
	calendar += '				<td>토</td>';
	calendar += '			</tr>';
	calendar += '		</thead>';

	calendar += '		<tbody>';
	
	var dateNum = 1 - currentDay;
	
	for(var i = 0; i < week; i++) {
		calendar += '			<tr>';
		for(var j = 0; j < 7; j++, dateNum++) {
			
			//마지막날 이후의
			if( dateNum < 1 || dateNum > currentLastDate ) {
				calendar += '		<td class="' + dateString[j] + '"><div class="box"><div class="content"><div class="content-items"></div></div></div></td>';
				continue;
			}
			
			//현재날짜표시
			if(currentMonth == (today.getMonth() + 1) && currentDate == dateNum){
				calendar += '		<td class="global-day cal_sel"    onclick="kCalendarEvent('+dateNum+','+ currentMonth+','+currentYear+',this);">' + dateNum + '</td>';
			}else{
				calendar += '		<td class="global-day"  onclick="kCalendarEvent('+dateNum+','+ currentMonth+','+currentYear+',this);">' + dateNum + '</td>';
			}
		}
		calendar += '			</tr>';
	}
	
	calendar += '			</tbody>';
	calendar += '		</table>';
	
	kCalendar.innerHTML = calendar;
	
	
	//동적으로 현재날짜에 액티브하기
	var tempDate = new Date();
	var tempYear = tempDate.getFullYear();
	var tempMonth = tempDate.getMonth() + 1;

	if(tempMonth < 10) {
		tempMonth = "0"+tempMonth;
	}

	var tempDate = tempDate.getFullYear()+tempDate.getMonth()+tempDate.getDate();
	
	if(tempYear == currentYear && tempMonth == currentMonth){
		$( '.global-day:contains("'+tempDate+'")' ).addClass( 'cal_sel');
	}else{
		$( '.global-day' ).removeClass( 'cal_sel');
	}
	
	//tr의 첫요소 빨간색으로 변경 첫요소는 일요일이다.
	var trs = $(".cal_table_wrap").find("tbody").find("tr");
	for(var i = 0 ; i < trs.length ;i++){
		trs.eq(i).find("td").eq(0).addClass("cal_txt_red")
	}
}

	

function kCalendarEvent(day,month,year,obj){
	if(month < 10) month = "0"+month;
	if(day < 10) day = "0"+day;

	$(".global-day").removeClass("cal_sel");
	$(obj).addClass("cal_sel");

	globalCallback(year,month,day);
}