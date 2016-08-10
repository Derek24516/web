package com.demo.generic;

import java.util.ArrayList;
import java.util.List;

import com.demo.annotation.Column;

/**
 * 
 * @date		2016-1-
 * 
 */
public class Student {
	
	private String id;
	private String name ;
	
	List<Course> course = new ArrayList<Course>();
	

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Course> getCourse() {
		return course;
	}

	public void setCourse(List<Course> course) {
		this.course = course;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "Name :" + this.name + ",course:" + course + ",id:" + id;
	}
	
	@Override
	public int hashCode() {
		return id.hashCode();
	}
	
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof Student){
			Student s = (Student) obj;
			return s.getId().equals(id);
		}else{
			return false;
		}
	}
}
