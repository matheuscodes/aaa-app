package org.arkanos.aaa.data;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;

import org.arkanos.aaa.controllers.Database;
import org.arkanos.aaa.data.Training.DailyPerformance;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Season {
	private static final Season factory = new Season();
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

	static public final String TABLE_NAME = "season";
	static public final String TABLE_NAME_GOALS = "season_goals";

	static public final String FIELD_ID = "id";
	static public final String FIELD_START = "start";
	static public final String FIELD_END = "end";
	static public final String FIELD_NAME = "name";
	static public final String FIELD_ARCHER = "archer";

	static public final String FIELD_WEEK = "week";
	static public final String FIELD_SEASON_ID = "season_id";
	static public final String FIELD_ARROW_COUNT = "arrow_count";
	static public final String FIELD_TARGET_SHARE = "target_share";

	static public final String FIELD_SIZE = "size";
	static public final String FIELD_MAX = "max";
	static public final String FIELD_ARROWS = "arrows";
	static public final String FIELD_TARGETS = "targets";
	static public final String FIELD_START_DATE = "start_date";
	static public final String FIELD_END_DATE = "end_date";
	static public final String FIELD_WEEKS = "weeks";

	public class WeeklyPerformance {
		public int[] results;
		public float[] sum;
		public int[] technique;
		public int[] totals;
		public int[] plan;
		public int[] gauged;
		public HashMap<Integer, Integer> weeks;

		public int max;
		public int size;
		public int start;
		public String name;
		public long id;

		public WeeklyPerformance(int weeks) {
			results = new int[weeks];
			sum = new float[weeks];
			technique = new int[weeks];
			totals = new int[weeks];
			plan = new int[weeks];
			gauged = new int[weeks];
			size = weeks;
		}
	}

	static public WeeklyPerformance compileWeekly(Date when, String user) throws SQLException {
		// TODO initialize
		// TODO delete this and use compileWeeklies();

		String season_name = "";
		int season_max = 0;
		int season_start = 0;
		int season_size = 0;
		Date start = null;
		Date end = null;
		int id = 0;
		// TODO use constants in the class
		ResultSet rs = Database
				.query("SELECT id,start,end,name,COUNT(week) as weeks,MIN(week) as start_week,MAX(arrow_count) as max_count FROM season LEFT JOIN season_goals ON id = season_id WHERE start <= '"
						+ sdf.format(when) + "' AND end >= '" + sdf.format(when) + "' GROUP BY id;");
		while (rs.next()) {
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

		rs = Database
				.query("SELECT name,week,arrow_count,target_share FROM season LEFT JOIN season_goals ON id = season_id WHERE id = '"
						+ id + "';");
		while (rs.next()) {
			weekly.plan[rs.getInt("week") - season_start] = rs.getInt("arrow_count");
			weekly.gauged[rs.getInt("week") - season_start] = rs.getInt("target_share");
		}
		rs.close();

		DailyPerformance dr = Training.compileDaily(start, end, user);

		GregorianCalendar gc = new GregorianCalendar();
		try {
			for (String d : dr.technique_totals.keySet()) {
				gc.clear();
				gc.setTime(sdf.parse(d));
				weekly.technique[gc.get(Calendar.WEEK_OF_YEAR) - season_start] += dr.technique_totals.get(d);
			}
			for (String d : dr.totals.keySet()) {
				gc.clear();
				gc.setTime(sdf.parse(d));
				weekly.totals[gc.get(Calendar.WEEK_OF_YEAR) - season_start] += dr.totals.get(d);
			}
			for (String d : dr.gauged_trainings.keySet()) {
				gc.clear();
				gc.setTime(sdf.parse(d));
				weekly.sum[gc.get(Calendar.WEEK_OF_YEAR) - season_start] += (dr.average_sum.get(d)
						/ dr.gauged_trainings.get(d));
				weekly.results[gc.get(Calendar.WEEK_OF_YEAR) - season_start]++;
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return weekly;
	}

	static public String getAllSeasonsJSON(String archer) {
		try {
			String query = "SELECT * FROM " + TABLE_NAME + " WHERE " + FIELD_ARCHER + " = ?;";
			HashMap<Integer, String> prejsons = new HashMap<Integer, String>();
			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int id = rs.getInt(FIELD_ID);
				String json = prejsons.get(id);
				if (json == null)
					json = "";
				json += "\"" + FIELD_ID + "\":" + id + ",";
				json += "\"" + FIELD_NAME + "\":\"" + rs.getString(FIELD_NAME) + "\",";
				String start = rs.getString(FIELD_START);
				json += "\"" + FIELD_START_DATE + "\":\"" + rs.getString(FIELD_START).substring(0, 10) + "\",";
				String end = rs.getString(FIELD_END);
				json += "\"" + FIELD_END_DATE + "\":\"" + rs.getString(FIELD_END).substring(0, 10) + "\",";
				json += "\"" + FIELD_SIZE + "\":"
						+ ((sdf.parse(end).getTime() - sdf.parse(start).getTime()) / (7 * 24 * 60 * 60 * 1000) + 1)
						+ ",";
				prejsons.put(id, json);
			}
			rs.close();
			ps.close();

			query = "SELECT * FROM " + TABLE_NAME_GOALS + " WHERE " + FIELD_SEASON_ID + "= ? ORDER BY " + FIELD_WEEK
					+ " ASC;";
			// TODO optimize this.
			String final_json = "{";
			int max = 0;
			for (Integer id : prejsons.keySet()) {
				ps = Database.prepare(query);
				ps.setInt(1, id);
				rs = ps.executeQuery();
				LinkedList<Integer> arrows = new LinkedList<Integer>();
				LinkedList<Integer> targets = new LinkedList<Integer>();
				LinkedList<Integer> weeks = new LinkedList<Integer>();
				while (rs.next()) {
					int ac = rs.getInt(FIELD_ARROW_COUNT);
					int tc = rs.getInt(FIELD_TARGET_SHARE);
					int w = rs.getInt(FIELD_WEEK);
					arrows.add(ac);
					targets.add(tc);
					weeks.add(w);
					if (ac > max)
						max = ac;
					if (tc > max)
						max = tc;
				}
				rs.close();
				ps.close();
				String json = prejsons.get(id);
				json += "\"" + FIELD_MAX + "\":" + max + ",";
				json += "\"" + FIELD_ARROWS + "\":" + arrows.toString() + ",";
				json += "\"" + FIELD_TARGETS + "\":" + targets.toString() + ",";
				json += "\"" + FIELD_WEEKS + "\":" + weeks.toString();
				final_json += "\"" + id + "\":" + "{" + json + "},";
			}
			final_json = final_json.substring(0, final_json.length() - 1) + "}";

			return final_json;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	static public boolean deleteSeason(String archer, long id) {
		try {
			String query = "DELETE FROM " + TABLE_NAME;
			query += " WHERE " + FIELD_ARCHER + " = ?";
			query += " AND " + FIELD_ID + " = ?;";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ps.setLong(2, id); // TODO make sure all ids are long.

			int result = ps.executeUpdate();
			if (result > 0) {
				return true;
			}
			ps.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	static public boolean createSeason(String archer, JSONObject json) {
		try {
			String query = "INSERT INTO " + TABLE_NAME + "(";
			query += FIELD_START + ",";
			query += FIELD_END + ",";
			query += FIELD_NAME + ",";
			query += FIELD_ARCHER + ")";
			query += " VALUES (?,?,?,?);";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, json.get(FIELD_START_DATE).toString());
			ps.setString(2, json.get(FIELD_END_DATE).toString());
			ps.setString(3, json.get(FIELD_NAME).toString());
			ps.setString(4, archer);

			int result = ps.executeUpdate();
			if (result > 0) {
				ResultSet rs = ps.getGeneratedKeys();
				while (rs.next()) {
					// TODO move from ints to longs
					JSONArray arrows = (JSONArray) json.get(FIELD_ARROWS);
					JSONArray targets = (JSONArray) json.get(FIELD_TARGETS);
					GregorianCalendar gc = new GregorianCalendar(Locale.UK); // TODO
					// check
					// if
					// this
					// is
					// a
					// solution
					// for
					// the
					// monday
					// thing.
					Date start = sdf.parse(json.get(FIELD_START_DATE).toString());
					Date end = sdf.parse(json.get(FIELD_END_DATE).toString());
					LinkedList<Integer> weeks = new LinkedList<Integer>();
					for (long i = start.getTime(); i <= end.getTime(); i += 7 * 24 * 60 * 60 * 1000) {
						gc.setTimeInMillis(i);
						weeks.add(gc.get(Calendar.WEEK_OF_YEAR));
					}
					updateSeasonGoals(rs.getInt(1), arrows.toArray(), targets.toArray(), weeks.toArray(), true);
				}
				rs.close();
				ps.close();
				return true;
			}
			ps.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	static public boolean updateSeason(String archer, long id, JSONObject json) {
		try {
			String query = "UPDATE " + TABLE_NAME + " SET ";
			query += FIELD_START + " = ?,";
			query += FIELD_END + " = ?,";
			query += FIELD_NAME + " = ?";
			query += " WHERE " + FIELD_ARCHER + " = ?";
			query += " AND " + FIELD_ID + " = ?;";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, json.get(FIELD_START_DATE).toString());
			ps.setString(2, json.get(FIELD_END_DATE).toString());
			ps.setString(3, json.get(FIELD_NAME).toString());
			ps.setString(4, archer);
			ps.setLong(5, id);

			int result = ps.executeUpdate();
			if (result > 0) {
				// TODO move from ints to longs
				JSONArray arrows = (JSONArray) json.get(FIELD_ARROWS);
				JSONArray targets = (JSONArray) json.get(FIELD_TARGETS);
				GregorianCalendar gc = new GregorianCalendar(Locale.UK); // TODO
				// check
				// if
				// this
				// is a
				// solution
				// for
				// the
				// monday
				// thing.
				Date start = sdf.parse(json.get(FIELD_START_DATE).toString());
				Date end = sdf.parse(json.get(FIELD_END_DATE).toString());
				LinkedList<Integer> weeks = new LinkedList<Integer>();
				for (long i = start.getTime(); i <= end.getTime(); i += 7 * 24 * 60 * 60 * 1000) {
					gc.setTimeInMillis(i);
					weeks.add(gc.get(Calendar.WEEK_OF_YEAR));
				}
				updateSeasonGoals(id, arrows.toArray(), targets.toArray(), weeks.toArray(), false);

				return true;
			}
			ps.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	static private boolean updateSeasonGoals(long id, Object[] arrows, Object[] targets, Object[] weeks,
			boolean create) {
		try {
			String query;
			if (create) {
				query = "INSERT INTO " + TABLE_NAME_GOALS + "(";
				query += FIELD_ARROW_COUNT + ",";
				query += FIELD_TARGET_SHARE + ",";
				query += FIELD_SEASON_ID + ",";
				query += FIELD_WEEK + ")";
				query += " VALUES (?,?,?,?);";
			} else {
				query = "UPDATE " + TABLE_NAME_GOALS + " SET ";
				query += FIELD_ARROW_COUNT + " = ?,";
				query += FIELD_TARGET_SHARE + " = ?";
				query += " WHERE " + FIELD_SEASON_ID + " = ?";
				query += " AND " + FIELD_WEEK + " = ?;";
			}
			PreparedStatement ps = Database.prepare(query);

			for (int i = 0; i < weeks.length; i++) {
				ps.setLong(1, (Long) arrows[i]);
				ps.setLong(2, (Long) targets[i]);
				ps.setLong(3, id);
				ps.setInt(4, (Integer) weeks[i]);
				ps.addBatch();
			}
			int[] results = ps.executeBatch();
			ps.close();
			for (int i : results) {
				if (i <= 0) {
					return false;
				}
			}
			return true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	static public String getRecentAddedSeason(String archer, JSONObject json) {
		try {
			String query = "SELECT MAX(" + FIELD_ID + ") as " + FIELD_ID + " ";
			query += "FROM " + TABLE_NAME + " ";
			query += "WHERE " + FIELD_ARCHER + " = ?;";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);

			ResultSet rs = ps.executeQuery();
			String result = "{";
			if (rs.next()) {
				// TODO return the proper full object...
				int id = rs.getInt(FIELD_ID);
				// TODO maybe reduce this to json.put()
				result += "\"" + FIELD_ID + "\":" + id + "";
			}
			result += "}";
			rs.close();
			ps.close();
			return result;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	static private List<WeeklyPerformance> compileWeeklies(String archer, Date when) {
		try {
			String season_name = "";
			int season_max = 0;
			int season_size = 0;
			Date start = null;
			Date end = null;
			int id = 0;
			String query = "SELECT " + FIELD_ID + "," + FIELD_START + "," + FIELD_END + ",";
			query += FIELD_NAME + ",COUNT(" + FIELD_WEEK + ") AS weeks, ";
			query += "MAX(" + FIELD_ARROW_COUNT + ") AS max_count FROM " + TABLE_NAME + " ";
			query += "LEFT JOIN " + TABLE_NAME_GOALS + " ON " + FIELD_ID + " = " + FIELD_SEASON_ID + " ";
			query += "WHERE " + FIELD_ARCHER + " = ? ";
			query += "AND " + FIELD_START + " <= ? ";
			query += "AND " + FIELD_END + " >= ? ";
			query += "GROUP BY " + FIELD_ID + ";";
			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ps.setString(2, Database.sdf.format(when));
			ps.setString(3, Database.sdf.format(when));
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				season_size = rs.getInt("weeks");
				season_name = rs.getString(FIELD_NAME);
				season_max = rs.getInt("max_count");
				start = rs.getDate(FIELD_START);
				end = rs.getDate(FIELD_END);
				id = rs.getInt(FIELD_ID);
				// TODO actually get multiple seasons, requires full refactoring
			}
			rs.close();
			ps.close();

			// TODO centralize all Gregorian calendars
			GregorianCalendar gc = new GregorianCalendar(Locale.UK);
			gc.setTime(start);

			WeeklyPerformance weekly = factory.new WeeklyPerformance(season_size);
			weekly.max = season_max;
			weekly.start = gc.get(Calendar.WEEK_OF_YEAR);
			weekly.name = season_name;
			weekly.id = id;

			weekly.weeks = new HashMap<Integer, Integer>(weekly.size);
			int k = weekly.start;
			gc.set(Calendar.MONTH, Calendar.DECEMBER);
			gc.set(Calendar.DATE, 31);
			int year_end = gc.get(Calendar.WEEK_OF_YEAR);
			for (int i = 0; i < weekly.size; i++) {
				weekly.weeks.put(k++, i);
				if (k > year_end)
					k = 1;
			}

			// TODO select only a couple fields?
			query = "SELECT * FROM " + TABLE_NAME + " LEFT JOIN " + TABLE_NAME_GOALS + " ";
			query += "ON " + FIELD_ID + " = " + FIELD_SEASON_ID + " WHERE " + FIELD_ID + " = ?;";
			ps = Database.prepare(query);
			ps.setLong(1, id);
			rs = ps.executeQuery();
			while (rs.next()) {
				// TODO winter seasons break this, with two sets of week ranges
				weekly.plan[weekly.weeks.get(rs.getInt("week"))] = rs.getInt("arrow_count");
				weekly.gauged[weekly.weeks.get(rs.getInt("week"))] = rs.getInt("target_share");
			}
			rs.close();

			DailyPerformance dr = Training.compileDaily(start, end, archer);

			for (String d : dr.technique_totals.keySet()) {
				gc.clear();
				gc.setTime(sdf.parse(d));
				weekly.technique[weekly.weeks.get(gc.get(Calendar.WEEK_OF_YEAR))] += dr.technique_totals.get(d);
			}
			for (String d : dr.totals.keySet()) {
				gc.clear();
				gc.setTime(sdf.parse(d));
				weekly.totals[weekly.weeks.get(gc.get(Calendar.WEEK_OF_YEAR))] += dr.totals.get(d);
			}
			for (String d : dr.gauged_trainings.keySet()) {
				gc.clear();
				gc.setTime(sdf.parse(d));
				weekly.sum[weekly.weeks.get(gc.get(Calendar.WEEK_OF_YEAR))] += (dr.average_sum.get(d)
						/ dr.gauged_trainings.get(d));
				weekly.results[weekly.weeks.get(gc.get(Calendar.WEEK_OF_YEAR))]++;
			}

			LinkedList<WeeklyPerformance> all = new LinkedList<WeeklyPerformance>();
			all.add(weekly);
			return all;
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return null;
	}

	static public String getActiveSeasonsPerformance(String archer) {
		Date now = new Date(System.currentTimeMillis());
		List<WeeklyPerformance> seasons = compileWeeklies(archer, now);

		String json = "{";
		if (seasons != null) {
			for (WeeklyPerformance season : seasons) {
				if (season.id <= 0)
					break;
				json += "\"" + season.id + "\":";
				// TODO modularize this composition (used already in 3 places)
				json += "{";
				json += "\"name\":\"" + season.name + "\",";
				json += "\"size\":" + season.size + ",";
				json += "\"start\":" + season.start + ",";
				for (int i = 0; i < season.size; i++) {
					json += "\"" + (season.start + i) + "\":";
					json += "{"; // TODO make names uniform...
					json += "\"total_plan\":" + season.plan[i] + ",";
					json += "\"gauged_plan\":" + season.gauged[i] + ",";
					json += "\"technique_total\":" + season.technique[i] + ",";
					if (season.results[i] > 0)
						json += "\"result_total\":" + (season.sum[i] / season.results[i]) + ",";
					json += "\"total\":" + season.totals[i];
					if (season.totals[i] > season.max)
						season.max = season.totals[i];
					json += "},";
				}
				json += "\"weeks\":[";
				// TODO maybe optimize this
				HashMap<Integer, Integer> inversion = new HashMap<Integer, Integer>(season.size);
				for (int i : season.weeks.keySet()) {
					inversion.put(season.weeks.get(i), i);
				}
				for (int i : inversion.keySet()) {
					json += inversion.get(i) + ",";
				}
				if (json.endsWith(","))
					json = json.substring(0, json.length() - 1);
				json += "],";
				json += "\"max\":" + season.max;
				json += "},";
			}
			if (json.endsWith(","))
				json = json.substring(0, json.length() - 1);
		}
		json += "}";

		return json;
	}

}
