package com.demo.datastructure.temp;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Test {
	public static int total = 0;
	public static void main(String[] args) throws IOException {
		test(3 );
		System.out.println(total);
	}
	
	public static void test(int n){
		if(n == 1){
			System.out.print("1b ");
			total ++ ;
			System.out.print("\r\n");
		}else if(n == 2){
			//	跳2步
			System.out.print("2b ");
			total ++ ;
			System.out.print("\r\n");
			//	跳1步
			test(n - 1);
			System.out.print("1b ");
		}else{
			System.out.print("2b ");
			test(n-2);
			System.out.print("1b ");
			test(n-1);
		}
		
	}
	
	/**
	 * 
	 * @description	Char的一些用法
	 * @param		void
	 * @throws		IOException
	 * @return 		void
	 * @date		2015-12-28
	 *
	 */
	public static void testCharGame() throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String str = br.readLine();
		char[] a = str.toCharArray();
		System.out.println(a[0]);
		
		
		
		System.out.println(a[0] + (25 - (Character.toLowerCase(a[0]) - 'a') ));
		
		/*for (int i = 0; i < 26; i++) {
			System.out.print( Character.toChars('A' + i));
			System.out.print("->");
			System.out.print( Character.toChars('A' + (26 - i - 1)));
			System.out.print(",");
			
			
			System.out.print( Character.toChars('a' + i));
			System.out.print("->");
			System.out.print( Character.toChars('a' + (26 - i - 1)));
			System.out.print(",");
		}*/
	}
	
}
