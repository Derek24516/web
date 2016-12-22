package com.demo.thinkinjava.typeinfo;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

class DynamicProxyHandler implements InvocationHandler{
	private Object proxied ;
	
	public DynamicProxyHandler(Object proxied){
		this.proxied = proxied;
	}
	@Override
	public Object invoke(Object proxy, Method method, Object[] args)throws Throwable {
		System.out.println(" *** proxy: " + proxy.getClass() + ",method:" + method + ", args: " + args);
		if(args != null)
	      for(Object arg : args)
	        System.out.println("  " + arg);
	    return method.invoke(proxied, args);
	}
	
}

interface Interface {
  void doSomething();
  void somethingElse(String arg);
}

class RealObject implements Interface {
  public void doSomething() { System.out.println("doSomething"); }
  public void somethingElse(String arg) {
	  System.out.println("somethingElse " + arg);
  }
}	

class SimpleProxy implements Interface {
  private Interface proxied;
  public SimpleProxy(Interface proxied) {
    this.proxied = proxied;
  }
  public void doSomething() {
    System.out.println(("SimpleProxy doSomething"));
    proxied.doSomething();
  }
  public void somethingElse(String arg) {
	  System.out.println("SimpleProxy somethingElse " + arg);
    proxied.somethingElse(arg);
  }
}	

public class SimpleDynamicProxy {
	public static void consumer(Interface iface){
		iface.doSomething();
	    iface.somethingElse("bonobo");
	}

	public static void main(String[] args) {
		RealObject real = new RealObject();
		consumer(real);
		// Insert a proxy and call again:
		Interface proxy = (Interface) Proxy.newProxyInstance(Interface.class.getClassLoader(),new Class[] { Interface.class }, new DynamicProxyHandler(real));
		consumer(proxy);
	}

}
