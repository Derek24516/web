package com.DesignMode.behavior.mediator;

public class ColleagueB extends AbstractColleague {

	public ColleagueB(AbstractMediator mediator) {
		super(mediator);
	}

	@Override
	public void self() {
		System.out.println("B-做好自己分内的事");
	}

	@Override
	public void out() {
		System.out.println("B-与其他某同时沟通");
	}
}
