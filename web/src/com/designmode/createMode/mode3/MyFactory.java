package com.designmode.createMode.mode3;

public class MyFactory {
	public static MyInterface produceOne() {
		return new MyClassOne();
	}
	public static  MyInterface produceTwo() {
		return new MyClassTwo();
	}
}	
