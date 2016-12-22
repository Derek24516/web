package com.demo.thread;

/**
 * @author Administrator
 *
 */
public class ThreadDemo {
	public static void main(String[] args) throws InterruptedException{
			//testDaemon();
			
			//testJoinMethod();
			
			testString();
	}
	
	/**
	 * 
	 * 后台线程Demo
	 *
	 * @param		void
	 * @date		2015-12-31
	 *
	 */
	public static void testDaemon() throws InterruptedException{
		//	默认是非后台线程
		//	后台线程会在main方法执行完毕之后，也立即（不确定执行到哪里了）关闭
		//  非后台线程，会执行完了之后，main方法才会关闭
		RunnableDemo runDemo = new RunnableDemo();
		Thread thread1 = new Thread(runDemo);
		thread1.setDaemon(true);
		thread1.start();
		
		Thread.sleep(2000);
	}
	
	/**
	 * 
	 * 线程join方法Demo
	 *
	 * @param		void
	 * @date		2015-12-31
	 *
	 */
	public static void testJoinMethod(){
		//TODO 待研究源码更深理解
		Thread t1 = new TestThread();
		int index = 0;
		while(true){
			if(++index == 100){
				try {
					t1.join(2000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			System.out.println("---" + Thread.currentThread().getName());
		}
	}
	
	public static void testString() throws InterruptedException{
		//	10个线程
		int threadCount = 10 ;
		StringBuilderThread.start = System.currentTimeMillis();
		for(int i = 0 ; i < threadCount ; i ++ ){
			Thread t = new Thread(new StringBuilderThread());
			t.start();
		}
		
		Thread.sleep(5000);
		System.out.println(threadCount + "个线程操作StringBuilder，花费时间为：" + (StringBuilderThread.end - StringBuilderThread.start));
		
		StringBufferThread.start = System.currentTimeMillis();
		for(int i = 0 ; i < threadCount ; i ++ ){
			Thread t = new Thread(new StringBufferThread());
			t.start();
		}
		
		Thread.sleep(5000);
		System.out.println(threadCount + "个线程操作StringBuffer，花费时间为：" + (StringBufferThread.end - StringBufferThread.start));
	}
}
