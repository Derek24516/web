package arithmetic.temp;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Test {
	public static void main(String[] args) throws IOException {
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
