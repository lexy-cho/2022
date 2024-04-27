<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 
MenuList-004 납입현황 
 -->
<link rel="stylesheet" href="${realPath}/resources/css/pay_state.css">
<script src="https://www.jsviews.com/download/jsrender.js"></script>
<script>
	var current_mon = 0;
	$(function(){

        if ( sessionStorage.getItem("current_mon") != null ){
            current_mon = Number(sessionStorage.getItem("current_mon"));
        }

		//달력 좌우 화살표
		$(".date_sel_left>img").click(function(){
			current_mon--;
			init(current_mon)
		})
		$(".date_sel_right>img").click(function(){
			current_mon++;
			init(current_mon)
		})
		init(current_mon);
	})
	
	//사용자 리스트
	function init(current_mon){
		var yyyymm = global.YYYYMMs(current_mon, "");
 		$(".date_title").text(yyyymm.substring(4)+"월 납입현황");
 		
		var param = {
				"p_num":"${sessionScope.MEMBER.person_numb}",
				"p_mon":yyyymm
		}
		ajaxCallPost("${realPath}/api/v1/pay", param, function(res){
			
			var cash = 0;
			var card = 0;
			var total = 0;
			for(var i = 0 ; i < res.data.length ;i++){
				if(res.data[i].pay_type == '현금'){
					cash += res.data[i].edu_amt
				}else if(res.data[i].pay_type == '카드'){
					card += res.data[i].edu_amt
				}
				total += res.data[i].edu_amt
			}
			$(".money_txt3").text(global.comma(total))
			$(".money_txt6").text(global.comma(cash))
			$(".money_txt9").text(global.comma(card))
			
			
			
			var template = $.templates("#members"); // <!-- 템플릿 선언
	        var htmlOutput = template.render(res); // <!-- 렌더링 진행 -->
	        $(".tbody").html(htmlOutput);
		})
	}
	
</script>
<script type="text/x-jsrender" id="members">
{{for data}}
					 <tr>
                        <td class="border_right txt_extra">{{:#index+1}}</td>
                        <td class="border_right txt_blue">{{:child_name}}</td>
                        <td class="border_right">
							{{if edu_weekday == '1'}} 일요일
							{{else edu_weekday == '2'}} 월요일
							{{else edu_weekday == '3'}} 화요일
							{{else edu_weekday == '4'}} 수요일
							{{else edu_weekday == '5'}} 목요일
							{{else edu_weekday == '6'}} 금요일
							{{else edu_weekday == '7'}} 토요일
							{{/if}}
						</td>
                        <td class="border_right">{{:edu_time_f}}</td>
                        <td class="border_right">{{:edu_time_t}}</td>
                        <td class="border_right">{{:edu_time_name}}</td>
                        <td class="border_right">{{dec:edu_amt}}</td>
                        <td class="border_right">{{:item_name}}</td>
                        <td class="border_right">{{:pay_type}}</td>
                        <td class="border_right">{{:cash_receipt}}</td>
                        <td>{{:card_num}}</td>
                    </tr>
{{/for}}
</script>
<body>
   <div class="all_wrap">
   <!-- 시간표, 납입현황 상단 고정 -->
        <div class="time_header_wrap">
            <div>
                <p class="date_sel_left">
                    <img src="${realPath}/resources/images/previous_1.png">
                </p>
                <p class="date_title"></p>
                <p class="date_sel_right">
                    <img src="${realPath}/resources/images/next_1.png">
                </p>
                <span>${sessionScope.MEMBER.dept_name}${sessionScope.MEMBER.tree_name} ${sessionScope.MEMBER.person_name} ${sessionScope.MEMBER.job_name}</span>
            </div>
        </div>
        <!-- //시간표, 납입현황 상단 고정 -->

        <!-- 금액 -->
        <div class="money">
            <div>
                <p>
                    <span class="money_txt1">총합계</span>
                    <span class="money_txt2">:</span>
                    <span class="money_txt3"></span>
                    <span class="money_txt4">현금결제교육비</span>
                    <span class="money_txt5">:</span>
                    <span class="money_txt6"></span>
                    <span class="money_txt7">카드결제교육비</span>
                    <span class="money_txt8">:</span>
                    <span class="money_txt9"></span>
                </p>
            </div>
        </div>
        <!-- //금액 -->

        <!-- 시간표 테이블 -->
        <div class="time_table_wrap">
            <table>
                <thead>
                    <th class="border_right txt_extra">No.</th>
                    <th class="border_right">아동명</th>
                    <th class="border_right">요일</th>
                    <th class="border_right">시작시간</th>
                    <th class="border_right">종료시간</th>
                    <th class="border_right">교육시간구분</th>
                    <th class="border_right">교육비</th>
                    <th class="border_right">활동책명</th>
                    <th class="border_right">결제구분</th>
                    <th class="border_right">현금영수증</th>
                    <th>카드번호</th>
                </thead>
                <tbody class="tbody">
                </tbody>
            </table>
        </div>
        <!-- //시간표 테이블 -->

        <!-- 업무관리, 납입현황 버튼-->
        <div class="btn_wrap">
            <button class="go-otreport">업무관리</button>
            <button class="go-schedule">시간표</button>
        </div>
        <!-- //업무관리, 납입현황 버튼-->
    </div>
</body>