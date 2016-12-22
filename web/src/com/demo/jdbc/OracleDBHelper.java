package com.demo.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Savepoint;

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
		//OracleDBHelper helper = new OracleDBHelper();
		
		//helper.connectByJndi();
		
		try {
			testSavePoint();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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
	public static Connection getConnection() throws ClassNotFoundException, SQLException{
		Class.forName("oracle.jdbc.driver.OracleDriver");
		String url = "jdbc:oracle:thin:@127.0.0.1:1521:ORCL";
		String userName = "U_LIMS_GS_0907";
		String pwd = "U_LIMS_GS_0907";
		
		return DriverManager.getConnection(url, userName, pwd);
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
	
	/**
	 * JDBC保存点实例
	 *
	 * 
	 * @author	    余冬冬
	 * @data 	 2016年11月3日
	 * @version	 v0.1.0
	 * @throws SQLException 
	 * @throws ClassNotFoundException 
	 *
	 */
	public static void testSavePoint() throws ClassNotFoundException, SQLException{
		Connection conn = getConnection();
		conn.setAutoCommit(false);
		String sql = "insert into t_hjjc_ypgl_ccy(ccyxh) values(?)";
		PreparedStatement pst = conn.prepareStatement(sql);
		pst.setInt(0, 100);
		Savepoint setSavepoint = conn.setSavepoint();
		pst.execute();
		conn.releaseSavepoint(setSavepoint);
		conn.commit();
		pst.close();
		conn.close();
	}
}
