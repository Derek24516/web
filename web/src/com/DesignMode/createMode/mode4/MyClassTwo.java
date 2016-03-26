package com.DesignMode.createMode.mode4;

public class MyClassTwo implements MyInterface {

	@Override
	public void print() {
		System.out.println(this.getClass().getName());
	}
}
