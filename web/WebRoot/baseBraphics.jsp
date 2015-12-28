<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML>
<html>
<head>
<style type="text/css">
body {
	font-size: 70%;
	font-family: verdana, helvetica, arial, sans-serif;
}
</style>

<script type="text/javascript">
	window.onload=function(){
		
		var can=document.getElementById("can1"); 	//获取canvas
		//1、简单直线图
		var cans = can.getContext('2d');
		cans.beginPath();
		cans.moveTo(20,30);//第一个起点
        cans.lineTo(120,90);//第二个点
        cans.lineTo(220,60);//第三个点（以第二个点为起点）
        cans.lineWidth=3;
        cans.strokeStyle = 'red';
        cans.stroke();		//绘制路径
        cans.closePath();
        
        //var cans2=can.getContext('2d');
        cans.beginPath();
        cans.arc(400,250,30,160,true);
        cans.stroke();	
        cans.closePath();
        
        /* cans.moveTo(50,50);
        cans.linTo(200,200);
        cans.lineWidth=3;
        cans.strokeStyle='blue';
        cans.stroke();
        cans.lineWidth=3;
        cans.strokeStyle='black';
        cans.lineTo(120,120);
        cans.stroke(); */
        
	}
</script>
</head>

<body style="margin:0px;">
	<canvas id="can1" width="600px" height="400px">4</canvas>
</body>
</html>
