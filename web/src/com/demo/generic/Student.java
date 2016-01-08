/**
 * 
 */
package com.demo.generic;

import java.util.ArrayList;
import java.util.List;

/**
 * Char的一些用法
 * 
 * @date		2016-1-
 * 
 */
public class Student {
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
	
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Name :" + this.name + ",course:" + course;
	}
}
