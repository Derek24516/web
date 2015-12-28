package arithmetic.temp;

import java.io.IOException;
import java.util.Random;

public class Test2 {
	public static void main(String[] args) throws IOException {
		int[] a = new int[]{3,6,7,8,9,10,8,0,9,2,3,5,4,1,2,4,3};
		Random r = new Random();
		int[] b = new int[5];
		int[] b2 = new int[5];
		boolean flag = true;	//是否可以连续
		int temp = 0;
		
		for (int i = 0; i < 5; i++) {
			b[i] = a[r.nextInt((a.length - 1) % a.length)];
			b2[i] = b[i];

			if ((b2[i] - b2[0]) > 4) {
				flag = false;
				continue;
			}
			
			if (flag) {
				for (int j = 1; j <= i; j++) {

					if (b2[j] < b2[j - 1]) {
						temp = b2[j];
						b2[j] = b2[j - 1];
						b2[j - 1] = temp;
					}

				}
			} else {
				continue;
			}
		}
		
		for (int i : b) {
			System.out.print( i + ",");
		}
		System.out.println(flag);
		for (int i : b2) {
			System.out.print(i + ",");
		}
	}
}
