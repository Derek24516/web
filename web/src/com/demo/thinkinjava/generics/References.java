package com.demo.thinkinjava.generics;

import java.lang.ref.PhantomReference;
import java.lang.ref.Reference;
import java.lang.ref.ReferenceQueue;
import java.lang.ref.SoftReference;
import java.lang.ref.WeakReference;
import java.lang.reflect.Field;
import java.util.LinkedList;

/**
 * Java中引用类型：强引用（一般引用）、软引用（SoftReference）、弱引用（WeakReference）、虚引用（PhantomReference）Demo
 *
 * 
 * @author 余冬冬
 * @data 2016年11月27日
 * @version v0.1.0
 * 
 */
class VeryBig {
	private static final int SIZE = 5000000;
	private long[] la = new long[SIZE];
	private String ident;

	public VeryBig(String id) {
		ident = id;
	}

	public String toString() {
		return ident;
	}

	protected void finalize() {
		System.out.println("Finalizing " + ident);
	}
}

public class References {
	private static ReferenceQueue<VeryBig> rq = new ReferenceQueue<VeryBig>();

	public static void checkQueue() {
		Reference<? extends VeryBig> inq = rq.poll();
		if (inq != null)
			System.out.println("In queue: " + inq.get());
	}

	public static void main(String[] args) throws InterruptedException {
		int size = 5;
		// Or, choose size via the command line:
		if (args.length > 0){
			size = new Integer(args[0]);
		}
			
		LinkedList<SoftReference<VeryBig>> sa = new LinkedList<SoftReference<VeryBig>>();
		for (int i = 0; i < size; i++) {
			sa.add(new SoftReference<VeryBig>(new VeryBig("Soft " + i), rq));
			System.out.println("Just created: " + sa.getLast());
			checkQueue();
		}
		LinkedList<WeakReference<VeryBig>> wa = new LinkedList<WeakReference<VeryBig>>();
		for (int i = 0; i < size; i++) {
			wa.add(new WeakReference<VeryBig>(new VeryBig("Weak " + i), rq));
			System.out.println("Just created: " + wa.getLast());
			checkQueue();
		}
		SoftReference<VeryBig> s = new SoftReference<VeryBig>(new VeryBig("Soft"));
		WeakReference<VeryBig> w = new WeakReference<VeryBig>(new VeryBig("Weak"));
		System.gc();
		LinkedList<PhantomReference<VeryBig>> pa = new LinkedList<PhantomReference<VeryBig>>();
		for (int i = 0; i < size; i++) {
			pa.add(new PhantomReference<VeryBig>(new VeryBig("Phantom " + i),rq));
			System.out.println("Just created: " + pa.getLast());
			checkQueue();
		}
		
		//gc回收对象，1、stack中没有指向heap中该对象的引用；2、内存充足时，SoftReference指向的对象不会被回收
		
		//弱引用指向
		//weakRefercenceDemo();
		
		phantomReferenceDemo();
	}
	
	/**
	 * 弱引用指向的对象会在gc回收的时候也进行回收，不管是否内存是否充足
	 *
	 * @throws InterruptedException
	 * 
	 * @author	    余冬冬
	 * @data 	 2016年11月28日
	 * @version	 v0.1.0
	 *
	 */
	public static void weakRefercenceDemo() throws InterruptedException{
		Object o = new Object();
		WeakReference<Object> wr = new WeakReference<Object>(o);
		o = null;
		while (wr.get() != null) {
			System.out.println("Object 还未被回收！");
			Thread.sleep(2000);
			System.gc();
		}
		
		System.out.println("Object 已经被回收了！");
	}
	
	public static boolean isRun = true;
	
	/**
	 * 虚引用Demo
	 *
	 * 
	 * @author	    余冬冬
	 * @data 	 2016年11月28日
	 * @version	 v0.1.0
	 *
	 */
	public static void phantomReferenceDemo() throws InterruptedException{
		String abc = new String("abc");
		System.out.println(abc.getClass() + "@" + abc.hashCode());
		final ReferenceQueue<String> rq = new ReferenceQueue<String>();
		new Thread(){
			public void run() {
				while(isRun){
					Object o = rq.poll();
					if( o != null ){
						try {   
							Field rereferent = Reference.class.getDeclaredField("referent");
							rereferent.setAccessible(true);
							Object result = rereferent.get(o);
							System.out.println("gc will collect:" + result.getClass() + "@" + result.hashCode());
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			};
		}.start();
		
		PhantomReference<String> abcWeakRef = new PhantomReference<String>(abc,rq);
		System.out.println("123213" + rq.poll());
		abc = null;
		Thread.currentThread().sleep(3000);
		System.gc();
		Thread.currentThread().sleep(3000);
		isRun = false;
	}
}
