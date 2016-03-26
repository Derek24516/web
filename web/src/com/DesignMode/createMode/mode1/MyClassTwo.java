package com.DesignMode.createMode.mode1;

public class MyClassTwo implements MyInterface {

	@Override
	public void print() {
		System.out.println(this.getClass().getName());
	}
}
