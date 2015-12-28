/**
 * Created by 黄冠豪 on 2015/8/6.
 * Copyright 2015 Boanda
 * Released under the MIT license
 * // TODO 与Rectangle整合
 */
(function ($) {
    var rectIndex = 0,
        DATA_KEY = 'ellipseToolSettings';

    var onDragStart = function(layer) {
        layer.prevProp = {
            x: layer.x,
            y: layer.y,
            width: layer.width,
            height: layer.height,
            rotate: layer.rotate
        };
    };

    var onEllipseLayerRemove = function(layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY);
        if(!data.isStopRemoveEvent) {
            layer.isDel = true;
            data.onRemove.call(canvas, layer);
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

    var createEllipseLayer = function(options) {
        var canvas = this,
            data = canvas.data(DATA_KEY);
        $.extend(options, {
            type: 'ellipse',
            layer: true,
            fromCenter: false,
            draggable: false,
            boardType: 'ellipse',
            mousedown: onShapeMouseDown,
            dragstart: onDragStart,
            dragstop: data.onChange,
            controlStart: onDragStart,
            controlStop: data.onChange,
            remove: onEllipseLayerRemove,
            click: data.onClickShape
        });
        this.addLayer(options);
        return this.getLayer(options.name);
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
        var name = 'ellipse' + rectIndex;
        var options = {
            name: name,
            layer: true,
            fromCenter: false,
            draggable: false,
            boardType: 'ellipse',
            strokeDash: data.dash ? data.dash.split(',') : null,
            strokeDashOffset: 0,
            strokeWidth: data.strokeWidth,
            x: data.startX,
            y: data.startY,
            width: 0,
            height: 0
        };
        if(data.isHollow) {
            options.strokeStyle = data.color;
        } else {
            options.fillStyle = data.color;
        }

        data.cEllipseLayer = createEllipseLayer.call(canvas, options);
        rectIndex += 1;

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
            layer = data.cEllipseLayer;
        if(!data.isDown) {
            return;
        }
        data.isDown = false;
        // 隐藏tip
        data.pixelTip.hide();
        // 如果创建的形状过小，删除此形状
        if(Math.abs(layer.width) < 5 || Math.abs(layer.height) < 5) {
            data.isStopRemoveEvent = true;
            canvas.removeLayer(layer);
            delete data['isStopRemoveEvent'];
            return;
        }
        layer.isNew = true;
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
        var rectLayer = data.cEllipseLayer,
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

        data.pixelTip.find('.width').text(rectLayer.width);
        data.pixelTip.find('.height').text(rectLayer.height);
    };
    var onKeyDown = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        if(event.keyCode === 17) {
            data.isCtrlDown = true;
        }
        if(event.keyCode === 16) {
            data.isShiftDown = true;
        }
    };
    var onKeyUp = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        if(event.keyCode === 17) {
            data.isCtrlDown = false;
        }
        if(event.keyCode === 16) {
            data.isShiftDown = false;
        }
    };
    var emFn = function() {};

    var methods = {
        init: function (options) {
            return $(this).each(function () {
                var $canvas = $(this), tip;
                var ellipseToolSettings = $canvas.data(DATA_KEY);
                if (!ellipseToolSettings) {
                    var defaults = {
                        color: '#000',
                        strokeWidth: 2,
                        dash: null,
                        onAdd: emFn,
                        onClickShape: emFn,
                        onMouseDown: emFn,
                        onChange: emFn,
                        onRemove: emFn,
                        isHollow: false
                    };
                    ellipseToolSettings = $.extend({}, defaults, options);
                } else {
                    ellipseToolSettings = $.extend({}, ellipseToolSettings, options);
                }
                $canvas.data(DATA_KEY, ellipseToolSettings);


                // 显示宽高的tip
                if(!ellipseToolSettings.pixelTip) {
                    tip = $('<span class="pixel-tip"><span class="width"></span> x <span class="height"></span> （按住Shift可画正圆）</span>');
                    ellipseToolSettings.pixelTip = tip;
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
            this.each(function() {
                var canvas = $(this),
                    ellipseToolSettings = canvas.data(DATA_KEY);
                ellipseToolSettings.color = color;
            });
        },
        setWeight: function(weight) {
            this.each(function() {
                var canvas = $(this),
                    ellipseToolSettings = canvas.data(DATA_KEY);
                ellipseToolSettings.strokeWidth = weight;
            });
        },
        setIsHollow: function(isHollow) {
            return this.each(function() {
                var canvas = $(this),
                    ellipseToolSettings = canvas.data(DATA_KEY);
                ellipseToolSettings.isHollow = isHollow;
            });
        },
        setDash: function(dash) {
            return this.each(function() {
                var data = $(this).data(DATA_KEY);
                data.dash = dash;
            });
        },
        getLastLayer: function() {
            return this.data(DATA_KEY).cEllipseLayer;
        },
        toData: function(layer) {
            if(layer.boardType !== 'ellipse') {
                $.error('图层类型有误');
            }
            var data = {};
            data.type = 'ellipse';
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
                    ellipseToolData = canvas.data(DATA_KEY);
                var name = 'ellipse' + rectIndex;
                //TODO use createEllipseLayer
                var options = {
                    name: name,
                    layer: true,
                    fillStyle: data.fillStyle,
                    strokeStyle: data.strokeStyle,
                    strokeWidth: data.strokeWidth,
                    fromCenter: false,
                    draggable: true,
                    boardType: 'ellipse',
                    rotate: data.rotate,
                    x: data.x,
                    y: data.y,
                    width: data.width,
                    height: data.height/*,
                    click: ellipseToolData.onClickShape,
                    dragstop: ellipseToolData.onChange,
                    controlStop: ellipseToolData.onChange*/
                };
                ellipseToolData.cEllipseLayer = createEllipseLayer.call(canvas, options);
                rectIndex += 1;
            });
        },
        add: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    ellipseToolData = canvas.data(DATA_KEY),
                    options = {};
                options.x = layer.x;
                options.y = layer.y;
                options.width = layer.width;
                options.height = layer.height;
                options.index = layer.index;
                options.rotate = layer.rotate;
                options.fillStyle = layer.fillStyle;
                options.strokeStyle = layer.strokeStyle;
                options.strokeWidth = layer.strokeWidth;
                options.name = layer.name;
                ellipseToolData.cEllipseLayer = createEllipseLayer.call(canvas, options);
            });
        },
        remove: function(layer, options) {
            this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY);
                if(options.isStopRemoveEvent) {
                    data.isStopRemoveEvent = true;
                }
                canvas.removeLayer(layer);
                delete data['isStopRemoveEvent'];
            });
        },
        duplicate: function(layer) {
            if(layer.boardType !== 'ellipse') {
                throw '不支持的图形类型：' + layer.boardType;
            }
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    layerData = canvas.ellipseTool('toData', layer);
                layerData.x = layerData.x + layerData.width + 2;
                canvas.ellipseTool('fromData', layerData);
                data.cEllipseLayer.isNew = true;
                data.onAdd.call(canvas, data.cEllipseLayer);
                data.cEllipseLayer.isNew = false;
            });
        }
    };
    $.fn.ellipseTool = function (options) {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof method === 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.ellipseTool');
            return this;
        }
        return method.apply(this, arguments);
    };

    // 定义圆形层状态类，用于记录当前的图层状态
    $.fn.ellipseTool.EllipseState = function(ellipseLayer) {
        this.index = ellipseLayer.index;
        this.type = 'rect';
        this.isNew = ellipseLayer.isNew;
        this.isDel = ellipseLayer.isDel;
        this.layerName = ellipseLayer.name;
        this.canvas = ellipseLayer.canvas;
        this.prevProp = $.extend({}, ellipseLayer.prevProp);
        this.options = {
            x: ellipseLayer.x,
            y: ellipseLayer.y,
            width: ellipseLayer.width,
            height: ellipseLayer.height,
            rotate: ellipseLayer.rotate,
            index: ellipseLayer.index,
            fillStyle: ellipseLayer.fillStyle,
            strokeStyle: ellipseLayer.strokeStyle,
            strokeWidth: ellipseLayer.strokeWidth,
            name: ellipseLayer.name
        };
        this.layer = ellipseLayer;

        if (typeof $.fn.ellipseTool.EllipseState._initialized == "undefined") {
            $.fn.ellipseTool.EllipseState.prototype.restore = function(fn) {
                var me = this,
                    canvas = $(me.canvas),
                    layer;
                if(me.isNew) {
                    canvas.ellipseTool('remove', me.layerName, {isStopRemoveEvent: true});
                    layer = me.layer;
                    layer.isNew = true;
                } else if(me.isDel) {
                    canvas.ellipseTool('add', me.options);
                    layer = canvas.getLayer(me.layerName);
                    layer.isDel = true;
                } else {
                    layer = canvas.getLayer(me.layerName);
                    $.extend(layer, me.prevProp);
                    canvas.triggerLayerEvent(layer, 'moveOrTra');
                }
                if(typeof fn === 'function') {
                    fn.call(canvas, layer);
                }
                layer.isNew = false;
                layer.isDel = false;
            };
            $.fn.ellipseTool.EllipseState.prototype.redo = function(fn) {
                var me = this,
                    canvas = $(me.canvas),
                    layer;
                if(me.isNew) {
                    canvas.ellipseTool('add', me.options);
                    layer = canvas.getLayer(me.layerName);
                    layer.isNew = true;
                } else if(me.isDel) {
                    canvas.ellipseTool('remove', me.layerName, {isStopRemoveEvent: true});
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
            $.fn.ellipseTool.EllipseState._initialized = true;
        }
    }
}(jQuery));