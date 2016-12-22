package com.designmode.createMode.mode3;

/**
 * 静态工厂方法模式：将多工厂方法模式中的方法设置为静态的，不需要创建实例，直接调用即可
 * 
 * @date		2016-3-16
 * 
 */
public class FactoryDemo {

	public static void main(String[] args) {
		try {
			MyInterface inter = MyFactory.produceOne();
			MyInterface classTwo = MyFactory.produceTwo();
			
			inter.print();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
