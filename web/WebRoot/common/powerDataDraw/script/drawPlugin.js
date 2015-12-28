/**
 * Created by Boanda on 2015/9/2.
 */

    // 定义绘画图层，用于显示缓冲区图形
$.jCanvas.extend({
    name: 'burshBoard',
    props: {},
    fn: function(ctx, params) {
        var p = params;
        ctx.drawImage(p.canvasBuffer, p.x, p.y);
    }
});


// 用于历史记录
function History(options) {
    this.hist = [];
    this.index = undefined;
    this.length = 0;
    this.events = $.extend({
    	onAdd: function() {},
    	onUndo: function() {},
    	onRedo: function() {}
    }, options);

    if (typeof History._initialized === "undefined") {
        History.prototype.add = function (state) {
            var me = this;
            me.index = me.index !== undefined ? me.index + 1 : 0;
            me.hist[me.index] = state;
            me.length = me.index + 1;
            // 如果撤销后重新记录，把撤销的记录清除
            if (me.hist.length > me.length) {
                me.hist = me.hist.slice(0, me.length);
            }
            me.events.onAdd();
        };
        // TODO 画一个矩形，撤销到矩形被删除，再点矩形工具会触发异常
        History.prototype.undo = function (fn) {
            var state, me = this;
            if (me.index >= 0) {
                state = me.hist[me.index];
                state.restore(fn);
                me.index--;
            }
            me.events.onUndo();
        };
        History.prototype.redo = function (fn) {
            var state, me = this;
            if (me.index < me.length - 1) {
                me.index++;
                state = me.hist[me.index];
                state.redo(fn);
            }
            me.events.onRedo();
        };
        History._initialized = true;
    }
}

