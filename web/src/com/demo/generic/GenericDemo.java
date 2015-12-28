package com.demo.generic;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @description	Java泛型类、方法的一些用法
 * @date		2015-12-28
 *
 */
public class GenericDemo {

	public static void main(String[] args) {
		testList();
		
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
		//	以下代码却在编译时不通过(以为45可能会和46有区别，没想到都是编译不通过T_T)
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
	
	public void testGenericMethod(){
		
	}

	public static <T extends Runnable> void startThread(T t){
		
	} 
}
