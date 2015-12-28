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
	<input type="button"  value="随便画画" onclick="test()"/>
	<input type="button"  value="画矩形" onclick="drawRect()"/>
	<input type="button"  value="画笔" onclick="drawLine()"/>
	<input type="button"  value="文字" onclick="drawText()"/>
	<input type="button"  value="擦除指定部分" onclick="erase()"/>
	<input type="button"  value="保存图片" onclick="savePicture()"/>
	<input type="button"  value="返回上一步" onclick="restoreCan()"/>
	<input type="button"  value="撤销重做" onclick="clearCanvas('#can')"/>
	<br />
	<div id="div_input"  onblue="inputEnded()"  style="border:1px solid #999;position: fixed;left: 200px;top: 300px;width: 100px;" contenteditable="true"></div>
	<canvas id="can" width="800" height="600" style="border:1px solid #999;" >您的浏览器不支持canvas!</canvas>
</body>
<script type="text/javascript"  src="./script/jquery-1.7.2.min.js"></script>
<script type="text/javascript"  src="./script/jcanvas.js"></script>
<script type="text/javascript"  src="./easyui/scripts/jquery.easyui.min.js"></script>

<script>

$("#div_input").resizable({
	maxWidth:800, 
maxHeight:600 
});
function drawText(){

}
function restoreCan(){
	var canvas=document.getElementById("can");
	var context = canvas.getContext('2d');
	console.info(context);
	console.info($("#can"));
}
function inputEnded(){
	console.inf("inputEnded");
	console.inf(e);
}
//画笔画线
function drawLine(){
	var canvas=document.getElementById("can");
	//var context = canvas.getContext('2d');
	var canvasRect = canvas.getBoundingClientRect();
	var canvasLeft=canvasRect.left;
	var canvasTop=canvasRect.top;
	var x=0;
	var y=0;
	canvas.onmousedown=function(e){
		x=e.clientX-canvasLeft;		//原点坐标x
		y=e.clientY-canvasTop;		//原点左边y
		console.info("x="+x+",y="+y);
		console.info("canvasLeft="+canvasLeft+",canvasTop="+canvasTop);
		console.info("clientX="+e.clientX+",clientY="+e.clientY);
		
		canvas.onmousemove=function(e){
		var x1=e.clientX-canvasLeft;
		var y1=e.clientY-canvasTop;
		
		width=e.clientX-canvasLeft-x;
		height=e.clientY-canvasTop-y;
		console.info("x="+x+",y="+y);
		console.info("canvasLeft="+canvasLeft+",canvasTop="+canvasTop);
		console.info("width="+width+",height="+height);
		$("#can").drawLine({
		  layer:true,
		  strokeStyle: '#050',
		  strokeWidth: 5,
		  x1: x, y1: y,
		  x2: x1,
		  y2: y1
		});
		x=x1;
		y=y1;
		}
	}
	
	canvas.onmouseup=function(e){
		console.info("鼠标没有按下");
		canvas.onmousemove=null;
	}
}

//画矩形
function drawRect(){
	var canvas=document.getElementById("can");
	
	//var context = canvas.getContext('2d');
	var canvasRect = canvas.getBoundingClientRect();
	var canvasLeft=canvasRect.left;
	var canvasTop=canvasRect.top;
	var x=0;
	var y=0;
	canvas.onmousedown=function(e){
		x=e.clientX-canvasLeft;
		y=e.clientY-canvasTop;
		console.info("x="+x+",y="+y);
		console.info("canvasLeft="+canvasLeft+",canvasTop="+canvasTop);
		console.info("clientX="+e.clientX+",clientY="+e.clientY);
		$("#can").drawRect({
		   strokeStyle: '#050',
		  strokeWidth: 5,
		  fromCenter: false,
		  x: x, y: y,
		  width: 1,
		  height: 1
		});
		canvas.onmousemove=function(e){
		width=e.clientX-canvasLeft-x;
		height=e.clientY-canvasTop-y;
		console.info("x="+x+",y="+y);
		console.info("canvasLeft="+canvasLeft+",canvasTop="+canvasTop);
		console.info("width="+width+",height="+height);
		$("#can").drawRect({
		   strokeStyle: '#050',
		  strokeWidth: 5,
		  fromCenter: false,
		  x: x, y: y,
		  width: width,
		  height: height
		});
	}
	}
	
	canvas.onmouseup=function(e){
		console.info("鼠标没有按下");
		canvas.onmousemove=null;
		
		width=e.clientX-canvasLeft-x;
		height=e.clientY-canvasTop-y;
		$("#can").drawRect({
		  layer:true,
		  strokeStyle: '#050',
		  strokeWidth: 5,
		  fromCenter: false,
		  draggable: true,
		  x: x, y: y,
		  width: width,
		  height: height
		});
	}
	
	
}
function savePicture(){
	var uri=$("#can").getCanvasImage('jpg');
	console.info(uri);
	//window.location.href=uri;
}
function erase(){
	$("#can").clearCanvas({
	layer:true,
	  x: 200, y: 200,
	  width: 50,
  	  height: 50
}).drawLayers().saveCanvas();;
}
function test(){
	$("#can").drawArc({
  layer: true,
  draggable: true,
  strokeStyle: '#090',
  strokeWidth: 5,
  x: 200, y: 200,
  radius: 50,
  // start and end angles in degrees
  start: 0, end: 90,
  scaleX: 3,
  scaleY:2.1
});
$("#can").drawImage({
  layer: true,
  draggable: true,
  source: 'images/1.jpg',
  x: 150, y: 150,
  width: 200, height: 125
})
$("#can").drawLine({
  layer: true,
  draggable: true,
  strokeStyle: '#000',
  strokeWidth: 4,
  rounded: true,
  startArrow: true,
  arrowRadius: 15,
  arrowAngle: 90,
  x1: 100, y1: 100,
  x2: 150, y2: 125,
  x3: 200, y3: 75
});

var radial = $("#can").createGradient({
  x1: 50, y1: 50,
  x2: 50, y2: 50,
  r1: 10, r2: 30,
  c1: 'rgba(255, 0, 0, 0.75)',
  c2: '#000'
});
$("#can").drawArc({
  fillStyle: radial,
  x: 50, y: 50,
  radius: 30
});


$.jCanvas.extend({
  name: 'drawHeart',
  type: 'heart',
  props: {},
  fn: function(ctx, params) {
    // Just to keep our lines short
    var p = params;
    // Draw heart
    ctx.beginPath();
    ctx.moveTo(p.x, p.y + p.radius);
    // Left side of heart
    ctx.quadraticCurveTo(
      p.x - (p.radius * 2),
      p.y - (p.radius * 2),
      p.x,
      p.y - (p.radius / 1.5)
    );
    // Right side of heart
    ctx.quadraticCurveTo(
      p.x + (p.radius * 2),
      p.y - (p.radius * 2),
      p.x,
      p.y + p.radius
    );
    // Call the detectEvents() function to enable jCanvas events
    $.jCanvas.detectEvents(this, ctx, p);
    // Call the closePath() functions to fill, stroke, and close the path
    // This function also enables masking support and events
    // It accepts the same arguments as detectEvents()
    $.jCanvas.closePath(this, ctx, p);
  }
});

// Use the drawHeart() method
$("#can").drawHeart({
  layer: true,
  draggable: true,
  fillStyle: '#c33',
  radius: 50,
  x: 450, y: 130
});
	
}

</script>
<script type="text/javascript">
	function clearCanvas(canvas){
		$("#can").removeLayers();
		$(canvas).clearCanvas();
	}
</script>
</html>
