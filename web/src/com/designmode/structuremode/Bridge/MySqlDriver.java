package com.designmode.structuremode.Bridge;

public class MySqlDriver implements Driver {

	@Override
	public void connect() {
		System.out.println("connect mysql done !");
	}

}
