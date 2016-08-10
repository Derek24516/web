package com.demo.generic;

/**
 * Char的一些用法
 * 
 * @date		2016-1-
 * 
 */
public class BoundedClassReferences {
	public static void main(String[] args){
		//	? 加通配符结合，创建一个范围
		Class<? extends Number> bounded = int.class;
		bounded = double.class;
		bounded = Number.class;
	}
}