// 文件管理类
function FileManager() {
    // TODO 此处的非this变量会造成内存泄露
    var filter = /(?:bmp|png|jpeg|svg)/i;
    ///^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i
    // 1K一组，太大时压缩数据会出错，并且取1K压缩率较高
    var maxLength = 1000;
    // 分段压缩后的分隔符，解压时用于分隔进行解压
    var separator = '------#------';
    // 压缩
    var compress = function(dataStr) {
        var compressedParts = [],
            strLength = dataStr.length,
            index = 0, compressedStr;
        // 分段压缩，如果长度过长压缩会出错
        while(index < strLength) {
            compressedParts.push(as3long.lzwcn.compress(dataStr.substr(index, maxLength)))
            index += maxLength;
        }
        compressedStr = compressedParts.join(separator);
        return compressedStr;
    };

    var uncompress = function(dataStr) {
        var jsonArray = dataStr.split(separator),
            index;
        for(index = 0; index < jsonArray.length; index++) {
            jsonArray[index] = as3long.lzwcn.decompress(jsonArray[index]);
        }
        return jsonArray.join('');
    };
    
    var dataUrlToBlob = function(dataUrl) {
		// data:image/jpeg;base64,R0lGODlhMwAxAIAA...
    	var dataArray = dataUrl.split(','),
    		type = dataArray[0].substring(dataArray[0].indexOf(':') + 1, dataArray[0].indexOf(';')),
    		// base64解码
    		data = window.atob(dataArray[1]),
    		// 转成byte
    		uint8 = new Uint8Array(data.length),
    		i;
    	for(i = 0; i < data.length; i++) {
    		uint8[i] = data.charCodeAt(i);
    	}
    	return new Blob([uint8], {type: type});
    };
    // String转为Blod，保存成文件时，读取文本请用utf-16lb字符集
    var stringToBlob = function(str) {
    	var uint16 = new Uint16Array(str.length),
    		i;
    	for(i = 0; i < str.length; i++) {
    		uint16[i] = str.charCodeAt(i);
    	}
    	return new Blob([uint16]);
    };
    
    var upload = function(options) {
    	var dataForm = new FormData(),
    		object = options.data,
    		property;
    	// 把数据添加到FormData
    	for(property in object) {
    		if(object.hasOwnProperty(property)) {
    			if(toString.call(object[property]) === '[object Blob]') {
    				// 如果为Blob类型，第三个参数添加文件名（Blob类型对象与File类似）
    				dataForm.append(property, object[property], property + options.extension);
    			} else {
    				dataForm.append(property, object[property]);
    			}
    		}
    	}
        
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
        	var obj;
            if(request.readyState === 4 && request.status === 200) {
                if(typeof options.success === 'function') {
                	try {
                		obj = JSON.parse(request.response);
                		options.success(obj);
                	} catch (e) {
                		options.success(request.response);
                	}
                }
            }
        };
        request.open("POST", options.url);
        request.send(dataForm);
    };

    var isImageFile = function(file) {
        return filter.test(file.type);
    };

    if(typeof FileManager._initialized === 'undefined') {
        FileManager.prototype.save = function(options) {
            var jsonStr = JSON.stringify(options.data);
            var compressData = compress(jsonStr);
            upload({
            	data: {
            		data: stringToBlob(compressData),
            		id: options.fileId,
            		fileId: options.fileId || ''
            	},
            	extension: '.bbd',
            	url: options.url,
            	success: options.success
            });
        };
        /**
         * 加载原生图像
         * @param {Object} options 加载图像的配置项
         * @param {String} options.url
         */
        FileManager.prototype.load = function(options) {
            $.ajax({
                type: 'POST',
                url: options.url,
                data: options.data,
                dataType: 'text',
                success: function(d) {
                	var obj;
                	try {
                		obj = JSON.parse(d);
                	} catch(e) {
                		obj = JSON.parse(uncompress(d));
                	}
            		if(obj.result == 'false') {
            			Tools.tooltip({
            				msg: obj.msg,
            				showDelay: 5000
            			});
            		}
                    if(typeof options.success === 'function') {
                        options.success(obj);
                    }
                }
            });
        };
        FileManager.prototype.download = function(options) {
            //var image = canvas.getCanvasImage('png', 1).replace("image/png", "image/octet-stream");
            //window.location.href=image;
            var aLink = document.createElement('a');
            var dataUrl, fileName = options.fileName;
            if(options.data.indexOf('image/') >= 0) {
                dataUrl = options.data;
                if(fileName.indexOf('.') < 0) {
                    if(options.data.indexOf('image/jpeg') >= 0) {
                        fileName += '.jpeg';
                    } else if(options.data.indexOf('image/png') >= 0) {
                        fileName += '.png';
                    } else if(options.data.indexOf('text/plain') >= 0) {
                        fileName += '.txt';
                    }
                }
            } else {
                dataUrl = URL.createObjectURL(new Blob([options.data]));
            }
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
            aLink.download = fileName;
            aLink.href = dataUrl;
            aLink.dispatchEvent(evt);
        };
        FileManager.prototype.uploadImageFile = function(options) {
        	//var blob = dataUrlToBlob(options.data);
        	upload({
            	data: {
            		file: options.data
            	},
            	extension: '.jpeg',
            	url: options.url,
            	success: function(obj) {
            		options.success(obj, options.data);
            	}
            });
        };
        FileManager.prototype.dataUrlToBlob = function(dataUrl) {
        	return dataUrlToBlob(dataUrl);
        },
        // 由于toDataURL直接导出为jpeg格式，透明色默认为黑色，这里填充背景色后转换
        FileManager.prototype.toJpeg = function(canvas, quality) {
            quality = quality || 1;
            var _canvasBuffer = document.createElement('canvas');
            _canvasBuffer.width = canvas.width;
            _canvasBuffer.height = canvas.height;
            var ctx = _canvasBuffer.getContext('2d'),
                imgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height),
                // Uint8ClampedArray
                data = imgData.data,
                // 背景色
                backgroundColor = [255, 255, 255],
                alpha;
            // 透明色与非透明背景色混合，此处为图片加上背景色
            for(var i=0;i<data.length;i+=4){
                alpha = data[i+3] / 255;
                data[i]  = data[i]   * alpha + backgroundColor[0] * ( 1 - alpha );
                data[i+1]= data[i+1] * alpha + backgroundColor[1] * ( 1 - alpha );
                data[i+2]= data[i+2] * alpha + backgroundColor[2] * ( 1 - alpha );
                data[i+3]= 255;
            }
            ctx.putImageData(imgData, 0, 0);
            return _canvasBuffer.toDataURL("image/jpeg", quality);
        };
        FileManager.prototype.loadImageFile = function(options) {
            if(!options.file || !isImageFile(options.file)) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function() {
                if(typeof options.success === 'function') {
                    options.success(reader.result);
                }
            };
            reader.readAsDataURL(options.file);
        };
        FileManager._initialized = true;
    }
}

