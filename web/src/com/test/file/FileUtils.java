package com.test.file;


import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.nio.charset.Charset;
import java.nio.charset.UnsupportedCharsetException;
import java.util.ArrayList;
import java.util.List;

public class FileUtils {
	/**
	* @Title: copyFile 
	* @Description: Copy one file to another path.
	* @param sourcePath			
	* @param toPath
	* @return void     
	* @throws 
	*
	* @author 		ydd
	* @date 		2015-10 -16
	*
	 */
	public static void copyFile(String sourcePath,String toPath) throws IOException{
		File sourceFile = new File(sourcePath);
		File toFile = new File(toPath);
		
		//TODO create my own exception ,and handle exception there.
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
		
		System.out.println("######copy file" + sourceFile.getName() + " to " + toPath);
	}
	
	/**
	* @Title: getFileInof 
	* @Description: read the file content ong line by another,and return a list  of every line's  value.
	* @param 				file
	* @return 				List<String>    
	* @throws 
	*
	* @author 			ydd
	* @date 			2015-10-15
	*
	 */
	public static List<String> readFileContent(File file) throws Exception {
		//TODO Is this method needed?
		List<String> strs = new ArrayList<String>();
		if(file.isDirectory() || !file.exists()) return strs;
		
		BufferedReader fReader =  new BufferedReader(new InputStreamReader(new FileInputStream(file),"GBK"));
		String temp = null;
		while((temp = fReader.readLine()) != null){
			strs.add(temp);
		}
		
		return strs;
	}
	
	/**
	*  <h1>modifyFileCharset </h1>
	*  Modify file from one charset to another charset.If the parameter ,file ,
	*  is a path of directory,then the method will modify all files's charset in this
	*  directory. 
	* @param file				file or dir
	* @param fromCharset
	* @param destCharset
	* @return int				return the count of files modified.     
	*
	* @author 		ydd
	* @date 		2015-10-15
	*
	*/
	public static int modifyFileCharset(File file,String fromCharset,String destCharset,FilenameFilter filter) throws IOException{
		if(!Charset.isSupported(fromCharset) ){
			throw new UnsupportedCharsetException(fromCharset);
		}
		if(!Charset.isSupported(destCharset)){
			throw new UnsupportedCharsetException(destCharset);
		}
		int count = 0;
		
		if(file.isDirectory()){
			File[] fileArr = null;
			if(filter == null){
				fileArr = file.listFiles();
			}else{
				fileArr = file.listFiles(filter);
			}
			count = fileArr.length;
			
			for (int i = 0; i < fileArr.length; i++) {
				File temp = fileArr[i];
				convertFileCharset(temp, fromCharset, destCharset);
			}
			
		}else{
			convertFileCharset(file, fromCharset, destCharset);
			count = 1;
		}
		
		return count;
	}
	
	/**
	*  <h1>convertFileCharset </h1>
	*  Modify one file from one charset to another charset.
	* @param file				file or dir
	* @param fromCharset
	* @param destCharset
	* @return void     
	*
	* @author 		ydd
	* @date 		2015-10-15
	*
	*/
	public static void convertFileCharset(File file,String fromCharset,String destCharset) throws IOException{
		//`the name of the copy of the file
		String oldFileName = file.getPath() + ".old";	
		
		File oldFile = new File(oldFileName);
		if(!oldFile.exists()){
			oldFile.createNewFile();
		}
		
		//	get a copy of the file,and rename the file.Append a '.old' to the original name.
		copyFile(file.getPath(), oldFileName);
		
		BufferedReader br = new BufferedReader(new InputStreamReader(
				new FileInputStream(oldFileName),
				fromCharset));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(
				new FileOutputStream(file.getPath()),
				destCharset));
		int ch = 0;
		while ((ch = br.read()) != -1) {
			bw.write(ch);
		}
		bw.flush();
		br.close();
		bw.close();
	}
	
	/**
	 * 
	* @Title: appendTextToFile 
	* @Description: 以追加的形式向文件中写入内容
	* @param filePath
	* @param message
	* @return void     
	* @throws 
	*
	* @author 		ydd
	* @date 		2015- 
	*
	 */
	public void appendTextToFile(String filePath ,String message){
		File file = new File(filePath);
		
		if(file.isDirectory()){
			return;
		}
		
		
	}
}
