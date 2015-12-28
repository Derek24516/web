package com.demo.thread;

public class Producer implements Runnable {
	Q q;
	
	public Producer(Q q){
		this.q = q;
	}
	
	@Override
	public void run() {
		int i = 0;
		while(true){
			synchronized (q) {
				if(q.isFull){
					try {
						q.wait();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
				
				if(i == 0){
					this.q.name = "q0";
					this.q.sex = "male";
				}else{
					this.q.name = "q1";
					this.q.sex = "female";
				}
				i = (++i) % 2;
				q.isFull = true;
				q.notify();
			}
		}
	}
}
