package com.designmode.behavior.iterator;

public class MyCollection implements Collection {

	public String[] strs = {"A","B","C","D"};
	@Override
	public Iterator iterator() {
		return new MyIterator(this);
	}

	@Override
	public Object get(int i) {
		return strs[i];
	}

	@Override
	public int size() {
		return strs.length;
	}

}
