package com.DesignMode.behavior.visitor;

import java.util.List;

/**
 * 访问者模式
 * 
 * @date		2016-3-30
 * 
 */
public class VisitorDemo {

	public static void main(String[] args) {
		//	不懂，待研究 T_T
		List<Element> list = ObjectStructure.getList();
		
		for (Element element : list) {
			element.accept(new Visitor());
		}
	}

}
