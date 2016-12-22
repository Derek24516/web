package com.designmode.createMode.mode5;

public class PersonDirector {
	public Person constructPerson(PersonBuilder pb){
		pb.buildHead();
		pb.buildBody();
		return pb.buildPerson();
	}
}
