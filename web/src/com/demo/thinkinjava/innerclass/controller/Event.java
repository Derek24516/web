package com.demo.thinkinjava.innerclass.controller;

/**
 * 
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年8月13日
 * @version	 v0.1.0
 * 
 */
public abstract class Event {
	  private long eventTime;
	  protected final long delayTime;
	  public Event(long delayTime) {
	    this.delayTime = delayTime;
	    start();
	  }
	  public void start() { // Allows restarting
	    eventTime = System.nanoTime() + delayTime;
	  }
	  public boolean ready() {
	    return System.nanoTime() >= eventTime;
	  }
	  public abstract void action();
	} ///:~

