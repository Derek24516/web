package com.demo.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.utils.StringUtils;

/**
 * Java操作Oracle数据库Demo
 * 
 * @date		2015-4-25
 * 
 */
public class OracleDBHelper {

	public static void main(String[] args) {
		OracleDBHelper helper = new OracleDBHelper();
		
		helper.connectByJndi();
	}

	/**
	 * 一般的使用JDBC连接数据库的方式
	 *
	 * @param		void
	 * @Exception	IOException
	 * @return 		void
	 * @date		2016-1
	 *
	 */
	public void connect() throws ClassNotFoundException, SQLException{
		Class.forName("oracle.jdbc.driver.OracleDriver");
		String url = "jdbc:oracle:thin:@192.168.3.68:1521:SZEPB";
		String userName = "U_LIMS_BH_0523";
		String pwd = "U_LIMS_BH_0523";
		
		Connection conn = DriverManager.getConnection(url, userName, pwd);
	}
	
	/**
	 * 使用jndi的方式，需开启Tomcat
	 *
	 * @param		void
	 * @Exception	IOException
	 * @return 		void
	 * @date		2016-1
	 *
	 */
	public void connectByJndi(){
		String jndi = "jdbc/default";
		DataSource datasource = null;
		
		Connection conn = null;
		try {
			Context context = new InitialContext();
			Context envContext = null;
			
			try {
				envContext = (Context) context.lookup("java:/comp/env");
			} catch (Exception e) {
				// 无法通过java:方式获得换用 comp/env的方式
				try {
					envContext = (Context) context.lookup("/comp/env");
				} catch (Exception e2) {
					e.printStackTrace();
				}
				
			}
			
			if(!StringUtils.isEmpty(jndi)){
				datasource = (DataSource) envContext.lookup(jndi);
			}else{
				datasource = (DataSource) envContext.lookup("");
			}
			
			conn = datasource.getConnection();
			
			conn.close();
		} catch (Exception e) {
			
		}
	}
}
