<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>draw demo</title>
<script type="text/javascript" src="../../scripts/jquery-1.7.1.min.js"></script>
</head>
<body>
	
</body>
<script type="text/javascript">
	$(function(){
		$.ajax({
			url:"/web/ajax?className=com.demo.servlet.TestRequest&methodName=myRequest",
			async:true,
			cache:false,
			dataType:"json",
			success:function(data,textStatus){
				console.info(data);
				console.info(textStatus);
			}
		});
	});
	(function(){
		
	})();
</script>
</html>
