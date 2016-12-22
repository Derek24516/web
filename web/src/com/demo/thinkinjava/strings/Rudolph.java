package com.demo.thinkinjava.strings;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class Rudolph {

	public static void main(String[] args) {
		for(String pattern : new String[]{"\\w+","[rR]udolph","[a-zA-Z]+",".*"}){
			System.out.println("Rudolph".matches(pattern));
		}
		
		String str = "123 erd we2 234s";
		Pattern pattern = Pattern.compile("(\\w+)");
		Matcher matcher = pattern.matcher(str);
		while(matcher.find()){
			System.out.println(matcher.group());
		}
	}

}
