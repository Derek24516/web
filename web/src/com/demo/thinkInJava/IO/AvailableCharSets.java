package com.demo.thinkInJava.IO;

import java.nio.charset.Charset;
import java.util.Iterator;
import java.util.SortedMap;

public class AvailableCharSets {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//	获取支持的编码
		SortedMap<String, Charset> charSets = Charset.availableCharsets();
		Iterator<String> it = charSets.keySet().iterator();
		
		while(it.hasNext()){
			String csName = it.next();
			System.out.println(csName);
			
			//	获取编码的别名
		}
		
		
	}
}
