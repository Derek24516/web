package com.demo.thread;

public class StringBuilderThread implements Runnable {
	public static StringBuilder sb = new StringBuilder("StringBuilder");
	
	public static long start = 0;
	public static long end = 0;
	

	@Override
	public void run() {
		for(int i = 0 ; i < 200000 ; i ++){
			sb.append(i);
		}
		sb = new StringBuilder(sb.substring(0,sb.length() / 2));
		long now = System.currentTimeMillis();
		if(now > end){
			end = now;
		}
	}

}
