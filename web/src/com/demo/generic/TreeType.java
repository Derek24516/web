package com.demo.generic;

public class TreeType extends SetType implements Comparable<TreeType> {

	public TreeType(int i) {
		super(i);
	}

	@Override
	public int compareTo(TreeType o) {
		return o.getI() < i ? -1 : (o.getI() == i ? 0 : 1);
	}
	
}
