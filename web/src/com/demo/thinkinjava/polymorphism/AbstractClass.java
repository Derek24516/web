package com.demo.thinkinjava.polymorphism;

/**
 * 抽象类和接口的区别
 *
 * @see 	 内部抽象类和内部接口的区别
 * @author	    余冬冬
 * @data 	 2016年11月26日
 * @version	 v0.1.0
 * 
 */
public abstract class AbstractClass {
	/**
	 * 
	 */
	public static int staticV = 0;
	public static final int fstaticV = 0;
	public int nStaticV = 0;
	private int nPrivateV = 1;
	
	
	public static  void staticMethod(){
		System.out.println("test");
	}
	
	public void nStaticMethod(){
		System.out.println("test");
	}
	
	public abstract void abstarctMethod();
}
