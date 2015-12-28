package com.ydd.testThread;

public class TestRunnable implements Runnable{

	int tickets = 100;
	String str = new String("");
	@Override
	public void run() {
		// TODO Auto-generated method stub
		if(str.equals("method")){
			while(true){
				sale();
			}
		}else{
			while(true){
				synchronized (str) {
					if(tickets > 0){
						try {
							Thread.sleep(20);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
						//synchronized (this) {}  会发生死锁
						System.out.println("---" + Thread.currentThread().getName() + "卖：" + tickets-- + "票");
					}
				}
			}
		}
	}
	
	public synchronized void sale(){
		while(true){
			if(tickets > 0){
				try {
					Thread.sleep(20);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				//synchronized (str) {}  会发生死锁
				System.out.print("sale");
				System.out.println("---" + Thread.currentThread().getName() + "卖：" + tickets-- + "票");
			}
		}
	}
	
}
