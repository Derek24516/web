package com.DesignMode.behavior.visitor;

public class ConcreteElement2 extends Element {

	@Override
	public void accept(IVisitor visitor) {
		visitor.visit(this);
	}

	@Override
	public void doSomething() {
		System.out.println("This is element2");
	}

}
