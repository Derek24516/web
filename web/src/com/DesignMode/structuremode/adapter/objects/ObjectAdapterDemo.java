package com.DesignMode.structuremode.adapter.objects;

/**
 * 适配器模式二：对象的适配器模式
 * 
 * 对象的适配器模式跟类的适配器模式基本类似，只是将Adapter类修改成了Wrapper，不继承Source类，而是用Source实例，以达到解决兼容性的问题
 * 
 * @date		2016-1-
 * 
 */
public class ObjectAdapterDemo {

	public static void main(String[] args) {
		Source source = new Source();
		Targetable target = new Wrapper(source);
		target.method1();
		target.method2();
	}

}
