<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>draw demo</title>
<%@include file = "header.jsp" %>
<style type="text/css">
		.products{
			list-style:none;
			margin-right:300px;
			padding:0px;
			height:100%;
		}
		.products li{
			display:inline;
			float:left;
			margin:10px;
		}
		.item{
			display:block;
			text-decoration:none;
		}
		.item img{
			border:1px solid #333;
		}
		.item p{
			margin:0;
			font-weight:bold;
			text-align:center;
			color:#c3c3c3;
		}
		.cart{
			position:fixed;
			right:0;
			top:0;
			width:300px;
			height:100%;
			background:#ccc;
			padding:0px 10px;
		}
		h1{
			text-align:center;
			color:#555;
		}
		h2{
			position:absolute;
			font-size:16px;
			left:10px;
			bottom:20px;
			color:#555;
		}
		.total{
			margin:0;
			text-align:right;
			padding-right:20px;
		}
	</style>
</head>
<body style="margin:0;padding:0;height:100%;background:#fafafa;">
	<ul class="products">
		<li>
			<a href="#" class="item">
				<img src="../../images/demo/easyui/shirt1.gif"/>
				<div>
					<p>Balloon</p>
					<p>Price:$25</p>
				</div>
			</a>
		</li>
		<li>
			<a href="#" class="item">
				<img src="../../images/demo/easyui/shirt2.gif"/>
				<div>
					<p>Feeling</p>
					<p>Price:$25</p>
				</div>
			</a>
		</li>
		<li>
			<a href="#" class="item">
				<img src="../../images/demo/easyui/shirt3.gif"/>
				<div>
					<p>Elephant</p>
					<p>Price:$25</p>
				</div>
			</a>
		</li>
		<li>
			<a href="#" class="item">
				<img src="../../images/demo/easyui/shirt4.gif"/>
				<div>
					<p>Stamps</p>
					<p>Price:$25</p>
				</div>
			</a>
		</li>
		<li>
			<a href="#" class="item">
				<img src="../../images/demo/easyui/shirt5.gif"/>
				<div>
					<p>Monogram</p>
					<p>Price:$25</p>
				</div>
			</a>
		</li>
		<li>
			<a href="#" class="item">
				<img src="../../images/demo/easyui/shirt6.gif"/>
				<div>
					<p>Rolling</p>
					<p>Price:$25</p>
				</div>
			</a>
		</li>
	</ul>
	<div class="cart">
		<h1>Shopping Cart</h1>
		<div style="background:#fff">
		<table id="cartcontent" fitColumns="true" style="width:300px;height:auto;">
			<thead>
				<tr>
					<th field="name" width=140>Name</th>
					<th field="quantity" width=60 align="right">Quantity</th>
					<th field="price" width=60 align="right">Price</th>
				</tr>
			</thead>
		</table>
		</div>
		<p class="total">Total: $0</p>
		<h2>Drop here to add to cart</h2>
	</div>
</body>
<script>
		var data = {"total":0,"rows":[]};
		var totalCost = 0;
		
		$(function(){
			$('#cartcontent').datagrid({
				singleSelect:true
			});
			//	revert 拖动停止时将返回起始位置
			$('.item').draggable({
				revert:true,
				proxy:'clone',
				onStartDrag:function(){
					$(this).draggable('options').cursor = 'not-allowed';
					$(this).draggable('proxy').css('z-index',10);
				},
				onStopDrag:function(){
					$(this).draggable('options').cursor='move';
				}
			});
			$('.cart').droppable({
				onDragEnter:function(e,source){
					$(source).draggable('options').cursor='auto';
				},
				onDragLeave:function(e,source){
					$(source).draggable('options').cursor='not-allowed';
				},
				onDrop:function(e,source){
					var name = $(source).find('p:eq(0)').html();
					var price = $(source).find('p:eq(1)').html();
					addProduct(name, parseFloat(price.split('$')[1]));
				}
			});
		});
		
		function addProduct(name,price){
			function add(){
				for(var i=0; i<data.total; i++){
					var row = data.rows[i];
					if (row.name == name){
						row.quantity += 1;
						return;
					}
				}
				data.total += 1;
				data.rows.push({
					name:name,
					quantity:1,
					price:price
				});
			}
			add();
			totalCost += price;
			$('#cartcontent').datagrid('loadData', data);
			$('div.cart .total').html('Total: $'+totalCost);
		}
	</script>
<script type="text/javascript">
	//	dom树加载完毕时
	$(document).ready(function(){
		$('#d1').draggable({ 
			handle:'#title' 
			}); 
		$('#d2').draggable({ 
			handle:'#title2' 
			}); 
		$('#dd').droppable({ 
			accept:'#d1,#d3' 
		});  
		
	});
</script>
</html>
