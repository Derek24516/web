/**
 * 
 */
package com.mainTest;

import java.util.Iterator;
import java.util.Scanner;

/**
 * 逆转字符串
 * 
 * @date		2015-12-28
 * 
 */
public class ReverseString {

	/**
	 * Char的一些用法
	 *
	 * @param		void
	 * @Exception	IOException
	 * @return 		void
	 * @date		2015-12-28
	 * 
	 */
	public static void main(String[] args) {
		reverseString();
	}
	
	public static void reverseString(){
		Scanner sc = new Scanner(System.in);
		while(sc.hasNext()){
			String str = sc.next();
			//str.
			for (int i = str.length() - 1; i >= 0; i--) {
				System.out.print(str.charAt(i));
			}
		}
	}
}
