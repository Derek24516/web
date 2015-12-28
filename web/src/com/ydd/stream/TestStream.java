package com.ydd.stream;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;

public class TestStream {
	public static void main(String[] args) {
		File f = new File("d:\\test\\test.txt");
		FileInputStream fIn = null;
		try {
			
			FileReader fR = new FileReader(f);
			BufferedReader b = new BufferedReader(fR);
			String str = "";
			
			while((str = b.readLine()) != null){
				System.out.println(str);
			}
			
			
			fIn = new FileInputStream(f);
			BufferedInputStream bIn = new BufferedInputStream(fIn);
			//也可以这样：
			//FileInputStream fIn2 = new FileInputStream("d:\test.txt");
			int i = fIn.read();
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
			e.printStackTrace();
		}finally{
			try {
				fIn.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
