package com.demo.thinkinjava.strings;

import java.util.Arrays;

public class Splitting {
	
	public static String s = "123abc, 123aba,...121321, ";
	
	public static void split(String reg){
		System.out.println(Arrays.toString(s.split(reg,5)));
	}
	
	public static void main(String[] args) {
		split("\\W+");
	}

}
