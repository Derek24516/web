package com.demo.reflect;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class ReflectDemo {

	public static void main(String[] args)  {
		try {
			//testSetPropertity();
			
			testGetClassInfo();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	
	/**
	 * 
	 * @description	利用反射设置类的属性
	 * @param		void
	 * @exception	IntrospectionException
	 * @exception	IllegalAccessException
	 * @exception	IllegalArgumentException
	 * @exception	InvocationTargetException
	 * @return 		void
	 * @date		2015-12-28
	 *
	 */
	public static void  testSetPropertity() throws IntrospectionException, IllegalAccessException, IllegalArgumentException, InvocationTargetException{
		//	TODO 标明具体的异常信息
		String name = "hello";
		Student s = new Student(name);
		
		String propertityName = "name";
		PropertyDescriptor pDesr = new PropertyDescriptor(propertityName, s.getClass());
		
		//	set方法
		Method mSet = pDesr.getWriteMethod();
		mSet.invoke(s, "232");
		System.out.println(s);
		
		//	get方法
		s.setName("111");
		Method mGet = pDesr.getReadMethod();
		System.out.println(mGet.invoke(s));
		
	}
	
	/**
	 * 
	 * @description	使用反射获取类名、包名的一些信息
	 * @param		void
	 * @exception	ClassNotFoundException
	 * @return 		void
	 * @throws IllegalAccessException 
	 * @throws InstantiationException 
	 * @date		2015-12-28
	 *
	 */
	public static void testGetClassInfo() throws ClassNotFoundException, InstantiationException, IllegalAccessException{
		Class<?> clz = null;
		clz = Class.forName("com.demo.reflect.Student");
		
		//获得一个对象的完整包名+类名
		System.out.println("Student.class.getName()-------" + Student.class.getName());
		System.out.println("Student.class-------" + Student.class);
		//获得一个对象的完整包名
		System.out.println("Student.class.getPackage()-------" + Student.class.getPackage());
		
		//用反射来初始化一个Stude对象
		clz=Class.forName("com.pojo.Student");
		Student s=(Student)(clz.newInstance());
		s.setAge(10);
		s.setName("Tom");
		System.out.println(s);
	}
	
	public static void testGenericMethod(){
		
	}
	
	public static <T extends Student> void genericMethod(Class<T> s){
		
	}
}
