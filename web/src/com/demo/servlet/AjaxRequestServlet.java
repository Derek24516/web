package com.demo.servlet;

import java.io.IOException;
import java.lang.reflect.Method;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import com.mongodb.util.JSON;
import com.ydd.util.StringUtils;

/**
 * Servlet implementation class AjaxRequestServlet
 */
public class AjaxRequestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxRequestServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/xml;charset=utf-8");
		//	类名
		String className = request.getParameter("className");
		//	方法名
		String methodName = request.getParameter("methodName");
		//	返回结果
		JSONObject result = new JSONObject();
		if(StringUtils.isEmty(className) || StringUtils.isEmty(methodName)){
			result.put("reult", false);
			result.put("msg", "根据类名和方法名查找不到对应的方法！");
			response.getWriter().write(result.toString());
			return;
		}
		try {
			//	反射获得类
			Class cls =  Class.forName(className);
			//	获取类的一个实例
			Object obj = cls.newInstance();
			//	获取类的对应的方法
			Method method = cls.getMethod(methodName,new Class[]{HttpServletRequest.class,HttpServletResponse.class});
			//	调用该方法
			method.invoke(obj, new Object[]{request,response});
		} catch (Exception e) {
			result.put("reult", false);
			result.put("msg", "根据类名[" + className +"]调用对应的方法[" + methodName + "]出错：" + e.getMessage());
			response.getWriter().write(result.toString());
			e.printStackTrace();
		}
	}

}
