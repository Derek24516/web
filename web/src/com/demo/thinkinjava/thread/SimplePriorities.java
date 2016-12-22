package com.demo.thinkinjava.thread;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class SimplePriorities implements Runnable {
	private int countDown = 5;
	private  double d; // No optimization
	private int priority;

	public SimplePriorities(int priority) {
		this.priority = priority;
	}

	public String toString() {
		return Thread.currentThread() + ": " + countDown + ",Priortity:" + Thread.currentThread().getPriority();
	}

	public void run() {
		Thread.currentThread().setPriority(priority);
		try {
			while (true) {
				// An expensive, interruptable operation:
				for (int i = 1; i < 100000; i++) {
					d += (Math.PI + Math.E) / (double) i;
					if (i % 1000 == 0){
						Thread.yield();
						//TimeUnit.SECONDS.sleep(1);
					}
						
				}
				System.out.println(this);
				if (--countDown == 0)
					return;
			}
		} catch (Exception e) {
		}
		
	}

	public static void main(String[] args) {
		ExecutorService exec = Executors.newCachedThreadPool();
		for (int i = 0; i < 5; i++)
			exec.execute(new SimplePriorities(Thread.MIN_PRIORITY));
		exec.execute(new SimplePriorities(Thread.MAX_PRIORITY));
		exec.shutdown();
	}
}
