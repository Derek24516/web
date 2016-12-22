package com.designmode.behavior.command;

/**
 * Char的一些用法
 * 
 * @date		2016-1-
 * 
 */
public class MyCommand implements Command {
	private Receiver receiver ;
	
	public MyCommand(Receiver receiver){
		this.receiver = receiver;
	}

	@Override
	public void execute() {
		receiver.action();
	}

}
