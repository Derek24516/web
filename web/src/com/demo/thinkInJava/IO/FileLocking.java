package com.demo.thinkInJava.IO;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileLock;
import java.util.concurrent.TimeUnit;

public class FileLocking {
	public static void  main(String[] args) throws IOException, InterruptedException {
		FileOutputStream fos = new FileOutputStream("E:\\test\\1.txt");
		FileLock fl = fos.getChannel().tryLock();
		if(fl != null){
			System.out.println("Locked File!");
			//	锁定1秒
			TimeUnit.MICROSECONDS.sleep(100);
			//	锁定1秒
			//TimeUnit.SECONDS.sleep(1);
			fl.release();
			System.out.print("Released Lock");
		}
		fos.close();
		//System.gc();
	}
}
