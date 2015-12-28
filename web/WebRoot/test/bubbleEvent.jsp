<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>JS冒泡事件</title>

</head>
<body>
	<div id = "div_parent" style="width: 200px; height: 100px; background-color: red;">
		<div id = "div_child" style="width: 50px; height: 50px; background-color: blue;"></div>
	</div>
</body>
<script type="text/javascript" src="../scripts/jquery-1.7.1.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		$("#div_parent").click(function(){
			alert("Click parent div!");
		});
		$("#div_child").click(function(e){
			if(e && e.stopPropagation)
				e.stopPropagation();
			alert("Click child div!");
			//var e = e || window.e;
		});
	});
</script>
</html>
