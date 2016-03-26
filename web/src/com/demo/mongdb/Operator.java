package com.demo.mongdb;

/**
 * MongoDB操作符枚举
 * 
 * @date		2016-4-15
 * 
 */
public enum Operator {
	/* 等于 */
	Equal("$eq"),
	
	/* 大于或等于 */
	GreaterThan("$gt"),
	
	/* 小于或等于 */
	LessThan("$lt");
	
	//	操作符在MongoDB中的表示值
	private String operator;
	
	private Operator(String operator) {
		this.operator = operator;
	}
	
	public String getOperator() {
		return operator;
	}
}
