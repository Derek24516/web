package com.demo.thread;

public class TestMain2 {

	public static void main(String[] args){
		//测试生产者和消费者模式
		Q q = new Q();
		Consumer c = new Consumer(q);
		Producer p = new Producer(q);
		
		new Thread(c).start();
		new Thread(p).start();
	}
}
