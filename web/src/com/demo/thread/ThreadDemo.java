/**
 * 
 */
package com.demo.thread;

/**
 * @author Administrator
 *
 */
public class ThreadDemo {
	public static void main(String[] args){
			//testDaemon();
			
			testJoinMethod();
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
}
