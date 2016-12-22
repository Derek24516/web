package com.demo.thinkinjava.generics;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年11月26日
 * @version	 v0.1.0
 * 
 */
public class Synchronization {

	public static void main(String[] args) {
		List<String> s = Collections.synchronizedList(new ArrayList<String>());
	}

}
