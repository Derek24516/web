package com.DesignMode.behavior.command;

/**
 * 命令模式:司令员下令让士兵去干件事情，从整个事情的角度来考虑，司令员的作用是，发出口令，口令经过传递，传到了士兵耳朵里，士兵去执行。
 * 这个过程好在，三者相互解耦，任何一方都不用去依赖其他人，只需要做好自己的事儿就行，司令员要的是结果，不会去关注到底士兵是怎么实现的。
 * 
 * 命令模式的目的就是达到命令的发出者和执行者之间解耦，实现请求和执行分开,Struts其实就是一种将请求和呈现分离的技术，其中必然涉及命令模式的思想！
 * 
 * @date		2016-3-30
 * 
 */
public class CommandDemo {

	public static void main(String[] args) {
		Receiver receiver = new Receiver();
		Command command = new MyCommand(receiver);
		Invoker invoker = new Invoker(command);
		invoker.action();
	}

}
