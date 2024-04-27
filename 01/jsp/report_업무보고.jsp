<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 
MenuList-002 업무보고(OT보고) 
 -->
<link rel="stylesheet" href="${realPath}/resources/css/ot_report.css">
<script src="https://www.jsviews.com/download/jsrender.js"></script>
<%@ include file="/WEB-INF/jsp/common/calendar.jsp"%>
<script>
	var global_cal_targer = 0;
	$(function(){
		
		//ot보고 업데이트
		$(".ot-btn").click(function(){
			
			//ot진행일
			//ot진행시간
			
			var divnum = $(this).attr("data-divnum");
			var edu_numv = $(this).attr("data-edu_numv");
			var item_code = $("select[name=not_fisish_active]").val();
			var ot_gubun = $("select[name=not_finish_ot_gubun]").val();
			
			var ot_ing_re_date = $("input[name=ot_ing_re_date]").val();
			ot_ing_re_date = ot_ing_re_date ? ot_ing_re_date.replace(/-/gi, "") : ot_ing_re_date;
			
			var ot_ing_re_time = $("select[name=time_h]").val()+$("select[name=time_m]").val();
			
			var etc = $("textarea[name=not_finish_etc]").val();
			var edu_time = $("select[name=not_finish_edu_time_name]").val();
			var assign_weekday = $("select[name=not_finish_assign_weekday]").val();
			
			//시작시간과 교육시간을 계산해서 종료시간을 추출
			var assign_time_f = $("select[name=edu_time_name_h]").val()+$("select[name=edu_time_name_m]").val();
			var tTime = global.YYYYMMDD("")+assign_time_f;
			var assign_time_t = global.YYYYMMDDs(tTime, edu_time, "");

			var param = {
					"p_num":"${sessionScope.MEMBER.person_numb}",
					"p_divnum":divnum,
					"p_edu_numv":edu_numv,
					"p_item_code":item_code,
					"p_ot_gubun":ot_gubun,
					"p_etc":etc,
					"p_edu_time":edu_time,
					"p_assign_time_f":assign_time_f,
					"p_assign_time_t":assign_time_t,
					"p_assign_weekday":assign_weekday,
					"p_ot_ing_re_date":ot_ing_re_date,
					"p_ot_ing_re_time":ot_ing_re_time
					
			}
			console.log(param)
			ajaxCallPost("${realPath}/api/v1/ot/update", param, function(res){
				init();
				$(".popup_not_finish_all_wrap").hide();
			})
		})
		var first_day = global.YYYYMMDD_FIRST(".");
		var last_day = global.YYYYMMDD_LAST(".");
		
		$(".cal_wrap_front").text(first_day);
		$(".cal_wrap_back").text(last_day);
		
		
		$(".search-btn").click(function(){
			init();	
		})
		init();
	})
	function init(){
		var p_dt_s = $(".cal_wrap_front").text().replace(/\./gi,"");
		var p_dt_e = $(".cal_wrap_back").text().replace(/\./gi,"");
		
		var param = {
				"p_num":"${sessionScope.MEMBER.person_numb}",
				"p_dt_s":p_dt_s,
				"p_dt_e":p_dt_e
		}
		ajaxCallPost("${realPath}/api/v1/ot", param, function(res){
			var template = $.templates("#members"); // <!-- 템플릿 선언
	        var htmlOutput = template.render(res); // <!-- 렌더링 진행 -->
	        $(".tbody").html(htmlOutput);
		})
	}
</script>
<script type="text/x-jsrender" id="book_list">
{{for data}}
	<option value="{{:item_code}}">{{:item_name}}</option>

