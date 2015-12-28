<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<style type="text/css">
    body{margin:20px auto; padding:0; width:1000px }
    canvas{border:dashed 2px #ccc}
    span{font-size:16px; cursor:pointer}
</style>
<script type="text/javascript">
    function $$(id){
        return document.getElementById(id);
    }
    function drawRect(co){
        var can = $$('can');
        cans = can.getContext('2d');
        cans.strokeStyle = co;
        cans.lineWidth = 3;
        cans.strokeRect(600,50,80,40);
    }
    function drawCircle(co){
        cans.beginPath();
        cans.arc(30,30,30,0,Math.PI*2,1);
        cans.closePath();
        cans.strokeStyle = co;
        cans.lineWidth = 3;
        cans.stroke();
    }
    function mv_click(){
        var can = $$('can');
        var cans = can.getContext('2d');
        cans.translate(40,40);
        drawRect('black');
    }
    function zoom_click(){
        var can = $$('can');
        var cans = can.getContext('2d');
        drawCircle('red');
        cans.scale(0.5,1.5);
        drawCircle('green');
    }
    function rotate_click(){
        var can = $$('can');
        var cans = can.getContext('2d');
        cans.rotate(Math.PI*2/360*45);
        drawRect('green');
        cans.rotate(-Math.PI/4);
        drawRect('black');
    }
</script>
<body onload="drawRect('red');">
    <canvas id="can" width="1000px" height="800px"></canvas>
    <span onclick="mv_click();"><mark>移动</mark></span>
    <span onclick="zoom_click();"><mark>缩放</mark></span>
    <span onclick="rotate_click();"><mark>旋转</mark></span>
</body>
</html>