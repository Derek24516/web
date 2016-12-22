package com.demo.thinkinjava.generics;

import java.util.HashSet;
import java.util.Set;

public class Sets {
	//合集
	public static <T> Set<T>  union(Set<T> a,Set<T> b){
		Set<T> result = new HashSet<T>(a);
		result.addAll(b);
		return result;
	}
	
	//交集
	public static <T> Set<T> intersection(Set<T> a,Set<T> b){
		Set<T> result = new HashSet<T>(a);
		result.retainAll(b);
		return result;
	}
	
	//a中有，b没有
	public static <T> Set<T> difference(Set<T> a,Set<T> b){
		Set<T> result = new HashSet<T>(a);
		result.remove(b);
		return result;
	}
	
	//a,b中不同的部分
	public static <T> Set<T> complement(Set<T> a,Set<T> b){
		return difference(union(a, b), intersection(a, b));
	}
	
	
}
