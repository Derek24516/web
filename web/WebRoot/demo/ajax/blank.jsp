<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>draw demo</title>
<%@include file = "header.jsp" %>
</head>
<body>
	<div id="p" class="easyui-panel" style="width:500px;height:400px;padding:10px;"   
        title="My Panel" iconCls="icon-save" collapsible="true">   
    	<br />
    <div id="qrcode"></div>
	</div>  
</body>
<script type="text/javascript">
	//	dom树加载完毕时
	$(document).ready(function(){
		$.ajax({
			url:'',
			success:function(data, textStatus){
				console.info(data + ',' + textStatus);
			}
		});
	});
	
</script>
</html>
