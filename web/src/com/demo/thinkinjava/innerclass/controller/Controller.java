package com.demo.thinkinjava.innerclass.controller;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年8月13日
 * @version	 v0.1.0
 * 
 */
public class Controller {
	// A class from java.util to hold Event objects:
	private List<Event> eventList = new ArrayList<Event>();

	public void addEvent(Event c) {
		eventList.add(c);
	}

	public void run() {
		while (eventList.size() > 0){
			// Make a copy so you're not modifying the list
			// while you're selecting the elements in it:
			for (Event e : new ArrayList<Event>(eventList)){
				if (e.ready()) {
					System.out.println(e);
					e.action();
					eventList.remove(e);
				}
			}
		}
	}
} // /:~
