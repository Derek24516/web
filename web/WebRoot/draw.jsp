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
	<div>
		<input type="button"  value="自由画笔" onclick="drawPen()"/>
		<input type="button"  value="画矩形" onclick="drawRect()"/>
		<input type="button"  value="画椭圆" onclick="drawEllipse()"/>
		<input type="button"  value="画虚线" onclick="drawDashed()"/>
		<input type="button"  value="插入图标" onclick="insertIcon()"/>
		<input type="file" id="pictureFile"  style="display: none;"/>
		<input type="button"  value="文字" onclick="drawText()"/>
		<input type="button"  value="缩小画布" onclick="zoomOut()"/>
		<input type="button"  value="撤销" onclick="restoreCanvas()"/>
		<input type="button"  value="重画" onclick="resetCanvas()"/>
		<input type="button"  value="测试" onclick="test()"/>
	</div>
	<div>
		选择画笔颜色： <input id="color" class="color" style="width: 60px;" width="10px" value="66ff00" onchange="changePenColor()">
	</div>
	<div>
		选择画笔宽度： 
		<select id="penWidth" onchange="changePenWidth()">
			<option>2</option>
			<option>4</option>
			<option>6</option>
			<option>8</option>
		</select>
	</div>
	<div>
		选择文字大小： 
		<select id="fontWidth">
			<option>8</option>
			<option>10</option>
			<option>12</option>
			<option>14</option>
			<option>16</option>
			<option>18</option>
		</select>
		选择文字字体： 
		<select id="fontFamily">
			<option>宋体</option>
			<option>微软雅黑</option>
			<option>楷体</option>
			<option>隶书</option>
			<option>华文彩云</option>
			<option>幼圆</option>
			<option>黑体</option>
		</select>
	</div>
	<div>
		
	</div>
	<div>
		<canvas id="can" width="800" height="600" style="border:1px solid #999;" >您的浏览器不支持canvas画图功能，推荐使用Google浏览器!</canvas>
		<canvas id="can2" width="800" height="600" style="border:1px solid #999;" >您的浏览器不支持canvas画图功能，推荐使用Google浏览器!</canvas>
	</div>
	
</body>
<script type="text/javascript"  src="./script/jquery-1.7.2.min.js"></script>
<script type="text/javascript"  src="./easyui/scripts/jquery.easyui.min.js"></script>
<script type="text/javascript"  src="./script/jcanvas.js"></script>
<script type="text/javascript"  src="./script/jcanvas-ext.js"></script>
<script type="text/javascript"  src="./script/jscolor.js"></script>
<script type="text/javascript">
function zoomOut(){
	$("canvas").css("width","300").css("height","200");
	 
}
function restoreCanvas(){
	$("canvas").restoreCanvas();
	$("canvas").drawLayers();
}
function drawEllipse(){
	var color= "#"+$("#color").val();
	var width=$("#penWidth option:selected").text();
	
	CanvasExt.drawEllipse("can",color,width);
}
//自由画笔
function drawPen(){
	var color= "#"+$("#color").val();
	var width=$("#penWidth option:selected").text();
	CanvasExt.drawPen("can",color,width);
}
//画矩形
function drawRect(){
	var color= "#"+$("#color").val();
	var width=$("#penWidth option:selected").text();
	CanvasExt.drawRect("can",color,width);
}
//画虚线
function drawDashed(){
	var color= "#"+$("#color").val();
	var width=$("#penWidth option:selected").text();
	CanvasExt.drawDashed("can",color,width);
}
//插入图片
function insertIcon(){
	//$("#pitureFile").click();
	//var url="";
	var source="images/1.jpg";
	CanvasExt.drawIcon("can",source,60,60);
}
//文字输入
var i=0;
function drawText(){
	var color= "#"+$("#color").val();
	var fontWidth=$("#fontWidth option:selected").text();
	var fontFamily=$("#fontFamily option:selected").text();
	
	CanvasExt.drawText("can",color,1,fontFamily);
	
	/* i++;
	layerName="l"+i;
	console.info(layerName);
	$("#can").drawText({
	  fillStyle: color,
	  strokeStyle: color,
	  strokeWidth: 1,
	  layerName:layerName,
	  draggable: true,
	  x: 150, y: 100,
	  fontSize: 30,
	  fontFamily: fontFamily,
	  text: '你好',
	  click:function(){
				   //监听按下删除键delete
				   document.onkeydown=function(e){
					   var keyCode=e.which;
					   console.info(keyCode);
					   if(keyCode==46){
					   	   console.info("????"+layerName);
						   $("#can").removeLayer(layerName).drawLayers().saveCanvas();
						   document.onkeydown=null;
					   }
				   }
			   }
	}); */
	//CanvasExt.drawText("can",color,2);
}
//
function erase(){
	$("#can").clearCanvas({
	  x: 200, y: 200,
	  width: 50,
  	  height: 50
});
}
//重画
function resetCanvas(){
	CanvasExt.clearCanvas("can");
}
//改变画笔颜色
function changePenColor(){
	var color= "#"+$("#color").val();
	CanvasExt.setPenColor(color);
}
//设置画笔宽度
function changePenWidth(){
	var width=$("#penWidth option:selected").text();
	CanvasExt.setPenWidth(width);
}
function test(){
	var canvas=document.getElementById("can");
	//$("#can").getLay
	$("can").after(canvas);
	//document.getElementById("can2")=canvas;
	
}	
</script>
</html>
