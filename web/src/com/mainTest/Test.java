package com.mainTest;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import com.pojo.Student;

public class Test {
	public static void main(String args[]){
		/*Student s1 = new Student();
		s1.setAge(10);
		s1.setName("Tom");
		System.out.println(s1);
		
		Student s2=s1;
		s2.setAge(11);
		System.out.println(s1);
		
		Student s3 = new Student();
		s3 = s1;
		s3.setAge(12);
		System.out.println(s1);*/
		List<Student> list1 = new ArrayList<Student>();
		List<Student> list2 = new ArrayList<Student>();
		List<Student> list = new ArrayList<Student>();
		for (int i = 0; i < 100000; i++) {
			list1.add(new Student((int) (Math.random() * 1000000)));
			list2.add(new Student((int) (Math.random() * 1000000)));
		}
		long start = System.currentTimeMillis();
		Set<Student> set = new HashSet<Student>(list1);
		for (Student s : list2) {
			if (set.contains(s)) {
				list.add(s);
			}
		}
		for (Student student : list) {
			System.out.println(student);
		}
		System.out.println("共找出"+list.size()+"个相同的，用时：" + (System.currentTimeMillis()-start));
		
	}
}
