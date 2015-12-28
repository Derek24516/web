package com.demo.datastructure.leetcode;

import java.util.Random;

/**
 *  java链表
 * @author Administrator
 *
 */
public class ListNode {
	public int val;
	public ListNode next;
	
	public ListNode(int val) {
		this.val = val;
		this.next = null;
	}

	/**
	 * 反转链表
	 */
	public static ListNode reverse(ListNode head){
		ListNode pre = null;
		while(head  !=  null){
			ListNode next = head.next;
			head.next = pre;
			pre = head;
			head = next;
		}
		
		return pre;
	}
	/**
	 * 显示链表中内容
	 */
	public static void showList(ListNode head){
		while(head != null){
			System.out.println(head.val);
			head = head.next;
		}
	}
	
	public static void main(String[] args){
		ListNode head = new ListNode(0);
		
		// 初始化一个链表
		ListNode curr = head;
		for(int i = 0 ; i < 3 ; i++){
			Random r = new Random();
			int val = r.nextInt(10);
			
			ListNode node = new ListNode(val);
			curr.next = node;
			curr = node;
		}
		showList(head);
	}
}
