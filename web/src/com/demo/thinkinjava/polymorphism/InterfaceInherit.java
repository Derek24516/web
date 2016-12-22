package com.demo.thinkinjava.polymorphism;

/**
 * 接口继承和接口的向上转型
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年11月26日
 * @version	 v0.1.0
 * 
 */
public class InterfaceInherit {
	
	public static interface PInterface{
		public static int staticV = 0;
		public static final int fstaticV = 0;
		public int nStaticV = 0;
	
		/*public final static void staticMethod(){
			System.out.println("test");
		}*/
		
		/*public void nStaticMethod(){
			System.out.println("test");
		}*/
		public void PMethod();
	}
	
	public static interface CInterface extends PInterface{
		public void CMethod();
	}

	public static CInterface returnC(){
		CInterface c = null;
		return c;
	}
	
	public static PInterface returnP(){
		PInterface p = null;
		return p;
	}
	
	public abstract class AClass {
		//public static int staticV = 0;
		public static final int fstaticV = 0;
		public int nStaticV = 0;
		
		/*public static  void staticMethod(){
			System.out.println("test");
		}
		*/
		public final void nStaticMethod(){
			System.out.println("test");
		}
	}
	
	public static void main(String[] args) {
		//CInterface c = (CInterface) returnP();
		//PInterface p = returnC();
		//PInterface.test();
	}

}
