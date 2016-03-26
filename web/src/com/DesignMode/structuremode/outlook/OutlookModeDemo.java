package com.DesignMode.structuremode.outlook;

/**
 * 外观模式：解决类与类之间的依赖关系，类似spring，可以将类和类的关系配置到配置文件中，而外观模式
 * 就是将他们的关系放在一个Fascade类中，降低了类和类之间的耦合度，该模式中没有涉及到接口
 * 
 * @date		2016-3-27
 * 
 */
public class OutlookModeDemo {
	public static void main(String[] args){
		Computer computer = new Computer();
		computer.stratup();
	}
}
