package com.designmode.behavior.handlechain;

/**
 * 责任链模式：多个对象，每个对象持有下一个对象的引用，这样就会形成一条链，请求在这条链上传递，直到某一对象决定处理该请求，但是发出者不清楚究竟哪个对象会处理该请求。
 * 
 * 另：链接上的请求，可以是一条链，也可以是一个环，可自行实现；同时，在一个时刻，只允许一个对象传递给另外一个对象，不允许传递给多个对象
 * 
 * @date		2016-1-
 * 
 */
public class HandleDemo {

	public static void main(String[] args) {
		MyHandle h1 = new MyHandle("h1");
		MyHandle h2 = new MyHandle("h2");
		MyHandle h3 = new MyHandle("h3");
		
		h1.setHandle(h2);
		h2.setHandle(h3);
		//	下面这句代码，就会形成闭环，死循环导致内存溢出了
		//h3.setHandle(h1);
		h1.operator();
	}

}
