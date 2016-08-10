package com.demo.thinkInJava.initialization;


/**
 * 类的初始化顺序
 *
 * 
 * @autor	    余冬冬
 * @data 	 2016年7月21日
 * @version	 v0.1.0
 * 
 */
public class OrderOfinitialization {

	public static void main(String[] args) {
		// s1 - 3- 2 说明静态域的初始化其实静态变量和方法快（仅执行一次）是按加载时的代码顺序来的
		int i = House.i;
		
		 //	注释上行代码，仅执行该行代码，说明静态域在成员变量之前初始化
		House h1 = new House();
		//	运行3行代码，说明静态域仅初始化一次，而成员变量每次new都执行一次
		House h2 = new House();
	}

}

class Window{
	public Window(String note) {
		System.out.println("init" + note);
	}
}

class House{
	static Window s1 = new Window("s1");
	Window w1 = new Window("w1");
	
	public House() {
		System.out.println("house");
	}
	{
		Window w3 = new Window("w3");
	}
	static{
		Window s3 = new Window("s3");
	}
	
	Window w2 = new Window("w2");
	static Window s2 = new Window("s2");
	
	public static int i ;
}
