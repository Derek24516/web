package com.demo.thinkinjava.io;

import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.DoubleBuffer;
import java.nio.FloatBuffer;
import java.nio.IntBuffer;
import java.nio.LongBuffer;
import java.nio.ShortBuffer;
import static net.mindview.util.Print.*;

/**
 * 
 *
 * 
 * @author 余冬冬
 * @data 2016年12月2日
 * @version v0.1.0
 * 
 */
public class ViewBuffers {

	public static void main(String[] args) {
		ByteBuffer bb = ByteBuffer.wrap(new byte[] { 0, 0, 0, 0, 0, 0, 0, 'a' });
		bb.rewind();
		printnb("Byte Buffer ");
		while (bb.hasRemaining())
			printnb(bb.position() + " -> " + bb.get() + ", ");
		print();
		CharBuffer cb = ((ByteBuffer) bb.rewind()).asCharBuffer();
		printnb("Char Buffer ");
		while (cb.hasRemaining())
			printnb(cb.position() + " -> " + cb.get() + ", ");
		print();
		FloatBuffer fb = ((ByteBuffer) bb.rewind()).asFloatBuffer();
		printnb("Float Buffer ");
		while (fb.hasRemaining())
			printnb(fb.position() + " -> " + fb.get() + ", ");
		print();
		IntBuffer ib = ((ByteBuffer) bb.rewind()).asIntBuffer();
		printnb("Int Buffer ");
		while (ib.hasRemaining())
			printnb(ib.position() + " -> " + ib.get() + ", ");
		print();
		LongBuffer lb = ((ByteBuffer) bb.rewind()).asLongBuffer();
		printnb("Long Buffer ");
		while (lb.hasRemaining())
			printnb(lb.position() + " -> " + lb.get() + ", ");
		print();
		ShortBuffer sb = ((ByteBuffer) bb.rewind()).asShortBuffer();
		printnb("Short Buffer ");
		while (sb.hasRemaining())
			printnb(sb.position() + " -> " + sb.get() + ", ");
		print();
		DoubleBuffer db = ((ByteBuffer) bb.rewind()).asDoubleBuffer();
		printnb("Double Buffer ");
		while (db.hasRemaining())
			printnb(db.position() + " -> " + db.get() + ", ");

	}

}
