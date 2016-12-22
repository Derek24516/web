package com.designmode.structuremode.adapter.classs;


public class AdapterClass extends Source implements Targetable {


	@Override
	public void method2() {
		System.out.println(this.getClass().getName());
	}

}
