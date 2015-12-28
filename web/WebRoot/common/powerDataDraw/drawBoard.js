(function($) {
	/**
	 * @cfg {String} ctx (required)
	 * 必需，项目根路径
	 */
	/**
	 * @cfg {String} id
	 * 画板ID
	 * 此配置项用于供给用户识别图片是否新建，在画板对象中调用getId()可获得
	 * 如果此配置为空，画板会自己生成一个ID，新建的图像会重新生成ID
	 **/
	//id: null,
	/**
	 * @cfg {String|jQuery Object} iframeEl
	 * 如果需要用iframe打开图板，请配置此项，此项可以是iframe元素的选择器，也可以是jQuery对象
	 * 用到此配置项时，请关注window配置项
	 */
	/**
	 * @cfg {Window} window
	 * 此配置项为iframeEl所指定的iframe所在窗口或iframe的window对象，默认为当前环境window对象，如果iframe在其他的窗口或者iframe中，请在此指定
	 */
	/**
	 * @cfg {Array} resolutions
	 * 画板分辨率可选项数组
	 * 此配置项用于配置供给用户选择的画板分辨率，打开画板默认大小为第一个
	 * 配置项格式为字符串数组，每一组分辨率用星号“*”分开长和宽的分辨率
	 **/
	//resolutions: ['1000*500', '600*400'],
	/**
	 * @cfg {boolean} saveRawImage
	 *
	 * 是否保存原生图片数据
	 * 当此选项为true时，画板保存时会同时保存jpeg和本画板支持的保留图层信息原生数据文件，
	 * 原生数据文件可以重新用画板打开并编辑每个自动对象，为false时只会保存jpeg图片
	 */
	//saveRawImage: true,
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
	//beforeInit: function(options) {

	//},
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
	 *			getCurrentResolution ()
	 *				获取当前画板分辨率
	 *			disableBtn (name)
	 *				禁用按钮
	 *				@param name {String} 按钮名
	 *			enableBtn (name)
	 *				启用按钮
	 *				@param name {String} 按钮名称
	 */
	//afterInit: function(draw) {
		
	//},
	/**
	 * @event onNewFile
	 * 用户在执行新建文件操作后触发
	 */
	//onNewFile: function() {
		
	//},
	/**
	 * @event onChange
	 * 用户修改画板内容时触发
	 */
	//onChange: function() {
	
	//},
	/**
	 * @event onBeforeSave
	 * 用户在执行保存之前时触发，
	 * 在onBeforeSaveImage和onBeforeSaveRawImage之前触发
	 */
	//onBeforeSave: function() {
		
	//},
	/**
	 * @event onBeforeSaveImage
	 * 在jpeg图片保存前触发此事件，返回false可阻止图片保存到服务器的临时目录
	 *	@param {Blob} imgBlob 画板中图像的jpeg格式图片的二进制类型对象
	 */
	//onBeforeSaveImage: function(imgBlob) {
		
	//},
	/**
	 * @event onAfterSaveImage
	 * 在jpeg图片保存后触发此事件
	 * 	@param {Object} data
	 *		success: {boolean} 是否保存成功
	 *		path: {String} 图片临时路径
	 *	@param {Blob} imgBlob 画板中图像的jpeg格式图片的二进制类型对象
	 */
	//onAfterSaveImage: function(data, imgBlob) {
		
	//},
	//onBeforeSaveRawImage: function() {
		
	//},
	/**
	 * @event onAfterSaveRawImage
	 * 在原生图片保存后触发此事件
	 * 	@param {Object} data
	 *		success: {boolean} 是否保存成功
	 *		id：{String} 原生图片文件所对应的文档中心id
	 */
	//onAfterSaveRawImage: function(data) {
		
	//},
	/**
	 * @event onClose
	 * 在画板窗口关闭前触发，本事情只支持以窗口形式打开的画板，不支持iframe
	 * 返回字符串可自动弹出提示框让用户确认是否关闭画板
	 */
	//onClose: function() {
		
	//}
	var drawWindow = null;
	
	var methods = {
		init: function(options) {
			var drawUrl = options.ctx + '/lims/common/component/draw/index.jsp?param=drawBoard',
				otherWindow = options.window || window;
			otherWindow.drawBoard = options;
			if(options.iframeEl) {
				var other$ = otherWindow.jQuery;
				var $drawFrame = other$(options.iframeEl);
				$drawFrame.attr('src', drawUrl);
			} else {
				if(!drawWindow || drawWindow.closed) {
					drawWindow = window.open(drawUrl);
				} else {
					drawWindow.location.href = drawUrl;
					drawWindow.focus();
				}
			}
		}
	};
	
	$.drawBoard = function(options) {
		var method = arguments[0];
        if(methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if(typeof(method) === 'object' || !method) {
            method = methods.init;
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.drawBoard');
            return this;
        }
        return method.apply(this, arguments);
	};
})(jQuery);