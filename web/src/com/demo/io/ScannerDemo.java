package com.demo.io;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.Scanner;

/**
 * 
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年9月20日
 * @version	 v0.1.0
 * 
 */
public class ScannerDemo {
	class MyReader implements Readable{
		private String str = "3324324343";
		@Override
		public int read(CharBuffer cb) throws IOException {
			CharBuffer.allocate(100);
			//cb.allocate(str.length());
			cb.append(str);
			return str.length();
		}
		
	}
	
	public static void main(String[] args){
		// MyReader m = new MyReader();
		// ScannerDemo demo = new ScannerDemo();
		// MyReader m = demo.new MyReader();
		/*Scanner stdin = new Scanner(new ScannerDemo().new MyReader());
		while (stdin.hasNextLine()) {
			String string = stdin.nextLine();
			System.out.println(string);
		}*/
		
		testDelimiter();
	}
	
	public static void testDelimiter(){
		Scanner scanner = new Scanner("12,42,78,3223");
		scanner.useDelimiter("\\s*,\\s*");
		while (scanner.hasNextInt()) {
			System.out.println(scanner.nextInt());
		}
		scanner.close();
	}
}
