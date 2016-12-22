package com.designmode.createMode.mode3;

public class MyClassOne implements MyInterface {

	@Override
	public void print() {
		System.out.println(this.getClass().getName());
	}
}