var Tools = {
    confirm: function(options) {
        var r = confirm(options.text);
        if(r === true) {
            if(options.yes) {
                options.yes();
            }
        } else {
            if(options.no) {
                options.no();
            }
        }
    },
    /**
     * @cfg options {Object} 配置项
     * @cfg options.msg {String} 显示的消息
     * @cfg options.showDelay {Number} 显示消息的时间，如果autoHide配置项为true，消息显示超过此时间会自动消失
     * @cfg options.autoHide {Boolean} 是否自动隐藏消息
     * @return tooltip {Object} 返回此tip对象，非jQuery或dom
     * 	@function tooltip.close() 隐藏并销毁此tooltip
     *  @property tooltip.el tooltip的dom对象
     */
    tooltip: function(options) {
    	var options = $.extend({
    		showDelay: 1000,
    		autoHide: true
    	}, options);
    	var tip = $('<span></span>');
    	tip.html(options.msg);
    	tip.addClass('tooltip');
    	tip.addClass('normal');
    	tip.css({
    		position: 'fixed'
    	});
    	tip.hide().appendTo('body');
    	tip.fadeIn();
    	if(options.autoHide) {
    		tip.delay(options.showDelay)
    		.fadeOut(function() {
    			this.remove();
    		});
    	}
    	return {
    		close: function() {
    			tip.fadeOut(function() {
        			this.remove();
        		});
    		},
    		el: tip[0]
    	};
    },
    parseUrlParam: function() {
    	var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

        var urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
        return urlParams;
    }
};


// 图层管理
$(function($) {
    var DATA_KEY = 'layer-manager';

    var findLayer = function(layers, layer) {
        var index, iLayer;
        for(index = 0; index < layers.length; index++) {
            iLayer = layers[index];
            if(iLayer === layer || iLayer.name === layer) {
                return index;
            }
        }
    };
    var sortLayers = function(layers) {
        layers.sort(function(layer1, layer2) {
            return layer1.index - layer2.index;
        });
    };

    var methods = {
        init: function(options) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY);
                if(!data) {
                    data = {
                        currentLayer: null,
                        layers: []
                    };
                    data = $.extend({}, data, options);
                } else {
                    data = $.extend({}, data, options);
                }
                canvas.data(DATA_KEY, data);
            });
        },
        setCurrentLayer: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY);
                data.currentLayer = layer;
            });
        },
        getCurrentLayer: function() {
            return this.data(DATA_KEY).currentLayer;
        },
        isEmptyLayer: function(layer) {
            var bufferCanvas,
                imgData, i;
            if(layer.boardType === 'brush' || layer.boardType === 'line') {
                bufferCanvas = layer.canvasBuffer;
                imgData = bufferCanvas.getContext('2d').getImageData(0, 0, bufferCanvas.width, bufferCanvas.height).data;
                for(i = 3; i < imgData.length; i+=4) {
                    if(imgData[i] !== 0) {
                        return false;
                    }
                }
                return true;
            }
        },
        addLayer: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    onRemove = layer.remove;
                data.layers.push(layer);
                layer.remove = function(layer) {
                    if(typeof onRemove === 'function') {
                        onRemove.call($(this), layer);
                    }
                    canvas.layerManager('removeLayer', layer);
                };
            });
        },
        removeLayer: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    layers = data.layers,
                    index;
                index = findLayer(layers, layer);
                if(index >= 0) {
                    layers.splice(index, 1);
                } else {
                    throw '你要删除的图层不存在';
                }
            });
        },
        removeLayers: function() {
            var canvas = $(this),
                data = canvas.data(DATA_KEY);
            data.layers = [];
            data.currentLayer = null;
        },
        moveUp: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    layers = data.layers,
                    index, upperLayer;
                index = findLayer(layers, layer);
                if(index == layers.length - 1) {
                    // 本身已经在顶层
                    return;
                }
                // 如果此图层位于顶端前二，移到顶端
                if(index >= layers.length - 2) {
                    canvas.layerManager('moveTop', layer);
                } else {
                    // 取出上面第二层图像的index
                    upperLayer = layers[index + 2];
                    index = upperLayer.index;
                    canvas.moveLayer(layer, index -1);
                    //TODO 为layer添加层级移动事件，让resizetor的层级移动逻辑放到resizetor内，通过监控此事件触发，去除层管理对Resizetor的耦合
                    if(canvas.resizetor('hasResizetor', layer)) {
                        canvas.resizetor('moveResizetorTop', layer);
                    }
                }
                canvas.drawLayers();
                sortLayers(layers);
                canvas.triggerLayerEvent(layer, 'onZIndexChange');
            });
        },
        moveDown: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    layers = data.layers,
                    index, upperLayer;
                index = findLayer(layers, layer);
                if(index === 0) {
                    // 本身已经在底层
                    return;
                }
                // 如果此图层位于底端前二，移到最底端
                if(index <= 1) {
                    canvas.layerManager('moveBottom', layer);
                } else {
                    // 取出下面一层图像的index
                    upperLayer = layers[index - 1];
                    index = upperLayer.index;
                    canvas.moveLayer(layer, index);
                    if(canvas.resizetor('hasResizetor', layer)) {
                        canvas.resizetor('moveResizetorTop', layer);
                    }
                }
                canvas.drawLayers();
                sortLayers(layers);
                canvas.triggerLayerEvent(layer, 'onZIndexChange');
            });
        },
        moveTop: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    layers = canvas.getLayers(),
                    topLayer;
                topLayer = layers[layers.length - 1];
                if(topLayer === layer) {
                    // 本身已经在顶层
                    return;
                }
                canvas.moveLayer(layer, topLayer.index + 1);
                if(canvas.resizetor('hasResizetor', layer)) {
                    canvas.resizetor('moveResizetorTop', layer);
                }
                canvas.drawLayers();
                sortLayers(canvas.data(DATA_KEY).layers);
                canvas.triggerLayerEvent(layer, 'onZIndexChange');
            });
        },
        moveBottom: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    layers = canvas.getLayers();
                if(layer === layers[0]) {
                    // 本身已经在底层
                    return;
                }
                canvas.moveLayer(layer, 0);
                if(canvas.resizetor('hasResizetor', layer)) {
                    canvas.resizetor('moveResizetorTop', layer);
                }
                canvas.drawLayers();
                sortLayers(canvas.data(DATA_KEY).layers);
                canvas.triggerLayerEvent(layer, 'onZIndexChange');
            });
        }
    };

    $.fn.layerManager = function() {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof method === 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.layerManager');
            return this;
        }
        return method.apply(this, arguments);
    };
}(jQuery));

