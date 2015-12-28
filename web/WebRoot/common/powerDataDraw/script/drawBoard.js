/**
 * Created by Boanda on 2015/8/10.
 */

$.initDrawBoard = function(options) {
    var canvas = $('#' + options.canvasId);
    canvas.attr({
        width: options.canvasWidth,
        height: options.canvasHeight
    });
    var brushTool = $('#' + options.brushId),
        eraserTool = $('#' + options.eraserId),
        lineTool = $('#' + options.lineToolId),
        arrowTool = $('#' + options.arrowToolId),
        textTool = $('#' + options.textToolId),
        rectTool = $('#' + options.rectId),
        hollowRectTool = $('#' + options.hollowRectId),
        ellipseTool = $('#' + options.ellipseId),
        hollowEllipseTool = $('#' + options.hollowEllipseId),
        brushWeightSelector = $('#brushWeightSelector'),
        fontBoldBtn = $('#' + options.fontBoldBtn),
        fontItalicBtn = $('#' + options.fontItalicBtn),
        fontAlignCenterBtn = $('#' + options.fontAlignCenterBtnId),
        fontAlignLeftBtn = $('#' + options.fontAlignLeftBtnId),
        fontAlignRightBtn = $('#' + options.fontAlignRightBtnId),
        fontBackgroundBtn = $('#' + options.fontBackgroundBtnId),
        fontTextStrokeBtn = $('#' + options.fontTextStrokeBtn),
        fontColorSelector = $("#" + options.fontColorSelectorId),
        uploadIconBtn = $("#" + options.uploadIconId),
        undoBtu = $('#' + options.undoOpeId),
        moveTool = $('#' + options.moveToolId),
        saveBtn = $('#' + options.saveOpeId),
        loadBtn = $('#' + options.openOpeId),
        clearAll = $('#' + options.clearOpeId),
        redoBtn = $('#' + options.redoOpeId),
        removeBtn = $('#' + options.delOpeId),
        lineWeightBtn = $('#' + options.lineWeightSelectorId),
        lineDashBtn = $('#' + options.lineDashSelectorId),
        textUnderlineBtn = $('#' + options.textUnderlineBtnId),
        rotateOpeBtn = $('#' + options.rotateOpeId),
        importBackImageBtn = $('#' + options.importBackImageId),
        exportBtn = $('#' + options.exportBtnId),
        resolutionSelector = $('#' + options.resolutionSelectorId);
    var cOpera = null;
    var isMoveActive = true;
    // 图像ID，用于识别当前图像身份，可通过画板对象的getId()函数获得，用户执行新建操作时会自己重新生成此ID
    var currentCanvasId = options.id || (new Date()).getTime().toString() + Math.random().toString().slice(2);
    var tempSaveData = [];

    // 为网页title添加星号
    var addTitleStar = function() {
    	var title = document.getElementsByTagName("title")[0].innerHTML;
		if(title[0] !== '*') {
			document.getElementsByTagName("title")[0].innerHTML = '*' + title;
		}
    };
    // 删除网页title星号
    var removeTitleStar = function() {
    	var title = document.getElementsByTagName("title")[0].innerHTML;
		if(title[0] === '*') {
			document.getElementsByTagName("title")[0].innerHTML = title.substr(1);
		}
    };
    
    var onBoardChange = function() {
    	addTitleStar();
    	if(typeof options.onChange === 'function') {
    		options.onChange.call(publicFunction);
    	}
    };
    var history = new History({
    	onAdd: function() {
    		onBoardChange();
    	},
    	onUndo: function() {
    		onBoardChange();
    	},
    	onRedo: function() {
    		onBoardChange();
    	}
    });
    var fileManager = new FileManager();

    // 用于图形对象转换
    var ShapeConvert = {};
    ShapeConvert.shapeToData = function (layer) {
        var data;
        switch (layer.boardType) {
            case 'brush':
                data = canvas.brushTool('toData', layer);
                break;
            case 'rect':
                data = canvas.rectangleTool('toData', layer);
                break;
            case 'ellipse':
                data = canvas.ellipseTool('toData', layer);
                break;
            case 'img':
                data = canvas.imageTool('toData', layer);
                break;
            case 'line':
                data = canvas.lineTool('toData', layer);
                break;
            case 'text':
                data = canvas.textEditor('toData', layer);
                break;
            default:
                throw '无法识别图层类型: ' + layer.boardType;
        }
        return data;
    };
    ShapeConvert.dataToShape = function (data) {
        var cShape = canvas.layerManager('getCurrentLayer');
        if (cShape) {
            canvas.resizetor('hide', cShape);
        }
        var layer;
        switch (data.type) {
            case 'brush':
                canvas.brushTool('fromData', data);
                layer = canvas.brushTool('getLastLayer');
                break;
            case 'rect':
                canvas.rectangleTool('fromData', data);
                layer = canvas.rectangleTool('getLastLayer');
                canvas.resizetor('create', layer);
                canvas.resizetor('hide', layer);
                break;
            case 'ellipse':
                canvas.ellipseTool('fromData', data);
                layer = canvas.ellipseTool('getLastLayer');
                canvas.resizetor('create', layer);
                canvas.resizetor('hide', layer);
                break;
            case 'img':
                canvas.imageTool('fromData', data);
                layer = canvas.imageTool('getLastLayer');
                canvas.resizetor('create', layer, {showLineControllers: false});
                canvas.resizetor('hide', layer);
                break;
            case 'line':
                canvas.lineTool('fromData', data);
                layer = canvas.lineTool('getLastLayer');
                break;
            case 'text':
                canvas.textEditor('fromData', data);
                layer = canvas.textEditor('getLastLayer');
                canvas.resizetor('create', layer);
                canvas.resizetor('hide', layer);
                canvas.textEditor('inactivate', layer);
                break;
            default:
                throw '无法识别的数据类型: ' + data.type;
        }
        if(layer) {
            return layer;
        }
    };

    var init = function(canvas) {

    };

    init(canvas);
    // 监听画布，如果点击的坐标上没有图形，则取消选中已选图形 不使用click事件，因为click在拖拽时也会被触发
    var canvasMouseDown = false,
        canvasMouseMove = false;
    canvas.mousedown(function(e) {
        canvasMouseDown = true;
        canvas.data('mousedownSite', {
            x: e.clientX,
            y: e.clientY
        });
        if(cOpera === 'brush' || cOpera === 'eraser' || cOpera === 'polyline') {
            canvas.canvasContextMenu('disable');
        } else {
            canvas.canvasContextMenu('enable');

        }
        //if(e.button === 2) {
        //    isMoveActive = true;
        //}
    });
    canvas.mousemove(function(e) {
        var site = canvas.data('mousedownSite');
        // 判断坐标是否与down的一致，一致则没有移动。解决在chrome下，触发down会同时触发move的问题
        if(canvasMouseDown && (site.x !== e.clientX || site.y !== e.clientY)) {
            canvasMouseMove = true;
        }
    });
    canvas.mouseup(function(event) {
        if(canvasMouseDown && !canvasMouseMove && cOpera !== 'brush' && cOpera !== 'eraser' && cOpera !== 'polyline') {
            var imgData = canvas[0].getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1),
                data = imgData.data;
            if(data[0] === 0 && data[1] === 0 && data[2] === 0 && data[3] === 0) {
                //TODO 无法判断是否点到空心图形
                if(event.button === 0) {
                    inactivateAllShape();
                    canvas.canvasContextMenu('disableGroup', 'shapeOpr');
                }
            } else {
                stopAllTools();
                activeMoveTool();
                canvas.canvasContextMenu('enableGroup', 'shapeOpr');
            }
        }
        canvasMouseDown = false;
        canvasMouseMove = false;
    });

    canvas.canvasContextMenu({
        menus: [{
            text: '删除 （Del）',
            group: 'shapeOpr',
            onClick: function() {
                removeCShape();
            }
        }, {
            text: '复制 （Ctrl+D）',
            group: 'copyOpr',
            onClick: function() {
                duplicateCShape();
            }
        }, '-', {
            text: '上移一层',
            group: 'shapeOpr',
            onClick: function() {
                var layer = canvas.layerManager('getCurrentLayer');
                if(layer) {
                    canvas.layerManager('moveUp', layer);
                }
            }
        }, {
            text: '下移一层',
            group: 'shapeOpr',
            onClick: function() {
                var layer = canvas.layerManager('getCurrentLayer');
                if(layer) {
                    canvas.layerManager('moveDown', layer);
                }
            }
        }, {
            text: '置于顶层',
            group: 'shapeOpr',
            onClick: function() {
                var layer = canvas.layerManager('getCurrentLayer');
                if(layer) {
                    canvas.layerManager('moveTop', layer);
                }
            }
        }, {
            text: '置于底层',
            group: 'shapeOpr',
            onClick: function() {
                var layer = canvas.layerManager('getCurrentLayer');
                if(layer) {
                    canvas.layerManager('moveBottom', layer);
                }
            }
        }]
    });

    // 初始化图层管理插件
    canvas.layerManager();

    var removeCShape = function() {
        var cShape = canvas.layerManager('getCurrentLayer');
        if (cShape) {
            canvas.removeLayer(cShape);
            cShape = null;
            canvas.layerManager('setCurrentLayer', null);
            canvas.drawLayers();
        }
    };
    var duplicateCShape = function() {
        var shape = canvas.layerManager('getCurrentLayer'),
            layer;
        inactivateAllShape();
        switch (shape.boardType) {
            case 'rect':
                canvas.rectangleTool('duplicate', shape);
                break;
            case 'ellipse':
                canvas.ellipseTool('duplicate', shape);
                break;
            case 'img':
                canvas.imageTool('duplicate', shape);
                break;
        }
    };
    var keyMove = false;
    // 监听键盘事件，操作图形
    $(window).keydown(function(e) {
        var cShape = canvas.layerManager('getCurrentLayer');
        var isMove = false;
        switch(e.keyCode) {
            case 46:
                removeCShape();
                break;
            case 37:
                isMove = moveCShape('left');
                break;
            case 38:
                isMove = moveCShape('up');
                break;
            case 39:
                isMove = moveCShape('right');
                break;
            case 40:
                isMove = moveCShape('down');
                break;
            case 68:
                // D duplicate 复制图形
                if(e.ctrlKey) {
                    e.preventDefault();
                    duplicateCShape();
                }
                break;
            case 90:
                // ctrl+z 撤销
                if(e.ctrlKey) {
                    undo();
                }
                break;
            case 89:
                // ctrl+y 重做
                if(e.ctrlKey) {
                    redo();
                }
                break;
            case 8:
                // Backspace键删除，文本框编辑状态不删除
                if(cShape && cShape.boardType === 'text') {
                    if(canvas.textEditor('isFocusInTextarea', cShape)) {
                        break;
                    }
                }
                removeCShape();
                e.preventDefault();
                break;
        }
        if(isMove) {
            e.preventDefault();
        }
    });
    $(window).keyup(function(e) {
        var cShape = canvas.layerManager('getCurrentLayer');
        if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
            prevPosition = undefined;
            keyMove = false;
            canvas.resizetor('moveStop', cShape);
        }
    });

    var prevPosition;
    var moveCShape = function(direction) {
        var position,
            offset = 1,
            maxSpeed = 20,
            nu;
        var cShape = canvas.layerManager('getCurrentLayer');
        if(cShape) {
            if(cShape.boardType === 'text') {
                if(canvas.textEditor('isFocusInTextarea', cShape)) {
                    return;
                }
            }
            position = canvas.resizetor('getPosition', cShape);
            if(!prevPosition) {
                prevPosition = position;
            }
            switch (direction) {
                case 'up':
                    if(!keyMove) {
                        canvas.resizetor('moveStart', cShape);
                    }
                    nu = Math.floor((prevPosition.y - position.y) / 10);
                    if(nu > maxSpeed) {
                        nu = maxSpeed;
                    }
                    if(nu > 0) {
                        offset = nu;
                    }
                    canvas.resizetor('move', cShape, position.x, position.y - offset);
                    break;
                case 'down':
                    if(!keyMove) {
                        canvas.resizetor('moveStart', cShape);
                    }
                    nu = Math.floor((position.y - prevPosition.y) / 10);
                    if(nu > maxSpeed) {
                        nu = maxSpeed;
                    }
                    if(nu > 0) {
                        offset = nu;
                    }
                    canvas.resizetor('move', cShape, position.x, position.y + offset);
                    break;
                case 'left':
                    if(!keyMove) {
                        canvas.resizetor('moveStart', cShape);
                    }
                    nu = Math.floor((prevPosition.x - position.x) / 10);
                    if(nu > maxSpeed) {
                        nu = maxSpeed;
                    }
                    if(nu > 0) {
                        offset = nu;
                    }
                    canvas.resizetor('move', cShape, position.x - offset, position.y);
                    break;
                case 'right':
                    if(!keyMove) {
                        canvas.resizetor('moveStart', cShape);
                    }
                    nu = Math.floor((position.x - prevPosition.x) / 10);
                    if(nu > maxSpeed) {
                        nu = maxSpeed;
                    }
                    if(nu > 0) {
                        offset = nu;
                    }
                    canvas.resizetor('move', cShape, position.x + offset, position.y);
                    break;
                default :
                    return false;
            }
            canvas.drawLayers();
            keyMove = true;
            return true;
        }
    };

    // 把文本框的文本样式同步到工具
    var setFontTools = function(styles) {
        if(styles.isBold) {
            fontBoldBtn.addClass(options.activeClass);
        } else {
            fontBoldBtn.removeClass(options.activeClass);
        }
        if(styles.isItalic) {
            fontItalicBtn.addClass(options.activeClass);
        } else {
            fontItalicBtn.removeClass(options.activeClass);
        }
        if(styles.hasUnderline) {
            textUnderlineBtn.addClass(options.activeClass);
        } else {
            textUnderlineBtn.removeClass(options.activeClass);
        }
        $(options.fontAlignSelector).removeClass(options.activeClass);
        switch (styles.align) {
            case 'left':
                fontAlignLeftBtn.addClass(options.activeClass);
                break;
            case 'right':
                fontAlignRightBtn.addClass(options.activeClass);
                break;
            case 'center':
                fontAlignCenterBtn.addClass(options.activeClass);
                break;
        }
        // 同步字体颜色
        fontColorSelector.spectrum('set', styles.fontColor);
        fontColorSelector.find('.color').css('backgroundColor', styles.fontColor);
    };

    var activateShape = function(layer) {
        var cShape = canvas.layerManager('getCurrentLayer');
        if(layer === cShape) {
            canvas.canvasContextMenu('enableGroup', 'shapeOpr');
            return;
        }
        inactivateAllShape();
        if (isMoveActive) {
            canvas.layerManager('setCurrentLayer', layer);
            canvas.resizetor('show', layer);
            if(layer.boardType === 'text') {
                canvas.textEditor('activate', layer);
                // TODO 同步样式到按钮
                setFontTools({
                    isBold: canvas.textEditor('isBold'),
                    isItalic: canvas.textEditor('isItalic'),
                    hasUnderline: canvas.textEditor('hasUnderline'),
                    align: canvas.textEditor('align'),
                    fontColor: canvas.textEditor('getColor')
                });
            }
            if(layer.boardType === 'img' || layer.boardType === 'rect' || layer.boardType === 'ellipse') {
                // 图标激活复制功能
                canvas.canvasContextMenu('enableGroup', 'copyOpr');
            } else {
                canvas.canvasContextMenu('disableGroup', 'copyOpr');
            }
            canvas.canvasContextMenu('enableGroup', 'shapeOpr');
        }
        canvas.drawLayers();
    };

    var inactivateAllShape = function() {
        var cShape = canvas.layerManager('getCurrentLayer');
        if (cShape) {
            canvas.resizetor('hide', cShape);
            if(cShape.boardType === 'text') {
                canvas.textEditor('inactivate');
            }
            canvas.layerManager('setCurrentLayer', null);
            canvas.canvasContextMenu('disableGroup', 'copyOpr');
            canvas.canvasContextMenu('disableGroup', 'shapeOpr');
        }
    };

    var stopAllTools = function () {
        cOpera = null;
        canvas.eraserTool('stop');
        canvas.brushTool('stop');
        canvas.rectangleTool('inactivate');
        canvas.ellipseTool('inactivate');
        canvas.lineTool('inactivate');
        canvas.textEditor('stop');
        canvas.imageTool('inactivate');
        isMoveActive = false;
        $(options.toolBtnSelector).removeClass(options.activeClass);
        $(options.iconBtnSelector).removeClass(options.activeClass);
    };

    var activeMoveTool = function() {
        moveTool.addClass(options.activeClass);
        isMoveActive = true;
    };
    
    var buttonCtrl = {
    	save: {
    		disable: function() {
    			saveBtn.data('disabled', true);
    			saveBtn.addClass('off');
    		},
    		enable: function() {
    			saveBtn.data('disabled', false);
    			saveBtn.removeClass('off');
    		}
    	}
    };

    var undo = function() {
        history.undo(function (layer) {
            //TODO isDel 放到data.isDel里
            if (layer) {
                if(layer.isDel) {
                    var layerType = layer.boardType;
                    if (layerType === 'rect' || layerType === 'ellipse' || layerType === 'text') {
                        canvas.resizetor('create', layer);
                        canvas.resizetor('hide', layer);
                        if(layerType === 'text') {
                            canvas.textEditor('inactivate', layer);
                        }
                    } else if (layerType === 'img') {
                        canvas.resizetor('create', layer, {showLineControllers: false});
                        canvas.resizetor('hide', layer);
                    }
                    canvas.layerManager('addLayer', layer);
                } else if(layer.isNew) {
                    canvas.layerManager('setCurrentLayer', null);
                }
            }
        });
        canvas.drawLayers();
    };

    var redo = function() {
        history.redo(function (layer) {
            //TODO isNew 放到data.isNew里
            if (layer && layer.isNew) {
                var layerType = layer.boardType;
                if (layerType === 'rect' || layerType === 'ellipse' || layerType === 'text') {
                    canvas.resizetor('create', layer);
                    canvas.resizetor('hide', layer);
                    if(layerType === 'text') {
                        canvas.textEditor('inactivate', layer);
                    }
                } else if (layerType === 'img') {
                    canvas.resizetor('create', layer, {showLineControllers: false});
                    canvas.resizetor('hide', layer);
                }
                canvas.layerManager('addLayer', layer);
            } else if(layer.isDel === true) {
                canvas.layerManager('setCurrentLayer', null);
            }
        });
        canvas.drawLayers();
    };


    canvas.resizetor();
    // 初始化控件
    canvas.brushTool({
        onAdd: function(layer) {
            canvas.layerManager('addLayer', layer);
        },
        onChange: function (layer) {
            var state = new canvas.brushTool.BrushState(layer);
            history.add(state);
        }
    });
    canvas.textEditor({
        fontFamily: 'SimSun, "宋体", STFangsong',
        fontSize: 14,
        onAdd: function (layer) {
            inactivateAllShape();
            canvas.resizetor('create', layer);
            canvas.layerManager('addLayer', layer);
            canvas.layerManager('setCurrentLayer', layer);
            var state = new canvas.textEditor.TextState(layer);
            history.add(state);
            stopAllTools();
            activeMoveTool();
        },
        onClick: function(layer) {
            activateShape(layer);
        },
        onChange: function(layer) {
            var state = new canvas.textEditor.TextState(layer);
            history.add(state);
        },
        onRemove: function (layer) {
            var state = new canvas.textEditor.TextState(layer);
            history.add(state);
        }
    });
    canvas.rectangleTool({
        onAdd: function (layer) {
            inactivateAllShape();
            canvas.resizetor('create', layer);
            canvas.resizetor('hide', layer);
            canvas.layerManager('addLayer', layer);
            var state = new canvas.rectangleTool.RectState(layer);
            history.add(state);
        },
        onClickShape: function (layer) {
            inactivateAllShape();
            activateShape(layer);
        },
        onMouseDown: function(layer) {
            activateShape(layer);
        },
        onChange: function (layer) {
            var state = new canvas.rectangleTool.RectState(layer);
            history.add(state);
        },
        onRemove: function (layer) {
            var state = new canvas.rectangleTool.RectState(layer);
            history.add(state);
        }
    });
    canvas.lineTool({
        onAdd: function(layer) {
             canvas.layerManager('addLayer', layer);
        },
        onChange: function(layer) {
            var state = new canvas.lineTool.LineState(layer);
            history.add(state);
        }
    });
    canvas.ellipseTool({
        onAdd: function (layer) {
            canvas.resizetor('create', layer);
            canvas.resizetor('hide', layer);
            canvas.layerManager('addLayer', layer);
            var state = new canvas.ellipseTool.EllipseState(layer);
            history.add(state);
        },
        onClickShape: function (layer) {
            activateShape(layer);
            //inactivateAllShape();
            //canvas.layerManager('setCurrentLayer', layer);
            //if (isMoveActive) {
            //    canvas.resizetor('show', layer);
            //}
        },
        onMouseDown: function(layer) {
            activateShape(layer);
        },
        onChange: function (layer) {
            var state = new canvas.ellipseTool.EllipseState(layer);
            history.add(state);
        },
        onRemove: function (layer) {
            var state = new canvas.ellipseTool.EllipseState(layer);
            history.add(state);
        }
    });
    canvas.imageTool({
    	imageMap: (function() {
    		var icons = drawData.data.icons,
    		icon, index, map = {};
    		for(index = 0; index < icons.length; index++) {
    			icon = icons[index];
    			map[icon.name] = drawData.data["svg-path"] + icon.svg;
    		}
    		return $.extend(options.customIconMap, map);
    	})(),
        onAdd: function (layer) {
            canvas.resizetor('create', layer, {showLineControllers: false});
            canvas.resizetor('hide', layer);
            var state = new canvas.imageTool.ImageState(layer);
            history.add(state);
            canvas.layerManager('addLayer', layer);
            stopAllTools();
            activeMoveTool();
        },
        onChange: function (layer) {
            var state = new canvas.imageTool.ImageState(layer);
            history.add(state);
        },
        onMouseDown: function(layer) {
            activateShape(layer);
        },
        onClickShape: function (layer) {
            activateShape(layer);
        },
        onRemove: function (layer) {
            var state = new canvas.imageTool.ImageState(layer);
            history.add(state);
        }
    });
    canvas.eraserTool({
        onClear: function(x, y, width, height) {
            canvas.lineTool('clear', x, y, width, height);
            canvas.brushTool('clear', x, y, width, height);
        },
        onClearStart: function() {
            canvas.brushTool('clearStart');
        },
        onClearStop: function() {
            canvas.brushTool('clearStop');
        }
    });
    var setToolColor = function(colorObject) {
        var color = colorObject.toHexString();
        $('#' + options.brushColorId).css('backgroundColor', color);
        canvas.brushTool('setColor', color);
        canvas.rectangleTool('setColor', color);
        canvas.ellipseTool('setColor', color);
        canvas.lineTool('setColor', color);
    };
    $("#" + options.colorSelectorId).spectrum({
        showPaletteOnly: true,
        togglePaletteOnly: true,
        togglePaletteMoreText: '更多',
        togglePaletteLessText: '隐藏',
        chooseText: '选择',
        cancelText: '取消',
        preferredFormat: "name",
        hideAfterPaletteSelect: true,
        showInput: true,
        showInitial: true,
        color: '#000',
        palette: [
            ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
            ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
            ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
            ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
            ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
            ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
            ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
            ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
        ],
        change: setToolColor
    });
    fontColorSelector.spectrum({
        showPaletteOnly: true,
        togglePaletteOnly: true,
        togglePaletteMoreText: '更多',
        togglePaletteLessText: '隐藏',
        chooseText: '选择',
        cancelText: '取消',
        preferredFormat: "name",
        hideAfterPaletteSelect: true,
        showInput: true,
        showInitial: true,
        color: '#000',
        palette: [
            ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
            ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
            ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
            ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
            ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
            ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
            ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
            ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
        ],
        change: function(colorObject) {
            var color = colorObject.toName() || colorObject.toHexString();
            canvas.textEditor('setColor', color);
            $(this).find('.color').css('backgroundColor', color);
        }
    });
    fontBackgroundBtn.spectrum({
        showPaletteOnly: true,
        togglePaletteOnly: true,
        togglePaletteMoreText: '更多',
        togglePaletteLessText: '隐藏',
        chooseText: '选择',
        cancelText: '取消',
        preferredFormat: "name",
        showInput: true,
        showInitial: true,
        hideAfterPaletteSelect: true,
        color: 'transparent',
        palette: [
            ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
            ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
            ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
            ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
            ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
            ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
            ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
            ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
        ],
        change: function(colorObject) {
            var color = colorObject.toName() || colorObject.toHexString();
            canvas.textEditor('setBackgroundColor', color);
            $(this).find('.color').css('backgroundColor', color);
        }
    });
    fontTextStrokeBtn.spectrum({
        showPaletteOnly: true,
        togglePaletteOnly: true,
        togglePaletteMoreText: '更多',
        togglePaletteLessText: '隐藏',
        chooseText: '选择',
        cancelText: '取消',
        preferredFormat: "name",
        showInput: true,
        showInitial: true,
        hideAfterPaletteSelect: true,
        color: 'transparent',
        palette: [
            ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
            ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
            ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
            ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
            ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
            ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
            ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
            ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
        ],
        change: function(colorObject) {
            var color = colorObject.toName() || colorObject.toHexString();
            canvas.textEditor('setStrokeStyle', color);
            $(this).find('.color').css('backgroundColor', color);
        }
    });
    fontBoldBtn.click(function() {
        canvas.textEditor('isBold') ? canvas.textEditor('isBold', false) : canvas.textEditor('isBold', true);
        fontBoldBtn.toggleClass(options.activeClass);
    });
    fontItalicBtn.click(function() {
        canvas.textEditor('isItalic') ? canvas.textEditor('isItalic', false) : canvas.textEditor('isItalic', true);
        fontItalicBtn.toggleClass(options.activeClass);
    });
    textUnderlineBtn.click(function() {
        canvas.textEditor('hasUnderline') ? canvas.textEditor('hasUnderline', false) : canvas.textEditor('hasUnderline', true);
        textUnderlineBtn.toggleClass(options.activeClass);
    });
    fontAlignCenterBtn.click(function() {
        $(options.fontAlignSelector).removeClass(options.activeClass);
        canvas.textEditor('align', 'center');
        fontAlignCenterBtn.toggleClass(options.activeClass);
    });
    fontAlignLeftBtn.click(function() {
        $(options.fontAlignSelector).removeClass(options.activeClass);
        canvas.textEditor('align', 'left');
        fontAlignLeftBtn.toggleClass(options.activeClass);
    });
    fontAlignRightBtn.click(function() {
        $(options.fontAlignSelector).removeClass(options.activeClass);
        canvas.textEditor('align', 'right');
        fontAlignRightBtn.toggleClass(options.activeClass);
    });

    $('#' + options.fontSelectorId).change(function() {
        canvas.textEditor('setFontFamily', this.value);
    });
    $('#' + options.fontSizeSelectorId).change(function() {
        canvas.textEditor('setFontSize', this.value);
    });


    $(options.toolBtnSelector).click(function() {
        stopAllTools();
        inactivateAllShape();
        $(this).addClass(options.activeClass);
    });
    $(options.actionSelector).mousedown(function() {
        $(this).addClass(options.activeClass);
    });
    $(options.actionSelector).mouseup(function() {
        $(this).removeClass(options.activeClass);
    });

    brushTool.click(function () {
        cOpera = 'brush';
        canvas.brushTool('start');
    });
    eraserTool.click(function () {
        //canvas.brushTool('eraser', canvas.lineTool('getLayers'));
        cOpera = 'eraser';
        canvas.eraserTool('start');
    });
    lineTool.click(function() {
        canvas.lineTool('activate');
    });
    lineTool.dblclick(function() {
        cOpera = 'polyline';
        canvas.lineTool('inactivate');
        canvas.lineTool('activate', 'polyline');
    });
    arrowTool.click(function() {
        canvas.lineTool('activate', 'arrow');
    });
    textTool.click(function () {
        canvas.textEditor('start');
    });
    rectTool.click(function () {
        canvas.rectangleTool('setIsHollow', false);
        canvas.rectangleTool('activate');
    });
    hollowRectTool.click(function() {
        canvas.rectangleTool('setIsHollow', true);
        canvas.rectangleTool('activate');
    });
    ellipseTool.click(function () {
        canvas.ellipseTool('setIsHollow', false);
        canvas.ellipseTool('activate');
    });
    hollowEllipseTool.click(function() {
        canvas.ellipseTool('setIsHollow', true);
        canvas.ellipseTool('activate');
    });
    brushWeightSelector.change(function () {
        canvas.brushTool('setWeight', brushWeightSelector.val());
    });


    var clearCanvas = function() {
        canvas.removeLayers();
        canvas.drawLayers();
        canvas.layerManager('removeLayers');
    };

    undoBtu.click(undo);
    redoBtn.click(redo);

    moveTool.click(function () {
        activeMoveTool();
    });

    saveBtn.click(function () {
    	if(saveBtn.data('disabled')) {
    		return;
    	}
    	inactivateAllShape();
    	var beforeSaveResult;
    	if(options.onBeforeSave) {
    		beforeSaveResult = options.onBeforeSave.call(publicFunction);
    		if(beforeSaveResult === false) {
    			return;
    		}
    	}
        tempSaveData = [];
        var layers = canvas.getLayers(),
            index, cLayer;
        for (index = 0; index < layers.length; index++) {
            cLayer = layers[index];
            if (cLayer.boardType && !canvas.layerManager('isEmptyLayer', cLayer)) {
                var data = ShapeConvert.shapeToData(cLayer);
                tempSaveData.push(data);
            }
        }
        
        var beforeSaveRawImageFnResult;
        if(options.onBeforeSaveRawImage) {
        	beforeSaveRawImageFnResult = options.onBeforeSaveRawImage.call(publicFunction, tempSaveData);
		}
        if(options.saveRawImage && beforeSaveRawImageFnResult !== false) {
        	 fileManager.save({
             	data: tempSaveData,
             	fileId: options.rawImageId,
             	url: options.fileUploadUrl,
             	success: function(obj) {
             		if(obj.success) {
             			options.rawImageId = obj.id;
             		} else {
             			Tools.tooltip({
             				msg: obj.msg
             			});
             		}
             		if(options.onAfterSaveRawImage) {
            			options.onAfterSaveRawImage.call(publicFunction, obj);
            		}
             	}
             });
        }

        var imageBlob = fileManager.dataUrlToBlob(fileManager.toJpeg(canvas[0])),
        	beforeSaveImageFnResult = true;
        if(options.onBeforeSaveImage) {
        	beforeSaveImageFnResult = options.onBeforeSaveImage.call(publicFunction, imageBlob);
		}
        // 如果onBeforeSaveImage返回false，不保存
        if(beforeSaveImageFnResult !== false) {
        	fileManager.uploadImageFile({
            	data: imageBlob,
            	url: options.imageFileUploadUrl,
            	success: function(obj, blob) {
            		if(options.onAfterSaveImage) {
            			options.onAfterSaveImage.apply(publicFunction, arguments);
            		}
            	}
            });
        }
        removeTitleStar();
    });
    loadBtn.click(function () {
    	clearCanvas();
        fileManager.load({
        	url: options.loadImageUrl,
        	success: function(object) {
        		for (index = 0; index < object.length; index++) {
                    if (object[index].type) {
                        layer = ShapeConvert.dataToShape(object[index]);
                        canvas.layerManager('addLayer', layer);
                    }
                }
                canvas.drawLayers();
        	}
        });
    });
    clearAll.click(function () {
        var r = confirm('清空画布后将无法恢复，你确定要清空画布吗？');
        if(r === true) {
            clearCanvas();
        }
    });
    removeBtn.click(function () {
        removeCShape();
    });
    
    rotateOpeBtn.click(function() {
        var cShape = canvas.layerManager('getCurrentLayer');

    	if(cShape) {
            canvas.resizetor('rotate', cShape);
        }
    });
    
    $('.' + options.customClass).click(function (event) {
        stopAllTools();
        inactivateAllShape();
        $(this).addClass(options.activeClass);
        canvas.imageTool('activate', $(event.target).data('name'));
    });

    lineWeightBtn.lineWeightSelector({
        onSelect: function(weight) {
            canvas.lineTool('setWeight', weight);
            canvas.rectangleTool('setWeight', weight);
            canvas.ellipseTool('setWeight', weight);
            canvas.brushTool('setWeight', weight);
        }
    });
    lineDashBtn.lineDashSelector({
        onSelect: function(dash) {
            canvas.lineTool('setDash', dash);
            canvas.rectangleTool('setDash', dash);
            canvas.ellipseTool('setDash', dash);
        }
    });

    resolutionSelector.change(function() {
        var resolution = $(this).val().split('*');
        canvas.attr('width', resolution[0]);
        canvas.attr('height', resolution[1]);
        canvas.drawLayers();
    });

    // 菜单
    var newFileMenu = $('#' + options.newFileBtnId);


    newFileMenu.click(function() {
        if(canvas.getLayers().length > 0) {
            Tools.confirm({
                text: '新建会清空画板的内容，确定要新建吗？',
                yes: function() {
                    clearCanvas();
                    currentCanvasId = (new Date()).getTime().toString() + Math.random().toString().slice(2);
                    if(options.onNewFile) {
                    	options.onNewFile.call(publicFunction);
                    }
                }
            });
        }
    });

    uploadIconBtn.click((function() {
        var fileInput = $('<input type="file"/>');
        fileInput.change(function() {
            var file = fileInput[0].files[0];
            fileManager.loadImageFile({
                file: file,
                success: function(img) {
                    canvas.imageTool('addImage', img);
                }
            });
        });
        return function() {
            fileInput.click();
        };
    })());

    importBackImageBtn.click((function() {
        var input = $('<input type="file"/>');
        input.change(function() {
            var file = input[0].files[0];
            fileManager.loadImageFile({
                file: file,
                success: function(img) {
                    canvas.brushTool('createImage', img, true);
                }
            });
        });
        return function() {
            input.click();
        };
    })());

    exportBtn.click(function() {
        fileManager.download({
            fileName: 'draw',
            data: fileManager.toJpeg(canvas[0], 1)
        });
    });
    

    // 对外公开接口
    var publicFunction = {
    		openRawImage: function(id) {
    			options.rawImageId = id;
    			clearCanvas();
    			fileManager.load({
    	        	url: options.loadImageUrl,
    	        	data: {
    	        		XH: id
    	        	},
    	        	success: function(object) {
    	        		for (index = 0; index < object.length; index++) {
    	                    if (object[index].type) {
    	                        layer = ShapeConvert.dataToShape(object[index]);
    	                        canvas.layerManager('addLayer', layer);
    	                    }
    	                }
    	                canvas.drawLayers();
    	        	}
    	        });
    		},
    		openImage: function(src) {
    			clearCanvas();
    			canvas.brushTool('createImage', src, true);
    		},
    		isEmpty: function() {
    			var layers = canvas.getLayers(),
    				index, isEmpty = true;
    			if(layers.length === 0) {
    				return isEmpty;
    			}
    			for(index = 0; index < layers.length; index++) {
    				if(!canvas.layerManager('isEmptyLayer', layers[index])) {
    					return false;
    				}
    			}
    			return isEmpty;
    		},
    		getId: function() {
    			return currentCanvasId;
    		},
    		showTip: function(options) {
    			return Tools.tooltip(options);
    		},
    		getCurrentResolution: function() {
    			var resolutions = resolutionSelector.val().split('*')
    			return {
    				width: resolutions[0],
    				height: resolutions[1]
    			};
    		},
    		disableBtn: function(name) {
    			var btn = buttonCtrl[name];
    			if(btn) {
    				btn.disable();
    			} else {
    				throw '你要禁用的按钮不存在';
    			}
    		},
    		enableBtn: function(name) {
    			var btn = buttonCtrl[name];
    			if(btn) {
    				btn.enable();
    			} else {
    				throw '你要开启的按钮不存在';
    			}
    		}
    };
    

    if(options.rawImageId) {
    	publicFunction.openRawImage(options.rawImageId);
    }
    
    return publicFunction;
};


