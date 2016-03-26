package com.DesignMode.structuremode.combination;

/**
 * 组合模式:将对象组合成树结构以表示“部分-整体”的层次结构，组合模式使得用户对单个对象和组合对象的使用具有一致性。
 * 掌握组合模式的是要理解清楚“部分/整体”，还有“单个对象”与“组合对象”的定义
 * 
 * @date 2016-3-27
 * 
 */
public class CombinationModeDemo {

	public static void main(String[] args) {

		Company root = new ConcreteCompany();
		root.setName("北京总公司");
		root.add(new HRDepartment("总公司人力资源部"));
		root.add(new FinanceDepartment("总公司财务部"));
		
		Company shandongCom = new ConcreteCompany("山东分公司");
		shandongCom.add(new HRDepartment("山东分公司人力资源部"));
		shandongCom.add(new FinanceDepartment("山东分公司账务部"));
		Company zaozhuangCom = new ConcreteCompany("枣庄办事处");
		zaozhuangCom.add(new FinanceDepartment("枣庄办事处财务部"));
		zaozhuangCom.add(new HRDepartment("枣庄办事处人力资源部"));
		Company jinanCom = new ConcreteCompany("济南办事处");
		jinanCom.add(new FinanceDepartment("济南办事处财务部"));
		jinanCom.add(new HRDepartment("济南办事处人力资源部"));
		shandongCom.add(jinanCom);
		shandongCom.add(zaozhuangCom);
		
		Company huadongCom = new ConcreteCompany("上海华东分公司");
		huadongCom.add(new HRDepartment("上海华东分公司人力资源部"));
		huadongCom.add(new FinanceDepartment("上海华东分公司账务部"));
		Company hangzhouCom = new ConcreteCompany("杭州办事处");
		hangzhouCom.add(new FinanceDepartment("杭州办事处财务部"));
		hangzhouCom.add(new HRDepartment("杭州办事处人力资源部"));
		Company nanjingCom = new ConcreteCompany("南京办事处");
		nanjingCom.add(new FinanceDepartment("南京办事处财务部"));
		nanjingCom.add(new HRDepartment("南京办事处人力资源部"));
		huadongCom.add(hangzhouCom);
		huadongCom.add(nanjingCom);
		
		root.add(shandongCom);
		root.add(huadongCom);
		root.display(0);
	}

}
