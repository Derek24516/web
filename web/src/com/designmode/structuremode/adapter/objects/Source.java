package com.designmode.structuremode.adapter.objects;


public class Source {
	public void method1(){
		System.out.println(Thread.currentThread().getStackTrace()[1].getClassName());
	}
}
