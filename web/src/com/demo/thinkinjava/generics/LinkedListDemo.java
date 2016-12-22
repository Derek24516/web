package com.demo.thinkinjava.generics;

import java.util.LinkedList;

/**
 * LinkedListDemo
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年12月1日
 * @version	 v0.1.0
 * 
 */
public class LinkedListDemo {

	public static void main(String[] args) {
		asStack();
	}
	
	/**
	 * LinkedList作为栈使用
	 *
	 * 
	 * @author	    余冬冬
	 * @data 	 2016年12月1日
	 * @version	 v0.1.0
	 *
	 */
	public static void asStack(){
		LinkedList<String> stack = new LinkedList<String>();
		stack.addFirst("1");
		stack.addFirst("2");
		stack.addFirst("3");
		stack.addFirst("4");
		stack.addFirst("5");
		System.out.println(stack);
		
		//peek、peekFirst；poll、pollFirst等等是没有区别的，主要是因为LinkedList即继承了Dqueue和Queue两个接口，peek是Queue接口中方法，peekFirst是Dqueue中方法
		
		System.out.println("peek:" + stack.peek());
		System.out.println(stack);
		
		System.out.println("peekFirst:" + stack.peekFirst());
		System.out.println(stack);
		
		System.out.println("peekLast:" + stack.peekLast());
		System.out.println(stack);
		
		System.out.println("poll:" + stack.poll());
		System.out.println(stack);
		
		System.out.println("pollLast:" + stack.pollLast());
		System.out.println(stack);
		
		System.out.println("getFirst:" + stack.getFirst());
		System.out.println(stack);
	}
}
