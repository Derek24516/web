<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Jquery demo</title>
<link rel="stylesheet" type="text/css" href="../../script/easyui/themes/default/easyui.css">   
<link rel="stylesheet" type="text/css" href="../../script/easyui/themes/icon.css">   
</head>
<body class = "easyui-layout" fit = "true" style = "margin-left: 5px">
    <div data-options="region:'west',title:'EasyUI Demo',split:true" style="width:200px;">
    	<div class = "easyui-accordion">
    		<div title = "布局_layout" style = "text-align: center">
    			<a id="btn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',selected:true">Panel Demo</a>  
    		</div>
    		<div title="Title2" data-options="" style="padding:10px;">   
		        content2    
		    </div>   
		    <div title="Title3">   
		        content3    
		    </div>  
    	</div>
    </div>   
    <div data-options="region:'center',noheader:true" style="padding:5px;background:#eee;"></div>   
</body>
<script type="text/javascript" src="../../scripts/jquery-1.7.1.min.js"></script>   
<script type="text/javascript" src="../../script/easyui//jquery.easyui.min.js"></script> 
<script type="text/javascript">
	//	dom树加载完毕时
	$(document).ready(function(){
	});
</script>
</html>
