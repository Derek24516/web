package com.DesignMode.createMode.mode5;

/**
 * 建造者模式：是一个复杂的对象的构建与他的表示分离，是的同样的构建过程可以创建不同的的表示
 * 
 * 建造者模式通常包括以下几个角色：
 * 1、builder ： 给出一个抽象接口，以规范产品对象的各个组成成分的建造。这个接口规定要实现复杂对象的哪些部分的创建，并不涉及具体的对象部件的创建；
 * 2、ConcreteBuilder：实现builder接口，针对不同的商业逻辑，具体化复杂对象的各部分的创建。在建造过程完成后，提供产品的实例；
 * 3、Diector：调用具体建造者来创建复杂对象的各个部分，在指导者中不涉及具体产品的信息，只负责保证对象的各部分完整创建或者按某中顺序创建；
 * 4、Product：要创建的复杂的对象
 * 
 * @date		2016-3-16
 * 
 */
public class FactoryDemo {

	public static void main(String[] args) {
		try {
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
