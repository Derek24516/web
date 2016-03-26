package com.DesignMode.behavior.mediator;

import java.util.Hashtable;

public abstract class AbstractMediator {
	protected Hashtable<String, AbstractColleague> colleagues = new Hashtable<String, AbstractColleague>();
	
	public void addColleague(String name,AbstractColleague c){
		this.colleagues.put(name, c);
	}
	
	public void deleteColleague(String name){
		this.colleagues.remove(name);
	}
	
	public abstract void execute(String name,String method);
}
