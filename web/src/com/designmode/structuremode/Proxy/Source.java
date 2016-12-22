package com.designmode.structuremode.Proxy;

import com.designmode.structuremode.decorator.Sourceable;

public class Source implements Sourceable {

	@Override
	public void method() {
		System.out.println("This is original method!");
	}

}
