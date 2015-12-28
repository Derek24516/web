package com.demo.annotation;

import java.lang.annotation.Inherited;

@Inherited
public @interface Greeting {
	public enum FontColor{BLUE,RED,GREEN};
	
	String name();
	
	FontColor fontContColor() default FontColor.GREEN;
}
