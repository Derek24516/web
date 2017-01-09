package com.demo.thinkinjava.generics;

import java.io.FileNotFoundException;
import java.io.PrintStream;
import java.util.*;

import net.mindview.util.CountingGenerator;
import net.mindview.util.CountingIntegerList;
import net.mindview.util.Generated;

/**
 * 使用模板方法的的设计模式，来对List接口的几个实现类进行了行了测试
 * 1.Test 是一个模板方法的抽象类，其中定义了需要测试的方法名，以及对应的测试时的动作--test方法
 * 2.Tester 是一个默认的测试器
 * 
 * 
 * @author 余冬冬
 * @data 2016年11月26日
 * @version v0.1.0
 * 
 */
public class ListPerformance {

	static Random rand = new Random();
	static int reps = 1000;
	static List<Test<List<Integer>>> tests = new ArrayList<Test<List<Integer>>>();
	static List<Test<LinkedList<Integer>>> qTests = new ArrayList<Test<LinkedList<Integer>>>();
	static {
		tests.add(new Test<List<Integer>>("add") {
			int test(List<Integer> list, TestParam tp) {
				int loops = tp.loops;
				int listSize = tp.size;
				for (int i = 0; i < loops; i++) {
					list.clear();
					for (int j = 0; j < listSize; j++)
						list.add(j);
				}
				return loops * listSize;
			}
		});
		tests.add(new Test<List<Integer>>("get") {
			int test(List<Integer> list, TestParam tp) {
				int loops = tp.loops * reps;
				int listSize = list.size();
				for (int i = 0; i < loops; i++)
					list.get(rand.nextInt(listSize));
				return loops;
			}
		});
		tests.add(new Test<List<Integer>>("set") {
			int test(List<Integer> list, TestParam tp) {
				int loops = tp.loops * reps;
				int listSize = list.size();
				for (int i = 0; i < loops; i++)
					list.set(rand.nextInt(listSize), 47);
				return loops;
			}
		});
		tests.add(new Test<List<Integer>>("iteradd") {
			int test(List<Integer> list, TestParam tp) {
				final int LOOPS = 1000000;
				int half = list.size() / 2;
				ListIterator<Integer> it = list.listIterator(half);
				for (int i = 0; i < LOOPS; i++)
					it.add(47);
				return LOOPS;
			}
		});
		tests.add(new Test<List<Integer>>("insert") {
			int test(List<Integer> list, TestParam tp) {
				int loops = tp.loops;
				for (int i = 0; i < loops; i++)
					list.add(5, 47); // Minimize random-access cost
				return loops;
			}
		});
		// sort
		tests.add(new Test<List<Integer>>("sort") {
			
			@Override
			int test(List<Integer> container, TestParam tp) {
				int loops = tp.loops;
				for (int i = 0; i < loops; i++)
					container.add(5, 47);
				Collections.sort(container);
				return tp.size;
			}
		});
		tests.add(new Test<List<Integer>>("remove") {
			int test(List<Integer> list, TestParam tp) {
				int loops = tp.loops;
				int size = tp.size;
				for (int i = 0; i < loops; i++) {
					list.clear();
					list.addAll(new CountingIntegerList(size));
					while (list.size() > 5)
						list.remove(5); // Minimize random-access cost
				}
				return loops * size;
			}
		});
		// Tests for queue behavior:
		qTests.add(new Test<LinkedList<Integer>>("addFirst") {
			int test(LinkedList<Integer> list, TestParam tp) {
				int loops = tp.loops;
				int size = tp.size;
				for (int i = 0; i < loops; i++) {
					list.clear();
					for (int j = 0; j < size; j++)
						list.addFirst(47);
				}
				return loops * size;
			}
		});
		qTests.add(new Test<LinkedList<Integer>>("addLast") {
			int test(LinkedList<Integer> list, TestParam tp) {
				int loops = tp.loops;
				int size = tp.size;
				for (int i = 0; i < loops; i++) {
					list.clear();
					for (int j = 0; j < size; j++)
						list.addLast(47);
				}
				return loops * size;
			}
		});
		qTests.add(new Test<LinkedList<Integer>>("rmFirst") {
			int test(LinkedList<Integer> list, TestParam tp) {
				int loops = tp.loops;
				int size = tp.size;
				for (int i = 0; i < loops; i++) {
					list.clear();
					list.addAll(new CountingIntegerList(size));
					while (list.size() > 0)
						list.removeFirst();
				}
				return loops * size;
			}
		});
		qTests.add(new Test<LinkedList<Integer>>("rmLast") {
			int test(LinkedList<Integer> list, TestParam tp) {
				int loops = tp.loops;
				int size = tp.size;
				for (int i = 0; i < loops; i++) {
					list.clear();
					list.addAll(new CountingIntegerList(size));
					while (list.size() > 0)
						list.removeLast();
				}
				return loops * size;
			}
		});
	}

	static class ListTester extends Tester<List<Integer>> {
		public ListTester(List<Integer> container,List<Test<List<Integer>>> tests) {
			super(container, tests);
		}

		// Fill to the appropriate size before each test:
		@Override
		protected List<Integer> initialize(int size) {
			container.clear();
			container.addAll(new CountingIntegerList(size));
			return container;
		}

		// Convenience method:
		public static void run(List<Integer> list,List<Test<List<Integer>>> tests) {
			new ListTester(list, tests).timedTest();
		}
	}

	public static void main(String[] args) throws FileNotFoundException {
		System.setOut(new PrintStream("H:\\data.txt"));
		if (args.length > 0)
			Tester.defaultParams = TestParam.array(args);
		// Can only do these two tests on an array:
		Tester<List<Integer>> arrayTest = new Tester<List<Integer>>(null,tests.subList(1, 3)) {
			// This will be called before each test. It
			// produces a non-resizeable array-backed list:
			@Override
			protected List<Integer> initialize(int size) {
				Integer[] ia = Generated.array(Integer.class,
						new CountingGenerator.Integer(), size);
				return Arrays.asList(ia);
			}
		};
		arrayTest.setHeadline("Array as List");
		arrayTest.timedTest();
		Tester.defaultParams = TestParam.array(10, 5000, 100, 5000, 1000, 1000,
				10000, 200);
		if (args.length > 0)
			Tester.defaultParams = TestParam.array(args);
		ListTester.run(new ArrayList<Integer>(), tests);
		ListTester.run(new LinkedList<Integer>(), tests);
		ListTester.run(new Vector<Integer>(), tests);
		Tester.fieldWidth = 12;
		Tester<LinkedList<Integer>> qTest = new Tester<LinkedList<Integer>>(
				new LinkedList<Integer>(), qTests);
		qTest.setHeadline("Queue tests");
		qTest.timedTest();
	}

}
