package org.arkanos.aaa.api;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Reports
 */
@WebServlet("/reports/*")
public class Reports extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Reports() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String to_parse = request.getRequestURI();
		if(!to_parse.endsWith("/")) to_parse += "/";
		
		to_parse = to_parse.replaceAll("/reports/", "");
		System.out.println(to_parse.substring(0, to_parse.indexOf("/")));
		to_parse = to_parse.substring(to_parse.indexOf("/")+1);
		System.out.println(to_parse.substring(0, to_parse.indexOf("/")));
		to_parse = to_parse.substring(to_parse.indexOf("/")+1);
		System.out.println(to_parse.substring(0, to_parse.indexOf("/")));
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
