package com.designmode.structuremode.decorator;

public class Source implements Sourceable {

	@Override
	public void method() {
		System.out.println(this.getClass().getClass() + "," +Thread.currentThread().getStackTrace()[1].getMethodName());
	}

}
