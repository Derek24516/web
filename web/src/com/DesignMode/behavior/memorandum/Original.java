package com.DesignMode.behavior.memorandum;

public class Original {
	private String value;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	public Original(String value){
		this.value = value;
	}
	
	public Memorandum createMemorandum(){
		return new Memorandum(value);
	}

	public void restoreMemento(Memorandum memo) {
		this.value = memo.getValue();
		
	}
}
