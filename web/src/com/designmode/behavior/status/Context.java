package com.designmode.behavior.status;

public class Context {
	private State state;
	
	public Context(State state){
		this.state = state;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}
	
	public void method(){
		System.out.println("状态为：" + state.getValue());
		
		if(state.getValue().equals("state1")){
			state.method1();
		}else{
			state.method2();
		}
	}
}
