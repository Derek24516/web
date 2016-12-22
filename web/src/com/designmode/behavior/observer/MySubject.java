package com.designmode.behavior.observer;

public class MySubject extends AbstractSubject {
	@Override
	public void operation() {
		System.out.println("update self !");
		super.operation();
	}
}
