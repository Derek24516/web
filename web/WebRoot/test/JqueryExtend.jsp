<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>draw demo</title>

</head>
<body>
	
</body>
<script type="text/javascript" src="../scripts/jquery-1.7.1.min.js"></script>
<script type="text/javascript">
	(function(){
		//扩展插件方法，通常用于制作插件
		$.fn.extend({test:function(){
			console.info("This is a method extended!");
		}
		});
		//扩展Jquery的函数
		$.extend({test:function(){
				console.info("This a method extended to Jquery methods");
			}
		});
		
		$("body").test();
		$.test();
	})();
</script>
</html>
