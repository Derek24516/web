package com.demo.thinkinjava.io;

import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.Random;

import static net.mindview.util.Print.*;

/**
 * 
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年12月6日
 * @version	 v0.1.0
 * 
 */
public class UsingBuffers {

	private static void symmetricScramble(CharBuffer buffer) {
		while(buffer.hasRemaining()){
			buffer.mark();
			char a = buffer.get();
			char b = buffer.get();
			buffer.reset();
			buffer.put(b).put(a);
		}
	}
	
	public static void main(String[] args) {
		
		/*char[] data = "1234".toCharArray();
		ByteBuffer buffer = ByteBuffer.allocate(data.length * 2 );
		CharBuffer cBuffer = buffer.asCharBuffer();
		cBuffer.put(data);
		print(cBuffer.rewind());
		symmetricScramble(cBuffer);
		print(cBuffer.rewind());*/
		int size = 100000000;
		CharBuffer cb = CharBuffer.allocate(size);
		Random ran = new Random(47);
		for (int i = 0; i < size; i++) {
			cb.put((char)(ran.nextInt(25) + 'a' ));
		}
		cb.rewind();
		
		long start = System.nanoTime();
		while (cb.hasRemaining()) {
			cb.get();
		}
		long end = System.nanoTime();
		System.out.println(end - start);
		
		start = System.nanoTime();
		for (int i = 0; i < cb.limit(); i++) {
			cb.get(i);
		}
		end = System.nanoTime();
		System.out.println(end - start);
	}

}
