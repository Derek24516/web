package com.demo.thinkinjava.resuing;

public class SpaceShip extends SpaceShipControls {
	  private String name;
	  public SpaceShip(String name) { this.name = name; }
	  public String toString() { return name; }
	  public static void main(String[] args) {
		 // 使用继承，仅仅代表是包含和控制器的所有方法
	    SpaceShip protector = new SpaceShip("NSEA Protector");
	    protector.forward(100);
	    
	    // 通过多的一个代理类，类中有一个control对象，我们可以随意的扩展和缩小control对象中的方法
	    //	或者是在方法前后做一些逻辑处理，这样就可以拥有更多的控制力了。
	    SpaceShipDelegation d = new SpaceShipDelegation("234");
	    
	  }
	} ///:~

