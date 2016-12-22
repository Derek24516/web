package com.designmode.createMode.mode1;

/**
 * 简单工厂模式
 * 
 * @date		2016-3-16
 * 
 */
public class FactoryDemo {

	public static void main(String[] args) {
		try {
			MyFactory f = new MyFactory();
			MyInterface inter = f.produce("One");
			inter.print();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
