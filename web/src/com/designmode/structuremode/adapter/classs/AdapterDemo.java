package com.designmode.structuremode.adapter.classs;

/**
 * 适配器模式的作用：将某个类的接口转换成客户端的另一个接口表示，消除接口不匹配所造成的类的兼容性问题
 * 
 * 适配器模式一：类的适配器模式
 * 在该例中，Source类中有一个方法待适配，目标接口是Targetable，通过Adapter类，将Source的功能扩展到Targetable中
 * 
 */
public class AdapterDemo {

	public static void main(String[] args) {
		Targetable target = new AdapterClass();
		
		target.method1();
		target.method2();
	}

}
