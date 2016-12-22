package com.designmode.structuremode.Proxy;

/**
 * 代理模式：多一个代理类出来，替原类进行一些操作，类似中介，掌握着更多的信息
 * 
 * @date		2016-3-27
 * 
 */
public class ProxyDemo {
	public static void main(String[] args) {
		Sourceable source = new Proxy();
		source.method();
	}
}
