package com.demo.generic;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * List的一些Demo
 * 
 * 
 */
public class ListDemo {
	
	class StringAddress{
		private String s;
		public StringAddress(String s ){
			this.s = s ;
		}
		
		@Override
		public String toString() {
			return super.toString() + " " + s;
		}
	}

	public static void main(String[] args) {
		ListDemo demo = new ListDemo();
		demo.fillingList();
		
	}

	public void fillingList(){
		List<StringAddress> list = new ArrayList<StringAddress>(Collections.nCopies(4, new StringAddress("Hello")));
		System.out.println(list);
		Collections.fill(list, new StringAddress("World!"));
		System.out.println(list);
	}
	
}
