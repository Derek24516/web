package com.demo.mongdb;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.util.JSON;

public class MongoDemo {
	public static void main(String[] args) {
		//	基本连接操作
		//baseDemo();
		
		//	新增改查方法
		//testAdd();
		
		//	删除方法
		//testDel();
		
		//	更新
		testUpdate();
	}
	
	/**
	 * 测试mongdb的连接，数据库的创建删除等操作
	 */
	public static void baseDemo(){
		Mongo mg = new Mongo("localhost");
		//查询所有的Database
        for (String name : mg.getDatabaseNames()) {
            System.out.println("dbName: " + name);
        }
        
        DB db = mg.getDB("DB_LIMS");
        //查询所有的聚集集合
        for (String name : db.getCollectionNames()) {
            System.out.println("collectionName: " + name);
        }
        
        DBCollection users = db.getCollection("T_YQPZ_YQXX");
        
        //查询所有的数据
        DBCursor cur = users.find();
        while (cur.hasNext()) {
            System.out.println(cur.next());
        }
        System.out.println(cur.count());
        System.out.println(cur.getCursorId());
        System.out.println(JSON.serialize(cur));
	}
	
	public static void testAdd(){
		Mongo mg = new MongoClient("localhost",27017);
		DB db = mg.getDB( "test" );
		
		//	新增
		DBCollection collection = db.getCollection("t_user");
		DBObject dbo = new BasicDBObject();
		dbo.put("name", "ydd");
		dbo.put("age", "23");
		dbo.put("pwd", "ydd");
		collection.save(dbo);
	}
	
	//	删除
	public static void testDel(){
		Mongo mg = new MongoClient("localhost",27017);
		DB db = mg.getDB("test");
		
		DBCollection collec = db.getCollection("t_user");
		System.out.println(collec.remove(new BasicDBObject("_id",new ObjectId("5667fd99d14b041c9c55f516"))).getN());
		collec.remove(new BasicDBObject("name","ydd"));
	}
	
	//	修改
	public static void testUpdate(){
		Mongo mg = new MongoClient("localhost",27017);
		DB db = mg.getDB("test");
		
		DBCollection collec = db.getCollection("t_user");
		DBObject query = new BasicDBObject();
		query.put("_id", new ObjectId("5667fef9d14b04164c432ada"));
		
		DBObject update = new BasicDBObject();
		//	下面两个更新的区别：
		//	1、更新age为11，其他字段为空；
		//	2、仅更新age字段；
		//update.put("age", "11");
		update.put("$set", new BasicDBObject("age","11"));
		//	后面两个可选参数：数据库不存在的话，是否增加；是否更新多条
		collec.update(query, update);
	}
	
}
