/**
* @Title: draw 
* @Description: 绘图的操作方法
* 
* @author 余冬冬
* @date 2015年7月28日 下午4:09:27
*/

var DrawUtils={
		/**
		* 
		* @Title: getCanvas 
		* @Description: 	获取画布对象
		* @param canvas canvas对象或者canvasID
		*
		* @author 余冬冬
		* @date 2015年7月28日 下午4:47:27
		 */
		getCanvas:function(canvas){
			if(canvas.nodeType){
				this.canvas=canvas;
			}
			else if(typeof canvas=='string'){
				this.canvas=document.getElementById(canvas);
			}else
				this.canvas=null;
			return this.canvas;
		},
		
		/**
		* 
		* @Title: setCanvas 
		* @Description: 画布尺寸设置
		* @param canvas canvas对象或者canvasID
		* @param width	画布宽度
		* @param height	画布高度
		*
		* @author 余冬冬
		* @date 2015年7月28日 下午4:47:27
		 */
		setCanvas:function(canvas,width,height){
			this.canvas=this.getCanvas(canvas);
			this.canvas.width=width;
			this.canvas.height=height;
		},
		
		/**
		* 
		* @Title: setLine 
		* @Description:  画笔线条设置
		* @param canvas canvas对象或者canvasID
		* @param color	线条颜色
		* @param width	线条粗细
		*
		* @author 余冬冬
		* @date 2015年7月28日 下午4:47:27
		 */
		setLine:function(canvas,color,width){
			this.getCanvas(canvas);
			this.context.strokeStyle=color;
			this.context.lineWidth=width;
			this.draw(this.canvas);
		},
		
		/**
		* 
		* @Title: init 画图初始化
		* @Description: 
		*
		* @author 余冬冬
		* @date 2015年7月28日 下午4:19:08
		 */
		init : function(canvas) {
			this.getCanvas(canvas);
			var that = this;
			if (!this.canvas.getContext) {
				return;
			}
			//canvas上下文
			this.context = this.canvas.getContext('2d');
			//设置画布矩形
			this.canvas.canvasRect = this.canvas.getBoundingClientRect();
			
			this.canvas.onselectstart = function() {
				return false; //修复chrome下光标样式的问题
			};
		},
		
		/**
		* 
		* @Title: drawLine 
		* @Description: 	画笔功能
		*
		* @author 余冬冬
		* @date 2015年7月28日 下午4:19:08
		 */
		drawLine:function(canvas){
			var t=this;
			this.init(canvas);
			//定义画笔功能
			this.canvas.onmousedown=function(e){
				var canvasRect = t.canvas.canvasRect;
				window.getSelection ? window.getSelection().removeAllRanges(): document.selection.empty(); //清除文本的选中
				t.canvas.beginPath();
				t.context.moveTo(e.clientX - canvasRect.left, e.clientY- canvasRect.top); //起点
				
				t.canvas.onmousemove=function(e){
					var canvasRect = t.canvas.canvasRect;
					t.context.lineTo(e.clientX - canvasRect.left, e.clientY- canvasRect.top);
					t.context.stroke();
				}
			}
			
			this.canvas.onmouseup=function(){
				t.canvas.closePath();
				t.canvas.onmouseup=null;
				t.canvas.onmousemove=null;
				//t.canvas.onmousemove=null;
			}
		}		
}

