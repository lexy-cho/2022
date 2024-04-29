var ANDROID = "android";
var IOS = "ios";
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

function BridgeVersionCheck(version){
	var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	if (checkMobile() == ANDROID) {
		check_apk_version(version,'APK');
	} else if (checkMobile() == IOS) {
		check_apk_version(version,'IOS');
	}
}

function bridgeBackBtn(){
	location.href=realPath + "/"
}

function bridgeGetHashData(key){
	var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	if (checkMobile() == ANDROID) { 
		window.parentBridge.bridgeGetHashData(key);
	} else if (checkMobile() == IOS) {
		webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeGetHashData", "key": key} );
	}
}
function bridgeGetHashDataRst(value){
}
function bridgeSetHashData(key, value){
	var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	if (checkMobile() == ANDROID) { 
		window.parentBridge.bridgeGetHashData(key, value);
	} else if (checkMobile() == IOS) {
		webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeSetHashData", "key": key, "value": value} );
	}
}
function bridgeSetAutoLogin(is_auto){
	var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	if (checkMobile() == ANDROID) { 
		window.parentBridge.bridgeSetAutoLogin(is_auto);
	} else if (checkMobile() == IOS) {
		webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeSetAutoLogin", "is_auto": is_auto} );
	}
}
function bridgeSetAutoLoginSynk(is_auto){
	is_auto = is_auto == 'true' ? true : "";
	localStorage.setItem("user_cd", bridge_user_cd);
	alert('bridge_user_cd :' + bridge_user_cd);
	localStorage.setItem("user_ps", bridge_user_ps);
	alert('bridge_user_ps :' + bridge_user_ps);
	localStorage.setItem("auto_yn", is_auto);
	alert('is_auto :' + is_auto);
}
function bridgeLogout(){
	location.href = realPath+"/logout";
}
function bridgeGetId(){
	var user_cd = bridge_user_cd;
	var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	if (checkMobile() == ANDROID) { 
		window.parentBridge.bridgeGetIdRst(user_cd);
	} else if (checkMobile() == IOS) {
		webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeGetIdRst", "user_cd": user_cd} );
	}
}
function bridgeCallPhone(value){
	var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	if (checkMobile() == ANDROID) { 
		window.parentBridge.bridgeCallPhone(value);
	} else if (checkMobile() == IOS) {
		webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeCallPhone", "value": value} );
	}
}
function bridgeOpenOptionPage(){
	var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	if (checkMobile() == ANDROID) { 
		window.parentBridge.bridgeOpenOptionPage();
	} else if (checkMobile() == IOS) {
		webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeOpenOptionPage"} );
	}
}
function bridgeOpenReadingPop(){
	var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	if (checkMobile() == ANDROID) { 
		window.parentBridge.bridgeOpenReadingPop();
	} else if (checkMobile() == IOS) {
		webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeOpenReadingPop"} );
	}
}
function bridgeOrientLandscape(){
	var varUA = navigator.userAgent.toLowerCase();
	if (checkMobile() == ANDROID) { 
		window.parentBridge.bridgeOrientLandscape();
	} else if (checkMobile() == IOS) {
		webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeOrientLandscape"} );
	}
}
function bridgeOrientLandscapeBack(){
	var varUA = navigator.userAgent.toLowerCase();
	if (checkMobile() == ANDROID) { 
		window.parentBridge.bridgeOrientLandscapeBack();
	} else if (checkMobile() == IOS) {
		webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeOrientLandscapeBack"} );
	}
}
function bridgeAppExit(){
	var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	if (checkMobile() == ANDROID) {
		window.parentBridge.bridgeAppExit();
	} else if (checkMobile() == IOS) {
		webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeAppExit"} );
	}
}

function bridgeCloseView(){
	var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	if (checkMobile() == ANDROID) {
		window.parentBridge.bridgeCloseView();
	} else if (checkMobile() == IOS) {
		webkit.messageHandlers.callbackHandler.postMessage( {"command": "bridgeCloseView"} );
	}
}
function  bridgePageReload(){
	var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	if (checkMobile() == ANDROID) {
		window.parentBridge. bridgePageReload();
	}
}



