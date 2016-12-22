package com.demo.thinkinjava.enumerate;

import java.util.Random;

public class Enums {
	
	enum Color{
		Red,
		
		Blue,
		
		Black;
	}
	
	private static Random rand = new Random(47);
	
	public static <T extends Enum<T>> T random(Class<T> ec){
		return random(ec.getEnumConstants());
	}
	
	public static <T> T random(T[] values){
		return values[rand.nextInt(values.length)];
	}
	
	public static void main(String[] args) {
		System.out.println(random(Color.values()));
		//System.out.println(random(Color));
	}

}
