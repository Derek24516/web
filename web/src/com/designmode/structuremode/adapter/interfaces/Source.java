package com.designmode.structuremode.adapter.interfaces;


public class Source {
	public void method1(){
		System.out.println(Thread.currentThread().getStackTrace()[1].getClassName());
	}
}
