package com.demo.thinkinjava.strings;

import java.io.PrintStream;
import java.util.Formatter;

/**
 * 
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年8月30日
 * @version	 v0.1.0
 * 
 */
public class Turtle {
	private String name;
	private Formatter f;
	
	public Turtle(String name ,Formatter f) {
		this.name = name;
		this.f = f;
	}
	
	public void move(int x , int y){
		f.format("%s The turtle is at (%d,%d)\n", name,x,y);
	}
	
	public static void main(String[] args) {
		PrintStream outAlias = System.out;
		Turtle tommy = new Turtle("Tomy", new Formatter(System.out));
		Turtle tommy2 = new Turtle("Tomy2", new Formatter(outAlias));
		
		tommy.move(2, 5);
		tommy2.move(21, 5);
		tommy.move(2, 5);
		tommy2.move(23, 5);
	}

}
