package com.DesignMode.createMode.mode4;

public class MyfactoryOne implements Provider {

	@Override
	public MyInterface produce() {
		return new MyClassOne();
	}

}
