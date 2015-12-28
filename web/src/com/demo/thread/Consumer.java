package com.demo.thread;

public class Consumer implements Runnable {
	Q q;
	
	public Consumer(Q q){
		this.q = q;
	}
	@Override
	public void run() {
		while(true){
			synchronized (q) {
				if(!q.isFull){
					try {
						q.wait();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
					
				System.out.println("q:" +this.hashCode()+ "----" + Thread.currentThread().getName());
				System.out.println("name:" + q.name + ",sex:" + q.sex);
				
				q.isFull = false;
				q.notify();
			}
			System.out.println("q:" + this.hashCode()+ "----" + Thread.currentThread().getName());
			System.out.println("");
		}
	}

}
