package com.demo.temp;

import java.awt.Desktop;
import java.awt.Desktop.Action;
import java.io.IOException;
import java.net.URI;

public class OpenBrowers {

	/**
	 * ��ϵͳĬ���������һ��ָ����URL
	 * @param args
	 */
	public static void main(String[] args) throws IOException {
		// �жϵ�ǰϵͳ�Ƿ�֧��Java AWT Desktop��չ 
		if(Desktop.isDesktopSupported()){
			 // ����һ��URIʵ��
			URI uri = URI.create("http://www.baidu.com/");
			// ��ȡ��ǰϵͳ������չ
			Desktop dp = Desktop.getDesktop();
			// �ж�ϵͳ�����Ƿ�֧��Ҫִ�еĹ���  
			if(dp.isSupported(Action.BROWSE)){
				// ��ȡϵͳĬ������������� 
				dp.browse(uri);
			}
		}
	}

}
