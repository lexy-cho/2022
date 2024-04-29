/* 업데이트,점검 */
var notice_popup_idx = 0;

$(function(){


    cehck_apk();
    var time = 1000 * 60 * 30;
    setInterval(function(){
        cehck_apk();
    }, time);



});

/* 일반 공지 */
function cehck_apk_notice(){

    var param = {
        "app_type" : 'PARENT'
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
            console.log("일반 공지 팝업");
            $('.popup_wrap8').show();
            $('.notice-title').text(res.data.notice_title);
            $('.notice-content-desc').html(res.data.notice_desc);
            notice_popup_idx = res.data.idx;
        }
    });
}

function cehck_apk_notice_cookie(){

    var param = {
        "app_type" : 'PARENT'
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
function cehck_apk(){

    var param = {
        "app_type" : 'PARENT'
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
            location.href = realPath+"/admin/check?notice="+res.data.notice_desc+"&noticetitle="+res.data.notice_title;
        }
    });

}

function check_apk_version(version,gb){

    var param ={
        "apk_version" : version
        , "app_type" : 'PARENT'
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
            location.href = realPath+"/admin/update?apkdesc="+res.data.apk_desc+"&apktitle="+res.data.apk_title+"&url="+url;
        }
    });
}
