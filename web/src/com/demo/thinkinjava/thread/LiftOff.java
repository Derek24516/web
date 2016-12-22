package com.demo.thinkinjava.thread;

public class LiftOff implements Runnable {

	protected int countDown = 10; // Default
	private static int taskCount = 0;
	private final int id = taskCount++;

	public LiftOff() {
	}

	public LiftOff(int countDown) {
		this.countDown = countDown;
	}

	public String status() {
		return "#" + id + "(" + (countDown > 0 ? countDown : "Liftoff!") + "), ";
	}

	public static void main(String[] args) {
		for (int i = 0; i < 5; i++) {
			Thread thread = new Thread(new LiftOff());
			thread.setDaemon(true);
			thread.start();
		}
	}

	@Override
	public void run() {
		while (countDown-- > 0) {
			System.out.println(status());
			Thread.yield();
		}
	}
	
	@Override
	protected void finalize() throws Throwable {
		System.out.println("id---" + id + "---finalize");
		super.finalize();
	}

}
