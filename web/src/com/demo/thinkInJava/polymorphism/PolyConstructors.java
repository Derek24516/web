package com.demo.thinkInJava.polymorphism;

import static net.mindview.util.Print.*;

/**
 * 类中构造器和多态
 * 在构造器中如果使用了多态方法（子类和父类共有的），
 *
 * 
 * @autor	    余冬冬
 * @data 	 2016年7月24日
 * @version	 v0.1.0
 * 
 */
class Glyph {
	void draw() {
		print("Glyph.draw()");
	}

	Glyph() {
		print("Glyph() before draw()");
		draw();
		print("Glyph() after draw()");
	}
}

class RoundGlyph extends Glyph {
	private int radius = 1;

	RoundGlyph(int r) {
		radius = r;
		print("RoundGlyph.RoundGlyph(), radius = " + radius);
	}

	void draw() {
		print("RoundGlyph.draw(), radius = " + radius);
	}
}

public class PolyConstructors {
	public static void main(String[] args) {
		new RoundGlyph(5);
	}
} 
/*Glyph() before draw()
RoundGlyph.draw(), radius = 0
Glyph() after draw()
RoundGlyph.RoundGlyph(), radius = 5*/