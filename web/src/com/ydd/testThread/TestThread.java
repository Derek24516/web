package com.ydd.testThread;

public class TestThread extends Thread {
	@Override
	public void run() {
		while(true){
			System.out.println("---" + Thread.currentThread().getName());
		}
	}
	
}
