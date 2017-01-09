package com.demo.thinkinjava.generics;

import java.io.FileNotFoundException;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

/**
 * 
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年11月26日
 * @version	 v0.1.0
 * 
 */
public class SetPerformance {

	static List<Test<Set<Integer>>> tests =
		    new ArrayList<Test<Set<Integer>>>();
		  static {
		    tests.add(new Test<Set<Integer>>("add") {
		      int test(Set<Integer> set, TestParam tp) {
		        int loops = tp.loops;
		        int size = tp.size;
		        for(int i = 0; i < loops; i++) {
		          set.clear();
		          for(int j = 0; j < size; j++)
		            set.add(j);
		        }
		        return loops * size;
		      }
		    });
		    tests.add(new Test<Set<Integer>>("contains") {
		      int test(Set<Integer> set, TestParam tp) {
		        int loops = tp.loops;
		        int span = tp.size * 2;
		        for(int i = 0; i < loops; i++)
		          for(int j = 0; j < span; j++)
		            set.contains(j);
		        return loops * span;
		      }
		    });
		    tests.add(new Test<Set<Integer>>("iterate") {
		      int test(Set<Integer> set, TestParam tp) {
		        int loops = tp.loops * 10;
		        for(int i = 0; i < loops; i++) {
		          Iterator<Integer> it = set.iterator();
		          while(it.hasNext())
		            it.next();
		        }
		        return loops * set.size();
		      }
		    });
		  }
		  public static void main(String[] args) throws FileNotFoundException {
		    if(args.length > 0)
		      Tester.defaultParams = TestParam.array(args);
		    System.setOut(new PrintStream("H:\\data.txt"));
		    Tester.fieldWidth = 10;
		    Tester.run(new TreeSet<Integer>(), tests);
		    Tester.run(new HashSet<Integer>(), tests);
		    Tester.run(new LinkedHashSet<Integer>(), tests);
		  }

}
