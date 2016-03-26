package com.DesignMode.behavior.strategy;

public class Minus extends AbstractCalculator implements ICalculator {

	@Override
	public int calculater(String exp) {
		int[] arrayInt = split(exp, "\\-");
		
		return arrayInt[0] - arrayInt[1];
	}

}
