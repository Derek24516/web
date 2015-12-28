package com.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;

import com.rsslibj.elements.Channel;

/**
 * 
 * 封装一些文件的相关操作
 * 
 * @date		2015-12-28
 *
 */
public  class FileUtils {

	/**
	 * 
	 * Char的一些用法
	 *
	 * @param		void
	 * @Exception	IOException
	 * @return 		void
	 * @date		2015-12-28
	 *
	 */
	public static void main(String[] args){
		try {
			//copyFile("D:\\test\\test.txt", "D:\\test\\1\\test.txt");
			copyDirectory("D:\\test", "D:\\test2");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	/**
	 * 
	 * 复制文件，原文件必须存在，目标文件不存在会创建
	 *
	 * @param		fromPath		原文件
	 * @param		toPath			目标文件
	 * @Exception	IOException
	 * @return 		void
	 * @date		2015-12-31
	 *
	 */
	public static void copyFile(String fromPath,String toPath) throws	IOException{
		//	TODO 是否优化成可以拷贝文件夹OR添加一个拷贝文件夹的方法
		File toFile = new File(toPath);
		if(toFile.isDirectory()){
			throw new IOException("目标文件是一个目录！");
		}
		//	目标文件有些文件不存在时，自动创建
		if(!toFile.getParentFile().exists()){
			toFile.getParentFile().mkdirs();
		}
		//	文件不存在自动创建
		if(!toFile.exists()){
			toFile.createNewFile();
		}
		//	判断文件名是否合法
		if(!toFile.isFile()){
			//	注：要放在创建文件之后，文件不存在时，isFile也会为false
			throw new IOException("目标文件名是非法的文件名！");
		}
		//	使用NIO的channel的方式拷贝文件
		FileInputStream fromFileInputStream = new FileInputStream(fromPath);
		FileChannel fromChannel = fromFileInputStream.getChannel();
		FileOutputStream toFileOutputStream = new FileOutputStream(toFile);
		FileChannel toChannel = toFileOutputStream.getChannel();
		
		toChannel.transferFrom(fromChannel, 0L, fromChannel.size());
		fromFileInputStream.close();
		toFileOutputStream.close();
	}
	
	/**
	 * 
	 * 拷贝文件夹
	 *
	 * @param		fromPath	原文件夹
	 * @param		toPath		目标文件夹
	 * @Exception	IOException
	 * @return 		void
	 * @throws 		IOException 
	 * @date		2015-12-31
	 *
	 */
	public static void copyDirectory(String fromPath,String toPath) throws IOException{
		// 不能将父目录拷贝到子目录
		if(fromPath.contains(toPath)){
			throw new IOException("原目录是目标目录的父目录,不能将父目录拷贝到子目录");
		}
		
		File fromFile = new File(fromPath);
		File toFile = new File(toPath);
		
		if(!fromFile.isDirectory()){
			throw new IOException("原路径不是一个目录名");
		}
		//	TODO 正则判断是否是合法的文件夹名称
		//	isDirectory，要在文件夹存在，以及是目录名时才为true
		/*if(!toFile.isDirectory()){
			throw new IOException("原路径不是一个目录名");
		}*/
		if(!toFile.exists()){
			toFile.mkdirs();
		}
		
		File[] fromFiles = fromFile.listFiles();
		for (File file : fromFiles) {
			String fromFilePath = escapeFileName(file.getAbsolutePath());
			String toFilePath = escapeFileName(toFile.getAbsolutePath()) + "\\" + file.getName();
			if(file.isFile()){
				copyFile(fromFilePath, toFilePath);
			}else{
				//	递归调用
				copyDirectory(fromFilePath, toFilePath);
			}
		}
	}
	
	/**
	 * 
	 * 对文件名进行转义操作
	 * 
	 * \替换成\\
	 *
	 * @param		void
	 * @Exception	IOException
	 * @return 		void
	 * @date		2015-12-28
	 *
	 */
	public static String escapeFileName(String fileName){
		return fileName.replace("\\", "\\\\");
	}
	
	public static void copyFile2(String sourcePath,String toPath) throws IOException{
		File sourceFile = new File(sourcePath);
		File toFile = new File(toPath);
		
		if(sourceFile.isDirectory() || !sourceFile.exists()){
			return ;
		}
		if(toFile.isDirectory()){
			return;
		}
		
		if(!toFile.exists()){
			toFile.createNewFile();
		}
		
		FileInputStream fIn = new FileInputStream(sourceFile);
		FileOutputStream fOut = new FileOutputStream(toFile);
		
		byte[] bt = new byte[1024];
		int count ;
		while((count = fIn.read(bt)) > 0 ){
			fOut.write(bt, 0, count);
		}
		fIn.close();
		fOut.close();
	}
	
}
