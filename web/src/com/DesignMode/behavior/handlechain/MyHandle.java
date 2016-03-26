package com.DesignMode.behavior.handlechain;

public class MyHandle extends AbstractHandle implements Handle{

	private String name;
	
	public MyHandle(String name){
		this.name = name;
	}
	
	@Override
	public void operator() {
		System.out.println(name + "deal!");
		if(getHandle() != null){
			getHandle().operator();
		}
	}

}
