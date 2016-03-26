package com.DesignMode.behavior.memorandum;

public class Storage {
	private Memorandum memo;
	
	public Storage(Memorandum memo){
		this.memo = memo;
	}

	public Memorandum getMemo() {
		return memo;
	}

	public void setMemo(Memorandum memo) {
		this.memo = memo;
	}
	
	
}
