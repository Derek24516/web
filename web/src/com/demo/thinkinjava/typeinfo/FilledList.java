package com.demo.thinkinjava.typeinfo;

import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

class CountedInteger{
	private static long counter;
	private final long id = counter ++ ;
	@Override
	public String toString() {
		return Long.toString(id);
	}
}
public class FilledList<T> {
	private Class<T> type ;
	public FilledList(Class<T> type){
		this.type = type;
	}
	public List<T> create(int nElements){
		List<T> result = new ArrayList<T>();
		try {
			for (int i = 0; i < nElements; i++) {
				result.add(type.newInstance());
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
		return result;
	}
	public static void main(String[] args) {
		FilledList<CountedInteger> fl = new FilledList<CountedInteger>(CountedInteger.class);
		System.out.println(fl.create(5));
		//LinkedHashMap<K, V>
		// ? super 声明一个是***的父类的类型
		Class<? super LinkedHashMap<String, String>> linkedHashSuperClass = HashMap.class;
		Class<? super LinkedHashMap<String, String>> linkedHashSuperClass2 = AbstractMap.class;
		HashMap<String, String> map = new HashMap<String, String>();
		System.out.println(LinkedHashMap.class.getSuperclass());
		System.out.println(AbstractMap.class.getSuperclass());
		
	}

}
