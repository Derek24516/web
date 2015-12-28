/**
 * Created by 黄冠豪 on 2015/8/6.
 * Copyright 2015 Boanda
 * Released under the MIT license
 */
(function ($) {
    // 静态私有变量
    var controlPointIndex = 0,
        DATA_KEY = 'resizetorPrivateData';
    var emObject = {};

    var getLayerCenterPoint = function(layer) {
        var point = {};
        if(layer.fromCenter) {
            point.x = layer.x;
            point.y = layer.y;
        } else {
            if(layer.rotate === 90 || layer.rotate === 270) {
                point.x = layer.x + layer.width / 2;
                point.y = layer.y + layer.height / 2;
            } else {
                point.x = layer.x + layer.width / 2;
                point.y = layer.y + layer.height / 2;
            }
        }

        return point;
    };

    // 获取图形左上角的度度坐标
    var getLayerUpperLeftPoint = function(layer) {
        var point = {};
        if(layer.rotate === 90 || layer.rotate === 270) {
            if(layer.fromCenter) {
                point.x = layer.x - layer.height / 2;
                point.y = layer.y - layer.width / 2;
            } else {
                point.x = layer.x + (layer.width - layer.height) / 2;
                point.y = layer.y - (layer.width - layer.height) / 2;
            }
        } else {
            if(layer.fromCenter) {
                point.x = layer.x - layer.width / 2;
                point.y = layer.y - layer.height / 2;
            } else {
                point.x = layer.x;
                point.y = layer.y;
            }
        }
        return point;
    };
    var setLayerSize = function(size) {
        var layer = this;
        if(layer.rotate === 90 || layer.rotate === 270) {
            layer.width = size.height;
            layer.height = size.width;
        } else {
            layer.width = size.width;
            layer.height = size.height;
        }
    };
    var getLayerSize = function(layer) {
        var size = {};
        if(layer.rotate === 90 || layer.rotate === 270) {
            size.height = layer.width;
            size.width = layer.height;
        } else {
            size.width = layer.width;
            size.height = layer.height;
        }
        return size;
    };
    var setLayerPosition = function(point) {
        var layer = this;
        if(layer.rotate === 90 || layer.rotate === 270) {
            // 计算图形中心点
            var centerPoint = {};
            centerPoint.x = point.x + layer.height / 2;
            centerPoint.y = point.y + layer.width / 2;
            if(layer.fromCenter) {
                //TODO
            } else {
                layer.x = centerPoint.x - layer.width / 2;
                layer.y = centerPoint.y - layer.height / 2;
            }
        } else {
            if(layer.fromCenter) {
                layer.y = point.y + layer.height / 2;
                layer.x = point.x + layer.width / 2;
            } else {
                layer.y = point.y;
                layer.x = point.x;
            }
        }
    };
    // 更新所有控制点和图形
    var updatePointsAndShape = function(layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY)[layer.name];

        if(data.prevRotate !== layer.rotate) {
            // 如果图形已经旋转，按照旋转角度更新X,Y,Width, Height
            var ulPoint = getLayerUpperLeftPoint(layer);
            data.x = data.cX = ulPoint.x;
            data.y = data.cY = ulPoint.y;
            // TODO getLayerSize
            if(layer.rotate === 90 || layer.rotate === 270) {
                data.height = data.cHeight = layer.width;
                data.width = data.cWidth = layer.height;
            } else {
                data.height = data.cHeight = layer.height;
                data.width = data.cWidth = layer.width;
            }
            data.prevRotate = layer.rotate;
        }

        var controlPoints = data.controlPoints,
            cX = data.cX, cY = data.cY,
            cWidth = data.cWidth, cHeight = data.cHeight;

        setLayerSize.call(layer, {width: cWidth, height: cHeight});
        setLayerPosition.call(layer, {x: cX, y: cY});

        var lr = controlPoints.lr ? controlPoints.lr : emObject,
            ul = controlPoints.ul ? controlPoints.ul : emObject,
            ur = controlPoints.ur ? controlPoints.ur : emObject,
            ll = controlPoints.ll ? controlPoints.ll : emObject,
            r = controlPoints.r ? controlPoints.r : emObject,
            l = controlPoints.l ? controlPoints.l : emObject,
            t = controlPoints.t ? controlPoints.t : emObject,
            b = controlPoints.b ? controlPoints.b : emObject;
        r.x = lr.x = ur.x = cX + cWidth;
        b.y = ll.y = lr.y = cY + cHeight;
        l.x = ul.x = ll.x = cX;
        t.y = ul.y = ur.y = cY;
        l.y = r.y = cY + cHeight / 2;
        t.x = b.x = cX + cWidth / 2;

        data.pixelTip.css({
            top: cY + canvas.offset().top - 30,
            left: cX + canvas.offset().left
        });
        data.pixelTip.find('.width').text(Math.abs(Math.round(cWidth)));
        data.pixelTip.find('.height').text(Math.abs(Math.round(cHeight)));
    };
    // 边控制点拖拽事件
    var leftPointDrag = function (layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY)[layer.shapeLayer.name];
        //layer.y = data.startY;
        data.cX = layer.x;
        data.cWidth = data.width + (data.x - data.cX);
        updatePointsAndShape.call(canvas, layer.shapeLayer);
    };
    var rightPointDrag = function (layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY)[layer.shapeLayer.name];
        //layer.y = data.startY;
        data.cWidth = layer.x - data.cX;
        updatePointsAndShape.call(canvas, layer.shapeLayer);
    };
    var topPointDrag = function (layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY)[layer.shapeLayer.name];
        //layer.x = data.startX;
        data.cY = layer.y;
        data.cHeight = data.height + (data.y - data.cY);
        updatePointsAndShape.call(canvas, layer.shapeLayer);
    };
    var bottomPointDrag = function (layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY)[layer.shapeLayer.name];
        //layer.x = data.startX;
        data.cHeight = layer.y - data.cY;
        updatePointsAndShape.call(canvas, layer.shapeLayer);
    };
    //TODO 角控制取短边
    // 角控制点拖拽事件
    var upperRightCornerPointDrag = function (layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY)[layer.shapeLayer.name];
        //TODO 优化重复变量
        var nWidth = layer.x - data.x,
            nHeight = nWidth / data.width * data.height;
        //var xDis = layer.x - (data.x + data.width);
        var yDis = nHeight - data.height;
        layer.y = data.y - yDis;
        data.cY = layer.y;
        data.cHeight = nHeight;
        data.cWidth = nWidth;
        updatePointsAndShape.call(canvas, layer.shapeLayer);
    };
    var upperLeftCornerPointDrag = function (layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY)[layer.shapeLayer.name];
        //TODO 优化重复变量
        var xDis = data.x - layer.x;
        var yDis = xDis / data.width * data.height;
        layer.y = data.y - yDis;
        data.cX = layer.x;
        data.cWidth = data.width + xDis;
        data.cY = layer.y;
        data.cHeight = data.height + yDis;
        updatePointsAndShape.call(canvas, layer.shapeLayer);
    };
    var lowerRightCornerPointDrag = function (layer) {
        var canvas = $(this),
        data = canvas.data(DATA_KEY)[layer.shapeLayer.name];

        var xDis = layer.x - data.x;
        var yDis = xDis / data.width * data.height;
        layer.y = yDis + data.y;
        data.cHeight = layer.y - data.cY;
        data.cWidth = layer.x - data.cX;
        updatePointsAndShape.call(canvas, layer.shapeLayer);
    };
    var lowerLeftCornerPointDrag = function (layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY)[layer.shapeLayer.name],
            width = data.width, height = data.height;
        var xDis = data.x - layer.x;
        var yDis = xDis / width * height;
        layer.y = data.y + height + yDis;
        data.cX = layer.x;
        data.cWidth = width + xDis;
        data.cHeight = height + yDis;
        updatePointsAndShape.call(canvas, layer.shapeLayer);
    };
    var cantrolPointMousedown = function (layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY)[layer.shapeLayer.name];
        data.startX = layer.x;
        data.startY = layer.y;
    };
    var controlPointDragStart = function(layer) {
        var canvas = $(this);
        canvas.triggerLayerEvent(layer.shapeLayer, 'controlStart');
    };
    var controlPointDragstop = function (layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY)[layer.shapeLayer.name];
        data.width = data.cWidth;
        data.height = data.cHeight;
        data.x = data.cX;
        data.y = data.cY;

        canvas.triggerLayerEvent(layer.shapeLayer, 'controlStop');
    };

    var createLineControlPoint = function(layer, options) {

    };

    var createShapeControlPoint = function(layer, options) {

    };

    var methods = {
        init: function (options) {
            return $(this).each(function () {
                var $canvas = $(this);
                // 对象的私有变量
                var privateDate = $canvas.data(DATA_KEY);
                if (!privateDate) {
                    privateDate = {};
                }
                $canvas.data(DATA_KEY, privateDate);
                // 配置项
                var resizetorSettings = $canvas.data('resizetorSettings');
                if (!resizetorSettings) {
                    var defaults = {
                        showLineControllers: true,
                        showCornerControllers: true
                    };
                    resizetorSettings = $.extend({}, defaults, options);
                } else {
                    resizetorSettings = $.extend({}, resizetorSettings, options);
                }
                $canvas.data('resizetorSettings', resizetorSettings);

            });
        },
        create: function(shapeLayer, options) {
            return this.each(function() {
                var canvas = $(this),
                    resizetorSettings = canvas.data('resizetorSettings'),
                    privateDate = canvas.data(DATA_KEY),
                    layerControllerData, controlPoints,
                    showLineControllers = resizetorSettings.showLineControllers,
                    showCornerControllers = resizetorSettings.showCornerControllers;
                if(options) {
                    if(options.showLineControllers === false) {
                        showLineControllers = false;
                    }
                    if(options.showCornerControllers === false) {
                        showCornerControllers = false;
                    }
                }

                if(!privateDate[shapeLayer.name]) {
                    privateDate[shapeLayer.name] = {
                        controlPoints: {}
                    };
                } else {
                    throw '此图形已经存在控制器，请不要重复创建';
                }
                layerControllerData = privateDate[shapeLayer.name];
                controlPoints = layerControllerData.controlPoints;

                var controlPointOptions = [],
                    groupName = 'controllerPoints' + controlPointIndex,
                    defaultControlPointOptions = {
                        groups: [groupName],
                        strokeStyle: 'grey',
                        fillStyle: 'white',
                        draggable: true,
                        width: 10,
                        height: 10,
                        shapeLayer: shapeLayer,
                        mousedown: cantrolPointMousedown,
                        dragstop: controlPointDragstop,
                        dragstart: controlPointDragStart
                    };
                layerControllerData.groupName = groupName;

                if(shapeLayer.boardType === 'line') {
                    var startPoint = {
                            name: 'top-' + controlPointIndex,
                            x: layer.x1,
                            y: layer.y1
                        },
                        endPoint = {
                            name: 'top-' + controlPointIndex,
                            x: layer.x2,
                            y: layer.y2
                        };
                    controlPointOptions.push($.extend({}, defaultControlPointOptions, startPoint));
                    controlPointOptions.push($.extend({}, defaultControlPointOptions, endPoint));
                } else {
                    var size = getLayerSize(shapeLayer),
                        position = getLayerUpperLeftPoint(shapeLayer);
                    layerControllerData.cWidth = layerControllerData.width = size.width;
                    layerControllerData.cHeight = layerControllerData.height = size.height;

                    layerControllerData.cX = layerControllerData.x = position.x;
                    layerControllerData.cY = layerControllerData.y = position.y;
                    var x = layerControllerData.x,
                        y = layerControllerData.y,
                        width = layerControllerData.width,
                        height = layerControllerData.height;

                    // 定义边控制点 TODO 可通过restrictDragToAxis控制只能垂直或水平移动'x' 'y'
                    if(showLineControllers) {
                        var topPoint, rightPoint, bottomPoint, leftPoint;
                        topPoint = {
                            name: 'top-' + controlPointIndex,
                            x: x + width / 2,
                            y: y,
                            drag: topPointDrag
                        };
                        rightPoint = {
                            name: 'right-' + controlPointIndex,
                            x: x + width,
                            y: y + height / 2,
                            drag: rightPointDrag
                        };
                        bottomPoint = {
                            name: 'bottom-' + controlPointIndex,
                            x: x + width / 2,
                            y: y + height,
                            drag: bottomPointDrag
                        };
                        leftPoint = {
                            name: 'left-' + controlPointIndex,
                            x: x,
                            y: y + height / 2,
                            drag: leftPointDrag
                        };
                        controlPointOptions.push($.extend({}, defaultControlPointOptions, topPoint));
                        controlPointOptions.push($.extend({}, defaultControlPointOptions, rightPoint));
                        controlPointOptions.push($.extend({}, defaultControlPointOptions, bottomPoint));
                        controlPointOptions.push($.extend({}, defaultControlPointOptions, leftPoint));
                    }
                    // 定义角控制点
                    if(resizetorSettings.showCornerControllers) {
                        var upperLeftPoint, upperRightPoint, lowerRightPoint, lowerLeftPoint;
                        upperLeftPoint = {
                            name: 'upperLeft-' + controlPointIndex,
                            x: x,
                            y: y,
                            drag: upperLeftCornerPointDrag
                        };
                        upperRightPoint = {
                            name: 'upperRight-' + controlPointIndex,
                            x: x + width,
                            y: y,
                            drag: upperRightCornerPointDrag
                        };
                        lowerRightPoint = {
                            name: 'lowerRight-' + controlPointIndex,
                            x: x + width,
                            y: y + height,
                            drag: lowerRightCornerPointDrag
                        };
                        lowerLeftPoint = {
                            name: 'lowerLeft-' + controlPointIndex,
                            x: x,
                            y: y + height,
                            drag: lowerLeftCornerPointDrag
                        };
                        controlPointOptions.push($.extend({}, defaultControlPointOptions, upperLeftPoint));
                        controlPointOptions.push($.extend({}, defaultControlPointOptions, upperRightPoint));
                        controlPointOptions.push($.extend({}, defaultControlPointOptions, lowerRightPoint));
                        controlPointOptions.push($.extend({}, defaultControlPointOptions, lowerLeftPoint));
                    }
                }

                // 绘画控制点
                $.each(controlPointOptions, function(index, opt) {
                    canvas.drawRect(opt);
                });

                if(shapeLayer.boardType === 'line') {

                } else {
                    controlPoints.t = canvas.getLayer('top-' + controlPointIndex);
                    controlPoints.b = canvas.getLayer('bottom-' + controlPointIndex);
                    controlPoints.l = canvas.getLayer('left-' + controlPointIndex);
                    controlPoints.r = canvas.getLayer('right-' + controlPointIndex);
                    controlPoints.ul = canvas.getLayer('upperLeft-' + controlPointIndex);
                    controlPoints.ur = canvas.getLayer('upperRight-' + controlPointIndex);
                    controlPoints.ll = canvas.getLayer('lowerLeft-' + controlPointIndex);
                    controlPoints.lr = canvas.getLayer('lowerRight-' + controlPointIndex);
                }

                controlPointIndex++;

                // 添加图形移动事件，使控制点跟踪图形
                var oDrag;
                if(shapeLayer.drag) {
                    oDrag = shapeLayer.drag;
                } else {
                    oDrag = function() {};
                }
                shapeLayer.drag = function (layer) {
                    var ulPoint = getLayerUpperLeftPoint(layer);
                    layerControllerData.cX = layerControllerData.x = ulPoint.x;
                    layerControllerData.cY = layerControllerData.y = ulPoint.y;
                    updatePointsAndShape.call(canvas, layer);
                    oDrag.call(canvas, layer);
                };

                var oControl;
                if(shapeLayer.moveOrTra) {
                    oControl = shapeLayer.moveOrTra;
                } else {
                    oControl = function() {};
                }
                shapeLayer.moveOrTra = function() {
                    oControl.call(canvas, shapeLayer);
                    var position = getLayerUpperLeftPoint(shapeLayer);
                    layerControllerData.x = layerControllerData.cX = position.x;
                    layerControllerData.y = layerControllerData.cY = position.y;

                    var size = getLayerSize(shapeLayer);
                    layerControllerData.cWidth = layerControllerData.width = size.width;
                    layerControllerData.cHeight = layerControllerData.height = size.height;

                    updatePointsAndShape.call(canvas, shapeLayer);
                };

                var oRemove;
                var onLayerRemove = function(layer) {
                    oRemove.call(canvas, layer);
                    canvas.resizetor('destroy', layer);
                };
                // TODO 此处!==判断无作用，下次进入时不会有相等的情况，因为onLayerRemove会在每一次进来都是新建的
                if(shapeLayer.remove && shapeLayer.remove !== onLayerRemove) {
                    oRemove = shapeLayer.remove;
                } else {
                    oRemove = function() {};
                }
                shapeLayer.remove = onLayerRemove;
                // 用于显示像素的tip
                var tip = $('<span class="pixel-tip"><span class="width"></span> x <span class="height"></span></span>');
                tip.css({
                    position: 'absolute',
                    display: 'block'
                }).appendTo('body');
                layerControllerData.pixelTip = tip;
            });
        },
        hide: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    privateData = canvas.data(DATA_KEY)[layer.name];
                privateData.pixelTip.hide();
                canvas.setLayerGroup(privateData.groupName, {
                    visible: false
                });
                layer.draggable = false;
                canvas.drawLayers();
            });
        },
        show: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    privateData = canvas.data(DATA_KEY)[layer.name],
                    ulPoint = getLayerUpperLeftPoint(layer),
                    size = getLayerSize(layer),
                    tip = privateData.pixelTip;
                // 更新尺寸tip并显示
                tip.css({
                    top: ulPoint.y + canvas.offset().top - 30,
                    left: ulPoint.x + canvas.offset().left
                });
                tip.find('.width').text(Math.abs(Math.round(size.width)));
                tip.find('.height').text(Math.abs(Math.round(size.height)));
                tip.show();
                // 显示控制点
                canvas.setLayerGroup(privateData.groupName, {
                    visible: true
                });
                // 允许图形拖拽
                layer.draggable = true;
            });
        },
        rotate: function(layer, rotate) {
            return this.each(function() {
                var canvas = $(this),
                    privateDate = canvas.data(DATA_KEY)[layer.name];
                if(layer.boardType === 'text') {
                	return;
                }
                canvas.triggerLayerEvent(layer, 'controlStart');
                layer.rotate = rotate || layer.rotate === 270 ? 0 : layer.rotate + 90;

                updatePointsAndShape.call(canvas, layer);
                canvas.drawLayers();
                canvas.triggerLayerEvent(layer, 'controlStop');
            });
        },
        destroy: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    privateDate = canvas.data(DATA_KEY);
                canvas.removeLayerGroup(privateDate[layer.name].groupName);
                privateDate[layer.name].pixelTip.remove();
                delete privateDate[layer.name];
            });
        },
        getPosition: function(layer) {
            var canvas = $(this),
                data = canvas.data(DATA_KEY)[layer.name];
            return {
                x: data.cX,
                y: data.cY
            };
        },
        // 移动图形
        move: function(layer, x, y) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY)[layer.name];
                data.cX = x;
                data.cY = y;
                updatePointsAndShape.call(canvas, layer);
                canvas.triggerLayerEvent(layer, 'drag');
            });
        },
        moveStart: function(layer) {
            return this.each(function() {
                var canvas = $(this);
                canvas.triggerLayerEvent(layer, 'dragstart');
            });

        },
        moveStop: function(layer){
            return this.each(function() {
                var canvas = $(this);
                canvas.triggerLayerEvent(layer, 'dragstop');
            });
        },
        hasResizetor: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    privateData = canvas.data(DATA_KEY)[layer.name];
                return !!privateData;
            });
        },
        // 把控制点移动到图形上，此函数在移动图形的图层位置后需要调用此函数调整控制点图层位置
        moveResizetorTop: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    privateData = canvas.data(DATA_KEY)[layer.name],
                    layers = canvas.getLayerGroup(privateData.groupName),
                    layerIndex, index, controlLayer;
                for(index = 0; index < layers.length; index++) {
                    controlLayer = layers[index];
                    // 如果此控制点图层是向上移动，直接插入图形的位置，图形图层会下降
                    // 如果控制点是向下移动，就得插入图形图层的上方一层。
                    if(controlLayer.index < layer.index) {
                        layerIndex = layer.index;
                    } else {
                        layerIndex = layer.index + 1;
                    }
                    canvas.moveLayer(controlLayer, layerIndex);
                }
            });
        }
    };
    $.fn.resizetor = function () {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof method === 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.resizetor');
            return this;
        }
        return method.apply(this, arguments);
    };
}(jQuery));