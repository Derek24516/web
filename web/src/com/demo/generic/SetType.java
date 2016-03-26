package com.demo.generic;

public class SetType {
	int i ;
	
	public SetType(int i ){
		this.i = i;
	}
	
	public int getI() {
		return i;
	}

	public void setI(int i) {
		this.i = i;
	}
	
	public boolean equals(Object o){
		return o instanceof SetType && (((SetType)o).getI() == i);
	}

	@Override
	public String toString() {
		return Integer.toString(i);
	}
}	
