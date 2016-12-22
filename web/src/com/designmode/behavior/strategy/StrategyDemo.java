package com.designmode.behavior.strategy;

/**
 * 策略模式:策略模式定义了一系列的算法，并将每个算法封装起来，是他们可以相互替换，且算法的变化不会影响到使用算法的客户
 * 
 * @date		2016-1-
 * 
 */
public class StrategyDemo {

	public static void main(String[] args) {
		String exp = "8-2";
		ICalculator calculator = new Minus();
		int result = calculator.calculater(exp);
		System.out.println(exp + "=" + result);
	}

}
