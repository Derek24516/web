/**
 * 
 */
package com.demo.thinkinjava.interfaces;

import java.nio.CharBuffer;
import java.util.Scanner;

/**
 * 
 *
 * 
 * @autor	    余冬冬
 * @data 	 2016年7月26日
 * @version	 v0.1.0
 * 
 */
public class AdaptedRandomDoubles extends RandomDoubles implements Readable {

	  private int count;
	  public AdaptedRandomDoubles(int count) {
	    this.count = count;
	  }
	  public int read(CharBuffer cb) {
	    if(count-- == 0)
	      return -1;
	    String result = Double.toString(next()) + " ";
	    cb.append(result);
	    return result.length();
	  }	
	  public static void main(String[] args) {
	    Scanner s = new Scanner(new AdaptedRandomDoubles(7));
	    while(s.hasNextDouble())
	      System.out.print(s.nextDouble() + " ");
	  }

}
