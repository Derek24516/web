/**
 * Created by 黄冠豪 on 2015/8/6.
 * Copyright 2015 Boanda
 * Released under the MIT license
 */
(function ($) {
    var textIndex = 0, // 用于生成唯一的文本层name
        textName = 'text-name-', // 文本图层name前缀
        textRectName = 'text-rect-', // 文本框name前缀
        DATA_KEY = 'textSettings'; // jQuery.data数据key

    // 在文本改变时，记录改变前的状态
    var onBeforeChange = function(layer) {
        layer.data.prevProp = {
            x: layer.x,
            y: layer.y,
            width: layer.width,
            height: layer.height,
            text: layer.text,
            data: {
                textSettings: {
                    align: layer.data.textSettings.align,
                    backgroundColor: layer.data.textSettings.backgroundColor,
                    hasUnderline: layer.data.textSettings.hasUnderline,
                    fontSize: layer.data.textSettings.fontSize,
                    fillStyle: layer.data.textSettings.fillStyle,
                    fontStyle: layer.data.textSettings.fontStyle,
                    fontFamily: layer.data.textSettings.fontFamily,
                    textareaFontWeight: layer.data.textSettings.textareaFontWeight,
                    textareaFontStyle: layer.data.textSettings.textareaFontStyle,
                    strokeStyle: layer.data.textSettings.strokeStyle

                }
            }
        };
    };
    // 设置隐藏文本图层（不包括文本框与输入框）
    var hideTextLayer = function(layer, isHide) {
        var showTextLayerName = layer.data.showTextLayerName;
        layer.data.isHidden = isHide;
        $(layer.canvas).setLayer(showTextLayerName, {visible: !isHide});
    };
    // 绘制文本
    var drawText = function(text, layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY),
            textSettings = layer.data.textSettings,
            // 当前图层的文本图层组，用于管理当前图层的文本
            groupName = layer.data.groupName,
            // 获取可用文本框区域
            site = getTextareaSite(layer),
            lineHeight = textSettings.fontSize,
            preTextData = layer.data.preTextData,
            // 保存已经分行的文本以备绘制
            lines, 
            // 是否需要更新文本，只是移动文本框时不更新
            needUpdate = true, 
            underlineLayer = null,
            // 文本缓冲图层名称，缓冲图层用于提高文本绘制性能。先把所有文本绘制到缓冲图层（频繁绘制到显示的canvas中会造成性能下降），
            //再一次性把缓冲图层的图像绘制到展示canvas中
            showTextLayerName = layer.data.showTextLayerName,
            _canvasBuffer = $(layer.data._canvasBuffer),
            underlineStrokeWidth = Math.floor(textSettings.fontSize / 10);

        // 如果文本与样式不变，只是移动文本，不重绘新的文字图层
        if(preTextData && preTextData.width === layer.width && preTextData.text === text &&
            preTextData.fontSize === textSettings.fontSize && preTextData.fillStyle === textSettings.fillStyle &&
            preTextData.fontFamily === textSettings.fontFamily && preTextData.fontStyle === textSettings.fontStyle &&
            preTextData.hasUnderline === textSettings.hasUnderline && textSettings.align === preTextData.align) {
        	// 未更新文本与样式时，直接取上次已分行的文本，不重新拆分
            lines = preTextData.lines;
            // 标记不需要绘画文本
            needUpdate = false;
        } else {
        	// 拆分文本，由于Canvas不支持换行，需要把长文本计算宽度分行后使用
            lines = splitText.call(this, text, layer);
            // 记录当前文本与它的样式，用于下次更新文本请求时判断文本或样式是否与此次一致，
            // 一致时不会重绘文本
            layer.data.preTextData = {
                text: text,
                width: layer.width,
                lines: lines,
                fontSize: textSettings.fontSize,
                fillStyle: textSettings.fillStyle,
                fontStyle: textSettings.fontStyle,
                fontFamily: textSettings.fontFamily,
                hasUnderline: textSettings.hasUnderline,
                align: textSettings.align
            };
            // 需要重新绘制文本，删除上次绘制的文本
            _canvasBuffer.removeLayerGroup(groupName);
        }
        // 如果是第一次绘制，生成文本分组名
        if(!groupName) {
            groupName = 'text-group-' + textIndex;
            textIndex++;
            layer.data.groupName = groupName;
        }
        var name, y, x, i, textLayer,
        	// 每行文本图层名称，在移动文本时用于检索文本图层
        	textLayerNames = layer.data.preTextData.textLayerNames;
        // 不只是移动时重新绘制文本 TODO 消除重复部分
        if(needUpdate) {
        	// 清空上次的文本名称缓存
            layer.data.preTextData.textLayerNames = textLayerNames = [];
            // 循环绘制每一行文本
            for(i = 0; i < lines.length; i++) {
                // 计算每行文本y坐标
                y = site.y + i * lineHeight + 0.2;
                // 计算每行文本x坐标
                if(textSettings.align === 'center') {
                	// 居中
                    x = site.x + (site.width - getTextWidth.call(canvas, lines[i])) / 2;
                    // 右对齐
                } else if(textSettings.align === 'right') {
                    x = site.x + site.width - getTextWidth.call(canvas, lines[i]);
                } else {
                	// 左对齐
                    x = site.x;
                }
                // 绘制下划线
                if(textSettings.hasUnderline) {
                    // 生成下划线名称
                    name = textName + textIndex++;
                    _canvasBuffer.drawLine({
                        name: name,
                        strokeStyle: textSettings.fillStyle,
                        strokeWidth: underlineStrokeWidth,
                        groups: [groupName],
                        layer: true,
                        x1: x,
                        // 向下取整，奇数像素直线y坐标小数取0.5才能得到清晰图像，underlineStrokeWidth + 1为调整下划线高度
                        y1: Math.ceil(y + textSettings.fontSize) - (underlineStrokeWidth % 2 === 1 ? 0.5 : 0) - underlineStrokeWidth + 1,
                        x2: getTextWidth.call(canvas, lines[i]) + x,
                        y2: Math.ceil(y + textSettings.fontSize) - (underlineStrokeWidth % 2 === 1 ? 0.5 : 0) - underlineStrokeWidth + 1
                    });
                    // 获取下划线图层，用于保存到对应行的文本中
                    underlineLayer = _canvasBuffer.getLayer(name);
                }
                // 生成文本图层名称，用于检索图层
                name = textName + textIndex++;
                textLayerNames.push(name);
                // 绘制每一行文本
                _canvasBuffer.drawText({
                    name: name,
                    groups: [groupName],
                    layer: true,
                    fromCenter: false,
                    fillStyle: textSettings.fillStyle,
                    fontStyle: textSettings.fontStyle,
                    x: x,
                    y: y,
                    fontSize: textSettings.fontSize,
                    fontFamily: textSettings.fontFamily,
                    text: lines[i],
                    data: {
                        underlineLayer: underlineLayer
                    }
                });
            }
        } else {
            // 移动文本
        	//TODO 已存在变量textLayerNames
            var names = layer.data.preTextData.textLayerNames;
            // 遍历每行文本，更新位置
            for(i = 0; i < names.length; i++) {
                textLayer = _canvasBuffer.getLayer(names[i]);
                // 计算每行文本y坐标
                y = site.y + i * lineHeight + 0.2;
                // 计算每行文本x坐标
                if(textSettings.align === 'center') {
                	// 居中
                    x = site.x + (site.width - getTextWidth.call(canvas, lines[i])) / 2;
                } else if(textSettings.align === 'right') {
                	// 右对齐
                    x = site.x + site.width - getTextWidth.call(canvas, lines[i]);
                } else {
                	// 左对齐
                    x = site.x;
                }
                // 更新位置
                textLayer.x = x;
                textLayer.y = y;
                // 更新下划线位置
                underlineLayer = textLayer.data.underlineLayer;
                if(underlineLayer) {
                    underlineLayer.x1 = x;
                    // 向下取整，奇数像素直线y坐标小数取0.5才能得到清晰图像，underlineStrokeWidth + 1为调整下划线高度
                    underlineLayer.y1 = underlineLayer.y2 = Math.ceil(y + textSettings.fontSize) - (underlineStrokeWidth % 2 === 1 ? 0.5 : 0) - underlineStrokeWidth + 1;
                    underlineLayer.x2 = getTextWidth.call(canvas, textLayer.text) + x;
                }
            }
        }
        // 如果是第一次绘制文本，生成缓冲图层名称
        if(!showTextLayerName) {
            showTextLayerName = layer.data.showTextLayerName = 'test-text' + textIndex++;
        }
        // 文本框填充背景颜色
        if(textSettings.backgroundColor) {
            layer.fillStyle = textSettings.backgroundColor;
        }

        // 在缓冲区画完后更新到显示画布以提高性能 TODO 文字的绘画的位置开始坐标固定，移动文本只移动buffer绘画位置即可
        _canvasBuffer.drawLayers();
        // 把缓冲图层绘制到显示画布上
        canvas.draw({
            name: showTextLayerName,
            layer: true,
            // 是否隐藏图层
            visible: !layer.data.isHidden,
            fn: function(ctx) {
                ctx.drawImage(_canvasBuffer[0], 0, 0);
            }
        });
        // 让文本始终置于方框上方
        var textBufferLayer = canvas.getLayer(showTextLayerName);
        canvas.moveLayer(textBufferLayer, layer.index + 1);

        // 文本输入光标 TODO 光标闪烁会导致严重的性能问题，已弃用，现使用textarea作为文本输入框
        if(data.showCursor) {
            textSettings.textCursor.x1 = textSettings.textCursor.x2 = site.x + getTextWidth.call(canvas, lines[lines.length - 1]);
            textSettings.textCursor.y1 = site.y + (lines.length-1) * (layer.data.textSettings.fontSize + 1);
            textSettings.textCursor.y2 = textSettings.textCursor.y1 + layer.data.textSettings.fontSize + 2;
        }

        // 如果文本高度超过或接近文本框高度，扩展文本框高度
        // 如果文本宽度过小，使宽度扩大
        var fontHeight = y - layer.y + lineHeight * 1.5;
        if(fontHeight > site.height || site.width < 25) {
        	// 文本框宽度小于一个字符，重设文本框宽度为25
            if(site.width < textSettings.fontSize) {
                layer.width = 25;
            }
            // 文本高度大于文本框高度，重设文本框高度为文本高度
            if(fontHeight > site.height) {
                layer.height = fontHeight;
            }
            // 重新获取可用文本区域
            site = getTextareaSite(layer);
            layer.data.textarea.css({
                height: site.height,
                width: site.width
            });
            canvas.triggerLayerEvent(layer, 'moveOrTra');
        }
        if(textSettings.strokeStyle !== 'transparent') {
            layer.strokeStyle = textSettings.strokeStyle;
            layer.strokeDash = null;
        } else {
            layer.strokeDash = data.strokeDash;
            if(!layer.data.isActivate) {
                // 非激活状态，隐藏文本框边框
                if(layer.text.replace(/\s/g, '').length > 0) {
                    layer.strokeStyle = textSettings.strokeStyle || 'transparent';
                } else {
                    // 文本不为空时，边框显示noTextWrapStrokeStyle颜色
                    layer.strokeStyle = data.noTextWrapStrokeStyle;
                }
            } else {
                layer.strokeStyle = data.wrapStrokeStyle;
            }
        }
        canvas.drawLayers();
    };
    var getTextWidth = function(str) {
        var canvas = $(this),
            textSettings = canvas.data(DATA_KEY),
            context = canvas[0].getContext('2d');
        context.font = textSettings.fontSize + 'px ' + textSettings.fontFamily;
        var metrics = context.measureText(str);
        return metrics.width;
    };
    // 分行处理
    var splitText = function(text, layer) {
        var $canvas = $(this),
            context = $canvas[0].getContext('2d'),// 需要做判断
            textSettings = layer.data.textSettings,
            site = getTextareaSite(layer),
            layerWidth = site.width,
            lines = [], tempLine = '', words, tempWords = [];
        context.font = textSettings.fontSize + 'px ' + textSettings.fontFamily;
        // 拆分字符，半角用空格分割，全角分成单独字符

        // 按换行符拆分
        words = text.split('\n');
        for(var i = 0; i < words.length; i++) {
            if(i != words.length - 1) {
                words[i] = words[i] + '\n';
            }
        }

        // 按空格拆分
        $.each(words, function(index, word) {
            var w = word.split(' ');
            for (var i = 0; i < w.length; i++) {
                if (i != w.length - 1) {
                    w[i] = w[i] + ' ';
                }
                tempWords.push(w[i]);
            }
        });
        words = tempWords;
        tempWords = [];

        // 拆分全角字符串成单独字符
        $.each(words, function(index, word) {
            var startIndex = 0, banjiaoWord;
            for(var i = 0; i < word.length; i++) {
                var thisCharCode = word.charCodeAt(i);
                if(thisCharCode <= 128) {
                    if(i === word.length - 1) {
                        tempWords.push(word.substring(startIndex, i + 1));
                    }
                    continue;
                } else {
                    if(startIndex < i) {
                        tempWords.push(word.substring(startIndex, i));
                    }
                    tempWords.push(word.substring(i, i + 1));
                    startIndex = i + 1;
                }
            }
        });
        words = tempWords;
        tempWords = [];

        // 长度超过文本框的文本拆分成单个字符
        $.each(words, function(index, word) {
            var metrics = context.measureText(word);
            var width = metrics.width;
            if(width > layerWidth) {
                for(var i = 0; i < word.length; i++) {
                    tempWords.push(word.charAt(i));
                }
            } else {
                tempWords.push(word);
            }
        });
        words = tempWords;
        tempWords = [];

        // 合并行
        for(var i = 0; i < words.length; i++) {
            var word = words[i];

            var metrics = context.measureText(word);
            var cWidth = metrics.width;
            var pWidth = context.measureText(tempLine).width;
            // 如果继续添加字符会超过文本框或者字符中有换行符，则换行
            // 否则直接添加到行尾
            if(cWidth + pWidth <= layerWidth && tempLine.indexOf('\n') < 0) {
                tempLine += word;
            } else {
                tempLine = tempLine.replace('\n', '');
                lines.push(tempLine);
                tempLine = word;
            }
        }
        lines.push(tempLine);
        return lines;
    };
    var cursorOpacity = 1;
    var flash = function(layer) {
        if(cursorOpacity) {
            cursorOpacity = 0;
        } else {
            cursorOpacity = 1;
        }
        $(this).animateLayer(layer, {
            opacity: cursorOpacity
        }, 400, 'easeOutExpo', flash);
    };
    // 获取文本可用区域，返回的数据有：文本框在浏览器的位置，文本框在canvas中的位置，文本框的宽高
    var getTextareaSite = function(layer) {
        var canvas = $(layer.canvas);
        return {
            top: layer.y + canvas.offset().top + 6,
            left: 7 + layer.x + canvas.offset().left,
            x: 6 + layer.x,
            y: layer.y + 5,
            width: layer.width - 15,
            height: layer.height - 12
        };
    };
    var createLayerTextarea = function(layer) {
        var canvas = $(layer.canvas),
            data = layer.data.textSettings,
            textarea = $('<textarea spellcheck="false"></textarea>');
        textarea.data('layer', layer);
        var site = getTextareaSite(layer);
        textarea.css({
            position: 'absolute',
            top: site.top + 'px',
            left: site.left + 'px',
            width: site.width + 'px',
            height: site.height + 'px',
            textDecoration: data.hasUnderline ? 'underline' : 'none',
            resize: 'none',
            outline: 'none',
            overflow: 'hidden',
            color: data.fillStyle,
            lineHeight: data.fontSize + 'px',
            border: 0,
            backgroundColor: 'transparent',
            fontWeight: data.textareaFontWeight,
            fontStyle: data.textareaFontStyle,
            fontSize: data.fontSize + 'px',
            fontFamily: data.fontFamily,
            textAlign: data.align
        });
        textarea.on('keyup', updateText);
        textarea.val(layer.text);
        textarea.appendTo('body');
        textarea.focus(function() {
            $(this).data('isFocus', true);
        });
        textarea.blur(function() {
            $(this).data('isFocus', false);
        });
        textarea.focus();
        return textarea;
    };
    var createTextLayer = function(options) {
        var canvas = this,
            layer;
        options.fromCenter = false;
        options.draggable = true;
        options.cursors = {mousemove: 'move'};
        options.controlStart = onControlStart;
        options.controlStop = onControlStop;
        options.dragstart = onDragStart;
        options.dragstop = onDragStop;
        options.drag = onDrag;
        options.click = onClick;
        options.onChange = onChange;
        options.remove = onTextLayerRemove;
        options.onZIndexChange = onZIndexChange;
        options.type = 'rectangle';
        options.boardType = 'text';
        if(options.data && options.data.hasOwnProperty('preTextData')) {
            delete  options.data['preTextData'];
        }
        canvas.addLayer(options);
        layer = canvas.getLayer(options.name);
        layer.data.textarea = createLayerTextarea(layer);

        var _canvasBuffer = document.createElement('canvas');
        _canvasBuffer.width = canvas.width();
        _canvasBuffer.height = canvas.height();
        layer.data._canvasBuffer = _canvasBuffer;

        return layer;
    };
    // textarea变化时更新layer.text
    var updateText = function() {
        var textarea = $(this),
            layer = textarea.data('layer');
        var currentText = textarea.val();
        // 把tab替换成空格
        if(currentText.indexOf('\t') >= 0) {
            textarea.val(currentText.replace(/\t/g, ' '));
        }
        layer.text = currentText;
        hideTextLayer(layer, true);
        drawText.call(layer.canvas, layer.text, layer);
    };
    var onControlStart = function(layer) {
        var canvas = $(layer.canvas);
        hideTextLayer(layer, false);

        layer.data.textarea.hide();
        onBeforeChange.call(canvas, layer);
        canvas.drawLayers();
    };
    var onControlStop = function(layer) {
        var canvas = $(this);
        drawText.call(canvas, layer.text, layer);
        var site = getTextareaSite(layer);
        layer.data.textarea.css({
            width: site.width + 'px',
            height: site.height + 'px',
            top: site.top + 'px',
            left: site.left + 'px'
        });
        layer.data.textarea.show();
        hideTextLayer(layer, true);
        canvas.triggerLayerEvent(layer, 'onChange');
    };
    var onDragStart = function(layer) {
        hideTextLayer(layer, false);
        layer.data.textarea.hide();
        onBeforeChange.call($(layer.canvas), layer);
    };
    var onDragStop = function(layer) {
        var canvas = $(this);
        drawText.call(canvas, layer.text, layer);
        var site = getTextareaSite(layer);
        layer.data.textarea.css({
            width: site.width + 'px',
            height: site.height + 'px',
            top: site.top + 'px',
            left: site.left + 'px'
        });
        hideTextLayer(layer, true);
        layer.data.textarea.show();
        canvas.triggerLayerEvent(layer, 'onChange');
    };
    var onDrag = function(layer) {
        drawText.call(this, layer.text, layer);
    };
    var onClick = function(layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY);
        data.onClick.call(canvas, layer);
    };
    var onChange = function(layer) {
        var canvas = $(this),
            data = canvas.data(DATA_KEY);
        data.onChange.call(canvas, layer);
        // 触发事件后记录当前状态
        onBeforeChange(layer);
    };
    var onZIndexChange = function(layer) {
//        console.log('z-index change');
    };
    var onTextLayerRemove = function(layer) {
//        console.log('remove text layer');
        //TODO 未移除文字图层
        var canvas = $(layer.canvas),
            data = canvas.data(DATA_KEY);
        if(!data.isStopRemoveEvent) {
            layer.isDel = true;
            data.onRemove.call(canvas, layer);
            layer.isDel = false;
        }
        if(layer.data.textarea) {
            layer.data.textarea.remove();
            delete layer.data['textarea'];
        }
        if(layer.data._canvasBuffer) {
            delete layer.data['_canvasBuffer'];
        }
        if(layer.data.showTextLayerName) {
            canvas.removeLayer(layer.data.showTextLayerName);
            delete layer.data['showTextLayerName'];
        }
        data.cTextEditorWrap = null;
    };
    var onMouseDown = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        data.isDown = true;
        data.startX = event.offsetX;
        data.startY = event.offsetY;
        if(data.wrapStrokeWidth % 2 === 1) {
            data.startX = data.startX + 0.5;
            data.startY = data.startY + 0.5;
        }
        var rectName = textRectName + textIndex;
        textIndex += 1;
        canvas.drawRect({
            name: rectName,
            layer: true,
            type: 'text',
            boardType: 'text',
            fromCenter: false,
            draggable: false,
            strokeStyle: data.wrapStrokeStyle,
            strokeWidth: data.wrapStrokeWidth,
            x: data.startX, y: data.startY,
            width: 0,
            height: 0,
            cornerRadius: data.cornerRadius,
            strokeDash: data.strokeDash,
            strokeDashOffset: data.strokeDashOffset,
            data: {
                // 保存字体数据
                textSettings: $.extend({}, data),
                isActivate: true
            },
            cursors: {
                mouseover: 'move'
            },
            controlStart: onControlStart,
            controlStop: onControlStop,
            dragstart: onDragStart,
            dragstop: onDragStop,
            drag: onDrag,
            click: onClick,
            onChange: onChange,
            remove: onTextLayerRemove,
            onZIndexChange: onZIndexChange
        });
        data.cTextEditorWrap = canvas.getLayer(rectName);
    };
    var onMouseUp = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY),
            endX = data.endX, endY = data.endY,
            startX = data.startX, startY = data.startY,
            cTextEditorWrap = data.cTextEditorWrap;

        data.isDown = false;
        if(!endX || !endY || endX - startX <= 10 || endY - startY <= 10) {
            data.cTextEditorWrap.width = 30;
            data.cTextEditorWrap.height = 20;
            //canvas.textEditor('remove', data.cTextEditorWrap, {isStopRemoveEvent: true});
            //data.cTextEditorWrap = null;
            //return;
        }
        data.endX = data.endY = null;
        var textarea = $('<textarea spellcheck="false"></textarea>');
        cTextEditorWrap.data.textarea = textarea;
        textarea.data('layer', cTextEditorWrap);
        var site = getTextareaSite(cTextEditorWrap);
        textarea.css({
            position: 'absolute',
            top: site.top + 'px',
            left: site.left + 'px',
            width: site.width + 'px',
            height: site.height + 'px',
            textDecoration: data.hasUnderline ? 'underline' : 'none',
            resize: 'none',
            outline: 'none',
            overflow: 'hidden',
            color: data.fillStyle,
            lineHeight: data.fontSize + 'px',
            border: 0,
            backgroundColor: 'transparent',
            fontWeight: data.textareaFontWeight,
            fontStyle: data.textareaFontStyle,
            fontSize: data.fontSize + 'px',
            fontFamily: data.fontFamily,
            textAlign: data.align
        });

        cTextEditorWrap.draggable = true;
        cTextEditorWrap.isNew = true;
        cTextEditorWrap.isHidden = true;
        data.onAdd.call(canvas, cTextEditorWrap);
        cTextEditorWrap.isNew = false;
        textarea.on('keyup', updateText);
        textarea.appendTo('body');
        textarea.focus(function() {
            $(this).data('isFocus', true);
        });
        textarea.blur(function() {
            $(this).data('isFocus', false);
        });
        textarea.focus();

        if(data.showCursor) {
            canvas.drawLine({
                layer: true,
                name: 'textCursor',
                strokeStyle: '#000',
                strokeWidth: 1,
                x1: cTextEditorWrap.x + 2,
                y1: cTextEditorWrap.y + 2,
                x2: cTextEditorWrap.x + 2,
                y2: cTextEditorWrap.y + 2 + data.fontSize
            });
            canvas.animateLayer('textCursor', {
                opacity: cursorOpacity
            }, 400, flash);
            cTextEditorWrap.data.textSettings.textCursor = canvas.getLayer('textCursor');
        }
        // TODO 尝试用于提高性能的双缓存画布
        var _canvasBuffer = document.createElement('canvas');
        _canvasBuffer.width = canvas.width();
        _canvasBuffer.height = canvas.height();
        cTextEditorWrap.data._canvasBuffer = _canvasBuffer;
        onBeforeChange.call(canvas, cTextEditorWrap);
        drawText.call(canvas, cTextEditorWrap.text, cTextEditorWrap);
    };
    var onMouseMove = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        if(!data.isDown) {
            return;
        }
        data.endX = event.offsetX;
        data.endY = event.offsetY;
        if(data.wrapStrokeWidth % 2 === 1) {
            data.endX = data.endX + 0.5;
            data.endY = data.endY + 0.5;
        }
        data.cTextEditorWrap.width = data.endX - data.startX;
        data.cTextEditorWrap.height = data.endY - data.startY;
        canvas.drawLayers();
    };

    var emFn = function() {};

    var methods = {
        init: function (options) {
            return $(this).each(function () {
                var $canvas = $(this);
                // 配置项
                var textSettings = $canvas.data(DATA_KEY);
                if (!textSettings) {
                    var defaults = {
                        align: 'left',
                        fontSize: 14,
                        fillStyle: '#000',
                        fontFamily: 'Verdana, sans-serif',
                        fontStyle: 'normal',
                        hasUnderline: false,
                        wrapStrokeStyle: '#000',
                        wrapStrokeWidth: 1,
                        cornerRadius: 0,
                        strokeDash: [5],
                        strokeDashOffset: 0,
                        noTextWrapStrokeStyle: '#ccc',
                        backgroundColor: 'transparent',
                        strokeStyle: 'transparent',
                        textareaFontWeight: 'normal',
                        textareaFontStyle: 'normal',
                        showCursor: false,
                        onAdd: emFn,
                        onClick: emFn,
                        onChange: emFn,
                        onRemove: emFn
                    };
                    textSettings = $.extend({}, defaults, options);
                } else {
                    textSettings = $.extend({}, textSettings, options);
                }
                $canvas.data(DATA_KEY, textSettings);

            });
        },
        setFontFamily: function(family) {
            return this.each(function() {
                var canvas = $(this),
                    textSettings = canvas.data(DATA_KEY);
                textSettings.fontFamily = family;
                var wrap = textSettings.cTextEditorWrap,
                    textarea;
                if(wrap) {
                    onBeforeChange.call(canvas, wrap);
                    wrap.data.textSettings.fontFamily = family;
                    textarea = wrap.data.textarea;
                    textarea.css({
                        fontFamily: family
                    });
                    drawText.call(canvas, wrap.text, textarea.data('layer'));
                    canvas.triggerLayerEvent(wrap, 'onChange');
                }
            });
        },
        setFontSize: function(size) {
            return this.each(function() {
                var canvas = $(this),
                    textSettings = canvas.data(DATA_KEY);
                size = parseFloat(size);
                textSettings.fontSize = size;
                var wrap = textSettings.cTextEditorWrap,
                    textarea;
                if(wrap) {
                    onBeforeChange.call(canvas, wrap);
                    wrap.data.textSettings.fontSize = size;
                    textarea = wrap.data.textarea;
                    textarea.css({
                        fontSize: size + 'px',
                        lineHeight: size + 'px'
                    });
                    drawText.call(canvas, wrap.text, textarea.data('layer'));
                    canvas.triggerLayerEvent(wrap, 'onChange');
                }
            });
        },
        setColor: function(color) {
            return this.each(function() {
                var canvas = $(this),
                    textSettings = canvas.data(DATA_KEY);
                textSettings.fillStyle = color;
                var wrap = textSettings.cTextEditorWrap,
                    textarea;
                if(wrap) {
                    onBeforeChange.call(canvas, wrap);
                    wrap.data.textSettings.fillStyle = color;
                    textarea = wrap.data.textarea;
                    textarea.css({
                        color: color
                    });
                    drawText.call(canvas, wrap.text, textarea.data('layer'));
                    canvas.triggerLayerEvent(wrap, 'onChange');
                }
            });
        },
        getColor: function() {
            var data = this.data(DATA_KEY),
                cLayer = data.cTextEditorWrap;
            if(cLayer) {
                return cLayer.data.textSettings.fillStyle;
            }
            return data.fillStyle;
        },
        setBackgroundColor: function(color) {
            return this.each(function() {
                var canvas = $(this),
                    textSettings = canvas.data(DATA_KEY);
                textSettings.backgroundColor = color;
                var wrap = textSettings.cTextEditorWrap,
                    textarea;
                if(wrap) {
                    onBeforeChange.call(canvas, wrap);
                    wrap.data.textSettings.backgroundColor = color;
                    textarea = wrap.data.textarea;
                    drawText.call(canvas, wrap.text, textarea.data('layer'));
                    canvas.triggerLayerEvent(wrap, 'onChange');
                }
            });
        },
        getBackgroundColor: function() {
            var data = this.data(DATA_KEY),
                cLayer = data.cTextEditorWrap;
            if(cLayer) {
                return cLayer.data.textSettings.backgroundColor;
            }
            return data.backgroundColor;
        },
        // 设置边框颜色
        setStrokeStyle: function(color) {
            return this.each(function() {
                var canvas = $(this),
                    textSettings = canvas.data(DATA_KEY);
                textSettings.strokeStyle = color;
                var wrap = textSettings.cTextEditorWrap,
                    textarea;
                if(wrap) {
                    onBeforeChange.call(canvas, wrap);
                    wrap.data.textSettings.strokeStyle = color;
                    textarea = wrap.data.textarea;
                    drawText.call(canvas, wrap.text, textarea.data('layer'));
                    canvas.triggerLayerEvent(wrap, 'onChange');
                }
            });
        },
        // 获取边框颜色
        getStrokeStyle: function() {
            var data = this.data(DATA_KEY),
                cLayer = data.cTextEditorWrap;
            if(cLayer) {
                return cLayer.data.textSettings.strokeStyle;
            }
            return data.strokeStyle;
        },
        // 设置文本颜色
        setFontStyle: function(style) {
            return this.each(function() {
                var canvas = $(this),
                    textSettings = canvas.data(DATA_KEY);
                textSettings.fontStyle = style;
                var wrap = textSettings.cTextEditorWrap,
                    textarea;
                textSettings.textareaFontStyle = textSettings.textareaFontWeight = 'normal';
                if(style.indexOf('bold') >= 0) {
                    textSettings.textareaFontWeight = 'bold';
                }
                if(style.indexOf('italic') >= 0) {
                    textSettings.textareaFontStyle = 'italic';
                }
                if(wrap) {
                    onBeforeChange.call(canvas, wrap);
                    wrap.data.textSettings.fontStyle = style;
                    wrap.data.textSettings.textareaFontStyle = textSettings.textareaFontStyle;
                    wrap.data.textSettings.textareaFontWeight = textSettings.textareaFontWeight;
                    textarea = wrap.data.textarea;
                    textarea.css({
                        fontWeight: textSettings.textareaFontWeight,
                        fontStyle: textSettings.textareaFontStyle
                    });
                    drawText.call(canvas, wrap.text, textarea.data('layer'));
                    canvas.triggerLayerEvent(wrap, 'onChange');
                }
            });
        },
        // 获取文本颜色
        getFontStyle: function() {
            var data = this.data(DATA_KEY),
                cLayer = data.cTextEditorWrap;
            if(cLayer) {
                return cLayer.data.textSettings.fontStyle;
            }
            return data.fontStyle;
        },
        // 获取或设置斜体
        isItalic: function(isItalic) {
            if(isItalic === undefined) {
                var cLayer = this.data(DATA_KEY).cTextEditorWrap;
                if(cLayer) {
                    return cLayer.data.textSettings.fontStyle.indexOf('italic') >= 0;
                }
                return this.data(DATA_KEY).fontStyle.indexOf('italic') >= 0;
            }
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    cLayer = data.cTextEditorWrap;
                switch(cLayer ? cLayer.data.textSettings.fontStyle : data.fontStyle) {
                    case 'bold':
                        data.fontStyle = isItalic ? 'bold italic' : data.fontStyle;
                        break;
                    case 'normal':
                        data.fontStyle = isItalic ? 'italic' : data.fontStyle;
                        break;
                    case 'bold italic':
                        data.fontStyle = isItalic ? data.fontStyle : 'bold';
                        break;
                    case 'italic':
                        data.fontStyle = isItalic ? data.fontStyle : 'normal';
                        break;
                }
                data.textareaFontStyle = isItalic ? 'italic' : 'normal';
                if(cLayer) {
                    onBeforeChange.call(canvas, cLayer);
                    cLayer.data.textSettings.fontStyle = data.fontStyle;
                    cLayer.data.textSettings.textareaFontStyle = data.textareaFontStyle;
                    var textarea = cLayer.data.textarea;
                    textarea.css({
                        fontStyle: data.textareaFontStyle
                    });
                    drawText.call(canvas, cLayer.text, textarea.data('layer'));
                    canvas.triggerLayerEvent(cLayer, 'onChange');
                }
            });
        },
        // 获取或设置粗体
        isBold: function(isBold) {
            if(isBold === undefined) {
                var cLayer = this.data(DATA_KEY).cTextEditorWrap;
                if(cLayer) {
                    return cLayer.data.textSettings.fontStyle.indexOf('bold') >= 0;
                }
                return this.data(DATA_KEY).fontStyle.indexOf('bold') >= 0;
            }
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    cLayer = data.cTextEditorWrap;
                switch(cLayer ? cLayer.data.textSettings.fontStyle : data.fontStyle) {
                    case 'bold':
                        data.fontStyle = isBold ? data.fontStyle : 'normal';
                        break;
                    case 'normal':
                        data.fontStyle = isBold ? 'bold' : data.fontStyle;
                        break;
                    case 'bold italic':
                        data.fontStyle = isBold ? data.fontStyle : 'italic';
                        break;
                    case 'italic':
                        data.fontStyle = isBold ? 'bold italic' : data.fontStyle;
                        break;
                }
                data.textareaFontWeight = isBold ? 'bold' : 'normal';
                if(cLayer) {
                    onBeforeChange.call(canvas, cLayer);
                    cLayer.data.textSettings.fontStyle = data.fontStyle;
                    cLayer.data.textSettings.textareaFontWeight = data.textareaFontWeight;
                    var textarea = cLayer.data.textarea;
                    textarea.css({
                        fontWeight: data.textareaFontWeight
                    });
                    drawText.call(canvas, cLayer.text, textarea.data('layer'));
                    canvas.triggerLayerEvent(cLayer, 'onChange');
                }
            });
        },
        // 获取或设置对齐方式
        align: function(align) {
            if(align === undefined) {
                var cLayer = this.data(DATA_KEY).cTextEditorWrap;
                if(cLayer) {
                    return cLayer.data.textSettings.align;
                }
                return this.data(DATA_KEY).align;
            }
            if(align !== 'center' && align !== 'left' && align !== 'right') {
                throw '不支持的align类型：' + align;
            }
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    cLayer = data.cTextEditorWrap;
                data.align = align;
                if(cLayer) {
                    onBeforeChange.call(canvas, cLayer);
                    cLayer.data.textSettings.align = align;
                    cLayer.data.textarea.css({
                        textAlign: align
                    });
                    drawText.call(canvas, cLayer.text, cLayer.data.textarea.data('layer'));
                    canvas.triggerLayerEvent(cLayer, 'onChange');
                }
            });
        },
        // 获取或设置下划线
        hasUnderline: function(hasUnderline) {
            if(hasUnderline === undefined) {
                var cLayer = this.data(DATA_KEY).cTextEditorWrap;
                if(cLayer) {
                    return cLayer.data.textSettings.hasUnderline;
                }
                return this.data(DATA_KEY).hasUnderline;
            }
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    cLayer = data.cTextEditorWrap;
                data.hasUnderline = hasUnderline;
                if(cLayer) {
                    onBeforeChange.call(canvas, cLayer);
                    cLayer.data.textSettings.hasUnderline = hasUnderline;
                    var textarea = cLayer.data.textarea,
                        underline = hasUnderline ? 'underline' : 'none';
                    textarea.css({
                        textDecoration: underline
                    });
                    drawText.call(canvas, cLayer.text, textarea.data('layer'));
                    canvas.triggerLayerEvent(cLayer, 'onChange');
                }
            });
        },
        // 开启文本框绘画
        start: function() {
            return $.each(this, function() {
                var $canvas = $(this);
                $canvas.mousedown($canvas, onMouseDown);
                $canvas.mouseup($canvas, onMouseUp);
                $canvas.mousemove($canvas, onMouseMove);
            });
        },
        // 禁用文本框绘画
        stop: function() {
            return $.each(this, function() {
                var $canvas = $(this);
                $canvas.unbind('mousedown', onMouseDown);
                $canvas.unbind('mouseup', onMouseUp);
                $canvas.unbind('mousemove', onMouseMove);
            });
        },
        // 开启编辑状态
        activate: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    textSettings = canvas.data(DATA_KEY),
                    layerSettngs = layer.data.textSettings;
                if(layerSettngs.strokeStyle === 'transparent') {
                    layer.strokeStyle = textSettings.wrapStrokeStyle;
                } else {
                    layer.strokeStyle = layerSettngs.strokeStyle;
                    layer.strokeDash = null;
                }

                layer.cursors.mouseover = 'move';
                layer.data.textarea.show();
                if(!layer.data.isActivate) {
                    layer.data.textarea.focus();
                }
                textSettings.cTextEditorWrap = layer;
                onBeforeChange.call(canvas, layer);
                hideTextLayer(layer, true);
                layer.data.isActivate = true;
                // 手动触发mouse move事件，让文本框的移动图标生效
                canvas.mousemove();
            });
        },
        // 取消编辑状态
        inactivate: function() {
            return this.each(function() {
                var canvas = $(this),
                    textSettings = canvas.data(DATA_KEY),
                    currentLayer = textSettings.cTextEditorWrap;
                if(currentLayer) {
                    currentLayer.cursors.mouseover = 'auto';
                    currentLayer.data.textarea.hide();
                    // 如果内容未改变，不触发onChange事件
                    if((!currentLayer.data.prevProp && currentLayer.text.length !== 0) ||
                        (currentLayer.data.prevProp && currentLayer.data.prevProp.text !== currentLayer.text)) {
                        canvas.triggerLayerEvent(currentLayer, 'onChange');
                    }
                    hideTextLayer(currentLayer, false);
                    currentLayer.data.isActivate = false;
                    drawText.call(canvas, currentLayer.text, currentLayer);
                    canvas.drawLayers();
                    textSettings.cTextEditorWrap = null;
                }
            });
        },
        // 重画
        reDraw: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    data = layer.data.textSettings,
                    textarea = layer.data.textarea,
                    underline = data.hasUnderline ? 'underline' : 'none';
                drawText.call(canvas, layer.text, layer);
                var site = getTextareaSite(layer);

                textarea.val(layer.text);
                textarea.css({
                    top: site.top,
                    left: site.left,
                    width: site.width,
                    height: site.height,
                    color: data.fillStyle,
                    fontFamily: data.fontFamily,
                    fontWeight: data.textareaFontWeight,
                    fontStyle: data.textareaFontStyle,
                    fontSize: data.fontSize,
                    textDecoration: underline,
                    textAlign: data.align
                });
            });
        },
        add: function(layer) {
            return this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY),
                    //TODO wrap优先取data
                    options = {
                        name: layer.name,
                        index: layer.index,
                        text: layer.text,
                        strokeStyle: layer.strokeStyle,
                        strokeWidth: layer.strokeWidth,
                        x: layer.x, y: layer.y,
                        width: layer.width, height: layer.height,
                        cornerRadius: layer.cornerRadius,
                        strokeDash: layer.strokeDash,
                        strokeDashOffset: layer.strokeDashOffset,
                        data: $.extend(true, {}, layer.data)
                    };
                data.cTextEditorWrap = createTextLayer.call(canvas, options);
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
        toData: function(layer) {
            if(layer.boardType !== 'text') {
                throw '图层类型有误: ' + layer.boardType;
            }

            var settings = layer.data.textSettings,
                data = {
                    type: 'text',
                    text: layer.text,
                    x: layer.x,
                    y: layer.y,
                    width: layer.width,
                    height: layer.height,
                    align: settings.align,
                    fontSize: settings.fontSize,
                    fontStyle: settings.fontStyle,
                    fontFamily: settings.fontFamily,
                    fillStyle: settings.fillStyle,
                    hasUnderline: settings.hasUnderline,
                    textareaFontWeight: settings.textareaFontWeight,
                    textareaFontStyle: settings.textareaFontStyle,
                    strokeStyle: settings.strokeStyle,
                    backgroundColor: settings.backgroundColor
            };
            return data;
        },
        fromData: function(data) {
            if(data.type !== 'text') {
                throw '数据类型有误: ' + layer.boardType;
            }
            this.each(function() {
                var canvas = $(this),
                    settings = canvas.data(DATA_KEY),
                    options, name = textRectName + textIndex++;
                options = {
                    name: name,
                    text: data.text,
                    strokeStyle: settings.wrapStrokeStyle,
                    strokeWidth: settings.wrapStrokeWidth,
                    x: data.x, y: data.y,
                    width: data.width, height: data.height,
                    cornerRadius: settings.cornerRadius,
                    strokeDash: settings.strokeDash,
                    strokeDashOffset: settings.strokeDashOffset,
                    data: {
                        textSettings: $.extend({}, settings, {
                            align: data.align,
                            hasUnderline: data.hasUnderline,
                            textareaFontWeight: data.textareaFontWeight,
                            fontStyle: data.fontStyle,
                            fontFamily: data.fontFamily,
                            fontSize: data.fontSize,
                            fillStyle: data.fillStyle,
                            textareaFontStyle: data.textareaFontStyle,
                            strokeStyle: data.strokeStyle,
                            backgroundColor: data.backgroundColor
                        })
                    }
                };
                settings.cTextEditorWrap = createTextLayer.call(canvas, options);
            });
        },
        getLastLayer: function() {
            return this.data(DATA_KEY).cTextEditorWrap;
        },
        isFocusInTextarea: function(layer) {
        	return layer.data.textarea.data('isFocus');
        }
    };
    $.fn.textEditor = function (options) {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof method === 'object' || !method) {
            method = methods.init;
        } else {
            throw 'Method ' +  method + ' does not exist on jQuery.textEditor';
        }
        return method.apply(this, arguments);
    };

    $.fn.textEditor.TextState = function(textLayer) {
        this.type = 'text';
        this.isNew = textLayer.isNew;
        this.isDel = textLayer.isDel;
        this.layer = textLayer;
        this.currentProp = {
            x: textLayer.x,
            y: textLayer.y,
            width: textLayer.width,
            height: textLayer.height,
            text: textLayer.text,
            data: {
                textSettings: {
                    hasUnderline: textLayer.data.textSettings.hasUnderline,
                    fontSize: textLayer.data.textSettings.fontSize,
                    fillStyle: textLayer.data.textSettings.fillStyle,
                    fontStyle: textLayer.data.textSettings.fontStyle,
                    fontFamily: textLayer.data.textSettings.fontFamily,
                    textareaFontWeight: textLayer.data.textSettings.textareaFontWeight,
                    textareaFontStyle: textLayer.data.textSettings.textareaFontStyle,
                    align: textLayer.data.textSettings.align,
                    strokeStyle: textLayer.data.textSettings.strokeStyle,
                    backgroundColor: textLayer.data.textSettings.backgroundColor
                }
            }
        };
        this.prevProp = $.extend({}, textLayer.data.prevProp);

        var extendProp = function(target, from) {
            target.x = from.x;
            target.y = from.y;
            target.width = from.width;
            target.height = from.height;
            target.text = from.text;
            target.data.textSettings.hasUnderline = from.data.textSettings.hasUnderline;
            target.data.textSettings.fontSize = from.data.textSettings.fontSize;
            target.data.textSettings.fillStyle = from.data.textSettings.fillStyle;
            target.data.textSettings.fontStyle = from.data.textSettings.fontStyle;
            target.data.textSettings.fontFamily = from.data.textSettings.fontFamily;
            target.data.textSettings.textareaFontWeight = from.data.textSettings.textareaFontWeight;
            target.data.textSettings.textareaFontStyle = from.data.textSettings.textareaFontStyle;
            target.data.textSettings.align = from.data.textSettings.align;
            target.data.textSettings.backgroundColor = from.data.textSettings.backgroundColor;
            target.data.textSettings.strokeStyle = from.data.textSettings.strokeStyle;
        };
        if(typeof $.fn.textEditor.TextState._initialized === 'undefined') {
            $.fn.textEditor.TextState.prototype.restore = function(fn) {
                var me = this,
                    canvas = $(me.layer.canvas),
                    layer = canvas.getLayer(me.layer.name);
                if(me.isNew) {
//                    console.log('remove new text');
                    layer.isNew = true;
                    canvas.textEditor('remove', layer, {isStopRemoveEvent: true});
                } else if(me.isDel) {
                    canvas.textEditor('add', me.layer);
                    layer = canvas.getLayer(me.layer.name);
                    layer.isDel = true;
                } else {
                    // TODO 使用$.extend(true, ...)代替
                    extendProp(layer, me.prevProp);
                    canvas.textEditor('reDraw', layer);
                    canvas.triggerLayerEvent(layer, 'moveOrTra');
                }
                if(typeof fn === 'function') {
                    fn.call(canvas, layer);
                }
                layer.isNew = false;
                layer.isDel = false;
            };
            $.fn.textEditor.TextState.prototype.redo = function(fn) {
                var me = this,
                    canvas = $(me.layer.canvas),
                    layer = canvas.getLayer(me.layer.name);
                layer = layer ? layer : me.layer;
                if(me.isNew) {
                    canvas.textEditor('add', layer);
                    layer = canvas.getLayer(layer.name);
                    layer.isNew = true;
                } else if(me.isDel) {
                    canvas.textEditor('remove', me.layer.name, {isStopRemoveEvent: true});
                    layer = me.layer;
                } else {
                    // TODO 使用$.extend(true, ...)代替
                    extendProp(layer, me.currentProp);
                    canvas.textEditor('reDraw', layer);
                    canvas.triggerLayerEvent(layer, 'moveOrTra');
                }
                if(typeof fn === 'function') {
                    fn.call(canvas, layer);
                }
                layer.isNew = false;
            };
            $.fn.textEditor.TextState._initialized = true;
        }
    };
}(jQuery));

// 用于获取鼠标在输入框内的位置
(function($, undefined) {
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if ('selectionStart' in el) {
            pos = el.selectionStart;
        } else if ('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
})(jQuery);