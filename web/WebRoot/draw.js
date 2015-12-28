/**
* @Title: draw 
* @Description: ��ͼ�Ĳ�������
* 
* @author �ඬ��
* @date 2015��7��28�� ����4:09:27
*/

var DrawUtils={
		/**
		* 
		* @Title: getCanvas 
		* @Description: 	��ȡ��������
		* @param canvas canvas�������canvasID
		*
		* @author �ඬ��
		* @date 2015��7��28�� ����4:47:27
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
		* @Description: �����ߴ�����
		* @param canvas canvas�������canvasID
		* @param width	�������
		* @param height	�����߶�
		*
		* @author �ඬ��
		* @date 2015��7��28�� ����4:47:27
		 */
		setCanvas:function(canvas,width,height){
			this.canvas=this.getCanvas(canvas);
			this.canvas.width=width;
			this.canvas.height=height;
		},
		
		/**
		* 
		* @Title: setLine 
		* @Description:  ������������
		* @param canvas canvas�������canvasID
		* @param color	������ɫ
		* @param width	������ϸ
		*
		* @author �ඬ��
		* @date 2015��7��28�� ����4:47:27
		 */
		setLine:function(canvas,color,width){
			this.getCanvas(canvas);
			this.context.strokeStyle=color;
			this.context.lineWidth=width;
			this.draw(this.canvas);
		},
		
		/**
		* 
		* @Title: init ��ͼ��ʼ��
		* @Description: 
		*
		* @author �ඬ��
		* @date 2015��7��28�� ����4:19:08
		 */
		init : function(canvas) {
			this.getCanvas(canvas);
			var that = this;
			if (!this.canvas.getContext) {
				return;
			}
			//canvas������
			this.context = this.canvas.getContext('2d');
			//���û�������
			this.canvas.canvasRect = this.canvas.getBoundingClientRect();
			
			this.canvas.onselectstart = function() {
				return false; //�޸�chrome�¹����ʽ������
			};
		},
		
		/**
		* 
		* @Title: drawLine 
		* @Description: 	���ʹ���
		*
		* @author �ඬ��
		* @date 2015��7��28�� ����4:19:08
		 */
		drawLine:function(canvas){
			var t=this;
			this.init(canvas);
			//���廭�ʹ���
			this.canvas.onmousedown=function(e){
				var canvasRect = t.canvas.canvasRect;
				window.getSelection ? window.getSelection().removeAllRanges(): document.selection.empty(); //����ı���ѡ��
				t.canvas.beginPath();
				t.context.moveTo(e.clientX - canvasRect.left, e.clientY- canvasRect.top); //���
				
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

