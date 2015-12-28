package com.demo.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

public class TestRequest implements BaseAjaxRequest{

	@Override
	public void request(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		
	}
	
	public void myRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		JSONObject jo = new JSONObject();
		jo.put("result", true);
		jo.put("msg", "Success啦!");
		response.getWriter().write(jo.toString());
	}

}
