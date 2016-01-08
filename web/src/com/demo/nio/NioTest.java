package com.demo.nio;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.Date;

/**
 * 		 Nio 学习Demo
 *  
 * @author Administrator
 *
 */
public class NioTest {
	public static void  main(String[] args)  {
		// testChannel
		try {
			//testChannel();
			//testChannelTransfer();
			testFileChannel();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 		Channel 
	 * 
	 * <br />1、既可以从通道中读取数据，又可以写数据到通道。但流的读写通常是单向的。
	 * <br />2、通道可以异步地读写。
	 * <br />3、通道中的数据总是要先读到一个Buffer，或者总是要从一个Buffer中写入。
	 * 
	 * @throws IOException
	 */
	public static void testChannel() throws IOException {
		// 随机读写
		RandomAccessFile aFile = new RandomAccessFile("D:\\test\\1.txt", "rw");
		// 获取channel
		FileChannel inChannel = aFile.getChannel();
		ByteBuffer buf = ByteBuffer.allocate(48);

		//	写入数据到Buffer
		int bytesRead = inChannel.read(buf);
		while (bytesRead != -1) {

			System.out.println("Read " + bytesRead);
			//	flip()方法将Buffer从写模式切换到读模式。在读模式下，可以读取之前写入到buffer的所有数据。
			buf.flip();

			//	从Buffer中读取数据
			while (buf.hasRemaining()) {
				System.out.print((char) buf.get());
			}

			//	有两种方式能清空缓冲区：调用clear()或compact()方法。
			//	clear()方法会清空整个缓冲区。
			//	compact()方法只会清除已经读过的数据
			//	任何未读的数据都被移到缓冲区的起始处，新写入的数据将放到缓冲区未读数据的后面。
			buf.clear();
			
			//	再开始一次读取，读取48字节的数据到Buffer
			bytesRead = inChannel.read(buf);
		}
		aFile.close();
		//	没有关闭channel，因为aFile的close会把非空的channel给关闭掉
	}
	
	/**
	 * 		Channel 之间数据传输
	 * 
	 * 	
	 * 
	 * @throws IOException
	 */
	public static void testChannelTransfer() throws Exception{
		RandomAccessFile fromFile = new RandomAccessFile("D:\\test\\1.txt", "rw");
		FileChannel fromChannel = fromFile.getChannel();
		
		RandomAccessFile toFile = new RandomAccessFile("D:\\test\\2.txt", "rw");
		FileChannel toChannel = toFile.getChannel();
		
		long position = 0;
		long count = fromChannel.size();
		
		toChannel.transferFrom(fromChannel, position, count);
		//fromChannel.transferTo(position, count, toChannel);
		
		//方法的输入参数position表示从position处开始向目标文件写入数据，count表示最多传输的字节数。如果源通道的剩余空间小于 count 个字节，则所传输的字节数要小于请求的字节数。
		//此外要注意，在SoketChannel的实现中，SocketChannel只会传输此刻准备好的数据（可能不足count字节）。
		//因此，SocketChannel可能不会将请求的所有数据(count个字节)全部传输到FileChannel中。
	}
	
	public static void testFileChannel() throws IOException{
		RandomAccessFile fileRaf = new RandomAccessFile("D:\\test\\1.txt", "rw");
		FileChannel fc = fileRaf.getChannel();
		String newData = "New string write to file ...." + new Date().toString() + "\r\n";
		ByteBuffer buf = ByteBuffer.allocate(96);
		buf.clear();
		buf.put(newData.getBytes());
		buf.flip();
		//	写要以循环的模式，因为channel的write方法每次写入的大小是不确定的
		while(buf.hasRemaining()){
			//fc.write(buf);
			
			//	传入position可以让文件从指定位置写
			//	以下获取文件大小，从文件大小出开始写，就相当于是以追加的模式向文件中写入内容
			//	如果位置大于当前文件最大位置，将会使 文件撑大，然后再写入文件
			long position = fc.size() + 10;
			fc.write(buf, position);
		}
		fileRaf.close();
	}
}
