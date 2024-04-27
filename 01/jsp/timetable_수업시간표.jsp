<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 
MenuList-003 수업시간표 
 -->
<link rel="stylesheet" href="${realPath}/resources/css/time_table.css">
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
		init();
	})
	
	function init(){
		var yyyymm = global.YYYYMMs(current_mon, "");
 		$(".date_title").text(yyyymm.substring(4)+"월 수업시간표");
 		
 		var param = {
				"p_num":"${sessionScope.MEMBER.person_numb}",
				"p_mon":yyyymm
		}
		ajaxCallPost("${realPath}/api/v1/timetable", param, function(res){
			
			var times = [];
			for(var i = 0 ; i < res.data.length ; i++){
				
				var is_temp = true;
				for(var x = 0 ; x < times.length ; x++){
					if(res.data[i].assign_time_from == times[x].time){
						is_temp = false;
					}
				}
				
				if(is_temp){
					var obj = {}
					obj.time = res.data[i].assign_time_from;
					obj.datas = res.data;
					times.push(obj);
					times.sort();
				}
			}
			
			times.sort(function(a, b){
				return a.time.replace(":","")-b.time.replace(":","");
			})
			
			
			var tempObject = {}
			tempObject.timeList = times;
			console.log(tempObject)
			
			var template = $.templates("#times"); // <!-- 템플릿 선언
	        var htmlOutput = template.render(tempObject); // <!-- 렌더링 진행 -->
	        $(".tbody").html(htmlOutput);
	        
		})
	}
</script>
<script type="text/x-jsrender" id="times">
{{for timeList }}
					<tr>
                        <td>{{:time}}</td>
                        <td class="first_td">
						{{for datas }}
							{{if #parent.parent.data.time == assign_time_from && assign_weekday == '2'}}
								 {{:item_name}} {{:child_name}}
							{{/if}}
						{{/for}}
						</td>
                        <td class="first_td">
						{{for datas }}
							{{if #parent.parent.data.time == assign_time_from && assign_weekday == '3'}}
								 {{:item_name}} {{:child_name}}
							{{/if}}
						{{/for}}
						</td>
                        <td class="first_td">
						{{for datas }}
							{{if #parent.parent.data.time == assign_time_from && assign_weekday == '4'}}
								 {{:item_name}} {{:child_name}}
							{{/if}}
						{{/for}}
						</td>
                        <td class="first_td">
						{{for datas }}
							{{if #parent.parent.data.time == assign_time_from && assign_weekday == '5'}}
								 {{:item_name}} {{:child_name}}
							{{/if}}
						{{/for}}
						</td>
                        <td class="first_td">
						{{for datas }}
							{{if #parent.parent.data.time == assign_time_from && assign_weekday == '6'}}
								 {{:item_name}} {{:child_name}}
							{{/if}}
						{{/for}}
						</td>
                        <td class="first_td">
						{{for datas }}
							{{if #parent.parent.data.time == assign_time_from && assign_weekday == '7'}}
								{{:item_name}} {{:child_name}}
							{{/if}}
						{{/for}}
						</td>
                    </tr>
{{/for}}
</script>
    <div>
        <!-- 시간표 헤더 -->
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
        <!-- //시간표 헤더 -->

        <!-- 시간표 테이블 -->
        <div class="time_table_wrap" style="overflow: scroll;">
            <table>
                <thead>
                    <th class="first_th"></th>
                    <th>월요일</th>
                    <th>화요일</th>
                    <th>수요일</th>
                    <th>목요일</th>
                    <th>금요일</th>
                    <th>토요일</th>
                </thead>
                <tbody class="tbody">
                </tbody>
            </table>
        </div>
        <!-- //시간표 테이블 -->

        <!-- 업무관리, 납입현황 버튼-->
        <div class="btn_wrap">
            <button class="go-otreport">업무관리</button>
            <button class="go-paylist">납입현황</button>
        </div>
        <!-- //업무관리, 납입현황 버튼-->
    </div>
    <script>
    // 수업시간표 양 옆 화살표 눌렀을 시 색 바뀜
    $(document).ready(function(){
        $(".date_sel_left img").on("click", function(){
            $(".date_sel_left img").attr("src", "${realPath}/resources/images/previous_press1.png");
            setTimeout(function(){
                $(".date_sel_left img").attr("src", "${realPath}/resources/images/previous_1.png");
            }, 200);
        });

        $(".date_sel_right img").on("click", function(){
            $(".date_sel_right img").attr("src", "${realPath}/resources/images/next_press_1.png");
            setTimeout(function(){
                $(".date_sel_right img").attr("src", "${realPath}/resources/images/next_1.png");
            }, 200);
        });
    });
    </script>
