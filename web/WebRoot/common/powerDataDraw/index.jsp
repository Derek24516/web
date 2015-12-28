<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>lims 画图</title>
<link rel="stylesheet" type="text/css" href="css/style.css" />
<link rel='stylesheet' href="css/spectrum.css" />
<link rel="stylesheet" type="text/css" href="css/my.css" />
<style type="text/css">
.clearfix:after {
	content: ".";
	display: block;
	height: 0;
	clear: both;
	visibility: hidden;
}

.clearfix {
	display: inline-block;
}
</style>
</head>
<body>
	<div class="wrap">
		<!-- 头部 -->
		<div class="head rel">
			<div class="file-menu-wrap">
				<a>文件<i></i></a>
				<ul class="submenu abs" style="width: 190px;">
					<li><a id="newBtn">新建</a></li>
					<!-- <li>
                    <a id="openBtn">打开</a>
                </li>
                <li>
                    <a id="recentlyBtn">最近打开的文档</a>
                </li> -->
					<li><a id="saveBtn">保存</a></li>
					<!-- <li>
                    <a id="saveAsBtn">另存为</a>
                </li> -->
				</ul>
			</div>

			<div class="img-menu-wrap">
				<a>图片<i></i></a>
				<ul class="submenu abs" style="width: 190px;">
					<li><a id="importBackgroundImage">导入背景图</a></li>
					<li><a id="exportImage">将画布内容导出为图片</a></li>
					<!-- <li>
						<div class="x-submenu-wrap">
							<a>最近导出的图片</a>
							<ul class="x-submenu abs" style="width:170px;">
								<li><a href="">图片1</a></li>
								<li><a href="">图片2</a></li>
								<li><a href="">图片3</a></li>
							</ul>
						</div>
					</li>
					<li><a href="">查看所有导出的图片</a></li> -->
				</ul>
			</div>
			<span>深圳市博安达信息技术股份有限公司</span>
		</div>
		
		<!-- 工具栏 -->
		<div class="tools">
			<div class="tools-icon fl">
				<a class="icon-1" id="save" title="保存"></a>
				<!-- <a class="icon-2" id="open" title="打开"></a> -->
				<a class="icon-3" id="clear" title="清除"></a> <a class="icon-4"
					id="undo" title="撤销"></a> <a class="icon-5" id="redo" title="重做"></a>
				<a class="icon-6" id="del" title="删除"></a> <a class="icon-7"
					id="rotate" title="旋转"></a>
			</div>
			<div class="tools-align fl">
				<a class="icon-1" title="线条大小" id="line_weight_selector"><i></i></a>
				<a class="icon-2" title="线条风格" id="line_dash_selector"><i></i></a> <a
					class="icon-3" title="线条颜色" id="color_selector"> <span
					id="brush_color" class="color"></span> <i></i>
				</a> <span>画笔设置</span>
			</div>
			<div class="tools-fontSet fl">
				<div class="selectBox fl" style="width: 120px;">
					<span class="selectTxt">宋体</span> <select id="font_selector">
						<script>
						var fontArr = [{
							text: '宋体',
							value: 'SimSun, "宋体", STFangsong'
						}, {
							text: '黑体',
							value: 'SimHei, "黑体"'
						}, {
							text: '新宋体',
							value: 'NSimSun, "新宋体"'
						}, {
							text: '仿宋',
							value: 'FangSong, "仿宋"'
						}, {
							text: '楷体',
							value: 'KaiTi, "楷体", STKaiti'
						}, {
							text: '微软雅黑',
							value: '"Microsoft YaHei", "微软雅黑"'
						}];
						var index = 0,
								font;
						for(index = 0; index < fontArr.length; index++) {
							font = fontArr[index];
							document.write('<option value="'+ font.value.replace(/"/g, '&quot;') +'">'+ font.text +'</option>');
						}

					</script>
					</select>
				</div>
				<div class="selectBox fl" style="width: 60px; margin-left: -1px;">
					<span class="selectTxt">14</span> <select id="font_size_selector">
						<script>
						var fontSizes = [14, 16, 18, 20, 22, 24, 26, 28, 36, 48],
								index, fontSize;
						for(index = 0; index < fontSizes.length; index++) {
							fontSize = fontSizes[index];
							document.writeln('<option value="'+fontSize+'">'+fontSize+'</option>');
						}
					</script>
					</select>
				</div>
				<div class="tools-fs fl">
					<a class="icon-1" title="粗体" id="boldBtn"></a> <a class="icon-2"
						title="斜体" id="italicBtn"></a> <a class="icon-3" title="下划线"
						id="underlineBtn"></a> <a class="icon-5-l align" title="居左"
						id="textAlignLeftBtn"></a> <a class="icon-5-c align" title="居中"
						id="textAlignCenterBtn"></a> <a class="icon-5-r align" title="居右"
						id="textAlignRightBtn"></a> <a class="icon-4" title="字体颜色"
						id="font_color_selector"> <span class="color"></span> <i></i></a>
					<a class="icon-6" title="背景色" id="textBackgroundBtn"> <span
						class="color"></span> <i></i></a> <a class="icon-7" title="边框颜色"
						id="textStrokeBtn"> <span class="color"></span> <i></i></a>
				</div>
				<em>文字设置</em>
			</div>
			<div class="tools-canvasSet fl">
				<%-- <nbean:ajaxUrl var="getResolution" clazz="com.szboanda.lims.ggzj.ggdm.GgdmjService" method="queryGgdmzNames" parameters="TYPE=DRAWING_RESOLUTION" /> --%>
				<span class="selectTit fl">宽*高：</span>
				<div class="selectBox fl" style="width: 80px; margin-top: 10px">
					<span class="selectTxt"></span> <select
						id="board-resolution-selected">
					</select>
				</div>
				<em>画布设置</em>
			</div>
		</div>
		<div class="container clearfix">
			<div class="left-box">
				<dl class="tools-nav rel">
					<dt>
						<i></i>画笔选择
					</dt>
					<dd class="tools-container">
						<a class="icon-1" id="moveTool" title="移动工具"></a> <a
							class="icon-2" id="eraser" title="橡皮擦"></a> <a class="icon-3"
							id="brush" title="画笔"></a> <a class="icon-4" id="textTool"
							title="文本框"></a> <a class="icon-5" id="hollowEllipse"
							title="空心圆形"></a> <a class="icon-6" id="ellipse" title="实心圆形"></a>
						<a class="icon-7" id="rect" title="实心矩形"></a> <a class="icon-8"
							id="hollowRect" title="空心矩形"></a> <a class="icon-9" id="lineTool"
							title="直线&#10;   按住Ctrl键与上一直线平行，按住Shift画垂直或水平线&#10;   双击本图标画折线，画折线时按Alt键可自动对齐当前折线顶点"></a>
						<a class="icon-10" id="arrowTool"
							title="箭头（按住Ctrl键与上一箭头平行，按住Shift画垂直或水平线）"></a> <span
							class="clear"></span>
					</dd>
					<!-- 滚动条 -->
					<!-- <p class="scrol">
					<span class="top-bar"><i></i></span>
					<span class="scroll-bar" style="top:15px;"></span>
					<span class="bot-bar"><i></i></span>
				</p> -->
				</dl>
				<dl class="icons-nav rel">
					<dt>
						<i></i>图标选择
						<p>
							<a class="lt on" id="collapseToolContainer"><em></em></a><a
								class="rt on" id="collapseImgContainer"><em></em></a>
						</p>
					</dt>
					<dd id="icon_container">

						<span class="clear"></span>
					</dd>
					<!-- 滚动条 -->
					<!-- <p class="scrol">
					<span class="top-bar"><i></i></span>
					<span class="scroll-bar" style="top:130px;"></span>
					<span class="bot-bar"><i></i></span>
				</p> -->
				</dl>
			</div>
			<!-- 左边 end -->
			<div class="right-box" style="min-height: 600px;">
			<canvas id="draw_board" width="1000" height="5000">
				您的浏览器不支持画布。
			</canvas>



				<!-- 滚动条 -->
				<!--<p class="scrol-x" style="height:18px;">
					<span class="top-bar"><i></i></span>
					<span class="scroll-bar" style="left:180px;"></span>
					<span class="bot-bar"><i></i></span>
			</p>-->
			</div>
		</div>
	</div>
	<script src="script/jquery-2.0.0.js"></script>
	<script src="script/data.js"></script>
	<script src="script/jcanvas.min.js"></script>
	<script src="script/brush-1.0.0.js"></script>
	<script src="script/lineTool.js"></script>
	<script src="script/resizetor.js"></script>
	<script src="script/rectangleTool.js"></script>
	<script src="script/ellipsesTool.js"></script>
	<script src="script/imageTool.js"></script>
	<script src="script/textEditor.js"></script>
	<script src="script/eraserTool.js"></script>
	<script src="script/lzw.js"></script>
	<script src="script/drawPlugin.js"></script>
	<script src="script/drawBoard.js"></script>
	<script src="script/spectrum.js"></script>
	<script type="text/javascript">
			addSelectbox('.selectBox');
			function addSelectbox(obj){
				$(obj).on("change", function() {
					var o;
					var opt = $(this).find('option');
					opt.each(function(i) {
					if (opt[i].selected == true) {
					o = opt[i].innerHTML;
						}
					})
					$(this).find('span').html(o);
				}).trigger('change');
			}

            

			function initDrawBoard(options) {
				var resolutionSelector = $('#board-resolution-selected'),
				resolutions = options.resolutions,
				index;
				for(index = 0; index < resolutions.length; index++) {
					resolutionSelector.append('<option value="' + resolutions[index] + '">' + resolutions[index] + '</option>');
				}
				resolutionSelector.change();
				
				var iconContainer = $('#icon_container');
	              var iconDatas = drawData.data.icons,
	                      svgPath = drawData.data['svg-path'],
	                      iconData, iconEl;
	              for(index = 0; index < iconDatas.length; index++) {
	                  iconData = iconDatas[index];
	                  iconEl = $('<a></a>')
	                      .addClass('custom-shape')
	                      .addClass(iconData.class)
	                      .css({
	                          backgroundRepeat: 'no-repeat'
	                      }).data({
	                          source: svgPath + iconData.svg,
	                          name: iconData.name
	                      })
	                      .appendTo(iconContainer);
	                  if(iconData.title) {
	                      iconEl.attr('title', iconData.title);
	                  }
	              }
	              
	              var customIcons = options.customIcons,
	              icon, customMap = {};
	              if(Array.isArray(customIcons)) {
	            	  for(index = 0; index < customIcons.length; index++) {
	            		  icon = customIcons[index];
	            		  iconEl = $('<a></a>').addClass('custom-shape').css({
	            			  backgroundImage: 'url(' + icon.icon + ')',
	            			  backgroundRepeat: 'no-repeat'
	            		  }).data({
	            			  source: icon.source,
	            			  name: icon.name
	            		  }).appendTo(iconContainer);
	            		  if(icon.title) {
	            			  iconEl.attr('title', icon.title);
	            		  }
	            		  iconEl.hover(function() {
	            			  iconEl.css('backgroundImage', 'url(' + icon.activeIcon + ')');
	            		  }, function() {
	            			  iconEl.css('backgroundImage', 'url(' + icon.icon + ')');
	            		  });
	            		  customMap[icon.name] = icon.source;
	            	  }
	              }
	              
	              // 打开本地图片作为图标
				//$('<a id="uploadIcon">图</a>').appendTo(iconContainer);

                var resolution = resolutions.length > 0 ? resolutions[0].split('*') : [1100,500];
                return $.initDrawBoard($.extend({}, options, {
                    canvasWidth: resolution[0],
                    canvasHeight: resolution[1],
                    resolutionSelectorId: 'board-resolution-selected',
                    colorSelectorId: 'color_selector',
                    fontSelectorId: 'font_selector',
                    fontSizeSelectorId: 'font_size_selector',
                    fontColorSelectorId: 'font_color_selector',
                    fontBoldBtn: 'boldBtn',
                    fontItalicBtn: 'italicBtn',
                    fontAlignLeftBtnId: 'textAlignLeftBtn',
                    fontAlignCenterBtnId: 'textAlignCenterBtn',
                    fontAlignRightBtnId: 'textAlignRightBtn',
                    fontBackgroundBtnId: 'textBackgroundBtn',
                    fontTextStrokeBtn: 'textStrokeBtn',
                    lineWeightSelectorId: 'line_weight_selector',
                    textUnderlineBtnId: 'underlineBtn',
                    lineDashSelectorId: 'line_dash_selector',
                    canvasId: 'draw_board',
                    brushId: 'brush',
                    brushColorId: 'brush_color',
                    eraserId: 'eraser',
                    moveToolId: 'moveTool',
                    textToolId: 'textTool',
                    hollowRectId: 'hollowRect',
                    rectId: 'rect',
                    ellipseId: 'ellipse',
                    hollowEllipseId: 'hollowEllipse',
                    lineToolId: 'lineTool',
                    arrowToolId: 'arrowTool',
                    saveOpeId: 'save',
                    openOpeId: 'open',
                    clearOpeId: 'clear',
                    undoOpeId: 'undo',
                    redoOpeId: 'redo',
                    delOpeId: 'del',
                    rotateOpeId: 'rotate',
                    customClass: 'custom-shape',
                    activeClass: 'on',
                    toolBtnSelector: '.tools-nav dd a',
                    actionSelector: '.tools-icon a',
                    iconBtnSelector: '.icons-nav dd a',
					uploadIconId: 'uploadIcon',
                    fontStyleSelector: '.tools-fs a',
                    fontAlignSelector: '.tools-fs .align',
                    importBackImageId: 'importBackgroundImage',
                    exportBtnId: 'exportImage',
                    newFileBtnId: 'newBtn',
                    openFileBtnId: 'openBtn',
                    recentlyBtnId: 'recentlyBtn',
                    saveFileBtnId: 'saveBtn',
                    saveFileAsBtnId: 'saveAsBtn',
                    fileUploadUrl: '${uploadRawImage}',
                    imageFileUploadUrl: '${uploadImageFile}',
                    loadImageUrl: '${loadImage}',
                    customIconMap: customMap
                }));
			}
			
			$(function() {
                $('#collapseToolContainer').click(function() {
                    var me = $(this);
                    if(me.hasClass('on')) {
                        $('#icon_container').slideUp();
                        me.removeClass('on');
                    } else {
                        $('#icon_container').slideDown();
                        me.addClass('on');
                    }
                });

                $('#collapseImgContainer').click(function() {
                    var me = $(this);
                    if(me.hasClass('on')) {
                        $('.tools-container').slideUp();
                        me.removeClass('on');
                    } else {
                        $('.tools-container').slideDown();
                        me.addClass('on');
                    }
                });
			});
			
			
			
			$(function() {
				var emFn = function() {};
				var param = Tools.parseUrlParam(),
					win = window.opener || window.parent,
					options = win[param.param], // 要兼容window，iframe父window，顶层iframe
					settings = {
						/**
						 * @cfg {String} id
						 * 画板ID
						 * 此配置项用于供给用户识别图片是否新建，在画板对象中调用getId()可获得
						 * 如果此配置为空，画板会自己生成一个ID，新建的图像会重新生成ID
						 **/
						id: null,
						/**
						 * @cfg {Array} resolutions
						 * 画板分辨率可选项数组
						 * 此配置项用于配置供给用户选择的画板分辨率，打开画板默认大小为第一个
						 * 配置项格式为字符串数组，每一组分辨率用星号“*”分开长和宽的分辨率
						 **/
						resolutions: ['1000*500', '600*400'],
						/**
						 * @cfg {boolean} saveRawImage
						 *
						 * 是否保存原生图片数据
						 * 当此选项为true时，画板保存时会同时保存jpeg和本画板支持的保留图层信息原生数据文件，
						 * 原生数据文件可以重新用画板打开并编辑每个自动对象，为false时只会保存jpeg图片
						 */
						saveRawImage: false,
						/**
						 * @cfg {Array} customIcons
						 * 自定义图标，类型为对象数组
						 * 此配置项可自定义添加左侧图标工具的图标。
						 * 	name：图标名称，必须
						 * 	icon：按钮缩略图url
						 *	activeIcon：被激活的缩略图url，当鼠标移动到按钮上，或者点击为激活状态时会在的按钮上显示此图标
						 *	source：显示在画板上的图标url，推荐使用svg格式，svg在放大与缩小时不会影响清晰度。
						 *	title：标题，鼠标悬浮在按钮上的tip信息
						 */
						/* customIcons: [{
						      "name": "search",
						      "icon": "/lims/scripts/plugin/jquery-easyui/themes/default/icons/search.png",
						      "activeIcon": "/lims/scripts/plugin/jquery-easyui/themes/default/icons/edit_add.png",
						      "source": "/lims/scripts/plugin/jquery-easyui/themes/default/icons/search.png",
						      "title": "空心五角星"
						}], */
						/**
						 * @event beforeInit
						 * 在画板初始化前触发
						 * @param {Object} options 画板配置项，可以在此重写提供设置的配置项
						 */
						beforeInit: function(options) {

						},
						/**
						 * @event afterInit
						 * 在画板初始化后触发
						 * @param {Object} draw 画板对象，提供画板的公共接口
						 *		@method 
						 *			openRawImage (id)
						 *				此函数用于打开原文件
						 *				@param {String} id 原文件id，画板保存原文件于文档中心，此id为原文件在文档中心的文档id
						 *								      可在画板保存的onAfterSaveRawImage事件参数中获取此id
						 *			openImage (url)
						 *				此函数用于打开图片到画板中
						 *				@param {String} url 图片url，兼容data url
						 *			isEmpty ()
						 *				此函数获取画板是否为空，没有图像时返回true
						 *			getId ()
						 *				获取当前图像的ID
						 *			showTip (options)
						 *				在画板页面显示提示信息
						 *				@param options.msg {String} 提示信息
						 *				@param options.autoHide {Boolean} 是否自动隐藏提示
						 *				@param options.showDelay {Number} 显示的持续时间，如果autoHide为true，超过此时间提示会自动隐藏
						 */
						afterInit: function(draw) {
							
						},
						/**
						 * @event onNewFile
						 * 用户在执行新建文件操作后触发
						 */
						onNewFile: function() {
							
						},
						/**
						 * @event onChange
						 * 用户修改画板内容时触发
						 */
						onChange: function() {
							
						},
						/**
						 * @event onBeforeSave
						 * 用户在执行保存之前时触发，
						 * 在onBeforeSaveImage和onBeforeSaveRawImage之前触发
						 */
						onBeforeSave: function() {
							
						},
						/**
						 * @event onBeforeSaveImage
						 * 在jpeg图片保存前触发此事件，返回false可阻止图片保存到服务器的临时目录
						 *	@param {Blob} imgBlob 画板中图像的jpeg格式图片的二进制类型对象
						 */
						onBeforeSaveImage: function(imgBlob) {
							
						},
						/**
						 * @event onAfterSaveImage
						 * 在jpeg图片保存后触发此事件
						 * 	@param {Object} data
						 *		success: {boolean} 是否保存成功
						 *		path: {String} 图片临时路径
						 *	@param {Blob} imgBlob 画板中图像的jpeg格式图片的二进制类型对象
						 */
						onAfterSaveImage: function(data, imgBlob) {
							
						},
						onBeforeSaveRawImage: function() {
							
						},
						/**
						 * @event onAfterSaveRawImage
						 * 在原生图片保存后触发此事件
						 * 	@param {Object} data
						 *		success: {boolean} 是否保存成功
						 *		id：{String} 原生图片文件所对应的文档中心id
						 */
						onAfterSaveRawImage: function(data) {
							
						},
						/**
						 * @event onClose
						 * 在画板关闭前触发
						 * 返回字符串可自动弹出提示框让用户确认是否关闭画板
						 */
						onClose: function() {
							
						}
					};
				$.extend(settings, options);
				if(!settings.resolutions || toString.call(settings.resolutions) !== '[object Array]' || settings.resolutions.length === 0) {
					settings.resolutions = ['1000*500', '600*400'];
				}
				if(typeof options.beforeInit === 'function') {
					options.beforeInit(settings);
				}
				var drawBoardObject = initDrawBoard(settings);
				
				if(typeof options.afterInit === 'function') {
					options.afterInit.call(drawBoardObject, drawBoardObject);
				}
				window.onbeforeunload = function() {
					if(typeof options.onClose === 'function') {
						return options.onClose.call(drawBoardObject, drawBoardObject);
					}
				};
			});
			</script>
</body>
</html>