package com.designmode.structuremode.adapter.interfaces;

public class ClassOne extends AbstractClass {
	@Override
	public void method1() {
		System.out.println("只需要方法1，重写该方法即可");
		super.method1();
	}
}