// canvas 右键菜单
(function($){

    var emFn = function() {};

    var DATA_KEY = 'menu-data';

    var createMenu = function(option) {
        var data = this.data(DATA_KEY);
        if(option === '-') {
            return $('<span class="split-line"></span>');
        }
        option = $.extend({
            text: '',
            group: null,
            disabled: true,
            onClick: emFn
        }, option);
        var menu = $('<li class="menu-item"></li>');
        if(option.disabled) {
            menu.addClass(data.disabledClass);
        } else {
            menu.click(option.onClick);
        }
        menu.data('groupName', option.group);
        menu.data('onClick', option.onClick);
        menu.text(option.text);
        return menu;
    };

    var methods = {
        init: function(options) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    settings = $.extend({
                        disabledClass: 'disabled',
                        disabled: false,
                        menus: []
                    }, options),
                    menus = settings.menus,
                    menuOption, menu, menuWrap,
                    index;
                if(!data) {
                    data = {
                        menuObjects: []
                    };
                }
                $.extend(settings, data);
                canvas.data(DATA_KEY, settings);

                menuWrap = $('<ul class="canvas-menu"></ul>');
                for(index = 0; index < menus.length; index++) {
                    menuOption = menus[index];
                    menu = createMenu.call(canvas, menuOption);
                    menuWrap.append(menu);
                    settings.menuObjects.push(menu);
                }
                menuWrap.css({
                    position: 'absolute'
                });
                menuWrap.hide().appendTo('body');

                canvas.on('contextmenu', function(e) {
                    e.preventDefault();
                    if(settings.disabled) {
                        return;
                    }
                    var height = menuWrap.height(),
                        width = menuWrap.width(),
                        top = e.clientY, left = e.clientX,
                        windowHeight = $(window).height(),
                        windowWidth = $(window).width();
                    if(height > windowHeight - e.clientY - 5) {
                        top = windowHeight - height - 5;
                    }
                    if(width > windowWidth - e.clientX - 15) {
                        left = windowWidth - width - 15;
                    }
                    menuWrap.css({
                        top: top + 'px',
                        left: left + 'px'
                    });
                    menuWrap.show();
                });
                $(document).on('click', function() {
                    menuWrap.hide();
                });
            });
        },
        disable: function() {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY);
                data.disabled = true;
            });
        },
        enable: function() {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY);
                data.disabled = false;
            });
        },
        disableGroup: function(groupName) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    menuObjects = data.menuObjects,
                    index, menu;
                for(index = 0; index < menuObjects.length; index++) {
                    menu = menuObjects[index];
                    if(menu.data('groupName') === groupName) {
                        menu.unbind('click', menu.data('onClick'));
                        menu.addClass(data.disabledClass);
                    }
                }
            });
        },
        enableGroup: function(groupName) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    menuObjects = data.menuObjects,
                    index, menu;
                for(index = 0; index < menuObjects.length; index++) {
                    menu = menuObjects[index];
                    if(menu.data('groupName') === groupName) {
                        menu.unbind('click', menu.data('onClick'));
                        menu.bind('click', menu.data('onClick'));
                        menu.removeClass(data.disabledClass);
                    }
                }
            });
        }
    };

    $.fn.canvasContextMenu = function(options) {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof method === 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.canvasContextMenu');
            return this;
        }
        return method.apply(this, arguments);
    };
}(jQuery));


