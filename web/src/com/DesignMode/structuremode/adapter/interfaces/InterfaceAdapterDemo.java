package com.DesignMode.structuremode.adapter.interfaces;

/**
 * 适配器模式三：接口的适配器模式
 * 
 * 有时我们写的一个接口中，有很多个抽象方法（HugeInterface），当我们写该接口的实现类的时候，就必须实现该接口的所有方法，
 * 但如果实际上我们只要其中的几个方法（例如重构中的监听接口，我们可能只需要写其中某些方法），这样就比较浪费。
 * 接口的适配器模式就是解决该问题的：写一个抽象类（AbstractClass）继承该接口，实现其所有方法，而我们不和原始的接口打交道，
 * 只继承该抽象类，这样只需要重写我们需要的方法就可以了
 * 
 * @date		2016-1-
 * 
 */
public class InterfaceAdapterDemo {

	public static void main(String[] args) {
		HugeInterface hugeInterface = new ClassOne();
		hugeInterface.method1();
	}

}
