/**
 * 
 */
package com.demo.thinkInJava.resuing;

/**
 *
 * Final 修饰参数，代表无法在参数中更改参数所指向的对象
 * 
 * @autor	    余冬冬
 * @data 	 2016年7月23日
 * @version	 v0.1.0
 * 
 */
class Gizmo {
	public void spin() {
	}
}

public class FinalArguments {
	void with(final Gizmo g) {
		// ! g = new Gizmo(); // Illegal -- g is final 报错，final修饰的参数指向的引用类型不可以修改
	}

	void without(Gizmo g) {
		g = new Gizmo(); // OK -- g not final
		g.spin();
	}

	// void f(final int i) { i++; } // Can't change
	// You can only read from a final primitive:
	int g(final int i) {
		return i + 1;
	}

	public static void main(String[] args) {
		FinalArguments bf = new FinalArguments();
		bf.without(null);
		bf.with(null);
	}
} // /:~

