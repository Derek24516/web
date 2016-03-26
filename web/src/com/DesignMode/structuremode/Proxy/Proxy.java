package com.DesignMode.structuremode.Proxy;


public class Proxy implements Sourceable {
	private Source source;

	public Proxy() {
		this.source = new Source();
	}
	
	@Override
	public void method() {
		beforeMethod();
		
		source.method();
		
		afterMethod();
	}
	
	public void beforeMethod(){
		System.out.println("Before proxy!");
	}
	
	public void afterMethod(){
		System.out.println("After proxy!");
	}

}
