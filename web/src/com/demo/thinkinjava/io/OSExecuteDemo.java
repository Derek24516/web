package com.demo.thinkinjava.io;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.logging.Logger;

/**
 * 进程控制Demo
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年12月1日
 * @version	 v0.1.0
 * 
 */
public class OSExecuteDemo {
	public static Logger log = Logger.getLogger(OSExecuteDemo.class.getName());
	
	public static void main(String[] args) {
		// 运行DOS命令需要在加上cmd /c 
		executeCommand("cmd /c dir");
	}
	
	/**
	 * 执行命令
	 *
	 * @param command	被执行的命令
	 * @return
	 * 
	 * @author	    余冬冬
	 * @data 	 2016年12月1日
	 * @version	 v0.1.0
	 *
	 */
	public static boolean executeCommand(String command){
		boolean err = false;
		BufferedReader br = null;
		BufferedReader errs = null;
		try {
			Process process = new ProcessBuilder(command.split(" ")).start();
			br = new BufferedReader(new InputStreamReader(process.getInputStream(),"GBK"));
			String s;
			while( (s = br.readLine()) != null){
				System.out.println(s);
			}
			errs = new BufferedReader(new InputStreamReader(process.getErrorStream(),"GBK"));
			while( (s = errs.readLine()) != null){
				System.err.println(s);
				err = false;
			}
			
		} catch (IOException e) {
			log.info("执行命令出错：" + e.getMessage());
		}finally{
			try {
				if(br != null){
					br.close();
				}
				
				if( errs != null){
					errs.close();
				}
			} catch (Exception c) {
				
			}
			
		}
		return err;
	}

}
