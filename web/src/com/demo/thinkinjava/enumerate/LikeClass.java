package com.demo.thinkinjava.enumerate;

import java.util.HashSet;
import java.util.Set;

public enum LikeClass {
	WINKEN {
		public void enumIntanceMethod(){
			System.out.println("This enumIntanceMethod!");
		}
		@Override
		void behavior() {
		}
	},
	BLIKEN {
		@Override
		void behavior() {
		}
	},
	NOD {
		@Override
		void behavior() {
		}
	};
	
	abstract void behavior();
	
	public void enumShareMethod(){
		Set<String> s = new HashSet<String>();
		s.add("Str1");
		System.out.println("This enumShareMethod!");
	}
}
