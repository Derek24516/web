/**
 * 
 */
package com.demo.thread;

/**
 * Runnable接口的Demo
 * 
 * @date		2015-12-28
 * 
 */
public class RunnableDemo implements Runnable {
	public static String flag = "true";

	@Override
	public void run() {
		synchronized(flag){
			while(flag == "true"){
				try {
					System.out.println("hello");
					Thread.sleep(1000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
	}

}
