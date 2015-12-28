package com.demo.servlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface BaseAjaxRequest {
	public void request(HttpServletRequest request, HttpServletResponse response);
}
