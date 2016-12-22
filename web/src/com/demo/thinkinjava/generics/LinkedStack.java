package com.demo.thinkinjava.generics;

import java.util.Arrays;

/**
 * 一个有序的栈的实现
 * 
 *
 * @author	    余冬冬
 * @data 	 2016年10月27日
 * @version	 v0.1.0
 *
 */
public class LinkedStack<T> {
	private static class Node<T>{
		T item ;
		Node<T> next;
		
		public Node() {
			this.item = null;
			this.next = null;
		}
		
		public Node(T item,Node<T> next){
			this.item = item;
			this.next = next;
		}
		boolean end(){
			return item == null && next == null;
		}
	}
	
	private Node<T> top = new Node<T>();
	
	public void push(T item){
		top = new Node<T>(item,top);
	}
	
	public T pop(){
		T result = top.item;
		if(!top.end()){
			top = top.next;
		}
		return result;
	}
	
	public void remove (T item) {
		if( null == item ){
			return; 
		}
		Node<T> temp = top.next ;
		Node<T> last = top ;
		T t;
		if(top.item.equals(item)){
			top = top.next;
		}
		while( temp.next != null){
			if((item).equals(t = temp.item)){
				last.next = temp.next;
			}
			last = temp ;
			temp = temp.next;
		}
	}
	public static void main(String[] args) {
		/*LinkedStack<String> lss = new LinkedStack<String>();
		for(String s : "This is a linkedStack written by myself!".split(" ")){
			lss.push(s);
		}
		System.out.println(lss);*/
		/*String s ;
		while((s = lss.pop()) != null){
			System.out.println(s);
		}*/
		/*lss.remove("is");
		System.out.println(lss);*/
		
		String[] str = new String[3];
		Arrays.fill(str, "1213");
		
		String s1 = "123";
		String s2 = new String("123");
		System.out.println(s1.equals(s2));
		System.out.println(s1 == s2 );
		
		Object o = new Object();
		
	}
	
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		T s ;
		while((s = pop()) != null){
			sb.append(s.toString());
			sb.append("\n");
		}
		return sb.toString();
	}

}
