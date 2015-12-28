<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>draw demo</title>
<%@include file = "header.jsp" %>
</head>
<body>
	<div id="p" class="easyui-panel" style="width:500px;height:200px;padding:10px;"   
        title="My Panel" iconCls="icon-save" collapsible="true">   
    The panel content    
	</div>  
</body>
<script type="text/javascript">
	//	dom树加载完毕时
	$(document).ready(function(){
		
		
		//	渲染easyUI
		$.parser.parse();   
		
		//	渲染完毕时
		$.parser.onComplete = function(){
			
		}
	});
</script>
</html>
