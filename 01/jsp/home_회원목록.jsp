<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!-- 
MenuList-001 회원목록 
 -->
<link rel="stylesheet" href="${realPath}/resources/css/member.css">
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
<%@ include file="/WEB-INF/jsp/common/popup.jsp" %>
<script src="https://www.jsviews.com/download/jsrender.js"></script>
<style>
    .calendar_calenda_wrap, .calendar_all_wrap {
        display: none;
    }
</style>
<script>
    var current_mon = 0;
    $(function () {


        cehck_apk_notice_cookie();

        if (sessionStorage.getItem("current_mon") != null) {
            current_mon = Number(sessionStorage.getItem("current_mon"));
        }

        //학습리포트로 이동
        $(document).on("click", ".btn_report", function () {
            var cont_num = $(this).attr("data-cont-num");
            var divnum = $(this).attr("data-divnum");

            var param = {
                "cont_num": cont_num
            }
            /**
             * @param cont_num erp계약번호
             */
            ajaxCallPost("${realPath}/api/v1/study/user_info", param, function (res) {
                if (res.data) {
                    location.href = "${realPath}/study/report?cont_num=" + cont_num + "&divnum=" + divnum;
                } else {
                    alert("학습 아이디를 발급받지 않았습니다.")
                }
            });

        })

        //리딩스쿨로 이동
        /**
         * @param cont_num erp계약번호
         * @param divnum 배정번호
         * @param assign_weekday 요일
         * @param assign_time_from 수업시간
         * @param item_name_ed 수업과목진도
         * */
        $(document).on("click", ".btn_rc", function () {
            var cont_num = $(this).attr("data-cont-num");
            var divnum = $(this).attr("data-divnum");
            var assign_weekday = $(this).attr("data-assign_weekday");
            var assign_time_from = $(this).attr("data-assign_time_from");
            var item_name_ed = $(this).attr("data-item_name_ed");

            var param = {
                "p_num": "${sessionScope.MEMBER.person_numb}",
                "yyyymm": global.YYYYMMs(current_mon, ""),
                "p_divnum": divnum,
                "cont_num": cont_num
            }

            /*
             *  이전엔 assign_mont_s (계약일날짜)과 현재 게시판의 날짜의 차이로 계산했지만,
             *  21.06.08 F사로부터 프로시저 추가요청이 들어옴 progress_mm (리딩스쿨 개월) 보내줘서 이걸로 계산함
             *  */
            ajaxCallPost("${realPath}/api/v1/study/user_info", param, function (res) {

                //학생의 lcms데이터 있으면
                if (res.data) {

                    var param_ = {
                        "contractcd": res.data.cust_cd
                    }

                    ajaxCallPost("${realPath}/api/v1/member/sales_stt_month", param_, function (res) {
                        //계약 개월
                        var stt_month = res.data.stt_month;
                        // var stt_month = '21';

                        ajaxCallPost("${realPath}/api/v1/member/read", param, function (res) {
                            //계약일 개월
                            var mm_month = reading_global.MM(res.data.progress_mm, stt_month);
                            // var mm_month = 21;
                            //기준 개월
                            var f_cncp_cd = reading_global.STAND_MM(mm_month);
                            // var f_cncp_cd = 66;

                           location.href = "${realPath}/school/" + f_cncp_cd + "?cont_num=" + cont_num + "&divnum=" + divnum + "&assign_weekday=" + assign_weekday + "&assign_time_from=" + assign_time_from + "&item_name_ed=" + item_name_ed + "&f_cncp_cd=" + f_cncp_cd + "&month=" + mm_month;

                        });
                    });
                } else {
                    alert("학습 아이디를 발급받지 않았습니다.")
                }
            });

        })

        //상세팝업
        $(document).on("click", ".touch_pop", function () {
            var seq = $(this).attr("data-seq");
            var yyyymm = global.YYYYMMs(current_mon, "");
            var param = {
                "p_num": "${sessionScope.MEMBER.person_numb}",
                "yyyymm": yyyymm,
                "p_divnum": seq
            }
            ajaxCallPost("${realPath}/api/v1/member/read", param, function (res) {

                //팝업 사용자 정보 매핑
                $(".info_cont_num").text(res.data.cont_num);
                $(".info_cust_repre_num").text(res.data.cust_repre_num);
                $(".info_cust_name").text(res.data.cust_name);
                $(".info_cust_hp_no").text(global.hipn(res.data.cust_hp_no));
                $(".info_child_name").text(res.data.child_name);
                $(".info_child_repre_num").text(res.data.child_repre_num);
                $(".info_rel_name").text(res.data.rel_name);
                $(".info_addr").text("(" + res.data.cust_zip_no + ")" + res.data.cust_addr + " " + res.data.cust_addr2);
                $(".info_item").text(res.data.item_name_p_ed + res.data.item_name_ed + " / " + res.data.progress);
                $(".info_assign_mont").text(global.YYYYMMd(res.data.assign_mont_s) + " ~ " + global.YYYYMMd(res.data.assign_mont_e));
                $(".info_edu_gubun_name").text(res.data.edu_gubun_name);

                var param = {
                    "c_num": res.data.cust_code
                }
                ajaxCallPost("${realPath}/api/v1/member/study", param, function (res) {
                    var template = $.templates("#members_study"); // <!-- 템플릿 선언
                    var htmlOutput = template.render(res); // <!-- 렌더링 진행 -->
                    $(".study-li").html(htmlOutput);
                    $("#meb_infoWrap").show();
                })
            })
        });

        //달력 좌우 화살표
        $(".cal_arrow_left").click(function () {
            current_mon--;
            $("input[name=search_text]").val("")
            init(current_mon)
        })
        $(".cal_arrow_right").click(function () {
            console.log("B current_mon :" + current_mon);
            current_mon++;
            console.log("A current_mon :" + current_mon);
            $("input[name=search_text]").val("")
            init(current_mon)
        })

        //검색버튼 클릭시
        $(document).on("click", ".search-btn", function () {
            init(current_mon);
        });

        init(current_mon);
    })


    //사용자 리스트
    function init(current_mon) {
        sessionStorage.setItem("current_mon", current_mon);
        var yyyymm = global.YYYYMMs(current_mon, "");
        var yyyymm_ = global.YYYYMMs(current_mon, ".");

        console.log("yyyymm :" + yyyymm);
        var search_text = $("input[name=search_text]");
        var p_sort_code = $("input[name=p_sort_code]");
        var p_sort_type = $("input[name=p_sort_type]");
        $(".cal_txt").text(yyyymm_);

        var param = {
            "person_numb": "${sessionScope.MEMBER.person_numb}",
            "yyyymm": yyyymm,
            "p_search": search_text.val(),
            "p_sort_code": p_sort_code.val(),
            "p_sort_type": p_sort_type.val()
        }
        ajaxCallPost("${realPath}/api/v1/member", param, function (res) {

            var len = 0;
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].item_type == 'ET') {	//리딩토탈(ET), 교과토탈(TS)
                    len++;
                }
            }
            //이달의 수업 회원수
            $(".con2_txt2").text(len + "명");
            var template = $.templates("#members"); // <!-- 템플릿 선언
            var htmlOutput = template.render(res); // <!-- 렌더링 진행 -->
            $(".tbody").html(htmlOutput);

            //이달의 총 입금액
            var param = {
                "person_numb": "${sessionScope.MEMBER.person_numb}",
                "yyyymm": yyyymm
            }
            ajaxCallPost("${realPath}/api/v1/member/month/pay", param, function (res) {
                if (res.data) {
                    var cash_amt = res.data.cash_amt;
                    var pay_amt_tot = res.data.pay_amt_tot;
                    $(".con3_txt2").text(global.comma(cash_amt) + " 원");
                } else {
                    $(".con3_txt2").text("0 원");
                }
            })

        })

    }

