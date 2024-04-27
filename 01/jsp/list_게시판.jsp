<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 
MenuList-006 게시판 
 -->
<link rel="stylesheet" href="${realPath}/resources/css/notice.css">
<script src="https://www.jsviews.com/download/jsrender.js"></script>
<style>
	.now_option option{color:#404040}
</style>
<script>
	$(function(){
		if("${sessionScope.MEMBER.person_type}" == '코디'){
// 			$(".show_tab5").removeClass("show_tab5")
			$(".show_tab5").show();
		}
		init_notice();
		init_teacher_i();
		init_codi();
		init_teacher();
		init_new();
		$(".guide_search").click(function(){
			init_teacher_i()
		})
		//교사지침서 차시 변경시 pdf 열기
		$(document).on("change", ".now_option", function(){
			var file_url = $(this).val();
			if(file_url){
				BridgeOpenPdf(file_url)
			}
		})
	})
	function init_notice(){
		var param = {
				"b_code":"1"
		}
		ajaxCallPost("${realPath}/api/v1/notice", param, function(res){
			var template = $.templates("#notices"); // <!-- 템플릿 선언
	        var htmlOutput = template.render(res); // <!-- 렌더링 진행 -->
	        $(".notice_tbody").html(htmlOutput);
		})
	}
	var is_first = true;
	function init_teacher_i(){
		var param = {
				"b_code":"2"
		}
		ajaxCallPost("${realPath}/api/v1/notice/teacher", param, function(res){
			
			var gubun = $("select[name=gubun]").val();
			var age = $("select[name=age]").val();
			var item = $("select[name=item]").val();
			
			var datas = [];
			for(var i = 0 ; i < res.data.length ; i++){
				if(gubun && res.data[i].b_edu_type != gubun){
					continue;
				}
				if(age){
					age = age == '2' || age == '3' ? "23":age;
					if(res.data[i].b_edu_age.indexOf(age) == -1){
						continue;
					}
				}
				
				if(item && res.data[i].b_title.indexOf(item) == -1){
					continue;
				}
				datas.push(res.data[i]);
			}
			var res = {
					"data":datas
			}
	        
			if(is_first){
				var template = $.templates("#item"); // <!-- 템플릿 선언
		        var htmlOutput = template.render(res); // <!-- 렌더링 진행 -->
		        $(".guide_option3").html(htmlOutput);
		        is_first = false;
			}
			
			for(var i = 0 ; i < res.data.length ;i++){
				var files = [];
				var b_file_list = res.data[i].b_file_list;
				var list = b_file_list.split("|");
				for(var x = 0 ; x < list.length ;x++){
					var item_cnt = list[x].split(",")[0];
					var file_nm = list[x].split(",")[1];
					
					var obj = {
							"item_cnt":item_cnt,
							"file_nm":res.data[i].b_file_root+file_nm
					}
					files.push(obj)
				}
				res.data[i].file_list = files;
			}
			
			var template = $.templates("#notices_teacher"); // <!-- 템플릿 선언
	        var htmlOutput = template.render(res); // <!-- 렌더링 진행 -->
	        $(".teacher_i_tbody").html(htmlOutput);
		})
	}
	function init_codi(){
		var param = {
				"b_code":"3"
		}
		ajaxCallPost("${realPath}/api/v1/notice", param, function(res){
			var template = $.templates("#notices"); // <!-- 템플릿 선언
	        var htmlOutput = template.render(res); // <!-- 렌더링 진행 -->
	        $(".codi_tbody").html(htmlOutput);
		})
	}
	function init_teacher(){
		var param = {
				"b_code":"4"
		}
		ajaxCallPost("${realPath}/api/v1/notice", param, function(res){
			var template = $.templates("#notices"); // <!-- 템플릿 선언
	        var htmlOutput = template.render(res); // <!-- 렌더링 진행 -->
	        $(".teacher_tbody").html(htmlOutput);
		})
	}
	function init_new(){
		var param = {
				"b_code":"5"
		}
		ajaxCallPost("${realPath}/api/v1/notice", param, function(res){
			var template = $.templates("#notices"); // <!-- 템플릿 선언
	        var htmlOutput = template.render(res); // <!-- 렌더링 진행 -->
	        $(".new_tbody").html(htmlOutput);
		})
	}
</script>
<script type="text/x-jsrender" id="notices">
{{for data}}
					      
                    <tr class="notice_tr_tit" number="t_{{:#index}}">
                        <td class="txt_date">{{:reg_date}}</td>
                        <td class="txt_left">{{:b_title}}<span class="notice_arrow_down"></span></td>
                        <td class="txt_people">{{:b_writer}}</td>
                    </tr>
                    <tr id="notice_tr_ans">
                        <td></td>
                        <td class="notice_ans_txt">
							{{:b_contents}}
                        </td>
                        <td></td>
                    </tr>
{{/for}}
</script>
<script type="text/x-jsrender" id="notices_teacher">
{{for data}}
					      
                  <tr class="second_tr">
                        <td class="second_td1">{{:b_edu_type_nm}}</td>
                        <td class="second_td2">{{:b_edu_age_nm}}</td>
                        <td class="second_td3">{{:b_title}}</td>
                        <td class="second_td4">
                            <span>
                                <select name="" id="" class="now_option">
										<option value="">선택보기</option>
									{{for file_list}}
                                    	<option value="{{:file_nm}}">{{:item_cnt}}개월</option>
									{{/for}}
                                </select>
                            </span>
                        </td>
                    </tr>
{{/for}}
</script>
<script type="text/x-jsrender" id="item">
<option value="">과목명</option>
{{for data}}
	<option value="{{:b_title}}">{{:b_title}}</option>
{{/for}}
</script>
     <div>

        <!-- 탭메뉴-->
        <div class="tap_menu">
            <ul>
                <li class="show_tab1 tap_sel">공지사항</li>
                <li class="show_tab2">교사자료실</li>
                <li class="show_tab3">교사교육</li>
                <li class="show_tab4">신입교육</li>
                <li class="show_tab5" style="display:none">코디상담자료</li>
            </ul>
        </div>
        <!-- //탭메뉴-->

        <!-- 공지사항 테이블-->
        <div class="notice_table_wrap">
            <table>
                <thead>
                    <th class="notice_date">날짜</th>
                    <th class="notice_tit">제목</th>
                    <th class="notice_people">게시자</th>
                </thead>
                <tbody class="notice_tbody">
                    
                </tbody>
            </table>
        </div>
        <!-- //공지사항 테이블-->

        <!-- 교사지침서 테이블-->
        <div class="guideline_table_wrap">
            <table>
                <thead>
                    <th colspan="4">
                        <span>
                            <select name="gubun" id="" class="guide_option1">
                                <option value="">구분</option>
                                <option value="1">은물</option>
                                <option value="2">영어</option>
                                <option value="3">토탈</option>
                            </select>
                        </span>
                        <span>
                            <select name="age" id="" class="guide_option2">
                                <option value="">연령</option>
                                <option value="1">영아</option>
                                <option value="2">유아</option>
                                <option value="4">초등</option>
                            </select>
                        </span>
                        <span>
                            <select name="item" id="" class="guide_option3">
                                <option value="">과목명</option>
                            </select>
                        </span>
                        <span class="guide_search">
                            <img src="${realPath }/resources/images/nf.png">
                        </span>
                    </th>
                </thead>
                <tbody>
                    <tr class="first_tr">
                        <td class="guideline_division">구분</td>
                        <td class="guideline_age">연령</td>
                        <td class="guideline_lesson">과목명</td>
                        <td class="guideline_now">차시</td>
                    </tr>
                    <tbody class="teacher_i_tbody"></tbody>
                </tbody>
            </table>
        </div>
        <!-- //교사지침서 테이블-->


        <!-- 교사교육 테이블-->
        <div class="teacher_table_wrap">
            <table>
                <thead>
                    <th class="notice_date">날짜</th>
                    <th class="notice_tit">제목</th>
                    <th class="notice_people">게시자</th>
                </thead>
                <tbody class="teacher_tbody">
                    
                </tbody>
            </table>
        </div>
        <!-- //교사교육 테이블-->

        <!-- 신입교육 테이블 -->
        <div class="newcomer_table_wrap">
            <table>
                <thead>
                    <th class="notice_date">날짜</th>
                    <th class="notice_tit">제목</th>
                    <th class="notice_people">게시자</th>
                </thead>
                <tbody class="new_tbody">
                </tbody>
            </table>
        </div>
        <!-- //신입교육 테이블 -->
        
        <!-- 코디상담자료 테이블-->
        <div class="advice_table_wrap">
            <table>
                <thead>
                    <th class="notice_date">날짜</th>
                    <th class="notice_tit">제목</th>
                    <th class="notice_people">게시자</th>
                </thead>
                <tbody class="codi_tbody">
                </tbody>
            </table>
        </div>
        <!-- //코디상담자료 테이블-->
    </div>
    <script>
        $(document).ready(function(){
            // 공지사항 눌렀을 때 답변 나타나고, 사라지고
            $(document).on("click", ".notice_tr_tit", function(){
                if ($(this).hasClass('notice_tr_ans')) {
                    fadeOut($(this));
                } else {
                    fadeOut($(this));
                    $(this).css("background", "#F2BF89");
                    $(this).addClass('notice_tr_ans').next().fadeIn();
                    $(this).find('.notice_arrow_down').removeClass("notice_arrow_down").addClass("notice_arrow_up");
                    allfadeOut($(this));
                }
                
                function fadeOut(mo) {
                    mo.css("background", "#ffffff");
                    mo.removeClass('notice_tr_ans').next().fadeOut();
                    mo.find('.notice_arrow_up').removeClass("notice_arrow_up").addClass("notice_arrow_down");
                };
                
                function allfadeOut(mo){
                    var body = $('tbody tr');
                    for(var i=0; i<body.length; i++){
                        if( (mo.attr('number') != body.eq(i).attr('number')) && body.eq(i).hasClass('notice_tr_tit')){
                            body.eq(i).next().fadeOut();
                            fadeOut(body.eq(i));
                        }
                    }         
                }
            });

            //탭메뉴 누를 시 각 메뉴에 해당하는 테이블 나타남
            $(document).on("click", ".show_tab1", function(){
                $(".guideline_table_wrap").hide();
                $(".advice_table_wrap").hide();
                $(".teacher_table_wrap").hide();
                $(".newcomer_table_wrap").hide();
                $(".show_tab2, .show_tab3, .show_tab4, .show_tab5").removeClass("tap_sel");
                $(".show_tab1").addClass("tap_sel");
                $(".notice_table_wrap").show();
            }); //공지사항

            $(document).on("click", ".show_tab2", function(){
                $(".notice_table_wrap").hide();
                $(".advice_table_wrap").hide();
                $(".teacher_table_wrap").hide();
                $(".newcomer_table_wrap").hide();
                $(".show_tab1, .show_tab3, .show_tab4, .show_tab5").removeClass("tap_sel");
                $(".show_tab2").addClass("tap_sel");
                $(".guideline_table_wrap").show();
            }); //교사지침서

            $(document).on("click", ".show_tab5", function(){
                $(".notice_table_wrap").hide();
                $(".guideline_table_wrap").hide();
                $(".teacher_table_wrap").hide(); 
                $(".newcomer_table_wrap").hide();
                $(".show_tab1, .show_tab2, .show_tab3, .show_tab4").removeClass("tap_sel");
                $(".show_tab5").addClass("tap_sel");
                $(".advice_table_wrap").show();
            }); //코디상담자료 

            $(document).on("click", ".show_tab3", function(){
                $(".notice_table_wrap").hide();
                $(".guideline_table_wrap").hide();
                $(".advice_table_wrap").hide(); 
                $(".newcomer_table_wrap").hide();
                $(".show_tab1, .show_tab2, .show_tab4, .show_tab5").removeClass("tap_sel");
                $(".show_tab3").addClass("tap_sel");
                $(".teacher_table_wrap").show();
            }); //교사교육

            $(document).on("click", ".show_tab4", function(){
                $(".notice_table_wrap").hide();
                $(".guideline_table_wrap").hide();
                $(".advice_table_wrap").hide();
                $(".teacher_table_wrap").hide();
                $(".show_tab1, .show_tab2, .show_tab3, .show_tab5").removeClass("tap_sel");
                $(".show_tab4").addClass("tap_sel");
                $(".newcomer_table_wrap").show();
            }); //신입교육
        });
    </script>
</body>