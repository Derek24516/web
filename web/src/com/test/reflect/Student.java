package com.test.reflect;

import java.util.List;

public class Student {
	private String name;

	public Student(String name) {
		this.name = name;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return	"name:" + this.name; 
	}
	
	public void say(List<String> strs){
		for (String string : strs) {
			System.out.println(string);
		}
	}
}
