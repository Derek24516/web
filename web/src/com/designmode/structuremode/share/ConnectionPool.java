package com.designmode.structuremode.share;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Vector;

/**
 * 
 * 享元模式：主要目的是实现对象的共享，即共享池，当系统中对象多的时候可以减少内存的开销，通常与工厂模式一起使用(例如下面仿照的一个线程池例子)
 * 
 * @date		2016-1-
 *
 */
public class ConnectionPool {
	private Vector<Connection> pool;
	
	/* 公有属性 */
	private String url = "jdbc:mysql://localhost:3306/test";
	private String userName = "root";
	private String password = "root";
	private String driverClassName = "com.mysql.jdbc.Driver";
	
	private int poolSize = 100;
	private static ConnectionPool instance = null;
	Connection conn = null;
	
	/* 构造方法，做一些初始化工作  */
	private ConnectionPool() throws ClassNotFoundException, SQLException{
		pool = new Vector<Connection>(poolSize);
		
		for (int i = 0; i < poolSize; i++) {
			Class.forName(driverClassName);
			conn = DriverManager.getConnection(url, userName, password);
			pool.add(conn);
		}
	}
	
	public synchronized void release(){
		pool.add(conn);
	}
	
	public synchronized Connection getConnection(){
		if(pool.size() > 0){
			Connection conn = pool.get(0);
			pool.remove(conn);
			
			return null;
		}else{
			//	TODO 优化，外部循环等待获取，或是重新建立一个连接，自动加入到线程池中扩容？
			return null;
		}
	}
}
