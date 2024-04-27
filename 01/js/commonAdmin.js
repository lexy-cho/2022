/* 업데이트,점검
*  로그 찍히지 않게 ajaxCallPost 안씀
* */
var notice_popup_idx = 0;
$(function(){
    check_apk();

    var time = 1000 * 60 * 30;
    setInterval(function(){
        check_apk();
    }, time);

});

/* 일반 공지 */
function cehck_apk_notice(){

    var param = {
        "app_type" : 'TEACHER'
        ,"apk_gb" : 'APK'
        ,"notice_type" : "일반팝업"
    }

    $.ajax({
        type : "POST",
        url : realPath+"/api/v1/check",
        contentType : "application/json",
        dataType : "JSON",
        data : JSON.stringify(param),
        success : function(res) {
            $('.notice-wrap').show();
            $('.notice-title').text(res.data.notice_title);
            $('.notice-content-desc').html(res.data.notice_desc);
            notice_popup_idx = res.data.idx;
        }
    });
}

/* 일반 공지 쿠기 확인 */
function cehck_apk_notice_cookie(){

    var param = {
        "app_type" : 'TEACHER'
        ,"apk_gb" : 'APK'
        ,"notice_type" : "일반팝업"
    }

    $.ajax({
        type : "POST",
        url : realPath+"/api/v1/check",
        contentType : "application/json",
        dataType : "JSON",
        data : JSON.stringify(param),
        success : function(res) {

            //일반공지 팝업
            if($.cookie('noticeCookie'+res.data.idx) == undefined && $.cookie('noticeCookie'+res.data.idx) != 'Y') {
                cehck_apk_notice();
            }

        }
    });
}

/* 시스템 점검 */
function check_apk(){

    var param = {
        "app_type" : 'TEACHER'
        ,"apk_gb" : 'APK'
        ,"notice_type" : "시스템팝업"
    }

    $.ajax({
        type : "POST",
        url : realPath+"/api/v1/check",
        contentType : "application/json",
        dataType : "JSON",
        data : JSON.stringify(param),
        success : function(res) {
            location.href = realPath+"/admin/checkinfo?noticedesc="+res.data.notice_desc+"&noticetitle="+res.data.notice_title;
        }
    });
}

/* 업데이트 팝업 */
function check_apk_version(version,gb){

    var param ={
        "apk_version" : version
        , "app_type" : 'TEACHER'
        , "apk_gb" : gb
    }

    $.ajax({
        type : "POST",
        url : realPath+"/api/v1/check_version",
        contentType : "application/json",
        dataType : "JSON",
        data : JSON.stringify(param),
        success : function(res) {
            var url = res.data.apk_file_path + res.data.package_name;
            location.href = realPath+"/admin/updateinfo?apkdesc="+res.data.apk_desc+"&apktitle="+res.data.apk_title+"&url="+url;
        }
    });
}
