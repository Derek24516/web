package com.designmode.behavior.mediator;

/**
 * 中介者模式：用一个中介对象封装一系列的对象交互。中介者使各对象不需要显示的相互引用，从而使其耦合松散
 * 
 * @date		2016-3-30
 *
 */
public class MediatorDemo {
	
	public static void main(String[] args) {
		 //创建一个中介者  
        AbstractMediator mediator = new Mediator();  
 
        //创建两个同事  
        ColleagueA colleagueA = new ColleagueA(mediator);  
        ColleagueB colleagueB = new ColleagueB(mediator);  
 
        //中介者分别与每个同事建立联系  
        mediator.addColleague("ColleagueA", colleagueA);  
        mediator.addColleague("ColleagueB", colleagueB);  
 
        //同事们开始工作  
        colleagueA.self();  
        colleagueA.out();  
        System.out.println("======================合作愉快，任务完成！\n");  
 
        colleagueB.self();  
        colleagueB.out();  
        System.out.println("======================合作愉快，任务完成！"); 
	}
}