</script>
<script type="text/x-jsrender" id="members">
{{for data}}
  {{if item_type == 'ET'}}
					<tr>
                        <td class="touch_pop" data-seq="{{:div_numv}}">{{:cont_num}}</td>
                        <td >{{:child_name}}님</td>
                        <td >{{hipn:hp_no}}</td>
                        <td >
							{{if assign_weekday == '1'}} 일요일
							{{else assign_weekday == '2'}} 월요일
							{{else assign_weekday == '3'}} 화요일
							{{else assign_weekday == '4'}} 수요일
							{{else assign_weekday == '5'}} 목요일
							{{else assign_weekday == '6'}} 금요일
							{{else assign_weekday == '7'}} 토요일
							{{/if}}
						</td>
                        <td >{{:assign_time_from}}~{{:assign_time_to}}</td>
                        <td class="td_subject_no_border">
							<span class="td_subject">{{:item_name_p_ed}} {{:item_name_ed}} / {{:progress}}</span>
						</td>
                        <td class="btn_re_left"><button class="btn_rc" data-cont-num="{{:cont_num}}" data-divnum="{{:div_numv}}" data-assign_weekday="{{:assign_weekday}}" data-assign_time_from="{{:assign_time_from}}" data-item_name_ed="{{:item_name_ed}}">리딩스쿨</button></td>
                        <td><button class="btn_report" data-cont-num="{{:cont_num}}" data-divnum="{{:div_numv}}">학습리포트</button></td>
                    </tr>
	{{/if}}
{{/for}}

