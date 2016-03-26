package com.DesignMode.behavior.observer;

public class MySubject extends AbstractSubject {
	@Override
	public void operation() {
		System.out.println("update self !");
		super.operation();
	}
}
