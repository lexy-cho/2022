var ANDROID = "android";
var IOS = "ios";

/**
 * 브릿지 공통소스
 */
function checkMobile(){
   var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));

   if (mobile) {
      var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

      if ( varUA.indexOf(ANDROID) > -1) {
         return ANDROID;
      } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
         //IOS
         return IOS;
      }
   }
}

function bridgeBackBtn(){
   location.href=realPath + "/"
}

function BridgeVersionCheck(version){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      check_apk_version(version,'APK');
   } else if (checkMobile() == IOS) {
      check_apk_version(version,'IOS');
   }
}
function  BridgeReadingInit(){
   init();
}
function  BridgetextEmptyAlert(){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.openFilePdf(url);
   }else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "openFilePdf", "url": url} );
   }
}
function BridgeOpenPdf(url){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.openFilePdf(url);
   }else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "openFilePdf", "url": url} );
   }
}

function bridgeReadingTW(obj){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeReadingTW(obj);
   }else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeReadingTW", "obj": obj} );
   }
}
function bridgeBookMapTW(obj){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeBookMapTW(obj);
   }else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeReadingTW", "obj": obj} );
   }
}

function bridgeReadingCC456(obj){

   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeReadingCC456(obj);
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeReadingCC456", "obj": obj} );
   }
}

function bridgeAppExit(){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeAppExit();
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeAppExit"} );
   }
}
/* 초기화 브릿지 */
function bridgeInit(){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeInit();
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeInit"} );
   }
}
/* 녹음 브릿지 */
function bridgeRecordStart(num){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeRecordStart(num);
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeRecordStart", "num":num} );
   }
}
/* 녹음 중단 브릿지 */
function bridgeRecordStop(num){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeRecordStop(num);
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeRecordStop", "num":num} );
   }
}
/* 녹음 중단 브릿지 리턴값받음 */
function bridgeRecordStopReturn(num){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeRecordStopReturn(num);
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeRecordStopReturn", "num":num} );
   }
}

/* 37개월 1주 2주 음성 저장 */
function bridgeRecordingSave(obj){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeRecordingSave(obj);
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeRecordingSave","obj":obj} );
   }
}
/* 37개월 1주 리셋 */
function bridgeRecordingReset(){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeRecordingReset();
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeRecordingReset"} );
   }
}
/* 37개월 3주 저장 */
function bridgeReadingSave37_3(obj){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeReadingSave37_3(obj);
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeReadingSave37_3","obj":obj} );
   }
}
/* 37개월 2주 저장 */
function bridgeRCWSave(obj){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeRCWSave(obj);
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeRCWSave","obj":obj} );
   }
}
/* 37개월 2주 리셋 */
function bridgeRCWReset(){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeRCWReset();
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeRCWReset"} );
   }
}
function bridgeCameraOpen(num){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeCameraOpen(num);
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeCameraOpen","num":num} );
   }
}
// 92개월 2주차 그리기
function bridgeDrawOpen(num){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeDrawOpen(num);
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeDrawOpen","num":num} );
   }
}

function bridgeRemoveFolder(){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeRemoveFolder();
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeRemoveFolder"} );
   }
}
function  bridgePageReload() {
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgePageReload();
      //테스트
   }
}
function bridgeCameraReturn(obj){
   cameraChange(obj)
}
function bridgeRecordReturn(obj){
   audioChange(obj)
}
/* 화상수업 */
function bridgeOnlineClasses(){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeOnlineClasses();
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeOnlineClasses"} );
   }
}

/* 북맵리포트 팝업 */
function bridgeReportPopup(obj){
   var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   if (checkMobile() == ANDROID) {
      window.teacherBridge.bridgeReportPopup(obj);
   } else if (checkMobile() == IOS) {
      webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeReportPopup"} );
   }
}

/* 키보드 다운시 실행 */
function bridgeKeyboardDown(){
   keyboarddown();
}