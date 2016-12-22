package com.demo.thinkinjava.generics;

import java.util.ArrayList;
import java.util.Collection;
import java.util.ConcurrentModificationException;
import java.util.Iterator;

/**
 * 快速报错机制,跟集合的只读的机制类似
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年11月26日
 * @version	 v0.1.0
 * 
 */
public class FailFast {

	public static void main(String[] args) {
		Collection<String> c = new ArrayList<String>();
		Iterator<String> it = c.iterator();
		c.add("An Object");
		try {
			String s = it.next();
		} catch (ConcurrentModificationException e) {
			System.out.println(e);
		}
	}
}
