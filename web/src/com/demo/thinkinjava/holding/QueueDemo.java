package com.demo.thinkinjava.holding;

import java.util.LinkedList;
import java.util.Queue;
import java.util.Random;

/**
 * Queue的Demo
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年8月24日
 * @version	 v0.1.0
 * 
 */
public class QueueDemo {

	public static void main(String[] args) {
		Queue<Integer> queue = new LinkedList<Integer>();
		Random ran = new Random(47);
		for( int i = 0 ; i < 10 ; i ++){
			queue.offer(ran.nextInt(i + 10));
		}
		printQ(queue);
		
		Queue<Character> qc = new LinkedList<Character>();
		for(char c : "Hello World ".toCharArray()){
				qc.offer(c);
		}
		printQ(qc);
	}

	public static void printQ(Queue queue){
		while(queue.peek() != null){
			System.out.print(queue.remove() + " ");
		}
		System.out.println("");
	}
}
