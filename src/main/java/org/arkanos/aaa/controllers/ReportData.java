package org.arkanos.aaa.controllers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;

public class ReportData {
	
	public static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	private static final ReportData factory = new ReportData();
	
	public class Season{
		public int[] results;
		public float[] sum;
		public int[] technique;
		public int[] totals;
		public int[] plan;
		public int[] gauged;
		
		public int max;
		public int size;
		public int start;
		public String name;
		
		public Season(int weeks){
			results = new int[weeks];
			sum = new float[weeks];
			technique = new int[weeks];
			totals = new int[weeks];
			plan = new int[weeks];
			gauged = new int[weeks];
			size = weeks;
		}
	}
	
	public class DailyReport{
		public HashMap<Integer,HashMap<String,HashMap<String,Integer>>> distance_type = new HashMap<Integer,HashMap<String,HashMap<String,Integer>>>();
		public HashMap<Integer,HashMap<String,HashMap<Integer,HashMap<String,Integer>>>> results = new HashMap<Integer,HashMap<String,HashMap<Integer,HashMap<String,Integer>>>>();
		public HashMap<Integer,HashMap<String,HashMap<String,Float>>> averages = new HashMap<Integer,HashMap<String,HashMap<String,Float>>>();
		
		public HashMap<String,HashMap<String,Integer>> technique_days = new HashMap<String,HashMap<String,Integer>>();
		public HashMap<String,Integer> technique_totals = new HashMap<String,Integer>();
		public HashMap<String,Integer> totals = new HashMap<String,Integer>();
		
		public HashMap<String,Integer> gauged_trainings = new HashMap<String,Integer>();
		public HashMap<String,Float> average_sum = new HashMap<String,Float>();
	}
	