(function($){
    // 线条大小选择器
    $.fn.lineWeightSelector = function(options) {
        var emFn = function() {};
        this.each(function() {
            var defaults = {
                onSelect: emFn,
                weightUnit: 'px'
            };
            options = $.extend({}, defaults, options);
            var $el = $(this),
                x = $el.offset().left,
                y = $el.offset().top + $el.height(),
                isHide = true;
            var wrap = $('<div class="weight-warp"></div>'),
                weight1 = $('<div><span weight="1"></span></div>').appendTo(wrap),
                weight2 = $('<div><span weight="2"></span></div>').appendTo(wrap),
                weight3 = $('<div><span weight="3"></span></div>').appendTo(wrap),
                weight5 = $('<div><span weight="5"></span></div>').appendTo(wrap),
                weight8 = $('<div><span weight="8"></span></div>').appendTo(wrap);
            wrap.css({
                position: 'absolute',
                top: y + 'px',
                left: x + 'px',
                display: 'none',
                width: '100px'
            });
            wrap.find('div').addClass('line-wrap').css({
                display: 'block',
                width: '100%',
                padding: '5px 0'
            }).click(function() {
                options.onSelect.call($el, $(this).find('span').attr('weight'));
            });
            wrap.find('span').css({
                display: 'block',
                width: '100%',
                backgroundColor: 'black'
            });
            wrap.find('span').css('height', function() {
                return $(this).attr('weight') + defaults.weightUnit;
            });
            wrap.appendTo($('body'));
            $el.click(function() {
                if(isHide) {
                    wrap.show();
                    isHide = false;
                } else {
                    wrap.hide();
                    isHide = true;
                }
            });
            $(document).click(function(e) {
                var targetEl = $(e.target);
                if(targetEl.attr('id') !== $el.attr('id') && targetEl.parent().attr('id') !== $el.attr('id')) {
                    if(!isHide) {
                        wrap.hide();
                        isHide = true;
                    }
                }
            });
        });
    };

    // 线条风格选择器
    $.fn.lineDashSelector = function(options) {
        var emFn = function() {};
        this.each(function() {
            var defaults = {
                onSelect: emFn,
                weightUnit: 'px'
            };
            options = $.extend({}, defaults, options);
            var $el = $(this),
                x = $el.offset().left,
                y = $el.offset().top + $el.height(),
                isHide = true;
            var wrap = $('<div class="dash-warp"></div>');
            $('<div><span value="0"></span></div>').appendTo(wrap);
            $('<div><span value="15,5"></span></div>').appendTo(wrap);
            $('<div><span value="10,5"></span></div>').appendTo(wrap);
            $('<div><span value="3,2"></span></div>').appendTo(wrap);
            $('<div><span value="10,3,3,3"></span></div>').appendTo(wrap);
            $('<div><span value="12,3,3,3,3,3"></span></div>').appendTo(wrap);
            $('<div><span value="16,3,6,3"></span></div>').appendTo(wrap);
            wrap.css({
                position: 'absolute',
                top: y + 'px',
                left: x + 'px',
                display: 'none',
                width: '100px'
            });
            wrap.find('div').addClass('line-wrap').css({
                display: 'block',
                width: '100%',
                padding: '5px 0'
            }).click(function() {
                options.onSelect.call($el, $(this).find('span').attr('value'));
            });
            wrap.find('span').css({
                display: 'block',
                width: '100%',
                height: '1px'
            });
            wrap.find('span').addClass(function(index) {
                return 'style' + (index + 1);
            });
            wrap.appendTo($('body'));
            $el.click(function() {
                if(isHide) {
                    wrap.show();
                    isHide = false;
                } else {
                    wrap.hide();
                    isHide = true;
                }
            });
            $(document).click(function(e) {
                var targetEl = $(e.target);
                if(targetEl.attr('id') !== $el.attr('id') && targetEl.parent().attr('id') !== $el.attr('id')) {
                    if(!isHide) {
                        wrap.hide();
                        isHide = true;
                    }
                }
            });
        });
    };
}(jQuery));