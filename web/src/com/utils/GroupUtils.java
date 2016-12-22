package com.utils;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 对Java中的List进行分组的Demo，其中包含两种方式
 * 
 * 1、实现Groupable<T,V>接口进行分组
 * 2、用分组器Groupator进行分组
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年11月21日
 * @version	 v0.1.0
 *
 */
public class GroupUtils {
	
	/**
	 * 分组接口，T是分组对象类型，V是最后封装的Map的的Value中List的基本类型
	 *
	 * @param <T>
	 * @param <V>
	 * 
	 * @author	    余冬冬
	 * @data 	 2016年11月21日
	 * @version	 v0.1.0
	 *
	 */
	public static interface Groupable<T,V>{
		public String groupKey();
		
		public V groupValue();
	}
	
	static class Student implements Groupable<Student,Student>{
		private String classId;
		private int age;
		private String name;
		
		public Student() {
		
		}
		
		public Student(String classId,int age,String name) {
			this.classId = classId;
			this.age = age;
			this.name = name;
		}
		
		public String getClassId() {
			return classId;
		}

		public void setClassId(String classId) {
			this.classId = classId;
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

		@Override
		public String groupKey() {
			return "classId=" + classId  + "&&age=" + age;
		}

		@Override
		public Student groupValue() {
			return this;
		}
		
	}
	
	public static <T, V> Map<String,List<Groupable<T,V>>> group(List<Groupable<T,V>> objs){
		Map<String,List<Groupable<T,V>>> result = new LinkedHashMap<String, List<Groupable<T,V>>>();
		for (Groupable<T,V> groupable : objs) {
			String key = groupable.groupKey();
			
			if(result.containsKey(key)){
				result.get(key).add(groupable);
			}else{
				List<Groupable<T,V>> list = new ArrayList<GroupUtils.Groupable<T,V>>();
				list.add(groupable);
				result.put(key, list);
			}
		}
		
		return result;
	}
	
	public static interface Groupator<T>{
		/**
		 * 分组的Map中key的依据
		 *
		 * @param t
		 * @return
		 * 
		 * @author	    余冬冬
		 * @data 	 2016年11月21日
		 * @version	 v0.1.0
		 *
		 */
		public String groupBy(T t);
		
		/**
		 * Map中key是否数字自增
		 *
		 * @return
		 * 
		 * @author	    余冬冬
		 * @data 	 2016年11月21日
		 * @version	 v0.1.0
		 *
		 */
		public boolean isKeyNumeric();
	}
	
	public static <T> Map<String,List<T>> group(List<T> list,Groupator<T> group){
		Map<String,List<T>> result = new LinkedHashMap<String, List<T>>();
		boolean flag = group.isKeyNumeric();
		
		for (T t : list) {
			String key = group.groupBy(t);
			
			if(result.containsKey(key)){
				result.get(key).add(t);
			}else{
				List<T> l = new ArrayList<T>();
				l.add(t);
				result.put(key, l);
			}
		}
		
		
		return result;
	}
	
	public static void main(String[] args) {
		List<Student> students = new ArrayList<Student>();
		//List<Groupable<Student,Student>> students = new ArrayList<Groupable<Student,Student>>();
		students.add(new Student("1",12,"s1"));
		students.add(new Student("1",12,"s2"));
		students.add(new Student("1",13,"s3"));
		students.add(new Student("1",13,"s4"));
		students.add(new Student("2",12,"s5"));
		students.add(new Student("2",12,"s6"));
		
		Map<String, List<Student>> result = group(students,new Groupator<Student>() {
			@Override
			public String groupBy(Student s) {
				return "classId=" + s.getClassId() + "&&age=" + s.getAge();
			}

			@Override
			public boolean isKeyNumeric() {
				return true;
			}
		});
		//Map<String, List<Groupable<Student, Student>>> result = group(students);
		
		System.out.println(result);
		System.out.println(result.size());
		
	}
}
