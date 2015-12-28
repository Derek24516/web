package com.pojo;

public class Student implements Cloneable{
	private int age;
	private String name;
	private int id ;
	
	
	public Student(int id) {
		this.id = id;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@Override
	public String toString() {
		return "ID:"+this.id+"hasCode = "+hashCode();
		//return "Name:"+this.name+",Age:"+this.age;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Student other = (Student) obj;
        if (id != other.id)
            return false;
        return true;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
        int result = 1;
        result = prime * result + id;
        return result;
	}
}
