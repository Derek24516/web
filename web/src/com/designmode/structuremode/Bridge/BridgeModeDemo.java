package com.designmode.structuremode.Bridge;


/**
 * 桥接模式：解决多维度的变化
 * 
 * 
 * @date		2016-1-
 * 
 */
public class BridgeModeDemo {
	public static void main(String[] args) {
		/*在提出桥梁模式的时候指出，桥梁模式的用意是”将抽象化(Abstraction)与实现化(Implementation)脱耦，使得二者可以独立地变化”。这句话有三个关键词，也就是抽象化、实现化和脱耦。

		抽象化：存在于多个实体中的共同的概念性联系，就是抽象化。作为一个过程，抽象化就是忽略一些信息，从而把不同的实体当做同样的实体对待。
		实现化：抽象化给出的具体实现，就是实现化。
		脱耦：所谓耦合，就是两个实体的行为的某种强关联。而将它们的强关联去掉，就是耦合的解脱，或称脱耦。在这里，脱耦是指将抽象化和实现化之间的耦合解脱开，或者说是将它们之间的强关联改换成弱关联。*/
		
		AbstractDriverManager driverManager = new MyDriverManager();
		Driver driver1 = new MySqlDriver();
		driverManager.setDriver(driver1);
		driverManager.connect();
		
		//	如果要添加一个DB2、Oracle、MongoDB driver等等，这样是一个维度，加一个即可，这样很好理解
		Driver driver2 = new DB2Driver();
		driverManager.setDriver(driver2);
		driverManager.connect();
		
		//	如果需要在连接前后做一些处理，例如输出一些信息，那么只需要增加一个DriverManager2，如下：
		AbstractDriverManager driverManager2 = new MyDriverManager2();
		driverManager2.setDriver(driver1);
		driverManager2.connect();
	}

}
