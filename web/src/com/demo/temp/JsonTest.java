package com.demo.temp;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class JsonTest {
	public static void main(String[] args) {
		JSONObject jo = new JSONObject();
		jo.put("name", "ydd");
		JSONArray jr = new JSONArray();
		JSONObject jr1 = new JSONObject();
		jr1.put("CourseName","Chinese");
		jr1.put("CourseTeacher","HeHe");
		jr1.put("CourseScore",20);
		jr.add(jr1);
		JSONObject jr2= new JSONObject();
		jr2.put("CourseName","English");
		jr2.put("CourseTeacher","HeHe2");
		jr2.put("CourseScore",30);
		jr.add(jr2);
		System.out.println(jr2);
		jo.put("course", jr);
		System.out.println(jo);
	}
}
