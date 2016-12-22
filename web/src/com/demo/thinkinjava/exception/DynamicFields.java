package com.demo.thinkinjava.exception;

class DynamicFieldsException extends Exception{}

public class DynamicFields {
	
	private Object[][] fields;
	
	public DynamicFields(int initialSize){
		fields = new Object[initialSize][2];
		for (int i = 0; i < initialSize; i++) {
			fields[i] = new Object[]{null,null};
		}
	}
	
	@Override
	public String toString() {
		StringBuilder result = new StringBuilder();
	    for(Object[] obj : fields) {
	      result.append(obj[0]);
	      result.append(": ");
	      result.append(obj[1]);
	      result.append("\n");
	    }
	    return result.toString();
	}
	
	private int hasField(String id) {
	    for(int i = 0; i < fields.length; i++)
	      if(id.equals(fields[i][0]))
	        return i;
	    return -1;
	}
	
	private int getFieldNumber(String id) throws NoSuchFieldException {
	    int fieldNum = hasField(id);
	    if(fieldNum == -1)
	      throw new NoSuchFieldException();
	    return fieldNum;
	}
	
	public static void main(String[] args) {

	}

}
