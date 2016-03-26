package com.demo.mongdb;

/**
 * 
 * 
 * @date		2016-1-
 * 
 */
public class MongoDBHelper<T> implements DBHelper<T> {

	@Override
	public int insert(T t) {
		
		return 0;
	}

	@Override
	public boolean connect() {
		return false;
	}

}
