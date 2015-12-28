/**
 * Created by 黄冠豪 on 2015/8/6.
 * Copyright 2015 Boanda
 * Released under the MIT license
 */
(function ($) {
    var imgIndex = 0,
        namePre = 'image-',
        DATA_KEY = 'imgToolSettings';
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
            layer.isDel = true;
            data.onRemove.call(this, layer);
            layer.isDel = false;
        }
    };

    var onShapeMouseDown = function(layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY);
        if(!layer.isNew) {
            data.onMouseDown.call(canvas, layer);
        }
    };

    var createImageLayer = function(options) {
        var canvas = this,
            data = this.data(DATA_KEY);
        $.extend(options, {
            layer: true,
            type: 'image',
            fromCenter: false,
            draggable: false,
            boardType: 'img',
            isNew: true,
            click: data.onClickShape,
            mousedown: onShapeMouseDown,
            dragstart: onRectControlStart,
            dragstop: data.onChange,
            controlStart: onRectControlStart,
            controlStop: data.onChange,
            remove: onLayerRemove
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
        var name = namePre + imgIndex;
        // TODO user createImageLayer
        var options = {
            name: name,
            layer: true,
            source: data.source,
            fromCenter: false,
            draggable: true,
            boardType: 'img',
            x: data.startX,
            y: data.startY,
            width: 0,
            height: 0,
            isNew: true
        };
        data.cImgLayer = createImageLayer.call(canvas, options);
        imgIndex += 1;

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
            layer = data.cImgLayer;
        if(!data.isDown) {
            return;
        }
        // 隐藏tip
        data.pixelTip.hide();
        // 如果创建的图形过小，删除此图形
        if(Math.abs(layer.width) < 10 || Math.abs(layer.height) < 10) {
            data.isStopRemoveEvent = true;
            canvas.removeLayer(layer);
            delete data['isStopRemoveEvent'];
            return;
        }
        data.isDown = false;
        data.onAdd.call(canvas, layer);
        data.cImgLayer.isNew = false;
    };
    var onMouseMove = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        if (!data.isDown) {
            return;
        }
        var radio = data.cHeight / data.cWidth;
        var endX = event.offsetX,
            endY = event.offsetY,
            imgLayer = data.cImgLayer,
            startX = data.startX,
            startY = data.startY;
        //imgLayer.x = startX;
        //imgLayer.y = startY;
        imgLayer.width = endX - startX;
        imgLayer.height = imgLayer.width * radio;
        canvas.drawLayers();
        data.pixelTip.find('.width').text(imgLayer.width);
        data.pixelTip.find('.height').text(imgLayer.height);
    };

    var getImgSize = function(options) {
        var img_url = options.src;
        var img = new Image();
        var inte;
        img.src = img_url;
        var checkImg = function() {
            if(img.width > 0 || img.height > 0) {
                clearInterval(inte);
                options.fn({
                    width: img.width,
                    height: img.height
                });
            }
        };
        if(img.complete){
            options.fn({
                width: img.width,
                height: img.height
            });
        }else{
            inte = setInterval(checkImg, 40);
        }
    };

    var emFn = function() {};

    var methods = {
        init: function (options) {
            return $(this).each(function () {
                var canvas = $(this),
                    tip;
                var imgToolSettings = canvas.data(DATA_KEY);
                if (!imgToolSettings) {
                    var defaults = {
                        source: '',
                        imageMap: {},
                        onAdd: emFn,
                        onClickShape: emFn,
                        onMouseDown: emFn,
                        onChange: emFn,
                        onRemove: emFn
                    };
                    imgToolSettings = $.extend({}, defaults, options);
                } else {
                    imgToolSettings = $.extend({}, imgToolSettings, options);
                }
                canvas.data(DATA_KEY, imgToolSettings);
                // 显示宽高的tip
                if(!imgToolSettings.pixelTip) {
                    tip = $('<span class="pixel-tip"><span class="width"></span> x <span class="height"></span></span>');
                    imgToolSettings.pixelTip = tip;
                    tip.css({
                        position: 'absolute',
                        display: 'block'
                    }).hide().appendTo('body');
                }
            });
        },
        activate: function(name) {
            return this.each(function() {
                var canvas = $(this),
                    imgToolSettings = canvas.data(DATA_KEY);
                imgToolSettings.source = imgToolSettings.imageMap[name];
                getImgSize({
                    src: imgToolSettings.imageMap[name],
                    fn: function(size) {
                        imgToolSettings.cWidth = size.width;
                        imgToolSettings.cHeight = size.height;
                    }
                });
                canvas.mousedown(canvas, onMouseDown);
                canvas.mouseup(canvas, onMouseUp);
                canvas.mousemove(canvas, onMouseMove);
            });
        },
        inactivate: function() {
            var canvas = $(this);
            canvas.unbind('mousedown', onMouseDown);
            canvas.unbind('mouseup', onMouseUp);
            canvas.unbind('mousemove', onMouseMove);
        },
        getLastLayer: function() {
            return this.data(DATA_KEY).cImgLayer;
        },
        toData: function(layer) {
            if(layer.boardType !== 'img') {
                $.error('图层类型有误');
            }
            var data = {};
            data.type = 'img';
            data.width = layer.width;
            data.height = layer.height;
            data.x = layer.x;
            data.y = layer.y;
            // TODO 保存图片名
            data.source = layer.source;
            data.rotate = layer.rotate;
            return data;
        },
        fromData: function(data) {
            return this.each(function() {
                var canvas = $(this),
                    imgToolData = canvas.data(DATA_KEY);
                var name = namePre + imgIndex;
                // TODO use createImageLayer
                var options = {
                    name: name,
                    layer: true,
                    // TODO 通过图片名转换
                    source: data.source,
                    fromCenter: false,
                    draggable: true,
                    boardType: 'img',
                    rotate: data.rotate,
                    x: data.x,
                    y: data.y,
                    width: data.width,
                    height: data.height
                };
                imgToolData.cImgLayer = createImageLayer.call(canvas, options);
                imgIndex += 1;
            });
        },
        duplicate: function(layer) {
            if(layer.boardType !== 'img') {
                throw '不支持的图形类型：' + layer.boardType;
            }
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    layerData = canvas.imageTool('toData', layer);
                layerData.x = layerData.x + layerData.width;
                canvas.imageTool('fromData', layerData);
                data.cImgLayer.isNew = true;
                data.onAdd.call(canvas, data.cImgLayer);
                data.cImgLayer.isNew = false;
            });

        },
        addImage: function(source) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    imgToolData = canvas.data(DATA_KEY),
                    options = {};

                options.x = 100;
                options.y = 100;
                //options.width = 100;
                //options.height = 100;
                options.name = namePre + imgIndex++;
                options.source = source;
                imgToolData.cImgLayer = createImageLayer.call(canvas, options);
                data.onAdd.call(canvas, imgToolData.cImgLayer);
                data.cImgLayer.isNew = false;
            });
        },
        add: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    imgToolData = canvas.data(DATA_KEY),
                    options = {};
                options.x = layer.x;
                options.y = layer.y;
                options.name = layer.name;
                options.width = layer.width;
                options.height = layer.height;
                options.index = layer.index;
                options.source = layer.source;
                options.rotate = layer.rotate;
                imgToolData.cImgLayer = createImageLayer.call(canvas, options);
            });
        },
        remove: function(layer, options) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY);
                if(options.isStopRemoveEvent) {
                    data.isStopRemoveEvent = true;
                }
                canvas.removeLayer(layer);
                delete data['isStopRemoveEvent'];
            });
        }
    };
    $.fn.imageTool = function (options) {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof method === 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.imageTool');
            return this;
        }
        return method.apply(this, arguments);
    };
    // 定义图版层状态类，用于记录当前的图层状态
    $.fn.imageTool.ImageState = function(imgLayer) {
        this.index = imgLayer.index;
        this.type = 'img';
        this.isNew = imgLayer.isNew;
        this.isDel = imgLayer.isDel;
        this.layerName = imgLayer.name;
        this.canvas = imgLayer.canvas;
        this.prevProp = $.extend({}, imgLayer.prevProp);
        this.options = {
            x: imgLayer.x,
            y: imgLayer.y,
            width: imgLayer.width,
            height: imgLayer.height,
            rotate: imgLayer.rotate,
            name: imgLayer.name,
            index: imgLayer.index,
            source: imgLayer.source
        };
        //TODO remove this var
        this.layer = imgLayer;

        if (typeof $.fn.imageTool.ImageState._initialized == "undefined") {
            $.fn.imageTool.ImageState.prototype.restore = function(fn) {
                var me = this,
                    canvas = $(me.canvas),
                    layer;
                if(me.isNew) {
                    canvas.imageTool('remove', me.layerName, {isStopRemoveEvent: true});
                    layer = me.layer;
                    layer.isNew = true;
                } else if(me.isDel) {
                    canvas.imageTool('add', me.options);
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
            $.fn.imageTool.ImageState.prototype.redo = function(fn) {
                var me = this,
                    canvas = $(me.canvas),
                    layer;
                if(me.isNew) {
                    canvas.imageTool('add', me.options);
                    layer = canvas.getLayer(me.layerName);
                    layer.isNew = true;
                } else if(me.isDel) {
                    canvas.imageTool('remove', me.layerName, {isStopRemoveEvent: true});
                    layer = me.layer;
                } else {
                    layer = canvas.getLayer(me.layerName);
                    $.extend(layer, me.options);
                    canvas.triggerLayerEvent(layer, 'moveOrTra');
                }
                fn.call(canvas, layer);
                layer.isNew = false;
            };
            $.fn.imageTool.ImageState._initialized = true;
        }
    }
}(jQuery));