{{/for}}
</script>
<script type="text/x-jsrender" id="members">
{{for data}}
   					<tr class="
						{{if ot_re_yn == 'Y'}}
								finish-tr
							{{else}}
								not-finish-tr
							{{/if}}
					" data-seq="{{:div_numv}}">
                        <td class="border_right txt_extra">{{:#index+1}}</td>
                        <td class="border_right txt_blue">{{:child_name}}</td>
                        <td class="border_right">{{hipn:hp_no}}</td>
                        <td class="border_right"><p class="addr1">{{:addr}}</p></td>
                        <td class="border_right"><p class="addr2">{{:addr2}}</p></td>
                        <td class="border_right">{{:item_name}}</td>
                        <td class="border_right">{{YYYYMMDDd:assign_date}}</td>
                        <td class="border_right">{{YYYYMMd:assign_month}}</td>
                        <td class="border_right {{if ot_re_yn == 'N'}}txt_red{{/if}}">
							{{if ot_re_yn == 'Y'}}
								완료
							{{else}}
								미완료
							{{/if}}
						</td>
                        <td class="{{if notice}}note_icon{{/if}}"></td>
                    </tr>
{{/for}}
</script>
<body>
  <!-- 시간표, 납입현황 상단 고정 -->
        <div class="time_header_wrap">
            <div>
                <p class="date_title">OT 보고</p>
                <span>${sessionScope.MEMBER.dept_name}${sessionScope.MEMBER.tree_name} ${sessionScope.MEMBER.person_name} ${sessionScope.MEMBER.job_name}</span>
            </div>
        </div>
        <!-- //시간표, 납입현황 상단 고정 -->

        <!-- 달력 -->
        <div class="cal_wrap" style="width:760px">
            <div class="cal_wrap_front"></div>
            <div class="cal_wrap_bar"></div>
            <div class="cal_wrap_back"></div>
			<div class="cal_wrap_btn_area">
			    <button class="searchBtn search-btn" type="button">
			        <img src="${realPath }/resources/images/jh_1.svg" alt="조회버튼_이미지"/>
				<span class="btnText">조회</span>
 
			    </button>
			</div>
        </div>
        <div class="calendar" id="kCalendar">
        </div>
        <!-- //달력 -->

        <!-- 테이블 -->
        <div class="time_table_wrap">
            <table>
                <thead>
                    <th class="border_right txt_extra">No.</th>
                    <th class="border_right">아동명</th>
                    <th class="border_right">핸드폰</th>
                    <th class="border_right">주소</th>
                    <th class="border_right">상세주소</th>
                    <th class="border_right">교육과목명</th>
                    <th class="border_right">OT 배정일</th>
                    <th class="border_right">교육시작월</th>
                    <th class="border_right">OT 보고 상태</th>
                    <th>비고</th>
                </thead>
                <tbody class="tbody">
                </tbody>
            </table>
        </div>
        <!-- //테이블 -->

        <!-- 업무관리, 납입현황 버튼-->
        <div class="btn_wrap">
            <button class="coming-soon">수업현황 보고</button>
        </div>
        <!-- //업무관리, 납입현황 버튼-->

        <!-- 미완료 OT 보고 팝업 -->
        <div class="popup_not_finish_all_wrap">
            <div class="popup_not_finish_wrap">
                <div class="popup_not_finish_dim"></div>
                <div class="popup_not_finish_txt_wrap">
                    <div class="not_finish_close"></div>
                    <p class="not_finish_tit">OT 보고</p>
                    <div class="not_finish_table_wrap">
                        <table>
                            <tbody>
                                <tr>
                                    <td class="first_td">아동명</td>
                                    <td class="second_td bg_pink not-finish-child_name"  colspan="3" style="text-align: left;"></td>
                                </tr>
                                <tr>
                                    <td class="first_td">교육과목명</td>
                                    <td class="second_td not-finish-item_name"></td>
                                    <td class="first_td">핸드폰</td>
                                    <td class="second_td not-finish-hp_no"></td>
                                </tr>
                                <tr>
                                    <td class="first_td">주소</td>
                                    <td class="second_td bg_pink not-finish-addr"></td>
                                    <td class="first_td">상세주소</td>
                                    <td class="second_td bg_pink not-finish-addr2"></td>
                                </tr>
                                
                                <tr>
                                    <td class="first_td">OT 과목</td>
                                    <td class="second_td not-finish-item_name_" colspan="3"></td>
                                </tr>
                                <tr>
                                    <td class="first_td">비고</td>
                                    <td class="bg_pink second_td not-finish-notice" colspan="3"></td>
                                </tr>
                                <tr>
                                    <td class="first_td">OT진행일</td>
                                    <td class="second_td">
                                        <input type="date" class="select_input" id="curdate" name="ot_ing_re_date">
                                    </td>
                                    <td class="first_td">OT진행시간</td>
                                    <td class="second_td">
                                        <select name="time_h" class="select_input">
                                        </select>
                                        <select name="time_m" class="select_input">
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="first_td" rowspan="2">팀반납처리가능여부</td>
                                    <td class="second_td bg_pink not-finish-return_yn" rowspan="2"></td>
                                    <td class="first_td">OT결과</td>
                                    <td class="second_td bg_pink">
                                        <select name="not_finish_ot_gubun" id="not_finish_ot_gubun" class="select_box">
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="first_td">교사활동자료</td>
                                    <td class="second_td">
                                        <select name="not_fisish_active" id="not_fisish_active" class="select_box">
                                            <option value="">(선택)</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="first_td" rowspan="3">팀반납사유</td>
                                    <td class="second_td txt_area" rowspan="3">
                                        <textarea placeholder="(반납 사유 입력)" name="not_finish_etc" readonly="readonly"></textarea>
                                    </td>
                                    <td class="first_td">교육시간</td>
                                    <td class="second_td bg_pink">
                                        <select name="not_finish_edu_time_name" id="not_finish_edu_time_name" class="select_box">
                                        <option value="">(선택)</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="first_td">교육요일</td>
                                    <td class="second_td">
                                        <select name="not_finish_assign_weekday" id="not_finish_assign_weekday" class="select_box">
                                            <option value="">(선택)</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="first_td">교육시작시간</td>
                                    <td class="second_td bg_pink">
                                        <select name="edu_time_name_h" class="select_input">
                                        </select>
                                        <select name="edu_time_name_m" class="select_input">
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="popup_not_finish_btn_wrap">
                    <button class="not_finish_close_btn">취소</button>
                    <button class="ot-btn">보고</button>
                </div>
            </div>
        </div>
        <!-- //미완료 OT 보고 팝업 -->

        <!-- 완료 OT 보고 팝업 -->
        <div class="popup_finish_all_wrap">
            <div class="popup_finish_wrap">
                <div class="popup_finish_dim"></div>
                <div class="popup_finish_txt_wrap">
                    <div class="finish_close"></div>
                    <p class="finish_tit">OT 보고</p>
                    <div class="finish_table_wrap">
                        <table>
                            <tbody>
                                <tr>
                                    <td class="first_td">아동명</td>
                                    <td class="second_td bg_pink finish-child_name" colspan="3" style="text-align: left;"></td>
                                </tr>
                                <tr>
                                    <td class="first_td">교육과목명</td>
                                    <td class="second_td finish-item_name"></td>
                                    <td class="first_td">핸드폰</td>
                                    <td class="second_td finish-hp_no"></td>
                                </tr>
                                <tr>
                                    <td class="first_td">주소</td>
                                    <td class="second_td bg_pink finish-addr"></td>
                                    <td class="first_td">상세주소</td>
                                    <td class="second_td bg_pink finish-addr2"></td>
                                </tr>
                                <tr>
                                    <td class="first_td">OT 과목</td>
                                    <td class="second_td finish-item_name_" colspan="3"></td>
                                </tr>
                                <tr>
                                    <td class="first_td">비고</td>
                                    <td class="bg_pink second_td finish-notice" colspan="3"></td>
                                </tr>
                                <tr>
                                    <td class="first_td">OT진행일</td>
                                    <td class="second_td finish-ot_ing_re_date"></td>
                                    <td class="first_td">OT진행시간</td>
                                    <td class="second_td finish-ot_ing_re_time"></td>
                                </tr>
                                <tr>
                                    <td class="first_td" rowspan="2">팀반납처리가능여부</td>
                                    <td class="second_td bg_pink finish-return_yn" rowspan="2"></td>
                                    <td class="first_td">OT결과</td>
                                    <td class="second_td bg_pink finish-ot_gubun">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="first_td">교사활동자료</td>
                                    <td class="second_td fisish_active">-</td>
                                </tr>
                                <tr>
                                    <td class="first_td" rowspan="3">팀반납사유</td>
                                    <td class="second_td txt_area finish-etc" rowspan="3"></td>
                                    <td class="first_td">교육시간</td>
                                    <td class="second_td bg_pink finish-edu_time_name"></td>
                                </tr>
                                <tr>
                                    <td class="first_td">교육요일</td>
                                    <td class="second_td finish-assign_weekday"></td>
                                </tr>
                                <tr>
                                    <td class="first_td">교육시작시간</td>
                                    <td class="second_td bg_pink finish-assign_time"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- //완료 OT 보고 팝업 -->
    </div>
    <script>
    	var option_default = '<option value="">(선택)</option>';
		var option_h = `
			<option value="">(선택)</option>
    		<option value="07">07</option>
        	<option value="08">08</option>
        	<option value="09">09</option>
        	<option value="10">10</option>
        	<option value="11">11</option>
        	<option value="12">12</option>
        	<option value="13">13</option>
        	<option value="14">14</option>
        	<option value="15">15</option>
        	<option value="16">16</option>
        	<option value="17">17</option>
        	<option value="18">18</option>
        	<option value="19">19</option>
        	<option value="20">20</option>
        	<option value="21">21</option>
        	<option value="22">22</option>
        	<option value="23">23</option>
    	`;
        	var option_m = `
        		<option value="">(선택)</option>
        		<option value="00">00</option>
            	<option value="10">10</option>
            	<option value="20">20</option>
            	<option value="30">30</option>
            	<option value="40">40</option>
            	<option value="50">50</option>
        	`;
        
        $(document).ready(function(){
        	$("select[name=time_h]").html(option_h)
        	$("select[name=time_m]").html(option_m)

            // 앞의 달력 눌렀을 때 달력 나타나고, 배경 바뀌고
            $(".cal_wrap_front").on("click", function(){
            	if($("#kCalendar").css("display") == 'none'){
	            	global_cal_targer = 1;
    	            $(".calendar").show();
        	        $(".cal_wrap_front").css("background", "url(${realPath}/resources/images/ot_cal_bg_sel.svg)");
            	}
            });

            // 뒤의 달력 눌렀을 때 달력 나타나고, 배경 바뀌고
            $(".cal_wrap_back").on("click", function(){
            	if($("#kCalendar").css("display") == 'none'){
            		global_cal_targer = 2;
                	$(".calendar").show();
                	$(".cal_wrap_back").css("background", "url(${realPath}/resources/images/ot_cal_bg_sel.svg)");
            	}
            });

            // 달력 닫기 눌렀을 때 달력 사라지고, 배경 바뀌고
            $(document).on("click", ".cal_close", function(){
                $(".calendar").hide();
                $(".cal_wrap_front").css("background", "url(${realPath}/resources/images/ot_cal_bg.svg)");
                $(".cal_wrap_back").css("background", "url(${realPath}/resources/images/ot_cal_bg.svg)");
            });
            
            // 현재 시간, 요일 불러오기
            $(function() {
                getTimeStamp();
                
                function getTimeStamp() {
                var d = new Date();
                var date = leadingZeros(d.getFullYear(), 4) + '-' +
                leadingZeros(d.getMonth() + 1, 2) + '-' +
                leadingZeros(d.getDate(), 2);
                
                var time = leadingZeros(d.getHours(), 2) + ':' +
                    leadingZeros(d.getMinutes(), 2);
                
	               $('#curdate').attr('value',date);
                }

                function leadingZeros(n, digits) {
                var zero = '';
                n = n.toString();
                if (n.length < digits) {
                    for (i = 0; i < digits - n.length; i++)
                        zero += '0';
                }
                return zero + n;
                }
            });
            // OT 보고 테이블의 각 미완료 행 클릭시 미완료 팝업 나타남
            $(document).on("click", ".not-finish-tr", function(){
            	var seq = $(this).attr("data-seq");
    			var param = {
    					"p_num":"${sessionScope.MEMBER.person_numb}",
    					"p_divnum":seq
    			}
            	ajaxCallPost("${realPath}/api/v1/ot/read", param, function(res){
            		$(".not-finish-child_name").text(res.data.child_name);
            		$(".not-finish-hp_no").text(global.hipn(res.data.hp_no));
            		$(".not-finish-item_name").text(res.data.item_name);
            		$(".not-finish-hp_no").text(global.hipn(res.data.hp_no));
            		$(".not-finish-addr").text(res.data.addr);
            		$(".not-finish-addr2").text(res.data.addr2);
            		$(".not-finish-item_name_").text(res.data.item_name_p_ed + " " + res.data.item_name_ed);
            		$(".not-finish-notice").text(res.data.notice);
	                
            		
            		$(".not-finish-return_yn").text(res.data.return_yn);
            		var return_yn = res.data.return_yn;
            		
            		
            		var option = "<option value=\"\">(선택)</option><option value=\"1\">교육진행</option>";
            		if(return_yn == 'Y'){
            			option += "<option value=\"4\">팀반납</option>";
            		}
            		$("#not_finish_ot_gubun").html(option);
            		
            		
            		$("textarea[name=not_finish_etc]").attr("readOnly", true);
                	selectReset();
            		
            		
            		$(".popup_not_finish_all_wrap").show();
            		
            		
            		
            		//ot보고 업데이트 위해 파라미터 담아두기
                	$(".ot-btn").attr("data-divnum", res.data.div_numv);
                	$(".ot-btn").attr("data-edu_numv", res.data.edu_numv);
                	$(".ot-btn").attr("data-item_code", res.data.item_code);
	                
            	})
            });
            $(document).on("change", "#not_finish_ot_gubun", function(){
            	var value = $(this).val();
            	if(value == '4'){//팀반납
            		$("textarea[name=not_finish_etc]").attr("readOnly", false);
    	        	selectReset();
            	}else if(value == '1'){//교육진행
            		
            		
            		var seq = $(".not-finish-tr").attr("data-seq");
            		var param = {
        					"p_num":"${sessionScope.MEMBER.person_numb}",
        					"p_divnum":seq
        			}
            		
 					ajaxCallPost("${realPath}/api/v1/ot/book", param, function(res){
 	            		var template = $.templates("#book_list"); // <!-- 템플릿 선언
				        var htmlOutput = template.render(res); // <!-- 렌더링 진행 -->
 	            		$("select[name=not_fisish_active]").html(option_default + htmlOutput);
                	})
            		
            		
            		var edu_time_name = `
            			<option value="20">20분</option>
            			<option value="30">30분</option>
            			<option value="40">40분</option>
            			<option value="60">60분</option>
            		`
            		$("select[name=not_finish_edu_time_name]").html(option_default + edu_time_name);
            		
            		var assign_weekday = `
            			<option value="2">월</option>
            			<option value="3">화</option>
            			<option value="4">수</option>
            			<option value="5">목</option>
            			<option value="6">금</option>
            			<option value="7">토</option>
            		`
            		$("select[name=not_finish_assign_weekday]").html(option_default + assign_weekday);
                	$("select[name=edu_time_name_h]").html(option_h)
                	$("select[name=edu_time_name_m]").html(option_m)
            		$("textarea[name=not_finish_etc]").attr("readOnly", true);
                	$("textarea[name=not_finish_etc]").val("")
            	}else{
            		$("textarea[name=not_finish_etc]").attr("readOnly", true);
	            	selectReset();
            	}
            });
            // OT 미완료 보고 x 버튼 누를 시 팝업 닫힘
            $(".not_finish_close, .not_finish_close_btn").on("click", function(){
                $(".popup_not_finish_all_wrap").hide();
            });

            //op보고 미완료 팝업 select 초기화
            function selectReset(){
            	$("select[name=time_h]").html(option_h);
            	$("select[name=time_m]").html(option_m);
            	$("select[name=not_fisish_active]").html(option_default);
        		$("select[name=not_finish_edu_time_name]").html(option_default);
        		$("select[name=not_finish_assign_weekday]").html(option_default);
        		$("select[name=edu_time_name_h]").html(option_default)
            	$("select[name=edu_time_name_m]").html(option_default)
            	$("textarea[name=not_finish_etc]").val("")
            }
            
            // OT 보고 테이블의 각 완료 행 클릭시 완료 팝업 나타남
            $(document).on("click", ".finish-tr", function(){
            	var seq = $(this).attr("data-seq");
    			var param = {
    					"p_num":"${sessionScope.MEMBER.person_numb}",
    					"p_divnum":seq
    			}
            	ajaxCallPost("${realPath}/api/v1/ot/read", param, function(res){
            		res.data.child_name != "" ? $(".finish-child_name").text(res.data.child_name) :  $(".finish-child_name").text('-'); 
            		res.data.hp_no != "" ? $(".finish-hp_no").text(global.hipn(res.data.hp_no)) :  $(".finish-hp_no").text('-'); 
            		res.data.item_name != "" ? $(".finish-item_name").text(res.data.item_name) :  $(".finish-item_name").text('-'); 
            		res.data.hp_no != "" ? $(".finish-hp_no").text(res.data.hp_no) :  $(".finish-hp_no").text('-'); 
            		res.data.addr != "" ? $(".finish-addr").text(res.data.addr) :  $(".finish-addr").text('-'); 
            		res.data.addr2 != "" ? $(".finish-addr2").text(res.data.addr2) :  $(".finish-addr2").text('-'); 
            		res.data.item_name_ != "" ? $(".finish-item_name_").text(res.data.item_name_p_ed + " " + res.data.item_name_ed) :  $(".finish-item_name_").text('-'); 
            		res.data.notice != "" ? $(".finish-notice").text(res.data.notice) :  $(".finish-notice").text('-'); 
            		res.data.ot_ing_re_date != "" ? $(".finish-ot_ing_re_date").text(global.YYYYMMDDd(res.data.ot_ing_re_date)) :  $(".finish-ot_ing_re_date").text('-'); 
            		res.data.ot_ing_re_time != "" ? $(".finish-ot_ing_re_time").text(res.data.ot_ing_re_time) :  $(".finish-ot_ing_re_time").text('-'); 
            		res.data.return_yn != "" ? $(".finish-return_yn").text(res.data.return_yn) :  $(".finish-return_yn").text('-');
                    res.data.item_name_ed != "" ? $(".fisish_active").text(res.data.item_name_ed) :  $(".fisish_active").text('-');

                    var ot_gubun = res.data.ot_gubun;
            		var ot_gubun_text = "-";
            		if(ot_gubun == '0') ot_gubun_text = "미정"
            		else if(ot_gubun == '1') ot_gubun_text = "교육확정"
            		else if(ot_gubun == '4') ot_gubun_text = "팀반납"
            		
            		$(".finish-ot_gubun").text(ot_gubun_text);
            		res.data.etc != "" ? $(".finish-etc").text(res.data.etc) :  $(".finish-etc").text('-'); 
            		res.data.edu_time_name != "" ? $(".finish-edu_time_name").text(res.data.edu_time_name) :  $(".finish-edu_time_name").text('-'); 
            		
            		var edu_weekday = res.data.assign_weekday;
            		var edu_weekday_text = "-";
            		if (edu_weekday == '1') edu_weekday_text = "일요일"
					else if(edu_weekday == '2') edu_weekday_text = "월요일"
					else if(edu_weekday == '3') edu_weekday_text = "화요일"
					else if(edu_weekday == '4') edu_weekday_text = "수요일"
					else if(edu_weekday == '5') edu_weekday_text = "목요일"
					else if(edu_weekday == '6') edu_weekday_text = "금요일"
					else if(edu_weekday == '7') edu_weekday_text = "토요일"
            		$(".finish-assign_weekday").text(edu_weekday_text);
            		
            		$(".finish-assign_time").text(res.data.assign_time_f2+" ~ "+res.data.assign_time_t2);
	                $(".popup_finish_all_wrap").show();
            	})
            });

            // OT 완료 보고 x 버튼 누를 시 팝업 닫힘
            $(".finish_close").on("click", function(){
                $(".popup_finish_all_wrap").hide();
            });
        });
    </script>
</body>