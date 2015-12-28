package com.ydd.util;

/**
 * 
* @ClassName  StringUtil 
* @Description  封装一些关于String的操作方法
* @author 余冬冬
* @date 2015年9月25日 下午2:28:17 
*
*/
public class StringUtils {
	public static final String SPLIT_COMMA = ",";

	public static void main(String[] args) {
	}
	
	/**
	* 
	* @Title: isEmty 
	* @Description: 判断str是否为null或者""
	* @param str    
	* @throws 
	*
	* @author 余冬冬
	* @date 2015年9月25日 下午2:29:13
	*/
	public static boolean isEmty(String str){
		return (str == null) || (str == "") ;
	}
	
	/**
	* @Title: removePartOfString 
	* @Description: 从一个字符串中移除一部分
	* @param sourceStr
	* @param part
	* @return    
	* @throws 
	*
	* @author 余冬冬
	* @date 2015年11月12日 下午4:21:44
	 */
	public static String removePartOfString(String sourceStr,String part){
		//	只剩最后一个项目时，没有逗号，就先补上
		if(!sourceStr.contains(SPLIT_COMMA)){
			sourceStr += SPLIT_COMMA;
		}
		//	part中可能包含正则表达式关键字的话，要先进行转义，再进行替换
		part = escapeExprSpecialWord(part);
		
		return sourceStr.replaceAll(part, "");
	}
	
	/**
	* @Title: escapeExprSpecialWord 
	* @Description: 将字符串中包含正则表达式的关键字进行转义
	* @param sourceStr		
	* @return    			转义之后的字符串
	* @throws 
	*
	 */
	public static String escapeExprSpecialWord(String str) { 
		//	正则表达式的一些关键字
		String[] keys ={"\\","$","(",")","*","+",".","[","]","?","^","{","}","|"};
		for (String key : keys) {
			if(str.contains(key)){
				str = str.replaceAll(key, "\\" + key);
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
		return str.matches("^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$");
	}
}
