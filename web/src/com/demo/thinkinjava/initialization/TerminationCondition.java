package com.demo.thinkinjava.initialization;

/**
 * Syste.gc的理解
 * 
 * @autor 	余冬冬
 * @data 	2016年7月20日
 * @version v0.1.0
 *
 */
public class TerminationCondition {
	
	public static void main(String[] args) {
		/*
		 * 理解：垃圾回收机制可以做这样一个场景：
		 * 书本和读者的关系，书本相当于是一个对象，读者看书就相当于是对象的引用
		 * 而垃圾回收机制gc就相当有书本管理员
		 * new一个对象，就相当于是，读者read1要读一个本book1，持用对象的引用
		 * 在读者不读这本书之后，就把这本书放到桌上，然后书本管理员看到这本书放置在这没人持有之后，就把它给回收放好了。
		 * 
		 */
		Book novel = new Book(true);
		// Proper cleanup:
		novel.checkIn();
		// Drop the reference, forget to clean up:
		new Book(true);
		// Force garbage collection & finalization:
		System.gc();
	}
}

class Book {
	boolean checkedOut = false;

	Book(boolean checkOut) {
		checkedOut = checkOut;
	}

	void checkIn() {
		checkedOut = false;
	}

	protected void finalize() {
		if (checkedOut)
			System.out.println("Error: checked out");
		// Normally, you'll also do this:
		// super.finalize(); // Call the base-class version
	}
}