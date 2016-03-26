package com.DesignMode.behavior.status;

public class State {
	private String value;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	public void method1(){
		System.out.println(Thread.currentThread().getStackTrace()[1].getMethodName());
	}
	
	public void method2(){
		System.out.println(Thread.currentThread().getStackTrace()[1].getMethodName());
	}
}
