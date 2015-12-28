package com.demo.annotation;

import com.demo.annotation.FruitColor.Color;

public class Apple {
	@FruitName("Apple")
	private String appleName ;
	
	@FruitColor(fruitColor = Color.RED)
	private String appleColor;

	public String getAppleName() {
		return appleName;
	}

	public void setAppleName(String appleName) {
		this.appleName = appleName;
	}

	public String getAppleColor() {
		return appleColor;
	}

	public void setAppleColor(String appleColor) {
		this.appleColor = appleColor;
	}
	
	public void displayName(){
		System.out.println("水果的名字是：苹果");
	}
}
