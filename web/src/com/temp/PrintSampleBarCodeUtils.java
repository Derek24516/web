package com.temp;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.security.KeyStore.Entry;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PrintSampleBarCodeUtils {
	public static StringBuilder samplesSb = new StringBuilder();
	//	生成的HTML存放路径
	//String htmlPath = "E:\\test\\1.html";
	//	需要生成的样品集合
	List<Sample> samples = new ArrayList<Sample>();
	
	//	html模板路径
	public static String html_Template_Path = "E:\\test\\html_Template.html";
	
	//	样品模板路径
	public static String sample_Template_Path = "E:\\test\\sample_Template.html";
	
	public static void createHtml(String htmlPath, List<Map<String,String>> sampleMaps) throws IOException{
		//	根据sample模板，生成对应的string
		String trStr = createSampleTrs(sampleMaps);
		
		//	边读边写html模板，读到@@samples，用String替换
		File file = new File(htmlPath);
		
		if(file.exists()){
			file.delete();
		}
		if(!file.getParentFile().exists()){
			file.getParentFile().mkdirs();
		}
		file.createNewFile();
		
		
		FileReader fr = new FileReader(html_Template_Path);
		FileWriter fw = new FileWriter(file,true);
		BufferedReader br = new BufferedReader(fr);
		BufferedWriter bw = new BufferedWriter(fw);
		
		String str = null;
		while((str = br.readLine()) != null){
			if(str.contains("@@SAMPLES")){
				str = trStr;
			}
			bw.write(str);
		}
		bw.flush();
		bw.close();
		fw.close();
		br.close();
		br.close();
	}
	
	/**
	* @Title: createSampleTrs 
	* @Description: 根据sample模板，生成样品集合对应的string
	* @return    
	* @throws 
	*
	* @author 余冬冬
	* @date 2015年11月9日 下午6:43:49
	 */
	public static String createSampleTrs(List<Map<String,String>> sampleMaps) throws IOException{
		StringBuilder sbSamples = new StringBuilder();
		for (Map<String, String> map : sampleMaps) {
			sbSamples.append(createSampleTr(map));
		}
		
		return sbSamples.toString();
	}
	
	/**
	* @Title: createSampleTrs 
	* @Description: 根据sample模板，生成单个样品的string
	* @return    
	* @throws 
	*
	* @author 余冬冬
	* @date 2015年11月9日 下午6:43:49
	 */
	public static String createSampleTr(Map<String,String> sampleMap) throws IOException{
		FileReader fr = new FileReader(sample_Template_Path);
		BufferedReader br = new BufferedReader(fr);
		
		String str = null;
		StringBuilder sbSample = new StringBuilder();
		while((str = br.readLine()) != null){
			if(str.contains("@@")){
				str = sampleMap.get(str.replaceAll("@@", ""));
			}
			sbSample.append(str);
		}
		
		return sbSample.toString();
	}
	
	//	生成TXT
	public static void createTextFile(String path,List<Map<String,String>> sampleMaps) throws IOException{
		File file = new File(path);
		
		if(file.exists()){
			file.delete();
		}
		
		if(!file.getParentFile().exists()){
			file.getParentFile().mkdirs();
		}
		file.createNewFile();
		
		FileWriter fw = new FileWriter(file);
		BufferedWriter bw = new BufferedWriter(fw);
		
		for (Map<String, String> map : sampleMaps) {
			bw.write("N\r\n");
			bw.write("T22,40,0,6,24,15,N,\""+ map.get("YPBH") +"   " + map.get("CJRQ") + "\"\r\n");
			bw.write("T22,60,0,6,24,15,N,\"委托单位：" + map.get("WTDW") + "\"\r\n");
			bw.write("T22,80,0,6,24,15,N,\"监测点位：" + map.get("JCDW") +"\"\r\n");
			bw.write("T22,100,0,6,24,15,N,\"采样日期：" + map.get("CYRQ") + "\"\r\n");
			bw.write("T22,120,0,6,24,15,N,\"监测项目：" + map.get("FXXM") + "\"\r\n");
			bw.write("B22,140,0,3,2,6,80,B,\"" + map.get("TXM") +"\"\r\n");
			bw.write("Q280,32\r\n");
			bw.write("W1,1\r\n\r\n");
		}
		bw.flush();
		bw.close();
		fw.close();
	}
}
