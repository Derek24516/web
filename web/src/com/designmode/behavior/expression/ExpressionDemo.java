package com.designmode.behavior.expression;

/**
 * 
 * 解释器模式：给定一种语言，定义他的文法的一种表示，并顶一个一个解释器，该解释器使用其来表示语言中的句子
 * 
 * @date 2016-3-30
 *
 */
public class ExpressionDemo {

	public static void main(String[] args) {
		 // 计算9+2-8的值
		int result = new Minus().interpret((new Context(new Plus()
				.interpret(new Context(9, 2)), 8)));
		System.out.println(result);
	}

}
