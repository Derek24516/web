package com.demo.thinkinjava.holding;

import java.util.Map.Entry;

public class EnviromentVariables {

	public static void main(String[] args) {
		for(Entry en : System.getenv().entrySet()){
			System.out.println(en.getKey() + "-" + en.getValue());
		}
	}

}
