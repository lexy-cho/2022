$(function () {
	$('#jstree').jstree({
		"core" : {
			"check_callback" : true,
			'data' : [
					{ "text" : "사용자권한", "children" : [
							{ "text" : "관리자", "children" : [
									{ "text" : "시스템관리자" },
									{ "text" : "일반관리자" }
							]},
							{ "text" : "승인여부", "children" : [
									{ "text" : "승인" },
									{ "text" : "미승인" }
							]}
					]},
					{ "text" : "시설물", "type" : "root"},
					{ "text" : "작목", "type" : "root"},
					{ "text" : "환경정보", "type" : "root"},
					{ "text" : "생산정보", "type" : "root"}
				]
		},
		// "types" : {
		// 	"group" : { "icon" : "../../js/tree/themes/default/group.gif"}
		// },
		"dnd" : {
			"drop_finish" : function () {
				alert("DROP");
			},
			"drag_check" : function (data) {
				alert("CHECK");
				return {
				   after : false,
				   before : false,
				   inside : true
				};
			},
			"drag_finish" : function (data) {
				alert("DRAG OK");
			}
		},
		"plugins" : [ "state", "types", "dnd" ]
	});
});

function chartAllClose(){
	$("#jstree").jstree("close_all");
} // 조직도 전체 닫기

function chartAllOpen(){
	$("#jstree").jstree("open_all");
} // 조직도 전체 열기

function groupAdd() {
	var ref = $('#jstree').jstree(true),
		sel = ref.get_selected();
	if(!sel.length) { return false; }
	sel = sel[0];
	sel = ref.create_node(sel, {"type" : "group"});
	if(sel) {
		ref.edit(sel);
	}
}; // 그룹 추가

function groupRename() {
	var ref = $('#jstree').jstree(true),
		sel = ref.get_selected();
	if(!sel.length) { return false; }
	sel = sel[0];
	ref.edit(sel);
}; // 이름 변경

function groupDelete() {
	var ref = $('#jstree').jstree(true),
		sel = ref.get_selected();
	if(!sel.length) { return false; }
	ref.delete_node(sel);
}; // 삭제
