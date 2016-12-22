package com.demo.thinkinjava.typeinfo;

public class BoundedClassReference{
	public static void main(String[] args){
		Class<? extends Number> bounded = int.class;
		bounded = double.class;
		bounded = Number.class;
	}
}
