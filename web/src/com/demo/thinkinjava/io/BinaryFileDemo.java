package com.demo.thinkinjava.io;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.util.logging.Logger;

/**
 * 读取二进制文件
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年12月1日
 * @version	 v0.1.0
 * 
 */
public class BinaryFileDemo {
	Logger log = Logger.getLogger(this.getClass().getName());
	
	public static void main(String[] args) {
		
	}
	
	public static byte[] read(File file){
		BufferedInputStream br = null;
		byte[] result = null;
		
		try {
			br = new BufferedInputStream(new FileInputStream(file));
			result = new byte[br.available()];
			br.read(result);
		} catch (Exception e) {
			
		}finally{
			try {
				if(br != null){
					br.close();
				}
			} catch (Exception e2) {
				
			}
		}
		
		return result;
	}

}
