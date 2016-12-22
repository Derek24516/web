package com.demo.thinkinjava.polymorphism;

class StaticSuper {
	public static String staticGet() {
		return "Base staticGet()";
	}

	public String dynamicGet() {
		return "Base dynamicGet()";
	}
}

class StaticSub extends StaticSuper {
	public static String staticGet() {
		return "Derived staticGet()";
	}

	public String dynamicGet() {
		return "Derived dynamicGet()";
	}
}

/**
 * 静态方法不具备多态性的示例
 * 静态方法是与类，而并非是与某个对象相关联的
 * 
 * @autor 	余冬冬
 * @data 	2016年7月23日
 * @version v0.1.0
 * 
 */
public class StaticPolymorphism {
	public static void main(String[] args) {
		StaticSuper sup = new StaticSub(); // Upcast
		//Base staticGet()
		System.out.println(sup.staticGet());
		//Derived dynamicGet()
		System.out.println(sup.dynamicGet());
	}
} 
