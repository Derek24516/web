package com.designmode.createMode.mode2;

/**
 * 多个工厂方法模式：提供多个工厂方法，分别创建对象
 * 
 * @date		2016-3-16
 * 
 */
public class FactoryDemo {

	public static void main(String[] args) {
		try {
			MyFactory f = new MyFactory();
			MyInterface inter = f.produceOne();
			inter.print();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
