package com.demo.thread;

public class Counter {
	public static int count = 0 ;
	
	synchronized public static void inc(){
		try {
			Thread.sleep(1);
		} catch (Exception e) {
		}
		count ++ ;
	}
	
	public static void main(String[] args) {
		for (int i = 0; i < 1000; i++) {
			new Thread(new Runnable() {
				
				@Override
				public void run() {
					Counter.inc();
				}
			}).start();;
		}
		
		System.out.println("Results: count = " + count);
	}

}
