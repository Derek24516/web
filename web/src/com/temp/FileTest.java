package com.temp;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;


public class FileTest {

	public static void main(String[] args) throws Exception {
		String str = "1111哈哈";
		
		byte[] arr = str.getBytes();
		
		File file = new File("E:\\aa\\1.txt");
		BufferedOutputStream bR = new BufferedOutputStream(System.out);
		//BufferedOutputStream bR = new BufferedOutputStream(new FileOutputStream(file,true));
		bR.write(arr, 0, arr.length);;
		bR.flush();
		bR.close();
	}

}
