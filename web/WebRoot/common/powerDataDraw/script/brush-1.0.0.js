/**
 * Created by 黄冠豪 on 2015/8/6.
 * Copyright 2015 Boanda
 * Released under the MIT license
 */
(function() {
    // 静态私有变量
    var name = 'boanda-bursh-layer-',
        index = 0,
        DATA_KEY = 'brushData';

    // 私有函数
    /**
     * 新建可绘画图层
     * @param options 				{Object} 图层选项
     * @param options.name 			{String} 图层名称，如为空，会自动生成
     * @param options.canvasBuffer 	{canvas} 图层缓冲，如果传入，则以此缓冲作为绘画缓冲，绘画时会更新此画板内容
     * @param options.isBackground	{Boolean} 是否作为背景新建的图层
     */
    var createBurshBoardLayer = function(options) {
        var canvas = $(this),
            brushData = canvas.data(DATA_KEY),
            _canvasBuffer;

        options = $.extend({
            name: name + index++
        }, options);
        // 如果canvasBuffer没有值，新建缓冲
        if(!options.canvasBuffer) {
            // 使用双缓冲，提高复杂笔触的绘画性能，并且让线条做自定分层，不用jCanvas的分层，减少无必要的图层
            _canvasBuffer = document.createElement('canvas');
            _canvasBuffer.width = canvas.width();
            _canvasBuffer.height = canvas.height();
            options.canvasBuffer = _canvasBuffer;
        }

        var layerName = options.name;
        // 定义显示图层，开启draggable事件监听鼠标绘画动作并更新图形
        canvas.burshBoard({
            name: layerName,
            layer: true,
            // TODO 非顶部图层取消draggable事件
            draggable: true,
            canvasBuffer: options.canvasBuffer,
            boardType: 'brush',
            remove: onLayerRemove,
            data: {
                brushLayers: brushData.brushLayers
            }
        });

        brushData.cBrushLayer = canvas.getLayer(layerName);
        brushData.brushLayers.push(brushData.cBrushLayer);
        brushData.cBrushLayer.isNew = true;
        // 如果是背景图层，把图层移动到底部
        if(options.isBackground) {
            canvas.moveLayer(brushData.cBrushLayer, 0);
        }
    };
    /**
     * 保存当前的画笔图层状态
     * @canvas {canvas} 画布jQuery对象
     */
    var savePrevImg = function(canvas) {
        var data = canvas.data(DATA_KEY),
            brushLayers = data.brushLayers,
            brushLayerPrevImgs = data.brushLayerPrevImgs = {},
            tLayer;
        // 记录绘画前的图像
        for(index = 0; index < brushLayers.length; index++) {
            tLayer = brushLayers[index];
            brushLayerPrevImgs[tLayer.name] = tLayer.canvasBuffer.getContext('2d').getImageData(0,0,canvas.width(),canvas.height());
        }
        if(tLayer) {
            tLayer.data.brushLayerPrevImgs = brushLayerPrevImgs;
        }
    };
    /**
     * 在鼠标按下时做绘画准备工作
     * 记录初始鼠标座标，在顶层生成绘画图层，记录鼠标按下状态等
     * @param event 		{Object} 事件对象
     * @param event.data 	{canvas} canvas jQuery对象 
     */
    var onMouseDown = function(event) {
        if(event.button !== 0) {
            // 只允许左键绘画
            return;
        }
        var canvas = event.data,
            canvasData = canvas.data(DATA_KEY),
            cLayer = canvasData.cBrushLayer;
        canvasData.isDown = true;
        canvasData.startPoint = {
            x: event.offsetX,
            y: event.offsetY
        };
        // getLayers会记录鼠标的当前状态为初始状态，在调用前先恢复鼠标，防止鼠标被一直隐藏无法显示
        // 表现在第一次用画笔后，再用其他工具就无法显示鼠标的问题 TODO 找原因
        canvas.removeClass('hide_cursor');
        var layers = canvas.getLayers();
        canvas.addClass('hide_cursor');

        // 如果当前绘画图层不在顶层，则新建图层到顶层
        if(cLayer !== layers[layers.length - 1]) {
            createBurshBoardLayer.call(canvas);
            cLayer = canvasData.cBrushLayer;
            canvasData.onAdd.call(canvas, cLayer);
        }
        canvas.addClass('hide_cursor');
        if(!cLayer) {
            // TODO remove
            return;
        }
        // 记录绘画前的图像
        savePrevImg(canvas);

        //当前图层上绘画一点，防止点击鼠标未移动时无图像
        $(cLayer.canvasBuffer).drawEllipse({
            width: canvasData.weight,
            height: canvasData.weight,
            fillStyle: canvasData.color,
            x: event.offsetX, y: event.offsetY
        });

    };
    /**
     * 鼠标up事件
     * 触发画笔onChange事件
     */
    var onMouseUp = function(event) {
        var canvasData = event.data.data(DATA_KEY);
        canvasData.isDown = false;
        if(canvasData.cBrushLayer) {
            canvasData.onChange.call(event.data, canvasData.cBrushLayer);
            canvasData.cBrushLayer.isNew = false;
        }
    };
    /**
     * 处理鼠标移动事件，在鼠标左键按下时，移动鼠标绘画线条
     */
    var onMouseMove = function(event) {
        var canvasData = event.data.data(DATA_KEY),
            layer = canvasData.cBrushLayer;
        // 读取鼠标当前坐标
        var endX = event.offsetX,
            endY = event.offsetY;

        // 移动笔尖
        var pencil = canvasData.pencil;
        pencil.css({
            top: event.clientY - canvasData.weight/2 + 'px',
            left: event.clientX - canvasData.weight/2 + 'px'
        });
        // 如果鼠标没有按下，不绘画
        if (!canvasData.isDown) {
            return;
        }

        var startPoint = canvasData.startPoint;
        //奇数宽度的线条坐标取半像素才能得到清晰的线条
        if(canvasData.weight % 2 === 1) {
            endX = endX + 0.5;
            endY = endY + 0.5;
        }
        // 计算两点距离，鼠标位移超过指定的长度才能继续绘画，可以减少线条扭曲的情况，并减少不必要的绘图计算
        var h = startPoint.y - endY,
            w = startPoint.x - endX;
        if(Math.sqrt(h * h + w * w) < 3.5) {
            return;
        }

        if(!layer) {
            return;
        }
        // 可通过这里绘制不同的图形控制笔触，如果使用非连续笔触，需要重构，
        // 因为鼠标移动事件每次触发的位移不一致，为了让画出的图像连续间隔一致，
        // 记录鼠标每一个移动坐标，再调用绘画函数（未实现）填充每两个坐标之间的间隔
        $(layer.canvasBuffer).drawLine({
            strokeWidth: canvasData.weight,
            strokeStyle: canvasData.color,
            strokeCap: 'round',
            strokeJoin: 'round',
            x1: startPoint.x, y1: startPoint.y,
            x2: endX, y2: endY
        });
        // 绘画完毕后，把开始坐标更新为当前坐标
        startPoint.x = endX;
        startPoint.y = endY;
    };
    /**
     * 鼠标移进canvas时显示画笔光标
     * @param event 		{Object} 事件对象
     * @param event.data 	{canvas} canvas的jQuery对象
     */
    var onMouseEnter = function(event) {
        var canvasData = event.data.data(DATA_KEY);
            canvasData.pencil.show();
    };
    /**
     * 鼠标移出canvas时隐藏画笔光标
     * @param event 		{Object} 事件对象
     * @param event.data 	{canvas} canvas的jQuery对象
     */
    var onMouseOut = function(event) {
        var canvasData = event.data.data(DATA_KEY);
        canvasData.pencil.hide();
    };
    /**
     * 当画笔图层被销毁时，清理对此图层的引用
     * @param {layer} jCanvas图层对象
     */
    var onLayerRemove = function(layer) {
        var canvasData = $(layer.canvas).data(DATA_KEY),
            brushLayers = canvasData.brushLayers,
            index;
        for(index = 0; index < brushLayers.length; index++) {
            if(brushLayers[index].name === layer.name) {
                brushLayers.splice(index, 1);
                break;
            }
        }
        canvasData.cBrushLayer = null;
    };
    // 空函数，用于初始化未配置的函数
    var emFn = function() {};
    // 静态公共函数
    var methods = {
        init: function(options) {
            return $.each(this, function() {
                var canvas = $(this);
                var data = canvas.data(DATA_KEY);
                if(!data) {
                    data = {
                        brushLayers: [],
                        data: {
                            // 用于记录每一层图像的上一次数据
                            brushLayerPrevImgs: {}
                        },
                        cBrushLayer: null,
                        otherLayers: [],
                        color: '#000',
                        weight: 2,
                        onChange: emFn,
                        onAdd: emFn
                    };
                    data = $.extend({}, data, options);
                } else {
                    data = $.extend({}, data, options);
                }
                canvas.data(DATA_KEY, data);
                // 创建画笔光标 TODO 如果多次调用初始化函数会创建多个笔触，需要做不重复处理
                var pencil = $('<span></span>');
                pencil.css({
                    width: data.weight + 'px',
                    height: data.weight + 'px',
                    borderRadius: data.weight + 'px',
                    display: 'block',
                    top: '100px',
                    left: '200px',
                    border: '1px solid black',
                    position: 'fixed',
                    pointerEvents: 'none'
                }).appendTo('body').hide();
                data.pencil = pencil;
            });
        },
        /**
         * 激活画笔绘画
         */
        start: function() {
            return $.each(this, function() {
                //TODO 连续点击而在中间没新建其他图层的，不新建图层
                var canvas = $(this);
                var brushData = canvas.data(DATA_KEY);
                if(brushData.isEmpty) {
                    // TODO useless, will remove
                    brushData.brushLayers.pop();
                    canvas.removeLayer(brushData.cBrushLayer.name);
                    brushData.cBrushLayer = null;
                    brushData.isEmpty = false;
                }

                canvas.mousedown(canvas, onMouseDown);
                canvas.mouseup(canvas, onMouseUp);
                canvas.mousemove(canvas, onMouseMove);
                canvas.mouseout(canvas, onMouseOut);
                canvas.mouseenter(canvas, onMouseEnter);
                canvas.addClass('hide_cursor');
            });
        },
        /**
         * 禁用画笔绘画
         */
        stop: function() {
            $.each(this, function() {
                var canvas = $(this),
                    brushData = canvas.data(DATA_KEY);
                canvas.unbind('mousedown', onMouseDown);
                canvas.unbind('mouseup', onMouseUp);
                canvas.unbind('mousemove', onMouseMove);
                canvas.unbind('mouseenter', onMouseEnter);
                canvas.unbind('mouseout', onMouseOut);
                canvas.removeClass('hide_cursor');
            });

        },
        /**
         * 设置画笔颜色
         * @param color {String} 颜色
         */
        setColor: function(color) {
            return this.each(function() {
                var $canvas = $(this),
                    brushData = $canvas.data(DATA_KEY);
                brushData.color = color;
                //TODO 设置颜色时无需重设画笔光标
                brushData.pencil.css({
                    background: 'transparent',
                    border: '1px solid black'
                });
            });
        },
        /**
         * 设置画笔粗细
         * @param weight {Number} 宽度像素 
         */
        setWeight: function(weight) {
            return this.each(function() {
                var $canvas = $(this),
                    brushData = $canvas.data(DATA_KEY);
                brushData.weight = weight;
                brushData.pencil.css({
                    borderRadius: weight + 'px',
                    width: weight + 'px',
                    height: weight + 'px'
                });
            });
        },
        /**
         * 把此类型的图层必要的数据转换成数据对象用于保存
         */
        toData: function(layer) {
            // TODO 空白图层处理，节省空间
            if(layer.boardType !== 'brush') {
                $.error('图层类型有误');
            }
            var data = {},
                canvas = layer.canvas;
            // 使用png无损压缩图像数据以节省内存
            data.imgData = layer.canvasBuffer.toDataURL("image/png");
            data.width = canvas.width;
            data.height = canvas.height;
            data.type = 'brush';
            return data;
        },
        /**
         * 把图形数据绘画到画板
         * @param data {Object} 通过toData函数转换的数据
         */
        fromData: function(data) {
            return this.each(function() {
                var canvas = $(this),
                    brushData = canvas.data(DATA_KEY),
                    img = document.createElement('img');
                img.src = data.imgData;

                // 使用双缓冲，提高复杂笔触的绘画性能
                var _canvasBuffer = document.createElement('canvas');
                _canvasBuffer.width = canvas.width();
                _canvasBuffer.height = canvas.height();
                _canvasBuffer.getContext("2d").drawImage(img, 0, 0);

                var layerName = name + index;
                index += 1;
                // 定义显示图层，开启draggable事件监听鼠标绘画动作并更新图形 TODO 使用createBoard统一创建
                canvas.burshBoard({
                    name: layerName,
                    layer: true,
                    draggable: true,
                    canvasBuffer: _canvasBuffer,
                    boardType: 'brush',
                    remove: onLayerRemove,
                    data: {
                        brushLayers: brushData.brushLayers
                    }
                });
                brushData.cBrushLayer = canvas.getLayer(layerName);
                brushData.brushLayers.push(brushData.cBrushLayer);
            });
        },
        /**
         * 擦除指定区域的图像，调用此函数会擦除所有本类型图层指定区域的图像
         * 请在调用此函数前调用clearStart函数记录擦除前的图形状态
         * 请在调用此函数（可多次调用后）后调用clearStop，以触发历史记录此状态以便撤销
         * @param x {Number} x坐标
         * @param y {Number} y坐标
         * @param width {Number} 擦除的宽度
         * @param height {Number} 擦除的高度
         */
        clear: function(x, y, width, height) {
            this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    brushLayers, ctx;
                brushLayers = data.brushLayers;
                for(var i = 0; i < brushLayers.length; i++) {
                    ctx = brushLayers[i].canvasBuffer.getContext('2d');
                    ctx.clearRect(x, y, width, height);
                }
            });
        },
        /**
         * 调用clear函数前请调用此函数以记录当前的图层状态
         */
        clearStart: function() {
            this.each(function() {
                var canvas = $(this);
                savePrevImg(canvas);
            });
        },
        /**
         * 调用clear后请调用此函数，触发onChange事件以支持撤销
         * 可以多次调用clear后调用此函数以记录此历史
         */
        clearStop: function() {
            this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY);
                // TODO 如果此图层的笔迹已经被清空，删除图层，并兼容撤销
                if(data.cBrushLayer) {
                    data.onChange.call(canvas, data.cBrushLayer);
                }
            });
        },
        /**
         * 获取最新图层
         */
        getLastLayer: function() {
            return this.data(DATA_KEY).cBrushLayer;
        },
        add: function(options) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY);
                createBurshBoardLayer.call(canvas, options);
                var layer = data.cBrushLayer;
                layer.canvasBuffer.getContext('2d').putImageData(options.imgData, 0, 0);
            });
        },
        /**
         * 把图像绘制到画板上，通过此函数绘制的图形可用clear擦除，绘制原始大小的图像。如需要可移动并可缩放的图像，请用imageTool
         * @param source 		{String} 图像资源url，可支持data url
         * @param isBackground 	{Boolean} 是否绘制到背景
         */
        createImage: function(source, isBackground) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    img = new Image();
                img.onload = function() {
                    var _canvasBuffer = document.createElement('canvas');
                    _canvasBuffer.width = canvas.width();
                    _canvasBuffer.height = canvas.height();
                    createBurshBoardLayer.call(canvas, {
                        canvasBuffer: _canvasBuffer,
                        isBackground: isBackground
                    });
                    savePrevImg(canvas);
                    data.onAdd.call(canvas, data.cBrushLayer);
                    _canvasBuffer.getContext("2d").drawImage(img, 0, 0);
                    data.onChange.call(canvas, data.cBrushLayer);
                    data.cBrushLayer.isNew = false;
                    canvas.drawLayers();
                };
                img.src = source;
            });
        }
    };
    $.fn.brushTool = function(options) {
        var method = arguments[0];
        if(methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if(typeof(method) === 'object' || !method) {
            method = methods.init;
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.burshTool' );
            return this;
        }
        return method.apply(this, arguments);
    };

    // 定义绘画层状态类，用于记录当前的图层状态
    $.fn.brushTool.BrushState = function(brushLayer) {
        var brushLayers = brushLayer.data.brushLayers,
            index, layer, bufferCanvas;
        this.imgData = {};//ctx.getImageData(0,0,canvas.width,canvas.height);
        this.prevImgDatas = brushLayer.data.brushLayerPrevImgs;
        this.index = brushLayer.index;
        this.type = 'brush';
        this.isNew = brushLayer.isNew;
        this.layerName = brushLayer.name;
        this.canvas = brushLayer.canvas;
        this.layer = brushLayer;
        // 记录当前所有图层数据
        for(index = 0; index < brushLayers.length; index++) {
            layer = brushLayers[index];
            bufferCanvas = layer.canvasBuffer;
            // TODO 此处需要优化内存占用
            this.imgData[layer.name] = bufferCanvas.getContext('2d').getImageData(0,0,bufferCanvas.width,bufferCanvas.height);
        }

        if (typeof $.fn.brushTool.BrushState._initialized == "undefined") {
            $.fn.brushTool.BrushState.prototype.restore = function(fn) {
                var me = this,
                    brushLayers = me.layer.data.brushLayers,
                    canvas = $(me.canvas),
                    layer,
                    index;
                if(me.isNew) {
                    // TODO 此处可能会触发撤销记录
                    canvas.removeLayer(me.layerName);
                    layer = me.layer;
                    layer.isNew = true;
                } else {
                    for(index = 0; index < brushLayers.length; index++) {
                        layer = brushLayers[index];
                        if(me.prevImgDatas.hasOwnProperty(layer.name)) {
                            layer.canvasBuffer.getContext('2d').putImageData(me.prevImgDatas[layer.name], 0, 0);
                        }
                    }
                }
                if(typeof fn === 'function') {
                    fn.call(canvas, layer);
                }
                layer.isNew = false;
                layer.isDel = false;
            };
            $.fn.brushTool.BrushState.prototype.redo = function(fn) {
                var me = this,
                    brushLayers = me.layer.data.brushLayers,
                    canvas = $(me.canvas),
                    layer, index;
                if(me.isNew) {
                    for(index = 0; index < brushLayers.length; index++) {
                        if(brushLayers[index] === me.layer) {
                            break;
                        }
                    }
                    //$(me.canvas).addLayer(me.layer);
                    canvas.brushTool('add', {
                        name: me.layer.name,
                        imgData: me.imgData[me.layer.name]
                    });
                    brushLayers[index] = layer = $(me.canvas).getLayer(me.layer.name); //TODO $(me.canvas)
                    layer.isNew = true;
                } else {
                    for(index = 0; index < brushLayers.length; index++) {
                        layer = brushLayers[index];
                        if(me.imgData.hasOwnProperty(layer.name)) {
                            layer.canvasBuffer.getContext('2d').putImageData(me.imgData[layer.name], 0, 0);
                        }
                    }
                }
                //TODO 未调用回调
                if(typeof fn === 'function') {
                    fn.call(canvas, layer);
                }
                layer.isNew = false;
                layer.isDel = false;
            };
            $.fn.brushTool.BrushState._initialized = true;
        }
    }
})(jQuery);


/**
 * @deprecated
 * @param point
 */
$.fn.calculateCanvasPoint = function(point) {
    var canvas = this;

};