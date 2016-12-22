package com.temp;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TestHtmlPrint {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		//	样品对象Map集合
		List<Map<String,String>> sampleMaps = new ArrayList<Map<String,String>>();
		//		生成的HTML存放路径html_Template.html
		String htmlPath = "E:\\test\\1.txt";
		//	需要生成的样品集合
		Map<String,String> sampleMap = new HashMap<String,String>();
		sampleMap.put("YPBH", "11111");
		sampleMap.put("CJRQ", "11111");
		sampleMap.put("WTDW", "11111");
		sampleMap.put("JCDW", "11111");
		sampleMap.put("CYRQ", "11111");
		sampleMap.put("FXXM", "11111");
		sampleMap.put("TXM", "abcde");
		sampleMaps.add(sampleMap);
		
		sampleMap = new HashMap<String,String>();
		sampleMap.put("YPBH", "2222");
		sampleMap.put("CJRQ", "11111");
		sampleMap.put("WTDW", "11111");
		sampleMap.put("JCDW", "11111");
		sampleMap.put("CYRQ", "11111");
		sampleMap.put("FXXM", "11111");
		sampleMap.put("TXM", "zzzzzz");
		sampleMaps.add(sampleMap);
		
		PrintSampleBarCodeUtils.createTextFile(htmlPath, sampleMaps);
		/*String res = PrintSampleBarCodeUtils.createSampleTr(sampleMap);
		System.out.println(res);*/
	}

}
