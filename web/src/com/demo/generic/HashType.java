package com.demo.generic;

public class HashType extends SetType {
	public HashType(int n){
		super(n);
	}
	
	@Override
	public int hashCode() {
		return i;
	}
}
