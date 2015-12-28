/**
 * Created by 黄冠豪 on 2015/8/6.
 * Copyright 2015 Boanda
 * Released under the MIT license
 *
 * TODO 与ellipse整合
 */
(function ($) {
    var rectIndex = 0;
    var DATA_KEY = 'rectToolSettings';
    // 用于记录位移或变形的初始状态
    var onRectControlStart = function(layer) {
        layer.prevProp = {
            x: layer.x,
            y: layer.y,
            width: layer.width,
            height: layer.height,
            rotate: layer.rotate
        };
    };

    var onLayerRemove = function(layer) {
        var data = $(this).data(DATA_KEY);
        if(!data.isStopRemoveEvent) {
            //TODO 数据放到layer.data
            layer.isDel = true;
            data.onRemove.call(this, layer);
            layer.isDel = false;
        }
    };

    // 用于处理mousedown事件，当在拖拽新建图形时不触发
    var onShapeMouseDown = function(layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY);
        if(!layer.isNew) {
            data.onMouseDown.call(canvas, layer);
        }
    };

    var createRectLayer = function(options) {
        var canvas = this,
            data = canvas.data(DATA_KEY);
        $.extend(options, {
            type: 'rectangle',
            layer: true,
            fromCenter: false,
            draggable: false,
            boardType: 'rect',
            click: data.onClickShape,
            mousedown: onShapeMouseDown,
            //TODO 拖动时隐藏控制点
            dragstart: onRectControlStart,
            dragstop: data.onChange,
            controlStart: onRectControlStart,
            controlStop: data.onChange,
            remove: onLayerRemove
        });
        canvas.addLayer(options);
        return canvas.getLayer(options.name);
    };

    var onMouseDown = function(event) {
        if(event.button !== 0) {
            // 只允许左键绘画
            return;
        }
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        data.isDown = true;
        data.startX = event.offsetX;
        data.startY = event.offsetY;
        if(data.isHollow && data.strokeWidth % 2 === 1) {
            data.startX = data.startX + 0.5;
            data.startY = data.startY + 0.5;
        }
        var name = 'rect' + rectIndex++;
        var options = {
            name: name,
            layer: true,
            fromCenter: false,
            draggable: true,
            boardType: 'rect',
            strokeDash: data.dash ? data.dash.split(',') : null,
            strokeDashOffset: 0,
            x: data.startX,
            y: data.startY,
            width: 0,
            height: 0,
            isNew: true,
            strokeWidth: data.strokeWidth
        };
        if(data.isHollow) {
            options.strokeStyle = data.color;
        } else {
            options.fillStyle = data.color;
        }
        data.cRectLayer = createRectLayer.call(canvas, options);

        data.pixelTip.find('.width').text(0);
        data.pixelTip.find('.height').text(0);
        data.pixelTip.show();
        data.pixelTip.css({
            top: event.clientY - data.pixelTip.outerHeight() - 5,
            left: event.clientX - 2
        });
    };
    var onMouseUp = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY),
            layer = data.cRectLayer;
        if(!data.isDown) {
            return;
        }
        data.isDown = false;
        // 隐藏tip
        data.pixelTip.hide();
        // 如果创建的矩形过小，删除此矩形
        if(Math.abs(layer.width) < 5 || Math.abs(layer.height) < 5) {
            data.isStopRemoveEvent = true;
            canvas.removeLayer(layer);
            delete data['isStopRemoveEvent'];
            return;
        }
        data.onAdd.call(canvas, layer);
        layer.isNew = false;
    };
    var onMouseMove = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        if (!data.isDown) {
            return;
        }
        var endX = event.offsetX,
            endY = event.offsetY;
        if(data.isHollow && data.strokeWidth % 2 === 1) {
            endX = endX + 0.5;
            endY = endY + 0.5;
        }
        var rectLayer = data.cRectLayer,
            startX = data.startX,
            startY = data.startY,
            width = endY - startY,
            height = endX - startX;
        if(data.isShiftDown) {
            // 按住shift键时画正方形
            if(Math.abs(width) > Math.abs(height)) {
                rectLayer.width = rectLayer.height = height;
            } else {
                rectLayer.height = rectLayer.width = width;
            }
        } else {
            rectLayer.height = endY - startY;
            rectLayer.width = endX - startX;
        }
        canvas.drawLayers();

        data.pixelTip.find('.width').text(Math.abs(rectLayer.width));
        data.pixelTip.find('.height').text(Math.abs(rectLayer.height));
    };

    var onKeyDown = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        if(event.keyCode === 17) {
            data.isCtrlDown = true;
        } else if(event.keyCode === 16) {
            data.isShiftDown = true;
        }
    };
    var onKeyUp = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        if(event.keyCode === 17) {
            data.isCtrlDown = false;
        }else if(event.keyCode === 16) {
            data.isShiftDown = false;
        }
    };

    var emFn = function() {};

    var methods = {
        init: function (options) {
            return $(this).each(function () {
                var $canvas = $(this), tip;
                var rectToolSettings = $canvas.data(DATA_KEY);
                if (!rectToolSettings) {
                    var defaults = {
                        color: '#000',
                        strokeWidth: 2,
                        isHollow: false,
                        dash: null,
                        onAdd: emFn,
                        onClickShape: emFn,
                        onMouseDown: emFn,
                        onChange: emFn,
                        onRemove: emFn
                    };
                    rectToolSettings = $.extend({}, defaults, options);
                } else {
                    rectToolSettings = $.extend({}, rectToolSettings, options);
                }
                $canvas.data(DATA_KEY, rectToolSettings);

                // 显示宽高的tip
                if(!rectToolSettings.pixelTip) {
                    tip = $('<span class="pixel-tip"><span class="width"></span> x <span class="height"></span> （按住Shift可画正方形）</span>');
                    rectToolSettings.pixelTip = tip;
                    tip.css({
                        position: 'absolute',
                        display: 'block'
                    }).hide().appendTo('body');
                }
            });
        },
        activate: function() {
            return this.each(function() {
                var canvas = $(this);
                canvas.mousedown(canvas, onMouseDown);
                canvas.mouseup(canvas, onMouseUp);
                canvas.mousemove(canvas, onMouseMove);
                $(window).keydown(canvas, onKeyDown);
                $(window).keyup(canvas, onKeyUp);
            });
        },
        inactivate: function() {
            var canvas = $(this);
            canvas.unbind('mousedown', onMouseDown);
            canvas.unbind('mouseup', onMouseUp);
            canvas.unbind('mousemove', onMouseMove);
            $(window).unbind('keydown', onKeyDown);
            $(window).unbind('keyup', onKeyUp);
        },
        setColor: function(color) {
            return this.each(function() {
                var canvas = $(this),
                    rectToolSettings = canvas.data(DATA_KEY);
                rectToolSettings.color = color;
            });
        },
        setWeight: function(weight) {
            return this.each(function() {
                var canvas = $(this),
                    rectToolSettings = canvas.data(DATA_KEY);
                rectToolSettings.strokeWidth = weight;
            });
        },
        setDash: function(dash) {
            return this.each(function() {
                var data = $(this).data(DATA_KEY);
                data.dash = dash;
            });
        },
        setIsHollow: function(isHollow) {
            return this.each(function() {
                var canvas = $(this),
                    rectToolSettings = canvas.data(DATA_KEY);
                rectToolSettings.isHollow = isHollow;
            });
        },
        getLastLayer: function() {
            return this.data(DATA_KEY).cRectLayer;
        },
        toData: function(layer) {
            if(layer.boardType !== 'rect') {
                $.error('图层类型有误');
            }
            var data = {};
            data.type = 'rect';
            data.width = layer.width;
            data.height = layer.height;
            data.x = layer.x;
            data.y = layer.y;
            data.fillStyle = layer.fillStyle;
            data.strokeStyle = layer.strokeStyle;
            data.strokeWidth = layer.strokeWidth;
            data.rotate = layer.rotate;
            return data;
        },
        fromData: function(data) {
            return this.each(function() {
                var canvas = $(this),
                    rectToolData = canvas.data(DATA_KEY);
                var name = 'rect' + rectIndex++;
                var options = {
                    name: name,
                    layer: true,
                    fillStyle: data.fillStyle,
                    strokeStyle: data.strokeStyle,
                    strokeWidth: data.strokeWidth,
                    fromCenter: false,
                    draggable: true,
                    boardType: 'rect',
                    rotate: data.rotate,
                    x: data.x,
                    y: data.y,
                    width: data.width,
                    height: data.height
                };
                rectToolData.cRectLayer = createRectLayer.call(canvas, options);
            });
        },
        add: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    rectToolData = canvas.data(DATA_KEY),
                    options = {};
                options.x = layer.x;
                options.y = layer.y;
                options.width = layer.width;
                options.height = layer.height;
                options.fillStyle = layer.fillStyle;
                options.strokeStyle = layer.strokeStyle;
                options.strokeWidth = layer.strokeWidth;
                options.name = layer.name;
                options.rotate = layer.rotate;
                options.index = layer.index;
                rectToolData.cRectLayer = createRectLayer.call(canvas, options);
            });
        },
        remove: function(layer, options) {
            return this.each(function() {
                var canvas = $(this),
                    rectToolData = canvas.data(DATA_KEY);
                if(options.isStopRemoveEvent) {
                    rectToolData.isStopRemoveEvent = true;
                }
                canvas.removeLayer(layer);
                delete rectToolData['isStopRemoveEvent'];
            });
        },
        duplicate: function(layer) {
            if(layer.boardType !== 'rect') {
                throw '不支持的图形类型：' + layer.boardType;
            }
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    layerData = canvas.rectangleTool('toData', layer);
                layerData.x = layerData.x + layerData.width + 2;
                canvas.rectangleTool('fromData', layerData);
                data.cRectLayer.isNew = true;
                data.onAdd.call(canvas, data.cRectLayer);
                data.cRectLayer.isNew = false;
            });
        }
    };
    $.fn.rectangleTool = function (options) {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof method === 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.rectangleTool');
            return this;
        }
        return method.apply(this, arguments);
    };
    // 定义矩形层状态类，用于记录当前的图层状态
    $.fn.rectangleTool.RectState = function(rectLayer) {
        this.index = rectLayer.index;
        this.type = 'rect';
        this.isNew = rectLayer.isNew;
        this.isDel = rectLayer.isDel;
        this.layerName = rectLayer.name;
        this.canvas = rectLayer.canvas;
        this.prevProp = $.extend({}, rectLayer.prevProp);
        this.options = {
            x: rectLayer.x,
            y: rectLayer.y,
            width: rectLayer.width,
            height: rectLayer.height,
            rotate: rectLayer.rotate,
            fillStyle: rectLayer.fillStyle,
            strokeStyle: rectLayer.strokeStyle,
            strokeWidth: rectLayer.strokeWidth,
            name: rectLayer.name,
            index: rectLayer.index
        };
        this.layer = rectLayer;

        if (typeof $.fn.rectangleTool.RectState._initialized == "undefined") {
            $.fn.rectangleTool.RectState.prototype.restore = function(fn) {
                var me = this,
                    canvas = $(me.canvas),
                    layer;
                if(me.isNew) {
                    canvas.rectangleTool('remove', me.layerName, {isStopRemoveEvent: true});
                    layer = me.layer;
                    layer.isNew = true;
                } else if(me.isDel) {
                    canvas.rectangleTool('add', me.options);
                    layer = canvas.getLayer(me.layerName);
                    layer.isDel = true;
                } else {
                    layer = $(me.canvas).getLayer(me.layerName);
                    $.extend(layer, me.prevProp);
                    canvas.triggerLayerEvent(layer, 'moveOrTra');
                }
                if(typeof fn === 'function') {
                    fn.call(canvas, layer);
                }
                layer.isNew = false;
                layer.isDel = false;
            };
            $.fn.rectangleTool.RectState.prototype.redo = function(fn) {
                var me = this,
                    canvas = $(me.canvas),
                    layer;
                if(me.isNew) {
                    canvas.rectangleTool('add', me.options);
                    layer = canvas.getLayer(me.layerName);
                    layer.isNew = true;
                } else if(me.isDel) {
                    canvas.rectangleTool('remove', me.layerName, {isStopRemoveEvent: true});
                    layer = me.layer;
                } else {
                    layer = canvas.getLayer(me.layerName);
                    $.extend(layer, me.options);
                    canvas.triggerLayerEvent(layer, 'moveOrTra');
                }
                if(typeof fn === 'function') {
                    fn.call(canvas, layer);
                }
                layer.isNew = false;
            };
            $.fn.rectangleTool.RectState._initialized = true;
        }
    }
}(jQuery));