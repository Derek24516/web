package com.DesignMode.behavior.template;

/**
 * 模板方法模式：一个抽象类中，有一个主方法，再定义1..n个方法，可以是抽象的，也可以是实际的方法，通过继承重写其中的方法，
 * 
 * @date		2016-1-
 * 
 */
public class TemplateDemo {

	public static void main(String[] args) {
		String exp = "8+8";  
        AbstractCalculator cal = new Plus();  
        int result = cal.calculate(exp, "\\+");  
        System.out.println(result);  
	}

}
