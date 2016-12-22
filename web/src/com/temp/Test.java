package com.temp;


import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.RandomAccessFile;

public class Test {
	public static void main(String[] args) throws IOException {
		File file = new File("/home/ydd/test/1.txt");
		System.out.println("323");
		//	在文件末尾追加的方式写入
		/*FileWriter fw = new FileWriter(file,true);
		BufferedWriter bw = new BufferedWriter(fw);
		bw.write("aaaa");
		bw.newLine();
		//	将写的数据更新到文件
		bw.flush();
		bw.close();
		fw.close();*/
		
		FileReader fr = new FileReader(file);
		BufferedReader br = new BufferedReader(fr);
		FileWriter fw = new FileWriter(file);
		BufferedWriter bw = new BufferedWriter(fw);
		
		String str = null;
		while((str = br.readLine()) != null){
			System.out.println(str);
			if("aaaa".equals(str)){
				bw.write("bbb");
			}
		}
		bw.flush();
		bw.close();
		fw.close();
		br.close();
		fr.close();
		
		
		RandomAccessFile raf = new RandomAccessFile(file, "rws");
		String temp = null;
		while( (temp = raf.readLine()) !=null){
			System.out.println(temp);
			if("555555555".equals(temp)){
				System.out.println("###########");
				raf.writeChars("aa");
			}
		}
		raf.close();
	}

}