</script>
<script type="text/x-jsrender" id="members_study">
{{for data}}
					    <li class="li8 li_color"><p>{{:cont_num}}</p></li>
                        <li class="li9 li_color"><p>{{:item_name}}</p></li>
                        <li class="li10 li_color"><p>{{:child_name}}</p></li>
                        <li class="li11 li_color"><p>{{:child_repre_num}}</p></li>
                        <li class="li12 li_color"><p class="{{if edu_gubun_name == '수업중'}}color0{{else}}color1{{/if}}">{{if edu_gubun_name == '수업중'}}Y{{else}}N{{/if}}</p></li>
                        <li class="li13 li_color"><p>{{:item_name_p_ed}}</p></li>
                        <li class="li14 li_color"><p>{{YYYYMMd:assign_mont_s}} ~ {{YYYYMMd:assign_mont_t}}</p></li>
                        <li class="li15 li_color"><p>{{:edu_gubun_name}}</p></li>
{{/for}}

</script>
<div class="">

    <!-- 상단 교사명, 회원 수, 총 입금액 -->
    <div class="title_wrap">
        <ul>
            <li class="tit_con1">
                <p class="con1_txt1">${sessionScope.MEMBER.dept_name}&nbsp;${sessionScope.MEMBER.tree_name}</p>
                <p class="con1_txt2">${sessionScope.MEMBER.person_name}&nbsp;${sessionScope.MEMBER.job_name}</p>
                <button class="con1_txt3 go-otreport">업무관리</button>
            </li>
            <li class="tit_con2">
                <p class="con2_txt1">이 달의 수업 회원 수</p>
                <p class="con2_txt2"></p>
                <button class="con2_txt3 go-schedule">시간표</button>
            </li>
            <li class="tit_con3">
                <p class="con3_txt1">이 달의 현금 입금액 <span class="con3_txt1_sub"></span></p>
                <p class="con3_txt2"></p>
                <button class="con3_txt3 go-paylist">납입현황</button>
            </li>
        </ul>
    </div>
    <!-- //상단 교사명, 회원 수, 총 입금액 -->

    <!-- 좌측 달력 선택-->
    <div class="calendar_wrap">
        <ul>
            <li class="cal_arrow_left">
                <img src="${realPath}/resources/images/left_1.png">
            </li>
            <li class="cal_txt"></li>
            <li class="cal_arrow_right">
                <img src="${realPath}/resources/images/right_1.png">
            </li>
        </ul>
    </div>
    <!-- //좌측 달력 선택-->

    <!-- 검색 -->
    <div class="search_wrap">
        <span class="search_icon"></span>
        <input type="text" placeholder="계약번호, 아동명, 전화번호" name="search_text">
        <button class="searchBtn" type="button">
            <img src="${realPath }/resources/images/jh_2.svg" alt="조회버튼_이미지"/>
            <span class="btnText search-btn">조회</span>
        </button>
    </div>
    <!-- //검색 -->

    <!-- 학생 테이블 -->
    <div class="info_table_wrap">
        <table>
            <thead>
            <th>계약번호<span class="arrow_down" data-sort="1"></span></th>
            <th>아동명<span class="arrow_down" data-sort="2"></span></th>
            <th>전화번호<span class="arrow_down" data-sort="3"></span></th>
            <th>수업요일<span class="arrow_down" data-sort="4"></span></th>
            <th>수업시간<span class="arrow_down"></span></th>
            <th class="th_subject" colspan="2">수업과목/진도<span class="arrow_down" data-sort="5"></span></th>
            <th>학습현황</th>
            </thead>
            <tbody class="tbody">
            </tbody>
        </table>
    </div>
    <!-- //학생 테이블 -->

    <!-- 부모상담 버튼 -->
    <div class="btn_wrap go-counsellist">
        <button type="button">부모상담</button>
    </div>
    <!-- //부모상담 버튼 -->

    <!-- 팝업 -->
    <div id="meb_infoWrap">
        <div class="bg_dim"></div>
        <div class="meb_infoArea">
            <div class="mebHeader">
                <strong>회원 상세 정보</strong>
                <span><img src="${realPath}/resources/images/member_info_pop_close.svg" alt="팝업닫기 버튼"/></span>
            </div>
            <div class="mebContainer">
                <div class="title">
                    <strong>기본 정보</strong>
                    <span class="tit_num">계약번호: </span><span class="color_b info_cont_num"></span>
                </div>


                <dl class="basic_ifo_box">
                    <dt class="dt_wd0 dt_border"><strong>계약자명</strong></dt>
                    <dd class="dd_wd0">
                        <p class="info_cust_name"></p>
                    </dd>
                    <dt class="dt_wd1"><strong>생년월일</strong></dt>
                    <dd class="dd_wd1">
                        <p class="info_cust_repre_num"></p>
                    </dd>
                    <dt class="dt_wd1"><strong>전화번호</strong></dt>
                    <dd class="dd_wd2">
                        <p class="info_cust_hp_no"></p>
                    </dd>
                    <dt class="dt_wd0 dt_border"><strong>아동명</strong></dt>
                    <dd class="dd_wd0 dd_color">
                        <p class="info_child_name"></p>
                    </dd>
                    <dt class="dt_wd1 dt_boder_b"><strong>생년월일</strong></dt>
                    <dd class="dd_wd1 dd_color">
                        <p class="info_child_repre_num"></p>
                    </dd>
                    <dt class="dt_wd1 dt_boder_b"><strong>관계</strong></dt>
                    <dd class="dd_wd2 dd_color">
                        <p class="info_rel_name"></p>
                    </dd>
                    <dt class="dt_wd0 dt_border"><strong>주소</strong></dt>
                    <dd class="dd_addr dd_long">
                        <p class="info_addr"></p>
                    </dd>
                    <dt class="dt_wd1 dt_border"><strong>수업기간</strong></dt>
                    <dd class="dd_wd2 dd_color">
                        <p class="info_assign_mont"></p>
                    </dd>

                    <dt class="dt_wd0 dt_border1"><strong>과목/진도</strong></dt>
                    <dd class="dd_color dd_long">
                        <p class="info_item"></p>
                    </dd>
                    <dt class="dt_wd1 dt_border1"><strong>수업상태</strong></dt>
                    <dd class="dd_wd2 dd_color">
                        <p class="info_edu_gubun_name"></p>
                    </dd>
                </dl>


                <div class="title">
                    <strong>수업 이력</strong>
                </div>
                <ul class="class_info_box">
                    <li class="li0"><strong>계약번호</strong></li>
                    <li class="li1"><strong>구매상품</strong></li>
                    <li class="li2"><strong>아동명</strong></li>
                    <li class="li3"><strong>생년월일</strong></li>
                    <li class="li4"><strong>수업여부</strong></li>
                    <li class="li5"><strong>수업과목</strong></li>
                    <li class="li6"><strong>수업기간</strong></li>
                    <li class="li7"><strong>수업상태</strong></li>
                    <div class="study-li">
                    </div>
                </ul>
            </div>
        </div>
    </div>
    <!-- //팝업 -->
