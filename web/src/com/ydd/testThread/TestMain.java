package com.ydd.testThread;

public class TestMain {

	public static void main(String[] args){
		//	测试后台进程
		//testDaemonThread();
		
		//	测试线程的join方法
		testJoinMethod();
		
		/*TestRunnable tt = new TestRunnable();
		new Thread(tt).start();
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		tt.str = "method";
		new Thread(tt).start();*/
		//new Thread(tt).start();
		//new Thread(tt).start();
	}
	
	/**
	 * 测试后台进程
	 */
	public static void testDaemon(){
		Thread t1 = new TestThread();
		//	将线程设置为后台线程
		t1.setDaemon(true);	
		t1.start();
		//	在此后main方法如果没有代码的话，就是说main线程执行完毕
		//	那么，t1线程为后台线程的时候，会在main线程执行完毕或者程序结束的时候，t1也会结束（没执行完也会结束）
	}
	
	/**
	 * 线程join方法
	 */
	public static void testJoinMethod(){
		Thread t1 = new TestThread();
		int index = 0;
		while(true){
			if(++index == 100){
				try {
					t1.join(3000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			System.out.println("---" + Thread.currentThread().getName());
		}
	}
}
