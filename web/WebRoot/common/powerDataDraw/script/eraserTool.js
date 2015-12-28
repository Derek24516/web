/**
 * Created by Boanda on 2015/8/26.
 */
(function($) {
    var DATA_KEY = 'eraserData';

    var onMouseDown = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        data.isDown = true;
        data.onClearStart.call(canvas);
        data.onClear.call(canvas, event.offsetX - data.width / 2 - 1, event.offsetY - data.height / 2 - 1, data.width, data.height);
    };
    var onMouseUp = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        data.isDown = false;
        data.onClearStop.call(canvas);
    };
    var onMouseMove = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        if(data.isEnter) {
            data.eraser.css({
                top: event.clientY  - data.height / 2,
                left: event.clientX  - data.width / 2
            });
        }
        if(data.isDown) {
            data.onClear.call(canvas, event.offsetX - data.width / 2 - 1, event.offsetY - data.height / 2 - 1, data.width, data.height);
        }
    };
    var onMouseEnter = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        data.isEnter = true;
        data.eraser.show();
    };
    var onMouseOut = function(event) {
        var canvas = event.data,
            data = canvas.data(DATA_KEY);
        data.isEnter = false;
        data.eraser.hide();
    };
    var emFn = function() {};
    var methods = {
        init: function(options) {
            this.each(function() {
                var canvas = $(this),
                    data = canvas.data(DATA_KEY);
                if(!data) {
                    data = {
                        onClear: emFn,
                        onClearStart: emFn,
                        onClearStop: emFn,
                        width: 30,
                        height: 30,
                        eraserColor: '#FFED3B'
                    };
                    data = $.extend({}, data, options);
                } else {
                    data = $.extend({}, data, options);
                }
                canvas.data(DATA_KEY, data);
                var eraser = $('<span></span>');
                eraser.css({
                    width: data.width + 'px',
                    height: data.height + 'px',
                    display: 'block',
                    top: '-200px',
                    left: '-500px',
                    background: data.eraserColor,
                    position: 'fixed',
                    pointerEvents: 'none'
                }).appendTo('body').hide();
                data.eraser = eraser;
            });
        },
        start: function() {
            this.each(function() {
                var canvas = $(this);
                canvas.mousedown(canvas, onMouseDown);
                canvas.mouseup(canvas, onMouseUp);
                canvas.mousemove(canvas, onMouseMove);
                canvas.mouseenter(canvas, onMouseEnter);
                canvas.mouseout(canvas, onMouseOut);
                canvas.addClass('hide_cursor');
            });
        },
        stop: function() {
            this.each(function() {
                var canvas = $(this);
                canvas.unbind('mousedown', onMouseDown);
                canvas.unbind('mouseup', onMouseUp);
                canvas.unbind('mousemove', onMouseMove);
                canvas.unbind('mouseenter', onMouseEnter);
                canvas.unbind('mouseout', onMouseOut);
                canvas.removeClass('hide_cursor');
            });
        }
    };
    $.fn.eraserTool = function(options) {
        var method = arguments[0];
        if(methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if(typeof(method) === 'object' || !method) {
            method = methods.init;
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.eraserTool' );
            return this;
        }
        return method.apply(this, arguments);
    };
}(jQuery));