</div>

<script>
    $(document).ready(function () {

        // 달력 왼쪽, 오른쪽 화살표 눌렀을 시 이미지 색 변경
        $(".cal_arrow_left img").on("click", function () {
            $(".cal_arrow_left img").attr("src", "${realPath}/resources/images/left_press_1.png");
            setTimeout(function () {
                $(".cal_arrow_left img").attr("src", "${realPath}/resources/images/left_1.png");
            }, 200);
        });
        $(".cal_arrow_right img").on("click", function () {
            $(".cal_arrow_right img").attr("src", "${realPath}/resources/images/right_press_1.png");
            setTimeout(function () {
                $(".cal_arrow_right img").attr("src", "${realPath}/resources/images/right_1.png");
            }, 200);
        });

        //검색창에 커서가 있을 시 돋보기 사라지고 커서 없으면 나타나고
        $(".search_wrap > input").mouseover(function () {
            $(".search_icon").hide();
        });
        $(".search_wrap > input").mouseout(function () {
            $(".search_icon").show();
        });

        // 계약번호, 아동명, 전화번호, 수업요일, 수업시간, 수업과목/진도, 납부현황 오름차순 또는 내림차순 정렬
        $(".info_table_wrap th").on("click", function () {

            var ss = $(this).find("span").hasClass("arrow_down")
            $(".info_table_wrap th > span").removeClass("arrow_up");
            $(".info_table_wrap th > span").addClass("arrow_down");

            var p_sort_type = "A";
            if (ss) {
                $(this).find("span").removeClass("arrow_down").addClass("arrow_up");
            } else {
                p_sort_type = "D";
                $(this).find("span").removeClass("arrow_up").addClass("arrow_down");
            }
            ;
            var p_sort_code = $(this).find("span").attr("data-sort");
            $("input[name=p_sort_code]").val(p_sort_code);
            $("input[name=p_sort_type]").val(p_sort_type);
            init(current_mon);

        });

        // 팝업 닫기 눌렀을 시 팝업 사라짐
        $(".mebHeader img").on("click", function () {
            $("#meb_infoWrap").hide();
        });
        
    });
</script>
<input type="hidden" name="p_sort_code">
<input type="hidden" name="p_sort_type">
<form name="form">
    <input type="hidden" name="user_cd" value="">
    <input type="hidden" name="cont_num" value="">
    <input type="hidden" name="divnum" value="">
</form>