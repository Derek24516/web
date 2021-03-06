package com.designmode.behavior.memorandum;

/**
 * 备忘录模式：主要目的是保存一个对象的某个状态，以便在适当的时候恢复对象
 * 
 * @date		2016-1-
 * 
 */
public class MemorandumDemo {

	public static void main(String[] args) {
		// 创建原始类
        Original origi = new Original("egg");
 
        // 创建备忘录
        Storage storage = new Storage(origi.createMemorandum());
 
        // 修改原始类的状态
        System.out.println("初始化状态为：" + origi.getValue());
        origi.setValue("niu");
        System.out.println("修改后的状态为：" + origi.getValue());
 
        // 回复原始类的状态
        origi.restoreMemento(storage.getMemo());
        System.out.println("恢复后的状态为：" + origi.getValue());
	}

}
