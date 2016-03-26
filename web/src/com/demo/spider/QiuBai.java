/**
 * 
 */
package com.demo.spider;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

/**
 * Char的一些用法
 * 
 * @date		2016-1-
 * 
 */
public class QiuBai {
	//页数
	private int page = 1 ;
	//客户端浏览器版本
	private static final String user_agent = "Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)";
	//糗百URL
	private static final String URL_QB = "http://m.qiushibaike.com/hot/page/";
	
	private boolean enable = false;
	
	private List<List<QB>> stories;
	
	class QB{
		private	String author;
		private String text ;
		private String dateline;
		private String star;
		
		public QB(){
			
		}
		
		public QB(String author, String text, String dateline, String star) {
            super();
            this.author = author;
            this.text = text;
            this.dateline = dateline;
            this.star = star;
        }
 
        public String getAuthor() {
            return author;
        }
        public void setAuthor(String author) {
            this.author = author;
        }
        public String getText() {
            return text;
        }
        public void setText(String text) {
            this.text = text;
        }
        public String getDateline() {
            return dateline;
        }
        public void setDateline(String dateline) {
            this.dateline = dateline;
        }
        public String getStar() {
            return star;
        }
        public void setStar(String star) {
            this.star = star;
        }
	}
	
	public QiuBai(){
		stories = new ArrayList<List<QB>>();
	}
	
	public String getPage(int page){
		String url = URL_QB + page;
		//构建请求的request
		return "";
	}
}
