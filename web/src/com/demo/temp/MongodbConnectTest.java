package com.demo.temp;

import java.util.Set;

import com.mongodb.DB;
import com.mongodb.MongoClient;

public class MongodbConnectTest {

	public static void main(String[] args) {
		MongoClient mongoClient = new MongoClient("localhost",27017);
		DB db = mongoClient.getDB("test");
		
		Set<String> collectionNames =  db.getCollectionNames();
		for (String collectionName : collectionNames) {
			System.out.println(collectionName);
		}
	}

}
