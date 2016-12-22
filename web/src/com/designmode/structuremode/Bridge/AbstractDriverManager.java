package com.designmode.structuremode.Bridge;

public abstract class AbstractDriverManager {
	private Driver driver;
	
	public void connect(){
		driver.connect();
	}

	public Driver getDriver() {
		return driver;
	}

	public void setDriver(Driver driver) {
		this.driver = driver;
	}
	
}
