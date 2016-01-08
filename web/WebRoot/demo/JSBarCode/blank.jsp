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
    	扫一扫  有惊喜哦~~~
    	<br />
    <div id="qrcode"></div>
	</div>  
</body>
<script type="text/javascript">
	//	dom树加载完毕时
	$(document).ready(function(){
		/* render   : "canvas",//设置渲染方式  
		width       : 256,     //设置宽度  
		height      : 256,     //设置高度  
		typeNumber  : -1,      //计算模式  
		correctLevel    : QRErrorCorrectLevel.H,//纠错等级  
		background      : "#ffffff",//背景颜色  
		foreground      : "#000000" //前景颜色   */
		
		var obj = {};
		obj.render = "canvas";
		obj.text = utf16to8("2323223~~~~O(∩_∩)");
		$('#qrcode').qrcode(obj);
		
		var arr = new Array();
		
		/* //	渲染easyUI
		$.parser.parse();   
		
		//	渲染完毕时
		$.parser.onComplete = function(){
			
		} */
	});
	
	//	将字符串转换成UTF-8
	function utf16to8(str) {
		var out, i, len, c;
		out = "";
		len = str.length;
		for (i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if ((c >= 0x0001) && (c <= 0x007F)) {
				out += str.charAt(i);
			} else if (c > 0x07FF) {
				out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
				out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			} else {
				out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			}
		}
		return out;
	}
</script>
</html>
