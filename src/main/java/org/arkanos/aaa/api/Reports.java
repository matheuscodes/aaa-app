package org.arkanos.aaa.api;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aaa.controllers.Database;

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
        Database.initialize();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String json = "";
		String to_parse = request.getRequestURI();
		if(!to_parse.endsWith("/")) to_parse += "/";
		
		to_parse = to_parse.replaceAll("/reports/", "");
		if(to_parse.substring(0, to_parse.indexOf("/")).equals("monthly")){
			to_parse = to_parse.substring(to_parse.indexOf("/")+1);
			int year = Integer.parseInt(to_parse.substring(0, to_parse.indexOf("/")));
			to_parse = to_parse.substring(to_parse.indexOf("/")+1);
			int month = Integer.parseInt(to_parse.substring(0, to_parse.indexOf("/")));
			to_parse = to_parse.substring(to_parse.indexOf("/")+1);
			
			//TODO error if there is still BS in the URI.
			
			GregorianCalendar gc = new GregorianCalendar();
			gc.clear();
			gc.set(Calendar.YEAR, year);
			gc.set(Calendar.MONTH, month-1);
			gc.set(Calendar.DATE,1);
			int week_start = gc.get(Calendar.WEEK_OF_YEAR);
			
			gc.clear();
			gc.set(Calendar.YEAR, year);
			gc.set(Calendar.MONTH, month);
			gc.set(Calendar.DATE,0);
			int week_end = gc.get(Calendar.WEEK_OF_YEAR);
			
			gc.clear();
			gc.set(Calendar.YEAR, year);
			gc.set(Calendar.WEEK_OF_YEAR,week_start);
			Date start = gc.getTime();
			
			gc.clear();
			if(week_start < week_end){
				gc.set(Calendar.YEAR, year);
			}
			else {
				gc.set(Calendar.YEAR, year+1);
			}
			gc.set(Calendar.WEEK_OF_YEAR,week_end+1);
			Date end = gc.getTime();
					
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			
			System.out.println(sdf.format(start));
			System.out.println(sdf.format(end));
			
			HashMap<Integer,HashMap<String,HashMap<String,Integer>>> distance_type = new HashMap<Integer,HashMap<String,HashMap<String,Integer>>>();
			HashMap<String,HashMap<String,Integer>> technique_days = new HashMap<String,HashMap<String,Integer>>();
			try{
				
				//SELECT SUM(arrows) as arrows,date,type FROM aaa.training_technique WHERE archer='arkanos' AND type != 'target' AND date >= '2015-07-27' AND date < '2015-09-07' GROUP BY date,type;
				ResultSet rs = Database.query("SELECT SUM(arrows) as arrows,date,type FROM aaa.training_technique WHERE archer='arkanos' AND type != 'target' AND date >= '"+sdf.format(start)+"' AND date < '"+sdf.format(end)+"' GROUP BY date,type;");
				while(rs.next()){
					HashMap<String,Integer> parent = technique_days.get(rs.getString("type"));
					if(parent == null){
						parent = new HashMap<String,Integer>();
						technique_days.put(rs.getString("type"),parent);
					}
					parent.put(sdf.format(rs.getDate("date")), rs.getInt("arrows"));
				}
				rs.close();
				
				//SELECT SUM(arrows) as arrows,distance,date,type FROM aaa.training_technique WHERE archer='arkanos' AND date >= '2015-07-27' AND date < '2015-09-07' GROUP BY distance,date,type;
				rs = Database.query("SELECT SUM(arrows) as arrows,distance,date,type FROM aaa.training_technique WHERE archer='arkanos' AND type = 'target' AND date >= '"+sdf.format(start)+"' AND date < '"+sdf.format(end)+"' GROUP BY distance,date,type;");
				while(rs.next()){
					HashMap<String,HashMap<String,Integer>> grandparent = distance_type.get(rs.getInt("distance"));
					if(grandparent == null){
						grandparent = new HashMap<String,HashMap<String,Integer>>();
						distance_type.put(rs.getInt("distance"),grandparent);
					}
					HashMap<String,Integer> parent = grandparent.get(rs.getString("type"));
					if(parent == null){
						parent = new HashMap<String,Integer>();
						grandparent.put(rs.getString("type"),parent);
					}
					parent.put(sdf.format(rs.getDate("date")), rs.getInt("arrows"));
				}
				rs.close();
				
				//SELECT COUNT(value) as total_arrows,date,distance FROM arrow LEFT JOIN training_target ON id = training_id WHERE archer='arkanos' GROUP BY date,distance;
				rs = Database.query("SELECT COUNT(value) as arrows,date,distance FROM arrow LEFT JOIN training_target ON id = training_id WHERE archer='arkanos' AND date >= '"+sdf.format(start)+"' AND date < '"+sdf.format(end)+"' GROUP BY date,distance;");
				while(rs.next()){
					HashMap<String,HashMap<String,Integer>> grandparent = distance_type.get(rs.getInt("distance"));
					if(grandparent == null){
						grandparent = new HashMap<String,HashMap<String,Integer>>();
						distance_type.put(rs.getInt("distance"),grandparent);
					}
					HashMap<String,Integer> parent = grandparent.get("gauged");
					if(parent == null){
						parent = new HashMap<String,Integer>();
						grandparent.put("gauged",parent);
					}
					parent.put(sdf.format(rs.getDate("date")), rs.getInt("arrows"));
				}
				rs.close();
				
				
			}
			catch(SQLException e){
				//TODO
				e.printStackTrace();
			}
			
			
			
			json += "{";
			
			json += "\"arrow_counts\":";

			json += "{";
			for(String t: technique_days.keySet()){
				json += "\""+t+"\":";
				json += "{";
				for(String d: technique_days.get(t).keySet()){
					json += "\""+d+"\":"+technique_days.get(t).get(d)+",";
				}
				if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
				json += "},";
			}
			
			for(Integer di: distance_type.keySet()){
				json += "\""+di+"\":";
				json += "{";
				for(String t: distance_type.get(di).keySet()){
					json += "\""+t+"\":";
					json += "{";
					for(String d: distance_type.get(di).get(t).keySet()){
						json += "\""+d+"\":"+distance_type.get(di).get(t).get(d)+",";
					}
					if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
					json += "},";
				}
				if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
				json += "},";
			}
			
			if(json.endsWith(",")) json = json.substring(0,json.lastIndexOf(','));
			
			json += "},";
			
			json += "\"start\":\""+sdf.format(start)+"\",";
			json += "\"end\":\""+sdf.format(end)+"\",";
			json += "\"week_start\":"+week_start+",";
			json += "\"week_end\":"+week_end+",";
			json += "\"month\":"+month+",";
			json += "\"response\":200}";
			System.out.println(json);
		}
		//TODO throw error, treat exceptions
		
		//System.out.println(to_parse.substring(0, to_parse.indexOf("/")));
		//to_parse = to_parse.substring(to_parse.indexOf("/")+1);
		//System.out.println(to_parse.substring(0, to_parse.indexOf("/")));
		response.getWriter().append(json);
		response.addHeader("Content-Type", "application/json");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
