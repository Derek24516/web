package com.DesignMode.createMode.mode2;

/**
 * 
 * 多个工厂方法模式
 * 
 * 提供多个工厂方法，分别创建对象
 * 
 * @date		2016-3-16
 *
 */
public class MyFactory {
	public MyInterface produceOne() {
		return new MyClassOne();
	}
	public MyInterface produceTwo() {
		return new MyClassTwo();
	}
}	
