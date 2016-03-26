package com.demo.mongdb;

/**
 * 数据库公用接口
 * 
 * @date		2016-1-
 * 
 */
public interface DBHelper<T> {
	
	public boolean connect();
	
	public int insert(T t);
}
