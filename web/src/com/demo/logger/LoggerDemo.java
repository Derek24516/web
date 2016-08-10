package com.demo.logger;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

/**
 * 日志的一些用法（Logger4j）
 * 
 * @date		2015-12-28
 * 
 */
public class LoggerDemo {

	/**
	 * Logger4j的一些用法
	 *
	 * @param		void
	 * @Exception	IOException
	 * @return 		void
	 * @date		2015-12-28
	 * 
	 */
	public static void main(String[] args) {
		testLogger();

	}
	
	/**
	 * 
	 * Logger4j的一些用法
	 *
	 * @param		void
	 * @Exception	IOException
	 * @return 		void
	 * @date		2015-12-28
	 *
	 */
	public static void testLogger(){
		//	获取rootLogger
		Logger rootLogger = Logger.getRootLogger();
		
		//	获取自定义的Logger
		Logger myLogger = Logger.getLogger("log4j.logger.myLogger");
		
		//	使用Java属性配置文件配置Log4j环境
		PropertyConfigurator.configure("F:\\gitResponsitory\\web\\web\\src\\log4j.properties");
		
		//	Log的等级从低到高依次是：debug，info，warn，error,fatal
		rootLogger.debug("This is a message from " + rootLogger.getName());
		rootLogger.info("This is a message from " + rootLogger.getName());
		rootLogger.warn("This is a message from " + rootLogger.getName());
		rootLogger.error("This is a message from " + rootLogger.getName());
		rootLogger.fatal("This is a message from " + rootLogger.getName());
		
		myLogger.debug("This is a message from " + myLogger.getName());
		myLogger.info("This is a message from " + myLogger.getName());
		myLogger.warn("This is a message from " + myLogger.getName());
		myLogger.error("This is a message from " + myLogger.getName());
		myLogger.fatal("This is a message from " + myLogger.getName());
	}

}
