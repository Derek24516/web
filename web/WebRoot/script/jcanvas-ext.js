/**
	 * 
	* @Title: CanvasExt 
	* @Description: 	扩展Canvas的画图功能
	*
	* @author 余冬冬
	* @date 2015年7月29日 下午5:11:56
*/


(function(){
	var layer=0;	//图层索引
	
	//全局变量
	CanvasExt={
			/**
			 * 
			* @Title: drawPen 
			* @Description: 	自由画笔
			* @param canvasId	canvasId
			* @param penColor 定义自由画笔颜色
			* @param penWidth	定义自由画笔宽度
			* @return    
			* @throws 
			*
			* @author 余冬冬
			* @date 2015年7月29日 下午5:11:56
			 */
			drawPen:function(canvasId,penColor,penWidth){
				var that=this;
				that.penColor=penColor;
				that.penWidth=penWidth;
				//canvas DOM对象	
				var canvas=document.getElementById(canvasId);
				//canvas 的矩形框
				var canvasRect = canvas.getBoundingClientRect();
				
				//矩形框的左上角坐标
				var canvasLeft=canvasRect.left;
				var canvasTop=canvasRect.top;
				
				//动画坐标原点
				var sourceX=0;
				var sourceY=0;
				
				var layerIndex=layer;
				var layerName="layer";
				
				//鼠标点击按下事件，画图准备
				canvas.onmousedown=function(e){
					
					//设置画笔颜色和宽度
					var color=that.penColor;
					var width=that.penWidth;
					
					//设置原点坐标
					sourceX=e.clientX-canvasLeft;		
					sourceY=e.clientY-canvasTop;		
					
					//鼠标移动事件，画图
					canvas.onmousemove=function(e){
						
						layerIndex++;
						layer++;
						layerName+=layerIndex;
						//当前坐标
						var currX=e.clientX-canvasLeft;
						var currY=e.clientY-canvasTop;
						
						//画线
						$("#"+canvasId).drawLine({
						  layer:true,
						  name:layerName,
						  strokeStyle: color,
						  strokeWidth: width,
						  x1: sourceX, y1: sourceY,
						  x2: currX,
						  y2: currY
						});
						
						//设置原点坐标
						sourceX=currX;
						sourceY=currY;
					}
			}
				//鼠标没有按下了，画图结束
				canvas.onmouseup=function(e){
					$("#"+canvasId).drawLayers().saveCanvas();
					canvas.onmousemove=null;
				}
	   },
	   
	    /**
		 * 
		* @Title: drawRect 
		* @Description: 	自由画矩形
		* @param canvasId	canvasId
		* @param color	矩形颜色
		* @param strokeWidth		矩形线条宽度
		* @return    
		* @throws 
		*
		* @author 余冬冬
		* @date 2015年7月29日 下午7:57:21
		 */
	   drawRect:function(canvasId,penColor,strokeWidth){
		   var that=this;
		   that.penColor=penColor;
		   that.penWidth=strokeWidth;
		   
		   var canvas=document.getElementById(canvasId);
			var canvasRect = canvas.getBoundingClientRect();
			var canvasLeft=canvasRect.left;
			var canvasTop=canvasRect.top;
			
			var layerIndex=layer;
			var layerName="layer";
			var x=0;
			var y=0;
			
			canvas.onmousedown=function(e){
				var color=that.penColor;
				var penWidth=that.penWidth;
				
				layerIndex++;
				layer++;
				layerName+=layerIndex;
				x=e.clientX-canvasLeft;
				y=e.clientY-canvasTop;
				
				$("#"+canvasId).addLayer({
					type: 'rectangle',
					strokeStyle: color,
					strokeWidth: penWidth,
					 name:layerName,
					 fromCenter: false,
					 x: x, y: y,
					  width: 1,
					  height: 1
				});

				$("#"+canvasId).drawLayers();
				$("#"+canvasId).saveCanvas();
				canvas.onmousemove=function(e){
					width=e.clientX-canvasLeft-x;
					height=e.clientY-canvasTop-y;
					
					$("#"+canvasId).removeLayer(layerName);
					
					$("#"+canvasId).addLayer({
						type: 'rectangle',
						strokeStyle: color,
						strokeWidth: penWidth,
						 name:layerName,
						 fromCenter: false,
						 x: x, y: y,
						 width: width,
						 height: height
					});
					
					$("#"+canvasId).drawLayers();
			}
			}
			
			canvas.onmouseup=function(e){
			    var color=that.penColor;
			    var penWidth=that.penWidth;
				 
				canvas.onmousemove=null;
				
				width=e.clientX-canvasLeft-x;
				height=e.clientY-canvasTop-y;
				
				$("#"+canvasId).removeLayer(layerName);
				
				$("#"+canvasId).addLayer({
					type: 'rectangle',
					strokeStyle: color,
					strokeWidth: penWidth,
					 name:layerName,
					 fromCenter: false,
					 x: x, y: y,
					 width: width,
					 height: height
				});
				
				$("#"+canvasId).drawLayers();
				$("#"+canvasId).saveCanvas();
			}
	   },
	   
	   /**
		 * 
		* @Title: clearCanvas 
		* @Description: 	输入文字
		* @param canvasId	canvasId
		*
		* @author 余冬冬
		* @date 2015年8月1日 下午7:57:21
		 */
	   drawText:function(canvasId,color,strokeWidth,fontFamily){
		   var that=this;
		   layer++;
		   var layerIndex=layer;
		   var layerName="layer"+layerIndex;
		   var canvasDom=document.getElementById(canvasId);
		   
		   //清除鼠标事件的影响
		   canvasDom.onmousedown=null;
		   canvasDom.onmousemove=null;
		   canvasDom.onmouseup=null;
		   
		   $("#"+canvasId).drawText({
				   layer: true,
				   name:layerName,
				   draggable: true,
				  fillStyle: color,
				  strokeStyle: color,
				  strokeWidth: 1,
				  x: 150, y: 100,
				  fontSize: 30,
				  fontFamily: fontFamily,
				  text: '你好',
				  click:function(){
							   //监听按下删除键delete
							   document.onkeydown=function(e){
								   var keyCode=e.which;
								   console.info(keyCode);
								   if(keyCode==46){
								   	   console.info("????"+layerName);
									   $("#"+canvasId).removeLayer(layerName).drawLayers().saveCanvas();
									   document.onkeydown=null;
								   }
							   }
						   }
				});
		   
		  // var canvas=document.getElementById(canvasId);
		   //var canvasLeft=canvasRect.left;
		 //  var canvasTop=canvasRect.top;
		   
		   
		   
		  // that.drawRect(canvasId,'#292826',1);
		   
		 //文本框
		  //var inputDivHtml='<div id="div_input"  onblue="inputEnded()"  style="border:1px solid #999;position: fixed;left: 200px;top: 300px;width: 100px;" contenteditable="true"></div>';
		 // document.write(inputDivHtml);
		  // $("#"+canvasId).after(inputDivHtml);
		   
		 /*  $("#div_input").resizable({
				maxWidth:800, 
			maxHeight:600 
			});*/
		   
		   //鼠标单击
		  /*document.onmousedown=function(e){
			   //alert("鼠标单击");
			  //
			  //var rectLeft=200;
			  //var rectTop=300;
			  that.drawRect
		   }*/
		   
	   },
	   /**
		 * 
		* @Title: drawIcon 
		* @Description: 	画图标
		* @param canvasId	canvasId
		* @param path	图标路径（相对地址）
		* @param width	图标宽度
		* @param height	图标高度
		*  
		* @author 余冬冬
		* @date 2015年8月1日 下午7:57:21
		 */
	   drawIcon:function(canvasId,path,width,height){
		   var that=this;
		   layer++;
		   var layerIndex=layer;
		   var layerName="layer"+layerIndex;
		   var canvasDom=document.getElementById(canvasId);
		   
		   //清除鼠标事件的影响
		   canvasDom.onmousedown=null;
		   canvasDom.onmousemove=null;
		   canvasDom.onmouseup=null;
		   
		   $("#"+canvasId).drawImage({
			   layer: true,
			   name:layerName,
			   draggable: true,
			   source: path,
			   x: 150, y: 150,
			   width: 200, height: 125,
			   click:function(){
				   //监听按下删除键delete
				   document.onkeydown=function(e){
					   var keyCode=e.which;
					   console.info(keyCode);
					   //delete键
					   if(keyCode==46){
						   $("#"+canvasId).removeLayer(layerName).drawLayers().saveCanvas();
						   document.onkeydown=null;
					   }
					   //+=键
					   if(keyCode==187){
						   $("#"+canvasId).setLayer(layerName, {
							   rotate: '+=30',
							 })
							 .drawLayers()
							 .saveCanvas();
					   }
					   //-+键
					   if(keyCode==189){
						   $("#"+canvasId).setLayer(layerName, {
							   scale: '-=0.1',
							 })
							 .drawLayers()
							 .saveCanvas();
					   }
				   }
			   }
			 });
		   
	   },
	   /**
		 * 
		* @Title: drawDashed 
		* @Description: 	画虚线
		* @param canvasId	canvasId
		* @param penColor	画笔颜色
		* @param strokeWidth		画笔宽度
		*  
		* @author 余冬冬
		* @date 2015年8月1日 下午7:57:21
		 */
	   drawDashed:function(canvasId,penColor,strokeWidth){
		   var that=this;
		   that.penColor=penColor;
		   that.penWidth=strokeWidth;
		   
		   var canvas=document.getElementById(canvasId);
			var canvasRect = canvas.getBoundingClientRect();
			var canvasLeft=canvasRect.left;
			var canvasTop=canvasRect.top;
			
			var layerIndex=layer;
			var layerName="layer";
			var sourceX=0;
			var sourceY=0;
			
			canvas.onmousedown=function(e){
				var color=that.penColor;
				var penWidth=that.penWidth;
				
				layerIndex++;
				layer++;
				layerName+=layerIndex;
				sourceX=e.clientX-canvasLeft;
				sourceY=e.clientY-canvasTop;
				
				canvas.onmousemove=function(e){
					
					var currX=e.clientX-canvasLeft;
					var currY=e.clientY-canvasTop;
					
					$("#"+canvasId).removeLayer(layerName);
					
					$("#"+canvasId).drawLine({
						layer:true,
						name:layerName,
						strokeStyle: color,
						strokeWidth: penWidth,
						 name:layerName,
						 fromCenter: false,
						 x1: sourceX, y1: sourceY,
						 x2:currX,y2:currY,
						 strokeDash: [5],
						 strokeDashOffset: 0,
					});
					
					$("#"+canvasId).drawLayers()
					.saveCanvas();
			}
			}
			
			canvas.onmouseup=function(e){
			    var color=that.penColor;
			    var penWidth=that.penWidth;
				 
				canvas.onmousemove=null;
				
				$("#"+canvasId).removeLayer(layerName);
				
				var currX=e.clientX-canvasLeft;
				var currY=e.clientY-canvasTop;
				
				$("#"+canvasId).removeLayer(layerName);
				
				$("#"+canvasId).drawLine({
					layer:true,
					name:layerName,
					strokeStyle: color,
					strokeWidth: penWidth,
					 name:layerName,
					 fromCenter: false,
					 x1: sourceX, y1: sourceY,
					 x2:currX,y2:currY,
					 strokeDash: [5],
					 strokeDashOffset: 0,
				});
				
				$("#"+canvasId).drawLayers();
				$("#"+canvasId).saveCanvas();
			}
	   },
	   /**
		 * 
		* @Title: drawEllipse 
		* @Description: 	画椭圆
		* @param canvasId	canvasId
		* @param penColor	画笔颜色
		* @param strokeWidth		画笔宽度
		*  
		* @author 余冬冬
		* @date 2015年8月1日 下午7:57:21
		 */
	   drawEllipse:function(canvasId,penColor,strokeWidth){
		   var that=this;
		   that.penColor=penColor;
		   that.penWidth=strokeWidth;
		   
		   var canvas=document.getElementById(canvasId);
			var canvasRect = canvas.getBoundingClientRect();
			var canvasLeft=canvasRect.left;
			var canvasTop=canvasRect.top;
			
			var layerIndex=layer;
			var layerName="layer";
			var x=0;
			var y=0;
			
			canvas.onmousedown=function(e){
				var color=that.penColor;
				var penWidth=that.penWidth;
				
				layerIndex++;
				layer++;
				layerName+=layerIndex;
				x=e.clientX-canvasLeft;
				y=e.clientY-canvasTop;
				
				$("#"+canvasId).addLayer({
					type: 'ellipse',
					strokeStyle: color,
					strokeWidth: penWidth,
					 name:layerName,
					 fromCenter: false,
					 x: x, y: y,
					  width: 1,
					  height: 1
				});
				
				$("#"+canvasId).drawLayers();
				$("#"+canvasId).saveCanvas();
				canvas.onmousemove=function(e){
					width=e.clientX-canvasLeft-x;
					height=e.clientY-canvasTop-y;
					
					$("#"+canvasId).removeLayer(layerName);
					
					$("#"+canvasId).addLayer({
						type: 'ellipse',
						strokeStyle: color,
						strokeWidth: penWidth,
						 name:layerName,
						 fromCenter: false,
						 x: x, y: y,
						 width: width,
						 height: height
					});
					
					$("#"+canvasId).drawLayers();
					//$("#"+canvasId).saveCanvas();
			}
			}
			
			canvas.onmouseup=function(e){
			    var color=that.penColor;
			    var penWidth=that.penWidth;
				 
				canvas.onmousemove=null;
				
				width=e.clientX-canvasLeft-x;
				height=e.clientY-canvasTop-y;
				
				$("#"+canvasId).removeLayer(layerName);
				
				$("#"+canvasId).addLayer({
					type: 'ellipse',
					strokeStyle: color,
					strokeWidth: penWidth,
					 name:layerName,
					 fromCenter: false,
					 x: x, y: y,
					 width: width,
					 height: height
				});
				
				$("#"+canvasId).drawLayers();
				//$("#"+canvasId).saveCanvas();
			}
	   },
	   /**
		 * 
		* @Title: clearCanvas 
		* @Description: 	重画
		* @param canvasId	canvasId
		*
		* @author 余冬冬
		* @date 2015年8月1日 下午7:57:21
		 */
	   clearCanvas:function(canvasId){
		   $("#"+canvasId).removeLayers();
			$("#"+canvasId).clearCanvas();
	   },
	   
	   /**
		 * 
		* @Title: setPenColor 
		* @Description: 	设置画笔颜色
		* @param penColor	画笔颜色（#FFFFFF形式的RGB数值）
		*
		* @author 余冬冬
		* @date 2015年8月2日 下午7:57:21
		 */
	   setPenColor:function(penColor){
		   this.penColor=penColor;
	   },
	   
	   /**
		 * 
		* @Title: setPenWidth 
		* @Description: 	设置画笔颜色
		* @param width	画笔宽度
		*
		* @author 余冬冬
		* @date 2015年8月2日 下午7:57:21
		 */
	   setPenWidth:function(width){
		   this.penWidth=width;
	   }
	}
})();




