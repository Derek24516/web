package com.demo.thinkinjava.thread;

import java.util.ArrayList;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class TaskWithResult implements Callable<String> {
	private int id;

	public TaskWithResult(int id ) {
		this.id = id;
	}

	@Override
	public String call() throws Exception {
		return "result of  TaskWithResult : " + id;
	}

	public static void main(String[] args) {
		ExecutorService exec = Executors.newCachedThreadPool();
		ArrayList<Future<String>> results = new ArrayList<Future<String>>();
		for( int i = 0 ; i < 10 ; i ++ ){
			results.add(exec.submit(new TaskWithResult(i)));
		}
		try {
			for (Future<String> fs : results) {
				System.out.println(fs.get());
			}
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		} finally{
			exec.shutdown();
		}
	}
}
