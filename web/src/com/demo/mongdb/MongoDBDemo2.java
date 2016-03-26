package com.demo.mongdb;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Locale;
import org.bson.Document;
import org.bson.conversions.Bson;
import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

/**
 * MongoDB3.2 Demo，跟MongoDB2.0可能有一些不同的地方
 * 
 * @date 2016-1-
 * 
 */
public class MongoDBDemo2 {

	private MongoClient mongoClient = null;

	private MongoDatabase mongoDatabase = null;

	public static void main(String[] args) {
		MongoDBDemo2 demo = new MongoDBDemo2();
		
		
		try {
			//System.out.println(Operator.GreaterThan.getValue());
			
			demo.connect();
			
			//demo.insertOne();
			
			demo.query();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * MongoDB连接
	 *
	 * @date 2016-4-15
	 * 
	 */
	public void connect() {
		mongoClient = new MongoClient();
		mongoDatabase = mongoClient.getDatabase("test");
	}

	/**
	 * MongoDB新增一条记录
	 *
	 * @date 2016-4-15
	 * 
	 */
	public void insertOne() throws ParseException {
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'",Locale.ENGLISH);
		mongoDatabase
				.getCollection("restaurants")
				.insertOne(
						new Document()
								.append("street", "2 Avenue")
								.append("zipcode", "10075")
								.append("building", "1480")
								.append("coord",
										Arrays.asList(-73.9557413, 40.7720266))
								.append("borough", "Manhattan")
								.append("cuisine", "Italian")
								.append("name", "Vella")
								.append("restaurant_id", "41704620")
								.append("grades",
										Arrays.asList(
												new Document()
														.append("date",
																format.parse("2014-10-01T00:00:00Z"))
														.append("grade", "A")
														.append("score", 11),
												new Document()
														.append("date",
																format.parse("2014-01-16T00:00:00Z"))
														.append("grade", "B")
														.append("score", 17))));
	}
	
	/**
	 * MongoDB查询Demo
	 *
	 * @date 2016-4-15
	 * 
	 */
	public void query(){
		Document condition = new Document();
		condition
		/**	基本的条件查询，	**/
		//.append("restaurant_id", "30075445")
		/**	And Or 的用法 ,and用append即可	**/
		.append(ConnectSymbol.Or.getSymbol(), Arrays.asList(new Document("restaurant_id","30075445"),new Document("restaurant_id","40356068")));
		/**	查询中，如果一个对象的一个属性是一个对象（或对象数组），要对该属性对象中某个属性进行过滤时，用.即可	**/
		//.append("grades.grade", "A");	
		
		//	查询中，也可以用Filter的eq、lt、gt等等方法来过滤
		Bson condition2 = Filters.eq("grades.grade", "A");
		
		FindIterable<Document> iterable = mongoDatabase.getCollection("restaurants").find(condition);
		
		//	TODO 分组
		
		//对查询的结果进行遍历
		iterable.forEach(new Block<Document>() {
			@Override
			public void apply(Document document) {
				System.out.println(document);
			}
		});
	}
	
}
