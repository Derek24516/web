package com.demo.temp;

import java.awt.Desktop;
import java.awt.Desktop.Action;
import java.io.IOException;
import java.net.URI;

public class OpenBrowers {

	/**
	 * 用系统默认浏览器打开一个指定的URL
	 * @param args
	 */
	public static void main(String[] args) throws IOException {
		// 判断当前系统是否支持Java AWT Desktop扩展 
		if(Desktop.isDesktopSupported()){
			 // 创建一个URI实例
			URI uri = URI.create("http://www.baidu.com/");
			// 获取当前系统桌面扩展
			Desktop dp = Desktop.getDesktop();
			// 判断系统桌面是否支持要执行的功能  
			if(dp.isSupported(Action.BROWSE)){
				// 获取系统默认浏览器打开链接 
				dp.browse(uri);
			}
		}
	}

}
