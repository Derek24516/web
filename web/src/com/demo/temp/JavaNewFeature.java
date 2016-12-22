package com.demo.temp;

import java.util.Arrays;

public class JavaNewFeature {
	
	@FunctionalInterface
	public interface FunctionalDefaultMethods{
		void method();
		
		default void defaultMethod(){
			
		}
	}

	public static void main(String[] args) {
		Arrays.asList("a","b","c").forEach( e -> System.out.println( e ));
		Arrays.asList("a","b","c").forEach( e -> {
			System.out.println(e);
		});
		
	}

}
