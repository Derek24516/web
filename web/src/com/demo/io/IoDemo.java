package com.demo.io;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.PrintStream;

/**
 * IO的一些用法
 * 
 * @date		2016-1-12
 * 
 */
public class IoDemo {

	public static void main(String[] args) {
		try {
			modifySystemOut();
			System.out.flush();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		testSystemOut();
	}

	/**
	 * 
	 * System.out和err
	 *
	 * @param		void
	 * @Exception	IOException
	 * @return 		void
	 * @date		2016-1
	 *
	 */
	public static void testSystemOut(){
		System.out.println("This is system out!");
		//	输出为红色
		System.err.println("This is system err");
	}
	/**
	 * 
	 * 将System.out输出到文件
	 *
	 * @param		void
	 * @Exception	IOException
	 * @return 		void
	 * @date		2016-1
	 *
	 */
	public static void modifySystemOut() throws FileNotFoundException{
		OutputStream os = new FileOutputStream("D:\\test\\systemOut.txt");
		PrintStream printOut = new PrintStream(os);
		System.setOut(printOut);
	}
}
