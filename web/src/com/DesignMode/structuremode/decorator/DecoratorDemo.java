package com.DesignMode.structuremode.decorator;

/**
 * 装饰模式：在不必改变原类文件和使用继承的情况下，动态的扩展一个对象的功能。它是通过创建一个包装对象，也就是装饰来包裹真实的对象。
 * 
 * 1、装饰模式和真是对线有相同的接口，这样客户端就能以和真是对象相同的方式和装饰对象交互；
 * 2、装饰对象包含一个真实对象的引用；
 * 3、装饰对象接受所有来自客户端的请求，它把这些请求转发给真实的对象
 * 4、装饰对象可以在转发这些请求以前或者之后增加一些附加的功能，在方法前后各做一些处理动作
 * 
 * @date		2016-3-27
 * 
 */
public class DecoratorDemo {

	public static void main(String[] args) {
		Sourceable source = new Source();
		Sourceable decorator = new Decorator(source);
		
		decorator.method();
	}

}
