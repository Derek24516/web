package com.DesignMode.behavior.strategy;

public class Plus extends AbstractCalculator implements ICalculator {

	@Override
	public int calculater(String exp) {
		int[] arrayInt = split(exp, "\\+");
		
		return arrayInt[0] + arrayInt[1];
	}

}
