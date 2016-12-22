package com.demo.thinkinjava.holding;

import java.util.Random;
import java.util.SortedSet;
import java.util.TreeSet;


/**
 * 
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年8月22日
 * @version	 v0.1.0
 * 
 */
public class SortedSetOfInteger {
	public static void main(String[] args){
		Random r = new Random(47);
		SortedSet<Integer> inset = new TreeSet<Integer>();
		for(int i = 0 ; i < 100 ; i ++ ){
			inset.add(r.nextInt(30));
		}
		System.out.println(inset);
	}
}
