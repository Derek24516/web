package com.demo.thinkinjava.generics;

public abstract class Test<C> {
	String name ;
	
	public Test(){
		
	}
	
	public Test(String name){
		this.name = name;
	}
	
	abstract int test(C container ,TestParam tp);

}
