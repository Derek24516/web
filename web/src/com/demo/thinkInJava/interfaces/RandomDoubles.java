/**
 * 
 */
package com.demo.thinkInJava.interfaces;

import java.util.Random;

/**
 * 
 *
 * 
 * @autor	    余冬冬
 * @data 	 2016年7月26日
 * @version	 v0.1.0
 * 
 */
public class RandomDoubles {
	private static Random rand = new Random(47);
	  public double next() { return rand.nextDouble(); }
	  public static void main(String[] args) {
	    RandomDoubles rd = new RandomDoubles();
	    for(int i = 0; i < 7; i ++)
	      System.out.print(rd.next() + " ");
	  }
}
