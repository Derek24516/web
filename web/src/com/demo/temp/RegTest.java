package com.demo.temp;

/**
 * 正则表达式测试
 * @author Administrator
 *
 */
public class RegTest {

	public static void main(String[] args) {
		/*String sampleNumber = "FS-652832" + "-";
		//String barCode = "FS-652832-01";
		String barCode = "FS-fs";
		
		String key = escapeExprSpecialWord(sampleNumber);
		String indexStr = barCode.replace(key, "");
		if(isNum(indexStr)){
			int index = Integer.parseInt(indexStr);
			
			System.out.println(index);
		}else{
			System.out.println("非数字");
		}*/
		
		String str = "ph,(1223)";
		

		System.out.println(str.replaceAll(escapeExprSpecialWord("(1223)"), ""));
		
		System.out.println(str);
		
		//wuzhi
	}
	
	/**
	 * 转义正则特殊字符 （$()*+.[]?\^{},|）
	 * 
	 * @param keyword
	 * @return
	 */
	public static String escapeExprSpecialWord(String keyword) {
		if (keyword!=null && !"".equals(keyword)) {
			String[] fbsArr = { "\\", "$", "(", ")", "*", "+", ".", "[", "]", "?", "^", "{", "}", "|" };
			for (String key : fbsArr) {
				if (keyword.contains(key)) {
					keyword = keyword.replace(key, "\\" + key);
				}
			}
		}
		return keyword;
	}
	
	/**
	 * 判断是否为数字
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isNum(String str){
		return str.matches("^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$");
	}

}
