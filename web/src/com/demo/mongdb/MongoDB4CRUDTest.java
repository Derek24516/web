package com.demo.mongdb;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import org.bson.types.ObjectId;
import com.mongodb.BasicDBObject;
import com.mongodb.Bytes;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;
import com.mongodb.QueryOperators;
import com.mongodb.util.JSON;
/**
 * <b>function:</b>实现MongoDB的CRUD操作
 * 
 * @createDate 2011-6-2 下午03:21:23
 * @file MongoDB4CRUDTest.java
 * @package com.hoo.test
 * @project MongoDB
 * @version 1.0
 */
public class MongoDB4CRUDTest {
    
    private Mongo mg = null;
    private DB db;
    private DBCollection users;
    
    /*@Before*/
    public void init() throws UnknownHostException {
        try {
            mg = new Mongo();
            //mg = new Mongo("localhost", 27017);
        } catch (MongoException e) {
            e.printStackTrace();
        }
        //获取temp DB；如果默认没有创建，mongodb会自动创建
        db = mg.getDB("temp");
        //获取users DBCollection；如果默认没有创建，mongodb会自动创建
        users = db.getCollection("users");
    }
    
    /*@After*/
    public void destory() {
        if (mg != null)
            mg.close();
        mg = null;
        db = null;
        users = null;
        System.gc();
    }
    
    public void print(Object o) {
        System.out.println(o);
    }
    
    public void forTest(String str){
    	System.out.println(str);
    }
}