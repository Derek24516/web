package com.demo.generic;

import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

/**
 * SortedSet的相关用法
 * 
 * @date		2016-1-
 * 
 */
public class SortedSetDemo {

	public static void main(String[] args) {
		testSortedSet();
	}

	public static void testSortedSet(){
		SortedSet<String> sortedSet = new TreeSet<String>();
		//SortedSet是根据对象的compareTo函数进行比较加入到set中，而不是顺序加，顺序加入可以用LinkedHashSet
		Collections.addAll(sortedSet, "1 2 3 4 8 6 9 5".split(" "));
		System.out.println(sortedSet);
		
		
		String low = sortedSet.first();
		String high = sortedSet.last();
		System.out.println(low);
		System.out.println(high);
		
		
	}
}
