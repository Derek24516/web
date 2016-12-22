package com.designmode.behavior.expression;

public class Minus implements Expression {

	@Override
	public int interpret(Context contex) {
		return contex.getNum1() - contex.getNum2();
	}

}
