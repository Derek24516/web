package com.designmode.createMode.mode4;

public class MyClassOne implements MyInterface {

	@Override
	public void print() {
		System.out.println(this.getClass().getName());
	}
}
