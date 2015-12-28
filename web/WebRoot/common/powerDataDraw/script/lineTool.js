/**
 * Created by Boanda on 2015/8/14.
 */
(function($){
    var lineIndex = 0,
        lineName = 'line-',
        DATA_KEY = 'lineToolSetting';
    
    var onLayerRemove = function(layer) {
        var data = $(this).data(DATA_KEY);
        if(!data.isStopRemoveEvent) {
            layer.isDel = true;
            data.onRemove.call(this, layer);
            layer.isDel = false;
        }
    };

    var createBufferLayer = function(options) {
        if(options === undefined) {
            options = {
                name: lineName + lineIndex++
            };
        }
        // 缓存图层用来提高性能，并支持橡皮擦。刷新时不必重绘每一条线和橡皮擦路径
        var canvas = this,
            data = canvas.data(DATA_KEY),
            _canvasBuffer = document.createElement('canvas');
        _canvasBuffer.width = canvas.width();
        _canvasBuffer.height = canvas.height();

        canvas.burshBoard({
            name: options.name,
            layer: true,
            draggable: true,
            canvasBuffer: _canvasBuffer,
            boardType: 'line',
            data: {
                onChange: data.onChange
            }
        });
        var layer = canvas.getLayer(options.name);
        data.cLineScalarLayer = layer;
        data.lineScalarLayers.push(layer);
        layer.isNew = true;
        return layer;
    };

    var createLineLayer = function(options) {
        var canvas = this,
            data = canvas.data(DATA_KEY),
            cLayer = data.cLineScalarLayer,
            allLayers = canvas.getLayers();

        // 如果直线图层不在顶层，则新建一个缓存图层
        if(cLayer !== allLayers[allLayers.length - 1]) {
            cLayer = createBufferLayer.call(canvas);
            data.onAdd.call(canvas, cLayer);
        }

        $.extend(options, {
            type: 'line',
            layer: true,
            boardType: 'line'
        });
        if(data.isArrow) {
            options.endArrow = true;
            options.arrowRadius = 10;
            options.arrowAngle = 90;
        }
        canvas.drawLine(options);
        return canvas.getLayer(options.name);
    };
    var savePrevImg = function(canvas) {
        var data = canvas.data(DATA_KEY),
            lineScalarLayers = data.lineScalarLayers,
            prevImgData = data.prevImgData = {},
            tLayer, index;
        // 记录上一次画面状态
        for(index = 0; index < lineScalarLayers.length; index++) {
            tLayer = lineScalarLayers[index];
            prevImgData[tLayer.name] = tLayer.canvasBuffer.getContext('2d').getImageData(0,0,canvas.width(),canvas.height());
        }
        tLayer.data.prevImgData = prevImgData;
        tLayer.data.lineScalarLayers = lineScalarLayers;
    };
    var onMouseDown = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY),
            name;

            name = lineName + lineIndex++;
        // 奇数宽度的直线坐标小数设为0.5像素，以得到清晰的线条
        var x = event.offsetX,y = event.offsetY;
        if(data.weight % 2 === 1) {
            x = x - 0.5;
            y = y - 0.5;
        }

        var options = {
            name: name,
            strokeStyle: data.color,
            strokeWidth: data.weight,
            strokeDash: data.dash ? data.dash.split(',') : null,
            strokeDashOffset: 0,
            x1: x, y1: y,
            x2: x, y2: y
        };
        data.cLineLayer = createLineLayer.call(canvas, options);
        data.isDown = true;
    };
    var onMouseUp = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY),
            lineLayer = data.cLineLayer,
            layer = data.cLineLayer,
            cLineScalarLayer = data.cLineScalarLayer;
        // 如果鼠标没有移动绘画，移除此直线，减少无用图层
        if(layer.x1 === layer.x2 && layer.y1 === layer.y2) {
            canvas.removeLayer(layer);
            return;
        }
        data.isDown = false;
        lineLayer.isNew = true;
        lineLayer.isNew = false;
        // 斜率
        if(lineLayer.x1 === lineLayer.x2) {
            data.slope = 'vertical';
        } else {
            data.slope = (lineLayer.y2 - lineLayer.y1) / (lineLayer.x2 - lineLayer.x1);
        }
        // 把已画的直线图层转成矢量
        var lastLayer = data.lineScalarLayers[data.lineScalarLayers.length - 1],
            bufferCanvas = $(lastLayer.canvasBuffer);
        // 把直线从显示图层删除
        canvas.removeLayer(lineLayer);

        // 记录上一次画面状态
        savePrevImg(canvas);

        // 把直线画到缓存图层 TODO 可能会有事件触发问题
        bufferCanvas.drawLine(lineLayer);
        data.onChange.call(canvas, cLineScalarLayer);
        cLineScalarLayer.isNew = false;
    };
    var onMouseMove = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        if(!data.isDown) {
            return;
        }
        var lineLayer = data.cLineLayer,
            offsetY = event.offsetY,
            offsetX = event.offsetX,
            // 三角形两直角边长
            a, b, c, t;
        if(data.weight % 2 === 1) {
            offsetY = offsetY - 0.5;
            offsetX = offsetX - 0.5;
        }
        if(data.isCtrlDown && data.slope !== undefined) {
            // 绘制平行线（与上一条线平行）
            a = offsetY - lineLayer.y1;
                b = offsetX - lineLayer.x1;
            if(data.slope === 'vertical') {
                lineLayer.x2 = lineLayer.x1;
                lineLayer.y2 = offsetY;
            } else {
                if(Math.abs(data.slope) > 0.5) {
                    lineLayer.x2 = a / data.slope + lineLayer.x1;
                    lineLayer.y2 = offsetY;
                } else {
                    lineLayer.y2 = b * data.slope + lineLayer.y1;
                    lineLayer.x2 = offsetX;
                }
            }
        } else if(data.isShiftDown) {
            // 绘制水平、垂直和45度直线
            a = lineLayer.y1 - offsetY;
            b = offsetX - lineLayer.x1;
            t = Math.atan2(a, b);

            // TODO 去除重复的计算代码
            if(t > -Math.PI / 8 && t < Math.PI / 8) {
                lineLayer.x2 = offsetX;
                lineLayer.y2 = lineLayer.y1;
            } else if(t > Math.PI / 8 && t < Math.PI * 3 / 8){
                lineLayer.x2 = offsetX;
                lineLayer.y2 = lineLayer.y1 - b;
            } else if(t > Math.PI * 3 / 8 && t < Math.PI * 5 / 8) {
                lineLayer.y2 = offsetY;
                lineLayer.x2 = lineLayer.x1;
            } else if(t > Math.PI * 5 / 8 && t < Math.PI * 7 / 8){
                lineLayer.x2 = offsetX;
                lineLayer.y2 = lineLayer.y1 + b;
            } else if(t > Math.PI * 7 / 8 || t < - Math.PI * 7 / 8){
                lineLayer.y2 = lineLayer.y1;
                lineLayer.x2 = offsetX;
            } else if(t > - Math.PI * 7 / 8 && t < - Math.PI * 5 / 8){
                lineLayer.x2 = offsetX;
                lineLayer.y2 = lineLayer.y1 - b;
            } else if(t > - Math.PI * 5 / 8 && t < - Math.PI * 3 / 8){
                lineLayer.y2 = offsetY;
                lineLayer.x2 = lineLayer.x1;
            } else {
                lineLayer.x2 = offsetX;
                lineLayer.y2 = lineLayer.y1 + b;
            }
        } else {
            lineLayer.x2 = offsetX;
            lineLayer.y2 = offsetY;
        }
        $(lineLayer.canvas).drawLayers();
    };
    // 添加折线折点
    var onPolyClick = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY),
            name;
        name = lineName + lineIndex++;
        // 奇数宽度的直线坐标小数设为0.5像素，以得到清晰的线条
        var x = event.offsetX,y = event.offsetY;
        if(data.weight % 2 === 1) {
            x = x - 0.5;
            y = y - 0.5;
        }

        if(!data.lineCount || data.lineCount < 1) {
            var options = {
                name: name,
                strokeStyle: data.color,
                strokeWidth: data.weight,
                strokeDash: data.dash ? data.dash.split(',') : null,
                strokeDashOffset: 0,
                x1: x, y1: y,
                x2: x, y2: y
            };
            data.cLineLayer = createLineLayer.call(canvas, options);
            data.polyStart = true;
            data.lineCount = 1;
        } else {
            data.lineCount += 1;
            data.cLineLayer['x' + (data.lineCount + 1)] = x;
            data.cLineLayer['y' + (data.lineCount + 1)] = y;
        }


    };
    // 更新折线结尾顶点
    var onPolyMove = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY),
            lineLayer = data.cLineLayer,
            offsetY = event.offsetY,
            offsetX = event.offsetX,
            lineCount = data.lineCount,
            tempX, tempY, index, distance, minDis = 100,
            xDis, yDis, minX = 100, minY = 100;
        if(data.weight % 2 === 1) {
            offsetX = offsetX - 0.5;
            offsetY = offsetY - 0.5;
        }
        if(!data.polyStart) {
            return;
        }
        if(data.isAltDown) {
            index = lineCount;
            while(typeof lineLayer['x' + index] === 'number') {
                tempX = lineLayer['x' + index];
                tempY = lineLayer['y' + index];
                distance = Math.sqrt((tempX - offsetX) * (tempX - offsetX) + (tempY - offsetY) * (tempY - offsetY));
                // 贴上最近的顶点
                if(distance <= 10 && minDis > distance) {
                    offsetX = tempX;
                    offsetY = tempY;
                    index--;
                    minDis = distance;
                    continue;
                } else {
                    // 如果与所有顶点的距离都不足够近，则靠贴最近的x或y坐标
                    if(minDis > 10) {
                        xDis = Math.abs(tempX - offsetX);
                        if(xDis < 10 && xDis < minX) {
                            offsetX = tempX;
                            minX = xDis;
                        }
                        yDis = Math.abs(tempY - offsetY);
                        if(yDis < 10 && yDis < minY) {
                            offsetY = tempY;
                            minY = yDis;
                        }
                    }

                }
                index--;
            }
        }
        var a, b, t,
            lastX = lineLayer['x' + (data.lineCount)],
            lastY = lineLayer['y' + (data.lineCount)];
        if(data.isCtrlDown && data.slope !== undefined) {
            // 绘制平行线（与上一条线平行）
            a = offsetY - lastY;
            b = offsetX - lastX;
            if(data.slope === 'vertical') {
                lineLayer['x' + (data.lineCount + 1)] = lastX;
                lineLayer['y' + (data.lineCount + 1)] = offsetY;
            } else {
                if(Math.abs(data.slope) > 0.5) {
                    lineLayer['x' + (data.lineCount + 1)] = a / data.slope + lastX;
                    lineLayer['y' + (data.lineCount + 1)] = offsetY;
                } else {
                    lineLayer['y' + (data.lineCount + 1)] = b * data.slope + lastY;
                    lineLayer['x' + (data.lineCount + 1)] = offsetX;
                }
            }
        } else if(data.isShiftDown) {
            // 绘制水平、垂直和45度直线
            a = lastY - offsetY;
            b = offsetX - lastX;
            t = Math.atan2(a, b);

            // TODO 去除重复的计算代码
            if(t > -Math.PI / 8 && t < Math.PI / 8) {
                lineLayer['x' + (data.lineCount + 1)] = offsetX;
                lineLayer['y' + (data.lineCount + 1)] = lastY;
            } else if(t > Math.PI / 8 && t < Math.PI * 3 / 8){
                lineLayer['x' + (data.lineCount + 1)] = offsetX;
                lineLayer['y' + (data.lineCount + 1)] = lastY - b;
            } else if(t > Math.PI * 3 / 8 && t < Math.PI * 5 / 8) {
                lineLayer['y' + (data.lineCount + 1)] = offsetY;
                lineLayer['x' + (data.lineCount + 1)] = lastX;
            } else if(t > Math.PI * 5 / 8 && t < Math.PI * 7 / 8){
                lineLayer['x' + (data.lineCount + 1)] = offsetX;
                lineLayer['y' + (data.lineCount + 1)] = lastY + b;
            } else if(t > Math.PI * 7 / 8 || t < - Math.PI * 7 / 8){
                lineLayer['y' + (data.lineCount + 1)] = lastY;
                lineLayer['x' + (data.lineCount + 1)] = offsetX;
            } else if(t > - Math.PI * 7 / 8 && t < - Math.PI * 5 / 8){
                lineLayer['x' + (data.lineCount + 1)] = offsetX;
                lineLayer['y' + (data.lineCount + 1)] = lastY - b;
            } else if(t > - Math.PI * 5 / 8 && t < - Math.PI * 3 / 8){
                lineLayer['y' + (data.lineCount + 1)] = offsetY;
                lineLayer['x' + (data.lineCount + 1)] = lastX;
            } else {
                lineLayer['x' + (data.lineCount + 1)] = offsetX;
                lineLayer['y' + (data.lineCount + 1)] = lastY + b;
            }
        } else {
            lineLayer['x' + (data.lineCount + 1)] = offsetX;
            lineLayer['y' + (data.lineCount + 1)] = offsetY;
        }

        $(lineLayer.canvas).drawLayers();
    };
    // 删除最后一个固定顶点
    var delLastPoint = function() {
        var canvas = this,
            data = canvas.data(DATA_KEY),
            lineLayer = data.cLineLayer,
            lineCount = data.lineCount;
        if(lineCount > 1) {
            lineLayer['x' + lineCount] = lineLayer['x' + (lineCount + 1)];
            lineLayer['y' + lineCount] = lineLayer['y' + (lineCount + 1)];
            delete lineLayer['x' + (lineCount + 1)];
            delete lineLayer['y' + (lineCount + 1)];
            data.lineCount = lineCount - 1;
            canvas.drawLayers();
        }

    };
    // 完成折线绘画
    var finishPolyline = function() {
        var canvas = this,
            data = canvas.data(DATA_KEY),
            lineLayer = data.cLineLayer,
            cLineScalarLayer = data.cLineScalarLayer,
            lastLayer, bufferCanvas;
        if(data.lineCount <= 1) {
            return;
        }
        // 把已画的直线图层转成矢量
        lastLayer = data.lineScalarLayers[data.lineScalarLayers.length - 1];
        bufferCanvas = $(lastLayer.canvasBuffer);
        // 把直线从显示图层删除
        canvas.removeLayer(lineLayer);
        // 去掉最后一个顶点
        delete lineLayer['x' + (data.lineCount + 1)];
        delete lineLayer['y' + (data.lineCount + 1)];

        // 记录上一次画面状态
        savePrevImg(canvas);

        // 把直线画到缓存图层 TODO 可能会有事件触发问题
        bufferCanvas.drawLine(lineLayer);
        data.onChange.call(canvas, cLineScalarLayer);
        cLineScalarLayer.isNew = false;
        data.lineCount = 0;
        data.polyStart = false;
    };
    // 右键down完成折线绘画
    var onPolyDown = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        if(event.button === 2 && data.polyStart) {
            // 结束
            if(data.lineCount === 1) {
                cancelPoly.call(canvas);
            } else {
                finishPolyline.call(canvas);
            }

        }
    };
    // 取消本条折线
    var cancelPoly = function() {
        var canvas = this,
            data = canvas.data(DATA_KEY),
            lineLayer = data.cLineLayer;
        if(data.polyStart) {
            data.polyStart = false;
            data.lineCount = 0;
            canvas.removeLayer(lineLayer);
            $(lineLayer.canvas).drawLayers();
        }
    };
    // 键盘事件
    var onKeyDown = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        switch(event.keyCode) {
            case 17:
                data.isCtrlDown = true;
                break;
            case 16:
                data.isShiftDown = true;
                break;
            case 18:
                event.preventDefault();
                data.isAltDown = true;
                break;
            case 27:
                // Esc
                cancelPoly.call(canvas);
                break;
            case 13:
                // Enter
                finishPolyline.call(canvas);
                break;
            case 32:
                // space
                event.preventDefault();
                finishPolyline.call(canvas);
                break;
            case 46:
                // Del
                delLastPoint.call(canvas);
                break;
            case 8:
                // Backspace
                delLastPoint.call(canvas);
                break;
        }
    };
    var onKeyUp = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        switch (event.keyCode) {
            case 18:
                data.isAltDown = false;
                break;
            case 17:
                data.isCtrlDown = false;
                break;
            case 16:
                data.isShiftDown = false;
                break;
        }
    };
    var emFn = function() {};
    // TODO methods把公共方法提取出来
    var methods = {
        init: function(options) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY);
                if(!data) {
                    var defaults = {
                        onAdd: emFn,
                        color: 'black',
                        weight: 1,
                        dash: null,
                        onRemove: emFn,
                        onChange: emFn,
                        // 是否标量图 为false时为矢量图 TODO 无用
                        isScalar: true,
                        lineScalarLayers: [],
                        cLineScalarLayer: null,
                        prevImgData: {}
                    };
                    data = $.extend({}, defaults, options);
                } else {
                    data = $.extend({}, data, options);
                }
                canvas.data(DATA_KEY, data);
            });
        },
        activate: function(type) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY);
                data.isArrow = (type === 'arrow');
                if(type === 'polyline') {
                    canvas.click(canvas, onPolyClick);
                    canvas.mousemove(canvas, onPolyMove);
                    canvas.mousedown(canvas, onPolyDown);
                } else {
                    canvas.mousedown(canvas, onMouseDown);
                    canvas.mouseup(canvas, onMouseUp);
                    canvas.mousemove(canvas, onMouseMove);
                }
                $(window).keydown(canvas, onKeyDown);
                $(window).keyup(canvas, onKeyUp);
            });
        },
        inactivate: function() {
            var canvas = $(this);
            canvas.unbind('mousedown', onMouseDown);
            canvas.unbind('mouseup', onMouseUp);
            canvas.unbind('mousemove', onMouseMove);
            canvas.unbind('mousemove', onPolyMove);
            canvas.unbind('click', onPolyClick);
            $(window).unbind('keydown', onKeyDown);
            $(window).unbind('keyup', onKeyUp);
        },
        setColor: function(color) {
            return this.each(function() {
                var data = $(this).data(DATA_KEY);
                data.color = color;
            });
        },
        setWeight: function(weight) {
            return this.each(function() {
                var data = $(this).data(DATA_KEY);
                data.weight = weight;
            });
        },
        setDash: function(dash) {
            return this.each(function() {
                var data = $(this).data(DATA_KEY);
                data.dash = dash;
            });
        },
        toData: function(layer) {
            if(layer.boardType !== 'line') {
                $.error('图层类型有误');
            }
            var data = {},
                canvas = layer.canvas;
            data.imgData = layer.canvasBuffer.toDataURL("image/png");//getContext('2d').getImageData(0,0,canvas.width,canvas.height);
            data.width = canvas.width;
            data.height = canvas.height;
            data.type = 'brush';
            return data;
        },
        fromData: function(data) {
            return this.each(function() {
                var canvas = $(this),
                    settings = canvas.data(DATA_KEY),
                    layerName = lineName + lineIndex++,
                    img = document.createElement('img');
                img.src = data.imgData;

                var _canvasBuffer = document.createElement('canvas');
                _canvasBuffer.width = canvas.width();
                _canvasBuffer.height = canvas.height();
                _canvasBuffer.getContext("2d").drawImage(img, 0, 0);
                canvas.burshBoard({
                    name: layerName,
                    layer: true,
                    draggable: true,
                    canvasBuffer: _canvasBuffer,
                    boardType: 'line',
                    data: {
                        onChange: settings.onChange
                    }
                });
                settings.cLineScalarLayer = canvas.getLayer(layerName);
                settings.lineScalarLayers.push(settings.cLineLayer);
            });
        },
        add: function(options) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY);
                createBufferLayer.call(canvas, options);
                data.cLineScalarLayer.canvasBuffer.getContext('2d').putImageData(options.imgData, 0, 0);
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
        },
        getLastLayer: function() {
            return this.data(DATA_KEY).cLineScalarLayer;
        },
        getLayers: function() {
            return this.data(DATA_KEY).lineScalarLayers;
        },
        clear: function(x, y, width, height) {
            this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    lineScalarLayers = data.lineScalarLayers,
                    index, tempLayer, ctx;
                for(index = 0; index < lineScalarLayers.length; index++) {
                    tempLayer = lineScalarLayers[index];
                    ctx = tempLayer.canvasBuffer.getContext('2d');
                    ctx.clearRect(x, y, width, height);
                }
            });
        },
        clearStart: function() {
            this.each(function() {
                var canvas = $(this);
            });
        },
        clearStop: function() {
            this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY);
                if(data.cLineLayer) {
                    data.onChange.call(canvas, data.cLineLayer);
                }
            });
        }
    };
    $.fn.lineTool = function(options) {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof method === 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.lineTool');
            return this;
        }
        return method.apply(this, arguments);
    };
    $.fn.lineTool.LineState = function(lineLayer) {
        var lineScalarLayers = lineLayer.data.lineScalarLayers,
            index, tLayer;
        this.index = lineLayer.index;
        this.type = 'line';
        this.isNew = lineLayer.isNew;
        this.isDel = lineLayer.isDel;
        this.layerName = lineLayer.name;
        this.layer = lineLayer;
        this.prevImgData = lineLayer.data.prevImgData;
        this.imgData = {};
        for(index = 0; index < lineScalarLayers.length; index++) {
            tLayer = lineScalarLayers[index];
            // TODO 优化内存
            this.imgData[tLayer.name] = tLayer.canvasBuffer.getContext('2d').getImageData(0,0,tLayer.canvas.width, tLayer.canvas.height);
        }

        if($.fn.lineTool.LineState._initialized === undefined) {
            $.fn.lineTool.LineState.prototype.restore = function(fn) {
                var me = this,
                    canvas = $(me.layer.canvas),
                    lineScalarLayers = me.layer.data.lineScalarLayers,
                    layer, index, tLayer;
                if(me.isNew) {
                    // TODO 可能会触发添加历史记录
                    canvas.removeLayer(me.layer.name);
                    //canvas.lineTool('remove', me.layerName, {isStopRemoveEvent: true});
                    layer = me.layer;
                    layer.isNew = true;
                } else if(me.isDel) {
                    canvas.lineTool('add', me.layer);
                    layer = canvas.getLayer(me.layerName);
                    layer.isDel = true;
                } else {
                    for(index = 0; index < lineScalarLayers.length; index++) {
                        tLayer = lineScalarLayers[index];
                        if(me.prevImgData.hasOwnProperty(tLayer.name)) {
                            tLayer.canvasBuffer.getContext('2d').putImageData(me.prevImgData[tLayer.name], 0, 0);
                        }
                    }
                }
            };
            $.fn.lineTool.LineState.prototype.redo = function(fn) {
                var me = this,
                    canvas = $(me.layer.canvas),
                    lineScalarLayers = me.layer.data.lineScalarLayers,
                    layer, index;
                if(me.isNew) {
                    layer = me.layer;
                    for(index = 0; index < lineScalarLayers.length; index++) {
                        if(lineScalarLayers[index] === layer) {
                            break;
                        }
                    }
                    canvas.lineTool('add', {
                        name: layer.name,
                        imgData: me.imgData[layer.name]
                    });
                    layer = lineScalarLayers[index] = canvas.getLayer(layer.name);
                    layer.isNew = true;
                } else if(me.isDel) {
                    canvas.lineTool('add', me.layer);
                    layer = canvas.getLayer(me.layerName);
                    layer.isDel = true;
                } else {
                    for(index = 0; index < lineScalarLayers.length; index++) {
                        layer = lineScalarLayers[index];
                        if(me.imgData.hasOwnProperty(layer.name)) {
                            layer.canvasBuffer.getContext('2d').putImageData(me.imgData[layer.name], 0, 0);
                        }
                    }
                }
                if(typeof fn === 'function') {
                    fn.call(canvas, layer);
                }
                layer.isNew = false;
                layer.isDel = false;
            };
            $.fn.lineTool.LineState._initialized = true;
        }
    };
}(jQuery));