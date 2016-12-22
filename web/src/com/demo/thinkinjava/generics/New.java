package com.demo.thinkinjava.generics;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class New {
	//泛型方法，在方法前声明泛型的参数即可（不一定需要类是泛型的，类中的某个或多个方法也可以是泛型的）
	public static <K,V> Map<K, V> hashMap(){
		return new HashMap<K, V>();
	}
	
	public static <T> List<T> arrayList(){
		return new ArrayList<T>();
	}
	
	public static void f(Map<String,List<String>> map ){
		
	}
	
	// 泛型参数和可变参数共存
	public static <T> List<T> makeList(T ... args){
		return new ArrayList<T>();
	}
	public static void main(String[] args){
		
		Map<String,List<String>> map = New.hashMap();
		
		f(New.<String,List<String>>hashMap());
		
	}
}
