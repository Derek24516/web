/**
 * 
 */
package com.demo.generic;

/**
 * Char的一些用法
 * 
 * @date		2016-1-
 * 
 */
public class Course {
	private int scores ;
	
	private String courseName ;

	public int getScores() {
		return scores;
	}

	public void setScores(int scores) {
		this.scores = scores;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	
	@Override
	public String toString() {
		return "courseName:" + courseName + ",scores:" + scores;
	}
}
