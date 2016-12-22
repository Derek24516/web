package com.designmode.behavior.strategy;

public class Multiply extends AbstractCalculator implements ICalculator {

	@Override
	public int calculater(String exp) {
		int[] arrayInt = split(exp, "\\*");
		
		return arrayInt[0] * arrayInt[1];
	}

}
