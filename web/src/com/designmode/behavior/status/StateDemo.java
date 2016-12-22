package com.designmode.behavior.status;

/**
 * 状态模式：当对象的状态改变时，同时改变其行为，例如QQ，有几种状态：在线、隐身。。每个状态对应不同的操作
 * 
 * @date		2016-3-30
 * 
 */
public class StateDemo {

	public static void main(String[] args) {
		State state = new State();
		Context context = new Context(state);
		
		state.setValue("state1");
		context.method();
		
		state.setValue("state2");
		context.method();
	}

}
