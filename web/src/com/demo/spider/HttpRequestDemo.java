package com.demo.spider;

import java.util.Iterator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

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
		
		testGetQiuBai();
	}

	public static void testGetQiuBai(){
		System.out.println("=========糗事百科爬虫================");
		String result = RequestUtils.sendGet("http://m.qiushibaike.com/hot/page/1", "");
		
		Document doc = Jsoup.parse(result);
		Elements elements = doc.getElementsByClass("untagged");
		Iterator<Element> iterator = elements.iterator();
		int i = 0 ;
		while (iterator.hasNext()) {
			Element e = iterator.next();
			String userName = e.getElementsByClass("author").get(0).getElementsByTag("h2").get(0).ownText();
			String content = e.getElementsByClass("content").get(0).ownText();
			System.out.println(i + ".用户:" +  userName);
			System.out.println(content);
			i++;
			System.out.println("");
		}
		
		
		
		/*Pattern p_allContent = Pattern.compile(".*id=\"content-left\".*?>.*</div>*");
		Matcher m_allContent = p_allContent.matcher(result);
		
		for(int i = 0 ; i < m_allContent.groupCount() ; i ++){
			System.out.println(m_allContent.group(i));
		}*/
		/*while(m_allContent.find()){
			int i = 0 ;
			m_allContent.find(i);
			
		}*/
		//System.out.println(result);
	}
}
