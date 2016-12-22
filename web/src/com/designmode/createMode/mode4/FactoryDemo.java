package com.designmode.createMode.mode4;

/**
 * 抽象工厂模式
 * 之前的几个工厂模式，有一个问题就是，类的创建依赖于工厂类，这样一旦增加新的功能，必须对工厂类进行修改，
 * 这违背了闭包原则。
 * 
 * 抽象工厂类，创建多个工厂类，这样一旦需要增加新的功能，直接增加新的工厂类就可以了，不需要修改之前的代码
 * 
 * @date		2016-3-16
 * 
 */
public class FactoryDemo {

	public static void main(String[] args) {
		try {
			Provider provider = new MyfactoryOne();
			MyInterface myinterface1 = provider.produce();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