	static public DailyReport compileDailyReport(Date from, Date to, String user) throws SQLException{
		DailyReport dr = factory.new DailyReport();
		
		ResultSet rs = Database.query("SELECT SUM(arrows) as arrows,date,type FROM aaa.training_technique WHERE archer='"+user+"' AND type != 'target' AND date >= '"+sdf.format(from)+"' AND date < '"+sdf.format(to)+"' GROUP BY date,type;");
		while(rs.next()){
			HashMap<String,Integer> parent = dr.technique_days.get(rs.getString("type"));
			if(parent == null){
				parent = new HashMap<String,Integer>();
				dr.technique_days.put(rs.getString("type"),parent);
			}
			parent.put(sdf.format(rs.getDate("date")), rs.getInt("arrows"));
			if(dr.technique_totals.get(sdf.format(rs.getDate("date"))) == null){
				dr.technique_totals.put(sdf.format(rs.getDate("date")), rs.getInt("arrows"));
			}
			else{
				dr.technique_totals.put(sdf.format(rs.getDate("date")), rs.getInt("arrows") + dr.technique_totals.get(sdf.format(rs.getDate("date"))));
			}
			if(dr.totals.get(sdf.format(rs.getDate("date"))) == null){
				dr.totals.put(sdf.format(rs.getDate("date")), rs.getInt("arrows"));
			}
			else{
				dr.totals.put(sdf.format(rs.getDate("date")), rs.getInt("arrows") + dr.totals.get(sdf.format(rs.getDate("date"))));
			}
		}
		rs.close();
		
		//SELECT SUM(arrows) as arrows,distance,date,type FROM aaa.training_technique WHERE archer='"+user+"' AND date >= '2015-07-27' AND date < '2015-09-07' GROUP BY distance,date,type;
		rs = Database.query("SELECT SUM(arrows) as arrows,distance,date,type FROM aaa.training_technique WHERE archer='"+user+"' AND type = 'target' AND date >= '"+sdf.format(from)+"' AND date < '"+sdf.format(to)+"' GROUP BY distance,date,type;");
		while(rs.next()){
			HashMap<String,HashMap<String,Integer>> grandparent = dr.distance_type.get(rs.getInt("distance"));
			if(grandparent == null){
				grandparent = new HashMap<String,HashMap<String,Integer>>();
				dr.distance_type.put(rs.getInt("distance"),grandparent);
			}
			HashMap<String,Integer> parent = grandparent.get(rs.getString("type"));
			if(parent == null){
				parent = new HashMap<String,Integer>();
				grandparent.put(rs.getString("type"),parent);
			}
			parent.put(sdf.format(rs.getDate("date")), rs.getInt("arrows"));
			if(dr.technique_totals.get(sdf.format(rs.getDate("date"))) == null){
				dr.technique_totals.put(sdf.format(rs.getDate("date")), rs.getInt("arrows"));
			}
			else{
				dr.technique_totals.put(sdf.format(rs.getDate("date")), rs.getInt("arrows") + dr.technique_totals.get(sdf.format(rs.getDate("date"))));
			}
			if(dr.totals.get(sdf.format(rs.getDate("date"))) == null){
				dr.totals.put(sdf.format(rs.getDate("date")), rs.getInt("arrows"));
			}
			else{
				dr.totals.put(sdf.format(rs.getDate("date")), rs.getInt("arrows") + dr.totals.get(sdf.format(rs.getDate("date"))));
			}
		}
		rs.close();
		
		//SELECT COUNT(value) as total_arrows,date,distance FROM arrow LEFT JOIN training_target ON id = training_id WHERE archer='"+user+"' GROUP BY date,distance;
		rs = Database.query("SELECT COUNT(value) as arrows,date,distance FROM arrow LEFT JOIN training_target ON id = training_id WHERE archer='"+user+"' AND date >= '"+sdf.format(from)+"' AND date < '"+sdf.format(to)+"' GROUP BY date,distance;");
		while(rs.next()){
			HashMap<String,HashMap<String,Integer>> grandparent = dr.distance_type.get(rs.getInt("distance"));
			if(grandparent == null){
				grandparent = new HashMap<String,HashMap<String,Integer>>();
				dr.distance_type.put(rs.getInt("distance"),grandparent);
			}
			HashMap<String,Integer> parent = grandparent.get("gauged");
			if(parent == null){
				parent = new HashMap<String,Integer>();
				grandparent.put("gauged",parent);
			}
			parent.put(sdf.format(rs.getDate("date")), rs.getInt("arrows"));
			if(dr.totals.get(sdf.format(rs.getDate("date"))) == null){
				dr.totals.put(sdf.format(rs.getDate("date")), rs.getInt("arrows"));
			}
			else{
				dr.totals.put(sdf.format(rs.getDate("date")), rs.getInt("arrows") + dr.totals.get(sdf.format(rs.getDate("date"))));
			}
		}
		rs.close();
		
		
		//SELECT date,distance,class,id,AVG(value) FROM aaa.training_target LEFT JOIN arrow ON id = training_id GROUP BY id;
		HashMap<String,Integer> result_order = new HashMap<String,Integer>();
		rs = Database.query("SELECT date,distance,class,id,SUM(value) as result FROM training_target LEFT JOIN arrow ON id = training_id WHERE archer='"+user+"' AND date >= '"+sdf.format(from)+"' AND date < '"+sdf.format(to)+"' GROUP BY id;");
		while(rs.next()){
			int distance = rs.getInt("distance");
			String classs = rs.getString("class");
			String date = sdf.format(rs.getDate("date"));
			int result = rs.getInt("result");
			
			
			HashMap<String,HashMap<Integer,HashMap<String,Integer>>> greatgrandparent = dr.results.get(distance);
			if(greatgrandparent == null){
				greatgrandparent = new HashMap<String,HashMap<Integer,HashMap<String,Integer>>>();
				dr.results.put(distance,greatgrandparent);
			}
			HashMap<Integer, HashMap<String, Integer>> grandparent = greatgrandparent.get(classs);
			if(grandparent == null){
				grandparent = new HashMap<Integer, HashMap<String, Integer>>();
				greatgrandparent.put(classs,grandparent);
			}
			
			/**ID to order magic**/
			Integer order = result_order.get(distance+classs+date);
			if(order == null){
				order = 1;
			}
			
			result_order.put(distance+classs+date,order);
			HashMap<String,Integer> parent = grandparent.get(order);
			if(parent == null){
				parent = new HashMap<String,Integer>();
				grandparent.put(order,parent);
			}
			order += 1;
			parent.put(date,result);
		}
		rs.close();
		
		rs = Database.query("SELECT date,distance,class,id,AVG(value) AS average FROM training_target LEFT JOIN arrow ON id = training_id WHERE archer='"+user+"' AND date >= '"+sdf.format(from)+"' AND date < '"+sdf.format(to)+"' GROUP BY date,class;");
		while(rs.next()){
			int distance = rs.getInt("distance");
			String classs = rs.getString("class");
			String date = sdf.format(rs.getDate("date"));
			float result = rs.getFloat("average");
			//TODO make all above look like this in variables.
			
			HashMap<String,HashMap<String,Float>> grandparent = dr.averages.get(distance);
			if(grandparent == null){
				grandparent = new HashMap<String,HashMap<String,Float>>();
				dr.averages.put(distance,grandparent);
			}
			HashMap<String, Float> parent = grandparent.get(classs);
			if(parent == null){
				parent = new HashMap<String, Float>();
				grandparent.put(classs,parent);
			}
			parent.put(date,result);
			
			if(dr.gauged_trainings.get(date) == null){
				dr.gauged_trainings.put(date, 1);
			}
			else{
				dr.gauged_trainings.put(date, dr.gauged_trainings.get(date)+1);
			}
			if(dr.average_sum.get(date) == null){
				dr.average_sum.put(date, result);
			}
			else{
				dr.average_sum.put(date, result + dr.average_sum.get(date));
			}
		}
		rs.close();
		
		return dr;
	}
	
