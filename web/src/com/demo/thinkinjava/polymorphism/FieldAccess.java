package com.demo.thinkinjava.polymorphism;

/**
 * 多态中的同名属性覆盖问题
 * 
 * @autor	    余冬冬
 * @data 	 2016年7月23日
 * @version	 v0.1.0
 * 
 */
public class FieldAccess {
	public static void main(String[] args) {
		//向上转型时，如果子类和父类有一个同名的域，，那么该对象实际上包含了两个同名的变量，它自己的和从父类中得到的（不会覆盖）
		//但是通过get方法，该方法会被覆盖父类的方法，所以得到的是子类实际的域的值
		Super sup = new Sub(); // Upcast
		//sup.field = 0, sup.getField() = 1
		System.out.println("sup.field = " + sup.field + ", sup.getField() = " + sup.getField()); 
		Sub sub = new Sub();
		//sub.field = 1, sub.getField() = 1, sub.getSuperField() = 0
		System.out.println("sub.field = " + sub.field + ", sub.getField() = " + sub.getField() + ", sub.getSuperField() = " + sub.getSuperField());
	}
	
			
}

class Super {
	public int field = 0;

	public int getField() {
		return field;
	}
}

class Sub extends Super {
	public int field = 1;

	public int getField() {
		return field;
	}

	public int getSuperField() {
		return super.field;
	}
}
