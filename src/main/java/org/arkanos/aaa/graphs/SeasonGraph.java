package org.arkanos.aaa.graphs;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aaa.controllers.Database;

/**
 * Servlet implementation class SeasonGraph
 */
@WebServlet("/img/seasons/*")
public class SeasonGraph extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SeasonGraph() {
        super();
        Database.initialize();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		PrintWriter writer = response.getWriter();
		writer.print("<?xml version='1.0' encoding='UTF-8' standalone='no'?>");
		
		writer.print("<svg");
		writer.print(" xmlns:dc='http://purl.org/dc/elements/1.1/'");
		writer.print(" xmlns:cc='http://creativecommons.org/ns#'");
		writer.print(" xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'");
		writer.print(" xmlns:svg='http://www.w3.org/2000/svg'");
		writer.print(" xmlns='http://www.w3.org/2000/svg'");
		writer.print(" xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'");
		writer.print(" xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'");
		writer.print(" id='season'");
		writer.print(" version='1.1'");
		
		try {
			System.out.println(request.getRequestURI());
			
			String year = request.getRequestURI().substring(13, 17);
			String season = request.getRequestURI().substring(18);
			//TODO better parsing... with safety.
			
			System.out.println(year+" "+season);
			
			ResultSet rs = Database.query("SELECT id,start FROM season WHERE end >= '"+year+"' AND type = '"+season+"';");
			rs.next();
			int season_id = rs.getInt(1);
			GregorianCalendar start = new GregorianCalendar();
			start.setTime(rs.getDate(2));
			//TODO if rs.next() OOPS, more than one. Fix that. 
			rs.close();			
			
			rs = Database.query("SELECT COUNT(*),MAX(arrow_count) FROM season_goals WHERE season_id = "+season_id+";");
			rs.next();
			int weeks = rs.getInt(1);
			int max_plan = rs.getInt(2);
			rs.close();
			
			
			//SELECT training_id,AVG(value),COUNT(value),date FROM arrow LEFT JOIN training_target ON id = training_id WHERE archer='arkanos' GROUP BY training_id;
			//SELECT SUM(arrows),date FROM aaa.training_technique WHERE archer='arkanos' GROUP BY date;
			//TODO initialise arrays
			int[] target_counts = new int[weeks];
			float[] target_results = new float[weeks];
			int[] training_counts = new int[weeks];
			int week_start = start.get(Calendar.WEEK_OF_YEAR);

			for(int k = 0; k < weeks; k++){
				target_counts[k] = 0;
				target_results[k] = 0;
				training_counts[k] = 0;
			}
			
			//TODO restrict queries to time range of season
			rs = Database.query("SELECT SUM(arrows) AS total_arrows,date FROM training_technique WHERE archer='arkanos' GROUP BY date;");
			while(rs.next()){
				int count = rs.getInt("total_arrows");
				GregorianCalendar t = new GregorianCalendar();
				t.setTime(rs.getDate("date"));
				training_counts[t.get(Calendar.WEEK_OF_YEAR)-week_start]+=count;
			}
			rs.close();
			
			//TODO restrict queries to time range of season
			rs = Database.query("SELECT training_id,AVG(value),COUNT(value) as total_arrows,date FROM arrow LEFT JOIN training_target ON id = training_id WHERE archer='arkanos' GROUP BY training_id;");
			while(rs.next()){
				int count = rs.getInt("total_arrows");
				GregorianCalendar t = new GregorianCalendar();
				t.setTime(rs.getDate("date"));
				System.out.println(t.get(Calendar.WEEK_OF_YEAR)-week_start);
				target_counts[t.get(Calendar.WEEK_OF_YEAR)-week_start]+=count;
			}
			rs.close();
			
			//SELECT COUNT(training_id) AS trainings, SUM(result) AS results,date FROM (SELECT training_id,AVG(value) as result,COUNT(value) as total_arrows,date FROM arrow LEFT JOIN training_target ON id = training_id WHERE archer='arkanos' GROUP BY training_id) AS mess GROUP BY date;
			//TODO restrict queries to time range of season
			rs = Database.query("SELECT COUNT(training_id) AS trainings, SUM(result) AS results,date FROM (SELECT training_id,AVG(value) as result,COUNT(value) as total_arrows,date FROM arrow LEFT JOIN training_target ON id = training_id WHERE archer='arkanos' GROUP BY training_id) AS mess GROUP BY date;");
			HashMap<Integer,Float> weekly_results = new HashMap<Integer,Float>();
			HashMap<Integer,Integer> weekly_trainings = new HashMap<Integer,Integer>();
			while(rs.next()){
				int count = rs.getInt("trainings");
				float results = rs.getFloat("results")/count;
				GregorianCalendar t = new GregorianCalendar();
				t.setTime(rs.getDate("date"));
				int week_number = t.get(Calendar.WEEK_OF_YEAR)-week_start;
				if(weekly_results.get(week_number) != null){
					//TODO test if this is working, current test data does not come here
					float newone = results;
					newone += weekly_results.get(week_number).doubleValue();
					weekly_results.put(week_number, newone);
					int newtraining = weekly_trainings.get(week_number).intValue();
					newtraining++;
					weekly_trainings.put(week_number, newtraining);
				}
				else{
					weekly_results.put(week_number, results);
					weekly_trainings.put(week_number, 1);
				}
			}
			rs.close();
			
			boolean estimate = false;
			for(int r = 0; r < weeks; r++){
				if(estimate || r == 0){
					if(r <= 1){
						target_results[r] = 0; //TODO get the past results
					}
					else{
						target_results[r] = (target_results[r-1]+target_results[r-2])/2;
					}
				}
				if(weekly_results.get(r) != null){
					target_results[r] = weekly_results.get(r)/weekly_trainings.get(r);
					estimate = true;
				}
			}
			
			int max = max_plan;
			for(int c = 0; c < weeks; c++){
				if(target_counts[c]+training_counts[c] > max) max = target_counts[c]+training_counts[c];
			}
			
			
			writer.print(" viewBox='0 "+(-max)+" "+weeks*100+" "+max+"'");
			writer.print(" preserveAspectRatio='xMidYMid meet'");
			writer.print(">");
			
			writer.print("<style>");
			
			writer.print(".border {fill:none;stroke:#00F;stroke-width:1;stroke-opacity:1}");
			
			writer.print(".plan {fill:#FFF;stroke:#000;stroke-opacity:1}");
			writer.print(".training {fill:#CCFFFF;stroke:#000;stroke-opacity:1}");
			writer.print(".target {fill:#FFCC99;stroke:#000;stroke-opacity:1}");
			writer.print(".result {fill:#33CCCC;stroke:#000;stroke-opacity:1}");
			writer.print(".estimation {fill:none;stroke:#00F;stroke-opacity:1;stroke-width:2}");
			
			writer.print(".grid {fill:none;stroke:#000;stroke-opacity:1;stroke-dasharray: 10 5}");
			
			writer.print(".share {fill:#777}");
			writer.print(".share-shadow {fill:#000}");
			
			writer.print("</style>");
			
			writer.print("<g id='main'>");
			
			writer.print("<path class='plan' d='M 0,0 2700,0' />");
			
			
			writer.print("<g id='data' transform='translate("+weeks/2+",-"+weeks/2+") scale(0.99)'>");
			
			
			writer.println(getGrid(max,weeks));
			
			rs = Database.query("SELECT * FROM season LEFT JOIN season_goals ON id = season_id WHERE season_id = "+season_id+" ORDER BY week ASC;");
			int i = 0;
			while(rs.next()){
				int count = rs.getInt("arrow_count");
				int share = rs.getInt("target_share");
				writer.print(getPlan(count,i));
				writer.print(getActual(target_counts[i],training_counts[i],i));
				writer.print(getShare(count-share,i++));
			}
			rs.close();
			
			writer.print(getEstimation(target_results,max));
			writer.print(getResults(weekly_results,weekly_trainings,max));
			
			writer.print("</g>");
			
			writer.print("</g>");
			
			writer.print("</svg>");

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.addHeader("Content-Type", "image/svg+xml");
	}
	
