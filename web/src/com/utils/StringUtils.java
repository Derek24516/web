package com.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 
 * @description	封装一些常用的String的用法
 * @date		2015-11-28
 *
 */
public class StringUtils {
	/** 符号：,	*/
	public static final String COMMA = ",";
	
	/** 符号：- */
	public static final String CROSS = "-";
	
	/** 符号：@ */
	public static final String CIRCLE_A = "@";
	
	/** 字符串空 */
	public static final String EMPTY = "";

	/**
	 * 
	 * @description	测试util中的函数的main函数
	 * @return 		void
	 * @date		2015-12-28
	 *
	 */
	public static void main(String[] args) {
		String str = "1,2[2,3[,4,5,2[2,4";
		String s = removePartOfString(str, "2[2", COMMA, false);
		System.out.println(s);
	}
	
	/**
	 * 
	 * 判断str是否为null或者""
	 * 
	 * @param		void
	 * @return 		boolean 
	 * @date		2015-12-28
	 *
	 */
	public static boolean isEmpty(String str){
		return (str == null) || EMPTY.equals(str) ;
	}
	
	/**
	 * 
	 * @description	String按照分隔符，转换成List
	 * @param		source		字符串
	 * @param		splitStr	分隔符
	 * @Exception	IOException
	 * @return 		void
	 * @date		2015-12-28
	 *
	 */
	public static List<String> strToList(String source,String splitStr){
		if(isEmpty(splitStr)){
			splitStr = COMMA;
		}
		return new ArrayList<String>(Arrays.asList(source.split(splitStr)));
	}
	
	/**
	 * 
	 *	从字符串中去除一部分							
	 * 	<br/>	例如											
	 * 	<br/>	String str = "1,2,3,4";
	 * 	<br/>	str = removePartOfString(str,"3",",");
	 * 	<br/>	str就变成了1,2,4
	 * 
	 * @param		sourceStr		原字符串
	 * @param		part			需要去除的部分字符串
	 * @param		splitStr		分隔符
	 * @param		removeMulti		是否去除多个，true移除所有指定的；false时，只去除匹配的第一个
	 * @return 		String			去除指定字符串后的新字符串
	 * @date		2015-12-28
	 *
	 */
	public static String removePartOfString(String sourceStr,String part,String splitStr,boolean removeMulti){
		if(isEmpty(sourceStr) || isEmpty(splitStr)){
			return sourceStr;
		}
		
		sourceStr += splitStr;
		part += splitStr;
		
		if(removeMulti){
			sourceStr = sourceStr.replace(part, "");
		}else{
			part = escapeExprSpecialWord(part);
			sourceStr = sourceStr.replaceFirst(part, "");
		}
		int length = splitStr.length();
		sourceStr = sourceStr.substring(0,sourceStr.length() - length);
		
		return sourceStr;
	}
	
	/**
	 * 转义正则中的特殊字符
	 * 
	 * @param		str			需转义的字符串
	 * @return 		String		转义后的字符串
	 * @date		2015-12-28
	 *
	 */
	public static String escapeExprSpecialWord(String str) { 
		//	正则表达式的一些关键字:\$()*+.[]?^{}|
		String[] keys ={"\\","$","(",")","*","+",".","[","]","?","^","{","}","|"};
		for (String key : keys) {
			if(str.contains(key)){
				str = str.replace(key, "\\" + key);
			}
		}
		return str;
	}
	
	/**
	 * 判断是字符串否为数字
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isNum(String str){
		// TODO
		return str.matches("^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$");
	}
}
