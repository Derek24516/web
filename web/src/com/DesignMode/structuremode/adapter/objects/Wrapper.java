package com.DesignMode.structuremode.adapter.objects;

public class Wrapper implements Targetable {
	private Source source;
	
	public Wrapper(Source source){
		this.source = source;
	}

	@Override
	public void method1() {
		source.method1();
	}

	@Override
	public void method2() {
		System.out.println(Thread.currentThread().getStackTrace()[1].getMethodName());
	}

}
