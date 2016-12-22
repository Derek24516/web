package com.designmode.behavior.mediator;

public class ColleagueA extends AbstractColleague {

	public ColleagueA(AbstractMediator mediator) {
		super(mediator);
	}

	@Override
	public void self() {
		System.out.println("A-做好自己分内的事");
	}

	@Override
	public void out() {
		System.out.println("A-与其他某同时沟通");
	}
	
}
