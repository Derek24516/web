package com.ydd.testThread;

public class Bank {
	private final double[] accounts;
	public Bank(int n ,double initialBalance){
		accounts = new double[n];
		for (int i = 0; i < accounts.length; i++) {
			accounts[i] = initialBalance;
		}
	}
	
	public void transfer(int from ,int to ,double amount){
		if(accounts[from] < amount) return ;
		System.out.println(Thread.currentThread());
		accounts[from] -= amount;
		accounts[to]	+= amount;
		
	}
}
