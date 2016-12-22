package com.demo.thinkinjava.strings;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Finding {
	public static void main(String[] args){
		Matcher m = Pattern.compile("\\w+").matcher("Evening is full of linnet's wings");
		while(m.find()){
			System.out.println(m.group() + " ");
			
		}
		int i = 0 ;
		while(m.find(i)){
			System.out.println(m.group() + " ");
			i ++ ;
		}
		
	}
}
