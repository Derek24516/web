package com.demo.thinkinjava.typeinfo;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.regex.Pattern;


public class ShowMethods {

	public void test(){
		
	}
	public static void test2(){
		
	}
	public static String usage = "usage:\n" +
		    "ShowMethods qualified.class.name\n" +
		    "To show all methods in class or:\n" +
		    "ShowMethods qualified.class.name word\n" +
		    "To search for methods involving 'word'";
	private static Pattern p = Pattern.compile("\\w+\\.");
	public static void main(String[] args) {
		args = new String[]{"com.demo.thinkinjava.typeinfo.ShowMethods"};
		if(args.length < 1 ){
			System.out.println(usage);
			System.exit(0);
		}
		
		int lines = 0 ;
		try {
			Class<?> c = Class.forName(args[0]);
			Method[] methods = c.getMethods();
			Constructor[] constructors = c.getConstructors();
			if(args.length == 1){
				for (Method method : methods) {
					System.out.println(p.matcher(method.toString()).replaceAll(""));
				}
				for (Constructor constructor : constructors) {
					System.out.println(p.matcher(constructor.toString()).replaceAll(""));
				}
			}else{
				for (Method method : methods) {
					System.out.println(p.matcher(method.toString()).replaceAll(""));
				}
				for (Constructor constructor : constructors) {
					System.out.println(p.matcher(constructor.toString()).replaceAll(""));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
