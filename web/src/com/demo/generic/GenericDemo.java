package com.demo.generic;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

/**
 * 
 * @description	Java泛型类、方法的一些用法
 * @date		2015-12-28
 *
 */
public class GenericDemo {

	public static void main(String[] args) {
		//testList();
		
		//testCollectionOperation();
		
		//testCopy();
		
		//HashSet自定义去重Demo
		//testHashSet();
		
	}
	
	/**
	 * 
	 * @description	一个List比较有趣的例子
	 * @return 		void
	 * @date		2015-12-28
	 *
	 */
	public static void testList(){
		//	以下代码编译不会出错，但是运行会报错
		//	java.lang.ClassCastException: java.lang.Integer cannot be cast to java.lang.String
		List list = new ArrayList();
		list.add("2323");
		list.add("2323aaa");
		list.add(32);
		
		for (int i = 0; i < list.size(); i++) {
			String s = (String) list.get(i);
			System.out.println(s);
		}
		
		//	好，那我们换一种方式
		//	以下代码却在编译时不通过(以为45行可能会和46有区别，没想到都是编译不通过T_T)
		/*List<String> list = new ArrayList();
		Integer in = new Integer(44);
		list.add("2323");
		list.add("2323aaa");
		list.add(in);
		list.add(32);
		
		for (int i = 0; i < list.size(); i++) {
			String s = (String) list.get(i);
			System.out.println(s);
		}*/
	}
	
	/**
	 * 集合运算Demo 交集、差集、合集、并集
	 * 
	 * @return 		void
	 * @date		2016-1-29
	 *
	 */
	public static void testCollectionOperation(){
		List<String> list1 = new ArrayList<String>();
		list1.add("A");
		list1.add("B");
		list1.add("D");
		
		List<String> list2 = new ArrayList<String>();
		list2.add("A");
		list2.add("C");
		list2.add("E");

		//list1.retainAll(list2);		//	交集：A
		//list1.addAll(list2);			//	合集：A B D A C E
		list1.removeAll(list2);			//	差集：B D
		
		System.out.println(list1);
		System.out.println(list2);
	}
	
	
	public static void testCopy(){
		List<Student> stus1 = new ArrayList<Student>();
		Student s1 = new Student();
		Course c1 = new Course();
		c1.setCourseName("Math");
		c1.setScores(100);
		s1.getCourse().add(c1);
		
		stus1.add(s1);
		
		System.out.println(stus1);
		
		List<Student> stus2 = new ArrayList<Student>();
		Collections.copy(stus2, stus1);
		c1.setScores(90);
		
		System.out.println(stus1);
		System.out.println(stus2);
	}

	/**
	 * HashSet Demo，用HashSet自定义去重的时候，要同时重写对象中的equals和hashCode方法
	 * 
	 * @return 		void
	 * @date		2016-4-15
	 *
	 */
	public static void testHashSet(){
		Student s1 = new Student();
		Student s2 = new Student();
		
		s1.setId("s1");
		s2.setId("s1");
		
		HashSet<Student> set = new HashSet<Student>();
		set.add(s1);
		set.add(s2);
		
		System.out.println(set);
	}
}
