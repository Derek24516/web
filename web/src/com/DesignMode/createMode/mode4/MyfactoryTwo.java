package com.DesignMode.createMode.mode4;

public class MyfactoryTwo implements Provider {

	@Override
	public MyInterface produce() {
		return new MyClassTwo();
	}

}
