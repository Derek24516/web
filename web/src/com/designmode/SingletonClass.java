package com.designmode;

/**
 * 最好的Java的单例的实现模式
 * @author Administrator
 *
 */
public class SingletonClass {
	private SingletonClass() {
		// TODO Auto-generated constructor stub
	}
	
	/***
	 * 静态内部类
	 * @author Administrator
	 *
	 */
	private static class SingletonClassInstance{
		/* 静态属性，final让intance指向内存固定的区域 */
		/* JSL规范定义，类的构造必须是原子性的，非并发的，因此不需要加同步块。同样，由于这个构造是并发的，所以getInstance()也并不需要加同步。  */
		private static final SingletonClass instance = new SingletonClass(); 
	}
	
	public static SingletonClass getInstance(){
		return SingletonClassInstance.instance;
	}
}
