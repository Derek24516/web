/**
 * 
 */
package com.mainTest;

import java.util.HashSet;
import java.util.Set;

/**
 * Char的一些用法
 * 
 * @date 2015-12-28
 * 
 */
public class Test2 {

	/**
	 * Char的一些用法
	 *
	 * @param void
	 * @Exception IOException
	 * @return void
	 * @date 2015-12-28
	 * 
	 */
	public static void main(String[] args) {
		Set<Character> set = new HashSet<Character>();
        
        for(int i=0;i<36;i++){
            if(i<10){
                set.add((char)('0'+i));
            }else{
                char ch2 =(char)('a'+i-10);
                set.add(ch2);
            }
        }
        System.out.println(set);
                 
        for(char ch='a';ch<='z';ch++){
            set.remove(ch);
            set.add(ch-=32);
            //set.add((char)(ch-32));
        }
        System.out.println(set);
	}

}
