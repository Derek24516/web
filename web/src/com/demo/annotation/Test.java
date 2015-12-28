package com.demo.annotation;

import java.lang.reflect.Field;

@Table
public class Test {
	public static void main(String[] args) {
		testAnnotation();
	}

	
	public static void testAnnotation(){
		String fruitName = "水果名称：";
		String fruitColor = "水果颜色";
		String fruitProvider = "水果供应商";
		
		Apple apple = new Apple();
		
		//	getDeclaredFields 与get
		Field[] fields = apple.getClass().getDeclaredFields();
		for (Field field : fields) {
			if(field.isAnnotationPresent(FruitName.class)){
				//	获取属性的注解
				FruitName fruitNameAnnotion = field.getAnnotation(FruitName.class);
				//	获取注解的值
				fruitName += fruitNameAnnotion.value();
				System.out.println(fruitName);
			}
			if(field.isAnnotationPresent(FruitColor.class)){
				FruitColor fruitColorAnnotation = field.getAnnotation(FruitColor.class);
				fruitColor += fruitColorAnnotation.fruitColor().name();
				System.out.println(fruitColor);
			}
		}
	}
}
