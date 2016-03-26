package com.DesignMode.behavior.observer;

/**
 * 观察者模式：观察者模式，类似于邮件订阅和RSS订阅，当邮件有新的通知时，会通知所有的订阅者
 * 
 * @date		2016-3-29
 * 
 */
public class ObserverDemo {

	public static void main(String[] args) {
		Subject sub = new MySubject();
		sub.add(new Observer1());
		sub.add(new Observer2());
		sub.operation();
	}

}
