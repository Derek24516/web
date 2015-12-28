package com.mainTest;

import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;

public class OracleDaoTest {
	public static void main(String[] args) {
		try {
			
			/**
			 * 
			 * 读取数据库中的指定表的所有列
			 */
			Class.forName("oracle.jdbc.driver.OracleDriver");
			
			String url = "dbc:oracle:thin:@192.168.3.65:1521:SZEPB";
			String user = "U_LIMS";
			String pwd = "U_LIMS";
			
			Connection conn = DriverManager.getConnection(url,user,pwd);
			
			String sql = " SELECT * FROM T_HJJC_YPGL_YPJJD ";
			PreparedStatement pst = conn.prepareStatement(sql);
			ResultSet rs = pst.executeQuery();
			ResultSetMetaData data = rs.getMetaData();
			int count = data.getColumnCount();
			
			for (int i = 1; i <= count; i++) {
				System.out.print(data.getColumnName(i) + ",");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
