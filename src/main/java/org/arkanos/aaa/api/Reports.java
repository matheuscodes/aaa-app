package org.arkanos.aaa.api;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

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
		if(to_parse.substring(0, to_parse.indexOf("/")).equals("monthly")){
			to_parse = to_parse.substring(to_parse.indexOf("/")+1);
			int year = Integer.parseInt(to_parse.substring(0, to_parse.indexOf("/")));
			to_parse = to_parse.substring(to_parse.indexOf("/")+1);
			int month = Integer.parseInt(to_parse.substring(0, to_parse.indexOf("/")));
			to_parse = to_parse.substring(to_parse.indexOf("/")+1);
			
			GregorianCalendar gc = new GregorianCalendar();
			gc.clear();
			gc.set(Calendar.YEAR, year);
			gc.set(Calendar.MONTH, month-1);
			gc.set(Calendar.DATE,1);
			System.out.println(gc.getTime());
			int week_start = gc.get(Calendar.WEEK_OF_YEAR);
			System.out.println(week_start);
			
			gc.clear();
			gc.set(Calendar.YEAR, year);
			gc.set(Calendar.MONTH, month);
			gc.set(Calendar.DATE,0);
			System.out.println(gc.getTime());
			int week_end = gc.get(Calendar.WEEK_OF_YEAR);
			System.out.println(week_end);
			
			gc.clear();
			gc.set(Calendar.YEAR, year);
			gc.set(Calendar.WEEK_OF_YEAR,week_start);
			Date start = gc.getTime();
			
			gc.clear();
			gc.set(Calendar.YEAR, year);
			gc.set(Calendar.WEEK_OF_YEAR,week_end+1);
			Date end = gc.getTime();
					
			SimpleDateFormat format = new SimpleDateFormat("YYYY-MM-dd");
			
			System.out.println(format.format(start));
			System.out.println(format.format(end));
			
			
		}
		//TODO throw error, treat exceptions
		
		//System.out.println(to_parse.substring(0, to_parse.indexOf("/")));
		//to_parse = to_parse.substring(to_parse.indexOf("/")+1);
		//System.out.println(to_parse.substring(0, to_parse.indexOf("/")));
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
