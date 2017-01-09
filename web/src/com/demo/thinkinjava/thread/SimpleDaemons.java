package com.demo.thinkinjava.thread;

import java.util.concurrent.TimeUnit;
import static net.mindview.util.Print.*;

public class SimpleDaemons implements Runnable{
	public void run() {
		try {
			while (true) {
				TimeUnit.MILLISECONDS.sleep(100);
				print(Thread.currentThread() + " " + this);
			}
		} catch (InterruptedException e) {
			print("sleep() interrupted");
		}
	}

	public static void main(String[] args) throws Exception {
		for (int i = 0; i < 10; i++) {
			Thread daemon = new Thread(new SimpleDaemons());
			daemon.setDaemon(true); // Must call before start()
			daemon.start();
		}
		print("All daemons started");
		TimeUnit.MILLISECONDS.sleep(175);
	}
}
