<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>draw demo</title>

</head>
<body>
	<canvas id="the_stage" width="600" height="400"
		style="border:1px solid #999;" >您的浏览器不支持canvas!</canvas>
	
</body>
<script type="text/javascript" src="draw.js"></script>
<script>
		(function(){
			console.info("????");
			
			//DrawUtils.setLine("the_stage",'red',3);
			//DrawUtils.draw("the_stage");
			//DrawUtils.setCanvas("the_stage", 100, 100);
			DrawUtils.drawLine("the_stage");
			console.info("success");
		})();
		
</script>
</html>
