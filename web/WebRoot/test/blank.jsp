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
		$.fn.extend({test:function(){
			console.info("This is a method extended!");
		}
		});
		$("body").test();
	})();
</script>
</html>
