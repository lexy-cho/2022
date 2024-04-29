/* Kurien / Kurien's Blog / http://blog.kurien.co.kr */
/* 주석만 제거하지 않는다면, 어떤 용도로 사용하셔도 좋습니다. */
var globalCallback;
var isCurrentMonth = true;

var today = new Date();

function kCalendar(id, date, list, callback) {
	console.log("id:::" + id + "date::" + date + "list:::" + list + "callback::::"+callback);
	if(callback) globalCallback = callback;
	var kCalendar = document.getElementById(id);
	
	//월교체시  if
	if( typeof( date ) !== 'undefined' && date != null ) {
		console.log("date111111111111111" + date)
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
	console.log("currentDay"+currentDay);
	//이번달 1일의 요일은 출력. 0은 일요일 6은 토요일
	
	var dateString = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
	var lastDate = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if( (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 )
		lastDate[1] = 29;
	//각 달의 마지막 일을 계산, 윤년의 경우 년도가 4의 배수이고 100의 배수가 아닐 때 혹은 400의 배수일 때 2월달이 29일 임.
	
	var currentLastDate = lastDate[currentMonth-1];
	console.log("currentLastDate::"+currentLastDate);
	var week = Math.ceil( ( currentDay + currentLastDate ) / 7 );
	//총 몇 주인지 구함.
	console.log("currentYear :" + currentYear + " currentMonth :" + currentMonth + " currentDate :" + currentDate);
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

	//console.log("처리함 : " + prevDate);
	$(".cal_arrow_left").attr("data-id", id);
	$(".cal_arrow_left").attr("data-date", prevDate);
	
	$(".cal_arrow_right").attr("data-id", id);
	$(".cal_arrow_right").attr("data-date", nextDate);
	
	var roll_todays = 0;
	var month_total_day_cnt = 0;
	console.log("!!!!!!!!!!!!!!!!!!!!!!!");
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
			
			var class_check = currentYear+""+tempCurrentMonth+""+tempDateNum;

			console.log("currentDate : " + currentDate);
			console.log("dateNum : " + dateNum);
			//현재날짜표시
			if(currentMonth == (today.getMonth() + 1) && currentDate == dateNum){

				console.log("현재날짜 생성");


				calendar += '		<td class="global-day roll_today';
				
				for(var xi = 0; xi < list.length ; xi++){
					if(class_check == list[xi].days){
						roll_todays++;
						calendar += '		roll_sel';
					}
				}
				calendar += '">' + dateNum + '</td>';
			}else{
				calendar += '		<td class="global-day';
				
				for(var xi = 0; xi < list.length ; xi++){
					if(class_check == list[xi].days){
						roll_todays++;
						calendar += '		roll_sel';
					}
				}
				calendar += '">' + dateNum + '</td>';
			}
			month_total_day_cnt++;
		}
		calendar += '			</tr>';
	}
	
	calendar += '			</tbody>';
	calendar += '		</table>';
	
	
	//총학습일도 받아야함 임시로 30으로 맞춤
	var percent = (roll_todays/month_total_day_cnt)*100;
	percent = percent.toFixed(1);
	
	
	
	
	
	calendar += '		<div class="roll_percent">';
	calendar += '		<p class="percent_txt_1">'+percent+'% <span class="percent_txt_2">출석율</span></p>';
	calendar += '		<p class="percent_txt_2">총 <span class="percent_txt_3">'+month_total_day_cnt+'</span>일 학습일 중 <span class="percent_txt_3">'+roll_todays+'</span>일 출석</p>';
	calendar += '		</div>';
	
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
		$( '.global-day:contains("'+tempDate+'")' ).addClass( 'roll_today');
	}else{
		$( '.global-day' ).removeClass( 'roll_today');
	}
	
	//tr의 첫요소 빨간색으로 변경 첫요소는 일요일이다.
	var trs = $(".cal_table_wrap").find("tbody").find("tr");
	for(var i = 0 ; i < trs.length ;i++){
		trs.eq(i).find("td").eq(0).addClass("cal_txt_red")
	}

	init_check_T();
}
