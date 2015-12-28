package com.test.reflect;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Test {

	public static void main(String[] args) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, IntrospectionException {
		// TODO Auto-generated method stub
		String name = "name";
		Student s = new Student(name);
		
		s.setName(name);
		setPro(s, name);
	}
	
	public static void setPro(Student s ,String proName) throws IntrospectionException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		//属性名
		//TODO s.getClass() 与 Student.class有什么区别？
		//2、内省机制的其他知识
		PropertyDescriptor pDesr = new PropertyDescriptor(proName, s.getClass());
		Method mSet = pDesr.getWriteMethod();
		mSet.invoke(s, "232");
		System.out.println(s);
	}
}