	static public String getEstimation(float[] data, int size) {
		String s = "<g><path class='estimation' d='M ";
		for(int i = 0; i < data.length;i++){
			float k = -((data[i])/10);
			if(i == 0){
				s += "50 "+(k*size)+" C "+ 100 +","+(k*size)+" ";
			}
			else {
				s += (50+i*100-50)+","+(k*size)+" "+(i*100+50)+" "+(k*size)+" S ";
			}			
		}
		s+="'/></g>";
		return s;
	}
	
	static public String getResults(HashMap<Integer,Float> data,HashMap<Integer,Integer> counts, int size) {
		String s = "<g>";
		for(int i: data.keySet()){
			float k = -(((data.get(i)/counts.get(i)))/10);
			s+= "<circle class='result' cx='"+(i*100+50)+"' cy='"+(k*size)+"' r='10'/>";
		}
		s+="</g>";
		return s;
	}

	static public String getShare(double value, int column){
		String s = "<g transform='translate("+(column*100)+","+(-value)+")'>";
		s += "<rect class='share-shadow' x='5' y='0' height='20' width='100' />";
		s += "<rect class='share' y='-5' height='20' width='100' />";
		s += "</g>";
		return s;
	}
	
	static public String getGrid(int height, int columns){
		String s = "<g>";
		for(int i = 0; i <= columns; i++){
			s += "<path class='grid' d='m "+100*i+",0 0,"+(-height)+"  ' />";
		}
		for(int i = height; i > 0; i -= height/10){
			s += "<path class='grid' d='m 0,"+(-i)+" "+(columns*100)+",0  ' />";
		}
		s += "</g>";
		return s;
	}
	
	//TODO double can it be int?
	static public String getPlan(double value, int column){
		String s = "<g transform='translate(0,"+(-value)+")'>";
		s += "<rect class='plan' x='"+(10+column*100)+"' height='"+value+"' width='80' />";
		s += "</g>";
		return s;
	}
	
	static public String getActual(int target, int training, int column){
		String s = "<g transform='translate(0,"+(-target-training)+")'>";
		s += "<rect class='target' x='"+(10+column*100)+"' height='"+ target +"' width='80' />";
		s += "<rect class='training' x='"+(10+column*100)+"' y='"+target+"' height='"+ training +"' width='80' />";
		s += "</g>";
		return s;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
