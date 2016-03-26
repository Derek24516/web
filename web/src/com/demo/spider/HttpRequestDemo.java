package com.demo.spider;

/**
 * Java 封装自己发送get、post请求
 * 
 * @date		2016-1-
 * 
 */
public class HttpRequestDemo {

	/**
	 * Char的一些用法
	 *
	 * @param		void
	 * @Exception	IOException
	 * @return 		void
	 * @date		2016-1
	 * 
	 */
	public static void main(String[] args) {
		
		testGetPost();
	}

	public static void testGetPost(){
		String result = HttpRequest.sendGet("http://m.qiushibaike.com/hot/page/1", "");
		
		System.out.println(result);
	}
}
