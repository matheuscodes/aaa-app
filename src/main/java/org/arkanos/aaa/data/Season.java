package org.arkanos.aaa.data;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.arkanos.aaa.controllers.Database;
import org.arkanos.aaa.data.Training.DailyPerformance;

public class Season {
	private static final Season factory = new Season();
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	
	public class WeeklyPerformance{
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
		
		public WeeklyPerformance(int weeks){
			results = new int[weeks];
			sum = new float[weeks];
			technique = new int[weeks];
			totals = new int[weeks];
			plan = new int[weeks];
			gauged = new int[weeks];
			size = weeks;
		}
	}
	
	static public WeeklyPerformance compileWeekly(Date when,String user) throws SQLException{
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
		
		WeeklyPerformance weekly = factory.new WeeklyPerformance(season_size);
		weekly.max = season_max;
		weekly.start = season_start;
		weekly.name = season_name;
		
		rs = Database.query("SELECT name,week,arrow_count,target_share FROM season LEFT JOIN season_goals ON id = season_id WHERE id = '"+id+"';");
		while(rs.next()){
			weekly.plan[rs.getInt("week")-season_start] = rs.getInt("arrow_count");
			weekly.gauged[rs.getInt("week")-season_start] = rs.getInt("target_share");
		}
		rs.close();
		
		DailyPerformance dr = Training.compileDaily(start,end,user);
		
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
