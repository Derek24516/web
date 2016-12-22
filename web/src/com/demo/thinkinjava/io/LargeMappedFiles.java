package com.demo.thinkinjava.io;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;

/**
 * 内存映射文件Demo
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年12月6日
 * @version	 v0.1.0
 * 
 */
public class LargeMappedFiles {

	private static int length = 0x8FFFFFF;	//128MB
	
	public static void main(String[] args) throws FileNotFoundException, IOException {
		MappedByteBuffer out = new RandomAccessFile("H:\\data.txt", "rw").getChannel().map(FileChannel.MapMode.READ_WRITE, 0, length);
		out.asCharBuffer();
		for (int i = 0; i < length; i++) {
			out.put((byte) 'X');
		}
		
	    for(int i = length/2; i < length/2 + 6; i++){
	    	out.get(i);
	    }
	      
	}

}
