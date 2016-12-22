package com.demo.thinkinjava.holding;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Random;

/**
 * 带有优先级的队列Demo--
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年8月24日
 * @version	 v0.1.0
 * 
 */
public class PriorityDemo {

	/**
	 *
	 * @param args
	 * 
	 * @author	    余冬冬
	 * @data 	 2016年8月24日
	 * @version	 v0.1.0
	 * 
	 */
	public static void main(String[] args) {
		//自定义一个比较器来实现自定义的排序
		PriorityQueue<Integer> priorityQueue = new PriorityQueue<Integer>(new Comparator<Integer>() {

			@Override
			public int compare(Integer o1, Integer o2) {
				int v1 = o1 % 3;
				int v2 = o2 % 3;
				
				return v1 - v2;
			}
		});
		Random rand = new Random(47);
		for(int i = 0; i < 10; i++){
			int t = rand.nextInt(i + 10);
			System.out.print(t + " ");
			priorityQueue.offer(t);
		}
		System.out.println("-----");
		
		      
		QueueDemo.printQ(priorityQueue);
		
		
		List<Integer> ints = Arrays.asList(225, 22, 20,18, 14, 9, 3, 1, 1, 2, 3, 9, 14, 18, 21, 23, 25);
		priorityQueue = new PriorityQueue<Integer>(ints);
	    QueueDemo.printQ(priorityQueue);
	    priorityQueue = new PriorityQueue<Integer>(ints.size(), Collections.reverseOrder());
	    priorityQueue.addAll(ints);
	    QueueDemo.printQ(priorityQueue);	
	}

}
