package com.DesignMode.createMode.mode2;

public class MyClassOne implements MyInterface {

	@Override
	public void print() {
		System.out.println(this.getClass().getName());
	}
}
