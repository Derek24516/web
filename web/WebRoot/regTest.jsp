<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>draw demo</title>
<link rel="stylesheet" type="text/css"href="./easyui/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="./easyui/themes/icon.css" />
</head>
<body>
	<input id="in_test" type="text" onblur="testValue()">
</body>

<script type="text/javascript"  src="./script/jquery-1.7.2.min.js"></script>
<script type="text/javascript"  src="./easyui/scripts/jquery.easyui.min.js"></script>
<script type="text/javascript"  src="./script/jcanvas.js"></script>
<script type="text/javascript"  src="./script/jcanvas-ext.js"></script>
<script type="text/javascript"  src="./script/jscolor.js"></script>
<script type="text/javascript">
	function testValue(){
		console.info("---begin test-----");
		var value=document.getElementById("in_test").value;
		var regStr=/^\d{1,4}$/;
		if(regStr.test(value)){
			console.info("--------test success----");
		}else{
			console.info("输入格式错误");
		}
	}
</script>
</html>
