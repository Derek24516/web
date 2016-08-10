package com.demo.thinkInJava.polymorphism;
import static net.mindview.util.Print.*;

public class PrivateOverride {
  private void f() { print("private f()"); }
  protected void f1(){print("protected f()");}
  public static void main(String[] args) {
    PrivateOverride po = new Derived();
    //父类的private函数对于子类是不可见的（final的），所以不能被重载
    po.f();
    //protected和public的方法是可以重载的，动态绑定
    po.f1();
  }
}

class Derived extends PrivateOverride {
  public void f() { print("public f()"); }
  protected void f1(){print("child protected f()");}
} /* Output:
private f()
*///:~
