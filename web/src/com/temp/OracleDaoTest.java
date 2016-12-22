package com.temp;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

public class OracleDaoTest {
	public static void main(String[] args) {
		temp();
	}
	
	
	public static void temp(){
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			String url = "jdbc:oracle:thin:@192.168.3.68:1521:SZEPB";
			String user = "U_LIMS";
			String pwd = "U_LIMS";

			Connection conn = DriverManager.getConnection(url, user, pwd);

			String fxxm_sql = " select fxxmbh from t_hjjc_fxxm_jbxx ";
			String fppz_sql = " select xh,wrys,fxxmdm,fxxmmc from t_hjjc_ypgl_fppzb ";
			Set<String> fxxmDm = new HashSet<String>();
			List<Map<String,String>> result = new ArrayList<Map<String,String>>();
			
			PreparedStatement pst = conn.prepareStatement(fxxm_sql);
			ResultSet rs = pst.executeQuery();

			while(rs.next()){
				fxxmDm.add(rs.getString(1));
			}
			
			pst = conn.prepareStatement(fppz_sql);
			rs = pst.executeQuery();
			List<String> errXh = new ArrayList<String>();
			while(rs.next()){
				String xh = rs.getString(1);
				String fxxmdm = rs.getString(3);
				String fxxmmc = rs.getString(4);
				String[] dms = fxxmdm.split(",");
				String[] mcs = fxxmmc.split(",");
				
				if("#OTHER#".equals(fxxmdm)){
					continue;
				}

				if(dms.length != mcs.length){
					errXh.add(xh);
					System.out.println(xh);
					continue;
				}
				for(int i = 0 ; i < dms.length ; i ++ ){
					String dm = dms[i];
					String mc = mcs[i];
					if(!fxxmDm.contains(dm)){
						String updateSql1 = "update t_hjjc_ypgl_fppzb set fxxmdm = replace(fxxmdm,'"+ dm +",',''),fxxmmc = replace(fxxmmc,'"+ mc +",','') where xh = '"+ xh +"' ;";
						String updateSql2 = "update t_hjjc_ypgl_fppzb set fxxmdm = replace(fxxmdm,',"+ dm +"',''),fxxmmc = replace(fxxmmc,',"+ mc +"','') where xh = '"+ xh +"' ;";
						String updateSql3 = "update t_hjjc_ypgl_fppzb set fxxmdm = replace(fxxmdm,'"+ dm +"',''),fxxmmc = replace(fxxmmc,'"+ mc +"','') where xh = '"+ xh +"' ;";
						System.out.println(updateSql1);
						System.out.println(updateSql2);
						System.out.println(updateSql3);
					}
				}
			}
			System.out.println("");
			System.out.println(errXh);
			
			pst.close();
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void test(){
	try {
				
				/**
				 * 
				 * 读取数据库中的指定表的所有列
				 */
				Class.forName("oracle.jdbc.driver.OracleDriver");
				
				String url = "jdbc:oracle:thin:@192.168.3.65:1521:SZEPB";
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
				pst.addBatch(sql);
				pst.executeBatch();
			} catch (Exception e) {
				e.printStackTrace();
			}
	}
	
	public void batchInsert(){
		//大小
		int size = 10000;
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			String url = "jdbc:oracle:thin:@192.168.3.65:1521:SZEPB";
			String user = "U_LIMS";
			String pwd = "U_LIMS";
			
			Connection conn = DriverManager.getConnection(url,user,pwd);
			conn.setAutoCommit(false);
			String sql = "INSERT adlogs(ip,website,yyyymmdd,hour,object_id) VALUES(?,?,?,?,?)";
			PreparedStatement prest = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_READ_ONLY);
			for (int x = 0; x < size; x++) {
				prest.setString(1, "192.168.1.1");
				prest.setString(2, "localhost");
				prest.setString(3, "20081009");
				prest.setInt(4, 8);
				prest.setString(5, "11111111");
				prest.addBatch();
			}
			prest.executeBatch();
			conn.commit();
			conn.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		} 
	}
}
