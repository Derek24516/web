package com.demo.temp;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import jxl.write.WritableWorkbook;

public class ExcelTest {
	public static void main(String[] args){
		
		//WritableWorkbook workBook = Workbook.createWorkbook("");
		
		try {
			readExcel();
		} catch (BiffException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * 读取Excel内容
	 * 
	 * 只支持查询2003以及以下的excel，高版本的会报jxl.read.biff.BiffException: Unable to recognize OLE stream异常
	 * 
	 * @throws IOException 
	 * @throws BiffException 
	 */
	public static void readExcel() throws BiffException, IOException{
		InputStream in = new FileInputStream("E:\\test\\2.xls");
		Workbook workBook = Workbook.getWorkbook(in);
		
		//sheet的下标是从0开始
		Sheet readSheet = workBook.getSheet(0);
		//	列数
		int rows = readSheet.getRows();
		//	行数
		int colums = readSheet.getColumns();
		
		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < colums; j++) {
				Cell cell = readSheet.getCell(j,i);
				System.out.print(cell.getContents() + "  ");
			}
			System.out.println();
		}
	}
}
