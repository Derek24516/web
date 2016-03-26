package com.DesignMode.behavior.iterator;

/**
 * 迭代子模式：按一定的顺序访问集合中的对象，java中的集合就是该模式
 * 
 * @date		2016-3-30
 * 
 */
public class IteratorDemo {

	public static void main(String[] args) {
		Collection collection = new MyCollection();
		Iterator iterator = collection.iterator();
		
		while(iterator.hasNext()){
			System.out.println(iterator.next());
		}
	}

}
