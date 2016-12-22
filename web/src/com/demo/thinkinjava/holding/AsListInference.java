package com.demo.thinkinjava.holding;

//: holding/AsListInference.java
//Arrays.asList() makes its best guess about type.
import java.util.*;

class Snow {
}

class Powder extends Snow {
}

class Light extends Powder {
}

class Heavy extends Powder {
}

class Crusty extends Snow {
}

class Slush extends Snow {
}

public class AsListInference {
	public static void main(String[] args) {
		List<Snow> snow1 = Arrays.asList(new Crusty(), new Slush(),new Powder());

		// Won't compile:
		//List<Snow> snow2 = Arrays.asList( new Light(), new Heavy());
		// Compiler says:
		// found : java.util.List<Powder>
		// required: java.util.List<Snow>

		// Collections.addAll() doesn't get confused:
		List<Snow> snow3 = new ArrayList<Snow>();
		Collections.addAll(snow3, new Light(), new Heavy());

		// Give a hint using an
		// explicit type argument specification:
		//显示的参数说明
		List<Snow> snow4 = Arrays.<Snow> asList(new Light(), new Heavy());
		
		List<Snow> snow5 = new ArrayList<Snow>();
		Light l =  new Light();
		snow5.add(new Light());
		snow5.indexOf(l);
		//注意2和4的区别，snow2的创建编译报错了,如果不加显示的参数说明（线索）
		
		//随机打乱顺序
		Collections.shuffle(snow5);
	}
} // /:~

