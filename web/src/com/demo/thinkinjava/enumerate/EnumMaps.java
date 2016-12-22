package com.demo.thinkinjava.enumerate;

import java.util.EnumMap;
import java.util.Map;
import static com.demo.thinkinjava.enumerate.AlarmPoints.*;
import static net.mindview.util.Print.*;

interface Command {
	void action();
}

/**
 * EnumMap的用法 : key必须是一个enum
 * 1.下面这个Demo也展示了命令模式，Command是一个命令接口，EnumMap对应各种命令，各种命令对应的实现类可以不同
 * 2.但是这跟之前的DeignMode中的命令模式不同的是，该Demo的命令是一个Enum，最好是在命令个数已经确定的情况下使用比较好，再扩展命令就需要再Enum中增加枚举；
 *
 * @author	    余冬冬
 * @data 	 2016年12月19日
 * @version	 v0.1.0
 *
 */
public class EnumMaps {

	public static void main(String[] args) {
		EnumMap<AlarmPoints, Command> em = new EnumMap<AlarmPoints, Command>(AlarmPoints.class);
		em.put(KITCHEN, new Command() {
			public void action() {
				print("Kitchen fire!");
			}
		});
		
		em.put(KITCHEN, new Command() {
			public void action() {
				print("Kitchen fire2!");
			}
		});
		em.put(BATHROOM, new Command() {
			public void action() {
				print("Bathroom alert!");
			}
		});
		for (Map.Entry<AlarmPoints, Command> e : em.entrySet()) {
			printnb(e.getKey() + ": ");
			e.getValue().action();
		}
		try { // If there's no value for a particular key:
			em.get(UTILITY).action();
		} catch (Exception e) {
			print(e);
		}
	}
}
