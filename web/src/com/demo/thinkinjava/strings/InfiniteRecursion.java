package com.demo.thinkinjava.strings;

/**
 * 
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年8月30日
 * @version	 v0.1.0
 * 
 */
public class InfiniteRecursion {
	@Override
	public String toString() {
		//这里用this会产生递归调用而报错
		//return "address : " + this;
		return "address : " + super.toString();
	}
	
	public static void main(String[] args) {
		InfiniteRecursion i1 = new InfiniteRecursion();
		System.out.println(i1.toString());
		i1 = new  InfiniteRecursion();
		System.out.println(i1.toString());
	}

}
