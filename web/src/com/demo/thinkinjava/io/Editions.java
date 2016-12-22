package com.demo.thinkinjava.io;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.Arrays;

import static net.mindview.util.Print.*;

/**
 * 字节存放模式：高位优先（Java和网络中大多数默认）和低位优先
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年12月6日
 * @version	 v0.1.0
 * 
 */
public class Editions {

	public static void main(String[] args) {
		ByteBuffer bb = ByteBuffer.wrap(new byte[12]);
		bb.asCharBuffer().put("abcdef");
		print(Arrays.toString(bb.array()));
		bb.rewind();
		
		bb.order(ByteOrder.BIG_ENDIAN);
		bb.asCharBuffer().put("abcdef");
		print(Arrays.toString(bb.array()));
		
		bb.order(ByteOrder.LITTLE_ENDIAN);
		bb.asCharBuffer().put("abcdef");
		print(Arrays.toString(bb.array()));
		
	}

}
