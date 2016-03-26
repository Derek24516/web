package com.DesignMode.structuremode.Proxy;

import com.DesignMode.structuremode.decorator.Sourceable;

public class Source implements Sourceable {

	@Override
	public void method() {
		System.out.println("This is original method!");
	}

}
