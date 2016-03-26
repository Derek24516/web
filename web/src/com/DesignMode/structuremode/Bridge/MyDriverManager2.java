package com.DesignMode.structuremode.Bridge;

public class MyDriverManager2 extends AbstractDriverManager {
	@Override
	public void connect() {
		System.out.println("before connect!");
		super.connect();
		System.out.println("after connect!");
	}
}
