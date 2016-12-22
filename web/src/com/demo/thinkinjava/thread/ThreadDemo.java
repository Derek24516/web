package com.demo.thinkinjava.thread;

import java.util.concurrent.TimeUnit;

public class ThreadDemo {

	static class PrintThread implements Runnable{

		@Override
		public void run() {
			try {
				int i = 0;
				while(true){
					TimeUnit.SECONDS.sleep(1);
					System.out.println(Thread.currentThread().getName() + ":sleep " + i++);
				}
			} catch (Exception e) {
				// TODO: handle exception
			}
			
		}
		
	}
	
	public static void main(String[] args) {
		try {
			testJoin();
			System.out.println("Exit");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void testJoin() throws Exception{
		Thread t = new Thread(new PrintThread());
		t.start();
		t.join(5000);
		
	}

}
