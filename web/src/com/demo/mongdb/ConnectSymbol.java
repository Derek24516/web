package com.demo.mongdb;

/**
 * MongoDB连接符
 * 
 * @date		2016-4-15
 * 
 */
public enum ConnectSymbol {
	And("$and"),
	Or("$or");
	
	private String symbol;
	
	private ConnectSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getSymbol() {
		return symbol;
	}
}
