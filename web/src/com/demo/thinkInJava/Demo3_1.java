package com.demo.thinkInJava;

import java.util.*;

public class Demo3_1 {
	public static void main(String[] args) {
		Test t = new Test();
		SubTest s = (SubTest)t;
		
		s.say();
	}
}
