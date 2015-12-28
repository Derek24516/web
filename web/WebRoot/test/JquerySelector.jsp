<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>draw demo</title>
<style type="text/css">
.test{
	background-color: red;
}
</style>
</head>
<body>
	<table>
		<tr>
			<td>11111</td>
			<td>11111</td>
			<td>11111</td>
		</tr>
		<tr>
			<td></td>
			<td>1111aa1</td>
			<td>111aaa11</td>
		</tr>
		<tr>
			<td>11111</td>
			<td>11aa11</td>
			<td></td>
		</tr>
	</table>
	<div id="div_test">div test</div>
	<input type="button" value="改变样式" onclick="changeStyle()" />
	<input type="button" value="点4下改变样式哦" onclick="changeStyle2()" />
</body>
<script type="text/javascript" src="../scripts/jquery-1.7.1.min.js"></script>
<script type="text/javascript">
	(function(){
		$("table tr:odd + tr").each(function(){
			$(this).css("background-color", "red");
		});
		$("td:contains('aa')").css("background-color", "black");
		$("td:empty").css("background-color", "green");
		/* $("td:contains('aa')").each(function(){
			$(this).css("background-color", "blue");
		}); */
	})();
	
	//toggleClass 
	//没有第二个参数时：当有class时，移除；没有该class样式时，添加
	//第二个参数为switch开关，true，添加；false，移除
	function changeStyle(){
		$("#div_test").toggleClass("test");
	}
	var count = 0;
	function changeStyle2(){
		count++;
		if(count % 4 == 0){
			$("#div_test").toggleClass("test",true);
			count = 0;
		}else{
			$("#div_test").toggleClass("test",false);
		}
	}
</script>
</html>
