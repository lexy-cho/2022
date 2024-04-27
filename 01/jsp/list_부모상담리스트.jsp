<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 
MenuList-005 부모 상담 리스트 
 -->
<link rel="stylesheet" href="${realPath}/resources/css/parent_counsel_list.css">
<script src="https://www.jsviews.com/download/jsrender.js"></script>
<script>
$(function(){

	$(document).on("click", ".btn_counseling", function(){
		var idx = $(this).attr("data-seq");
		var month = $(this).attr("data-month");
		var week = $(this).attr("data-week");
		var cont_num = $(this).attr("data-cont_num");
		var f_date = $(this).attr("data-fdate");
        var f_cncp_cd = reading_global.STAND_MM(month);
        var goods_cd = 0;

        var param = {
            "cont_num": cont_num
        }
        ajaxCallPost("${realPath}/api/v1/study/user_info", param, function (res) {
            /**
             * @param user_cd 학생id
             */
            var param = {
                "user_cd": res.data.user_cd
            }
            ajaxCallPost("${realPath}/api/v1/study/grade/user_cd", param, function (res) {
                goods_cd = res.data.goods_c;
		        location.href = "${realPath}/counsel/view/"+idx+"?month="+month+"&week="+week+"&cont_num="+cont_num+"&f_date="+f_date+"&f_cncp_cd="+f_cncp_cd+"&goods_cd=" +goods_cd;
            });
        });


	});
	$(document).on("click", ".search-btn", function(){
		init();
	});
	init()
});
function init(){
	/*
		부모상담리스트
	*/
	var search_text = $("input[name=search_text]");
	var param = {
		"p_num": "${sessionScope.MEMBER.person_numb}",
		"f_child_nm":search_text.val()
	}
    /**
     * @param p_num 선생님 사번번호
     * @param f_child_nm 학생이름
     */
	ajaxCallPost("${realPath}/api/v1/study/parent", param, function(res){
		var template = $.templates("#notices"); // <!-- 템플릿 선언
        var htmlOutput = template.render(res); // <!-- 렌더링 진행 -->
        $(".tbody").html(htmlOutput);
	})
}
</script>
<script type="text/x-jsrender" id="notices">
{{for data}}
					<tr>
                        <td class="border_right txt_blue">{{YYYYMMDDd:f_date}}</td>
                        <td class="border_right">{{:f_child_nm}}</td>
                        <td class="border_right">
							{{if f_yoil == '1'}} 일요일
							{{else f_yoil == '2'}} 월요일
							{{else f_yoil == '3'}} 화요일
							{{else f_yoil == '4'}} 수요일
							{{else f_yoil == '5'}} 목요일
							{{else f_yoil == '6'}} 금요일
							{{else f_yoil == '7'}} 토요일
							{{/if}}
						</td>
                        <td class="border_right">{{:f_time}}</td>
                        <td class="border_right">{{:f_sub_prog}}</td>
                        <td><%--{{:f_month}}개월 {{:f_week}}주--%><button class="btn_counseling" data-seq="{{:f_idx}}" data-month="{{:f_month}}" data-week="{{:f_week}}" data-cont_num="{{:f_cont_num}}" data-fdate="{{YYYYMMDDd:f_date}}">상담보기</button></td>
                    </tr>
{{/for}}
</script>
<body>

        <!-- 시간표, 납입현황 상단 고정 -->
        <div class="time_header_wrap">
            <div>
                <p class="date_title">부모 상담 리스트</p>
                <span>${sessionScope.MEMBER.dept_name}${sessionScope.MEMBER.tree_name} ${sessionScope.MEMBER.person_name} ${sessionScope.MEMBER.job_name}</span>
            </div>
        </div>
        <!-- //시간표, 납입현황 상단 고정 -->

        <!-- 검색 -->
        <div class="search_wrap">
            <span class="search_icon"></span>
            <input type="text" placeholder="아동명" name="search_text">
            <button class="searchBtn search-btn" type="button">
			   <img src="${realPath }/resources/images/jh_2.svg" alt="조회버튼_이미지"/>
			   <span class="btnText">조회</span>
			</button>
        </div>
        <!-- //검색 -->

        <!-- 부모 테이블 -->
        <div class="time_table_wrap">
            <table>
                <thead>
                    <th class="border_right">날짜</th>
                    <th class="border_right">아동명</th>
                    <th class="border_right">수업요일</th>
                    <th class="border_right">수업시간</th>
                    <th class="border_right">수업과목 / 진도</th>
                    <th>부모상담</th>
                </thead>
                <tbody class="tbody">
                </tbody>
            </table>
        </div>
        <!-- //부모 테이블 -->

        <!-- 업무관리, 납입현황 버튼-->
        <div class="btn_wrap">
            <button class="go-otreport">업무관리</button>
            <button class="go-schedule">시간표</button>
            <button class="go-paylist">납입현황</button>
        </div>
        <!-- //업무관리, 납입현황 버튼-->
    </div>
    <script>
        $(document).ready(function(){
            //검색창에 커서가 있을 시 돋보기 사라지고 커서 없으면 나타나고
            $(".search_wrap > input").mouseover(function(){
                $(".search_icon").hide();
            });
            $(".search_wrap > input").mouseout(function(){
                $(".search_icon").show();
            });
        });
    </script>
</body>