	static public Season compileSeasonData(Date when,String user) throws SQLException{
		//TODO initialize
		
		String season_name = "";
		int season_max = 0;
		int season_start = 0;
		int season_size = 0;
		Date start = null;
		Date end = null;
		int id = 0;
		
		ResultSet rs = Database.query("SELECT id,start,end,name,COUNT(week) as weeks,MIN(week) as start_week,MAX(arrow_count) as max_count FROM season LEFT JOIN season_goals ON id = season_id WHERE start <= '"+sdf.format(when)+"' AND end >= '"+sdf.format(when)+"' GROUP BY id;");
		while(rs.next()){
			season_size = rs.getInt("weeks");
			season_name = rs.getString("name");
			season_max = rs.getInt("max_count");
			season_start = rs.getInt("start_week");
			start = rs.getDate("start");
			end = rs.getDate("end");
			id = rs.getInt("id");
		}
		rs.close();
		
		Season weekly = factory.new Season(season_size);
		weekly.max = season_max;
		weekly.start = season_start;
		weekly.name = season_name;
		
		rs = Database.query("SELECT name,week,arrow_count,target_share FROM season LEFT JOIN season_goals ON id = season_id WHERE id = '"+id+"';");
		while(rs.next()){
			weekly.plan[rs.getInt("week")-season_start] = rs.getInt("arrow_count");
			weekly.gauged[rs.getInt("week")-season_start] = rs.getInt("target_share");
		}
		rs.close();
		
		DailyReport dr = compileDailyReport(start,end,user);
		
		GregorianCalendar gc = new GregorianCalendar();
		try {
			for(String d: dr.technique_totals.keySet()){
				gc.clear();
				gc.setTime(sdf.parse(d));
				weekly.technique[gc.get(Calendar.WEEK_OF_YEAR)-season_start] += dr.technique_totals.get(d);
			}
			for(String d: dr.totals.keySet()){
				gc.clear();
				gc.setTime(sdf.parse(d));
				weekly.totals[gc.get(Calendar.WEEK_OF_YEAR)-season_start] += dr.totals.get(d);
			}
			for(String d: dr.gauged_trainings.keySet()){
				gc.clear();
				gc.setTime(sdf.parse(d));
				weekly.sum[gc.get(Calendar.WEEK_OF_YEAR)-season_start] += (dr.average_sum.get(d)/dr.gauged_trainings.get(d));
				weekly.results[gc.get(Calendar.WEEK_OF_YEAR)-season_start]++;
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return weekly;
	}

}
