package com.demo.thinkinjava.io;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

/**
 * 
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年12月1日
 * @version	 v0.1.0
 * 
 */
public class GetChannel {
	private static final int BSIZE = 1024;
	public static void main(String[] args) throws Exception {
		FileChannel fc = new FileOutputStream("H:\\data.txt").getChannel();
		fc.write(ByteBuffer.wrap("Some txt".getBytes()));
		fc.close();
		
		fc = new RandomAccessFile("H:\\data.txt", "rw").getChannel();
		fc.position(fc.size());
		fc.write(ByteBuffer.wrap("More txt".getBytes()));
		fc.close();
		
		fc = new FileInputStream("H:\\data.txt").getChannel();
		ByteBuffer bf = ByteBuffer.allocate(BSIZE);
		fc.read(bf);
		bf.flip();
		
		while(bf.hasRemaining()){
			System.out.println(bf.get());
		}
		
		
	}

}
