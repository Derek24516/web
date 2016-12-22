package com.demo.spring.beans;


public class SpringBean implements ISpringBean{

	@Override
	public void greet() {
		System.out.println("Hello!");
	}
}
