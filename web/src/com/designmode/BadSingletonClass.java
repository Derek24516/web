package com.designmode;

public class BadSingletonClass {
	private BadSingletonClass() {
		// TODO Auto-generated constructor stub
	}
	
	/* 				单例模式1
	 * 
	 *  缺点：非延迟加载，如果初始化中有很多操作，刚开始加载很慢
	 *  
	 */
	/*public static BadSingletonClass getInstance (){
		return instance;
	}
	private static BadSingletonClass instance = new BadSingletonClass();*/
	
	
	/* 				单例模式2
	 * 
	 *  缺点：虽然是延迟加载，但是没有考虑到线程的同步，可能会得到的不是单例
	 *  
	 */
	/*private static BadSingletonClass instance = null;
	public BadSingletonClass getInstance(){
		if(instance == null){
			instance = new BadSingletonClass();
		}
		return instance;
	}*/
	
	/* 				单例模式3
	 * 
	 *  缺点：虽然是延迟加载，也考虑到线程的同步，但是每次获取实例都需要同步，效率很低，性能差
	 *  
	 */
	private static BadSingletonClass instance = null;
	public synchronized static BadSingletonClass getInstance(){
		if(instance == null){
			instance = new BadSingletonClass();
		}
		return instance;
	}
}
