package com.demo.thinkinjava.strings;

import static net.mindview.util.Print.*;

/**
 * String虽然是一个引用类型，但是特殊的引用类型
 * 
 * @author	    余冬冬
 * @data 	 2016年8月30日
 * @version	 v0.1.0
 * 
 */
public class Immutable {
	
	public static String upcase(String s){
		return s.toUpperCase();
	}
	
	public static void main(String[] args) {
		String q = "howqy";
		print(q);
		String qq = upcase(q);
		print(qq);
		print(q);
	}

}
