package com.DesignMode.createMode.mode1;

/**
 * 
 * 普通工厂模式
 * 
 * @date		2016-3-16
 *
 */
public class MyFactory {
	public MyInterface produce(String type) throws Exception{
		if("One".equals(type)){
			return new MyClassOne();
		}else if("Two".equals(type)) {
			return new MyClassTwo();
		}else{
			throw new Exception("没有找到该类型");
		}
	}
}	
