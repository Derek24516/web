package com.demo.thread;

public class StringBufferThread implements Runnable {
	public static StringBuffer sf = new StringBuffer("StringBuffer");
	
	public static long start = 0;
	public static long end = 0;
	

	@Override
	public void run() {
		for(int i = 0 ; i < 200000 ; i ++){
			sf.append(i);
		}
		sf = new StringBuffer(sf.substring(0,sf.length() / 2));
		long now = System.currentTimeMillis();
		if(now > end){
			end = now;
		}
	}

}
