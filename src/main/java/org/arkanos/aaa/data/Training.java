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
import java.util.Locale;

import org.arkanos.aaa.controllers.Database;

public class Training {
	private static final Training factory = new Training();
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

	/** SQL table name **/
	static public final String TABLE_NAME = "training";
	static public final String TABLE_NAME_GAUGE = "gauge";
	static public final String TABLE_NAME_ARROW = "arrow";

	/* Common */
	static final public String FIELD_ID = "id";
	static final public String FIELD_ARCHER = "archer";
	static final public String FIELD_DISTANCE = "distance";
	static final public String FIELD_DATE = "date";

	/* Training only */
	static final public String FIELD_ARROWS = "arrows";
	static final public String FIELD_TYPE = "type";

	/* Gauge only */
	static final public String FIELD_TARGET = "target";
	static final public String FIELD_ROUND = "round";

	/* Arrow only */
	static final public String FIELD_TRAINING_ID = "training_id";
	static final public String FIELD_END = "end";
	static final public String FIELD_VALUE = "value";

	static final public String ENDS = "ends";
	static final public String TYPE_TARGET = "target";
	static final public String TYPE_BOARD = "board";
	static final public String TYPE_GAUGED = "gauged";

	public class DailyPerformance {
		public HashMap<Float, HashMap<String, HashMap<String, Integer>>> distance_type = new HashMap<Float, HashMap<String, HashMap<String, Integer>>>();
		public HashMap<Integer, HashMap<String, HashMap<Integer, HashMap<String, Integer>>>> results = new HashMap<Integer, HashMap<String, HashMap<Integer, HashMap<String, Integer>>>>();
		public HashMap<Integer, HashMap<String, HashMap<String, Float>>> averages = new HashMap<Integer, HashMap<String, HashMap<String, Float>>>();

		public HashMap<String, HashMap<String, Integer>> technique_days = new HashMap<String, HashMap<String, Integer>>();
		public HashMap<String, Integer> technique_totals = new HashMap<String, Integer>();
		public HashMap<String, Integer> totals = new HashMap<String, Integer>();

		public HashMap<String, Integer> gauged_trainings = new HashMap<String, Integer>();
		public HashMap<String, Float> average_sum = new HashMap<String, Float>();
	}

	static public DailyPerformance compileDaily(Date from, Date to, String user) throws SQLException {
		DailyPerformance dp = factory.new DailyPerformance();

		String query = "SELECT SUM(" + FIELD_ARROWS + ") AS " + FIELD_ARROWS + ",";
		query += FIELD_DATE + ",";
		query += FIELD_TYPE + " FROM " + TABLE_NAME + " ";
		query += "WHERE " + FIELD_ARCHER + " = ? ";
		query += "AND " + FIELD_TYPE + " != ? ";
		query += "AND " + FIELD_TYPE + " != ? ";
		query += "AND " + FIELD_DATE + " >= ? ";
		query += "AND " + FIELD_DATE + " < ? ";
		query += "GROUP BY " + FIELD_DATE + "," + FIELD_TYPE + ";";
		PreparedStatement ps = Database.prepare(query);
		ps.setString(1, user);
		ps.setString(2, TYPE_TARGET);
		ps.setString(3, TYPE_BOARD);
		ps.setDate(4, Database.java2sql(from));
		ps.setDate(5, Database.java2sql(to));
		ResultSet rs = ps.executeQuery();
		// "SELECT SUM(arrows) as arrows,date,type FROM aaa.training_technique
		// WHERE archer='"+user+"' AND type != 'target' AND date >=
		// '"+sdf.format(from)+"' AND date < '"+sdf.format(to)+"' GROUP BY
		// date,type;"
		while (rs.next()) {
			int arrows = rs.getInt(FIELD_ARROWS);
			String type = rs.getString(FIELD_TYPE);
			String date = sdf.format(rs.getDate(FIELD_DATE));

			HashMap<String, Integer> parent = dp.technique_days.get(type);
			if (parent == null) {
				parent = new HashMap<String, Integer>();
				dp.technique_days.put(type, parent);
			}
			parent.put(sdf.format(rs.getDate("date")), arrows);
			if (dp.technique_totals.get(date) == null) {
				dp.technique_totals.put(date, arrows);
			} else {
				dp.technique_totals.put(date, arrows + dp.technique_totals.get(date));
			}
			if (dp.totals.get(date) == null) {
				dp.totals.put(date, arrows);
			} else {
				dp.totals.put(date, arrows + dp.totals.get(date));
			}
		}
		rs.close();

		query = "SELECT SUM(" + FIELD_ARROWS + ") AS " + FIELD_ARROWS + ",";
		query += FIELD_DATE + ",";
		query += FIELD_DISTANCE + ",";
		query += FIELD_TYPE + " FROM " + TABLE_NAME + " ";
		query += "WHERE " + FIELD_ARCHER + " = ? ";
		query += "AND (" + FIELD_TYPE + " = ? ";
		query += "OR " + FIELD_TYPE + " = ?) ";
		query += "AND " + FIELD_DATE + " >= ? ";
		query += "AND " + FIELD_DATE + " < ? ";
		query += "GROUP BY " + FIELD_DISTANCE + "," + FIELD_DATE + "," + FIELD_TYPE + ";";
		ps = Database.prepare(query);
		ps.setString(1, user);
		ps.setString(2, TYPE_TARGET);
		ps.setString(3, TYPE_BOARD);
		ps.setDate(4, Database.java2sql(from));
		ps.setDate(5, Database.java2sql(to));
		rs = ps.executeQuery();
		// "SELECT SUM(arrows) as arrows,distance,date,type FROM
		// aaa.training_technique WHERE archer='"+user+"' AND type = 'target'
		// AND date >= '"+sdf.format(from)+"' AND date < '"+sdf.format(to)+"'
		// GROUP BY distance,date,type;"
		while (rs.next()) {
			int arrows = rs.getInt(FIELD_ARROWS);
			float distance = rs.getFloat(FIELD_DISTANCE);
			String type = rs.getString(FIELD_TYPE);
			String date = sdf.format(rs.getDate(FIELD_DATE));

			HashMap<String, HashMap<String, Integer>> grandparent = dp.distance_type.get(distance);
			if (grandparent == null) {
				grandparent = new HashMap<String, HashMap<String, Integer>>();
				dp.distance_type.put(distance, grandparent);
			}
			HashMap<String, Integer> parent = grandparent.get(type);
			if (parent == null) {
				parent = new HashMap<String, Integer>();
				grandparent.put(type, parent);
			}
			parent.put(date, arrows);
			if (dp.technique_totals.get(date) == null) {
				dp.technique_totals.put(date, arrows);
			} else {
				dp.technique_totals.put(date, arrows + dp.technique_totals.get(date));
			}
			if (dp.totals.get(date) == null) {
				dp.totals.put(date, arrows);
			} else {
				dp.totals.put(date, arrows + dp.totals.get(date));
			}
		}
		rs.close();

		query = "SELECT COUNT(" + FIELD_VALUE + ") AS " + FIELD_ARROWS + ",";
		query += FIELD_DATE + ",";
		query += FIELD_DISTANCE + " FROM " + TABLE_NAME_ARROW + " ";
		query += "LEFT JOIN " + TABLE_NAME_GAUGE + " ";
		query += "ON " + FIELD_ID + " = " + FIELD_TRAINING_ID + " ";
		query += "WHERE " + FIELD_ARCHER + " = ? ";
		query += "AND " + FIELD_DATE + " >= ? ";
		query += "AND " + FIELD_DATE + " < ? ";
		query += "GROUP BY " + FIELD_DISTANCE + "," + FIELD_DATE + ";";
		ps = Database.prepare(query);
		ps.setString(1, user);
		// TODO use this in all dates (avoid Database.sdf)
		ps.setDate(2, Database.java2sql(from));
		ps.setDate(3, Database.java2sql(to));
		rs = ps.executeQuery();
		// "SELECT COUNT(value) as arrows,date,distance FROM arrow LEFT JOIN
		// training_target ON id = training_id WHERE archer='"+user+"' AND date
		// >= '"+sdf.format(from)+"' AND date < '"+sdf.format(to)+"' GROUP BY
		// date,distance;"
		while (rs.next()) {
			int arrows = rs.getInt(FIELD_ARROWS);
			float distance = rs.getFloat(FIELD_DISTANCE);
			String date = sdf.format(rs.getDate(FIELD_DATE));
			HashMap<String, HashMap<String, Integer>> grandparent = dp.distance_type.get(distance);
			if (grandparent == null) {
				grandparent = new HashMap<String, HashMap<String, Integer>>();
				dp.distance_type.put(distance, grandparent);
			}
			HashMap<String, Integer> parent = grandparent.get(TYPE_GAUGED);
			if (parent == null) {
				parent = new HashMap<String, Integer>();
				grandparent.put(TYPE_GAUGED, parent);
			}
			parent.put(date, arrows);
			if (dp.totals.get(date) == null) {
				dp.totals.put(date, arrows);
			} else {
				dp.totals.put(date, arrows + dp.totals.get(date));
			}
		}
		rs.close();

		query = "SELECT SUM(" + FIELD_VALUE + ") AS result,";
		query += FIELD_DATE + ",";
		query += FIELD_ID + ",";
		query += FIELD_TARGET + ",";
		query += FIELD_ROUND + ",";
		query += FIELD_DISTANCE + " FROM " + TABLE_NAME_GAUGE + " ";
		query += "LEFT JOIN " + TABLE_NAME_ARROW + " ";
		query += "ON " + FIELD_ID + " = " + FIELD_TRAINING_ID + " ";
		query += "WHERE " + FIELD_ARCHER + " = ? ";
		query += "AND " + FIELD_DATE + " >= ? ";
		query += "AND " + FIELD_DATE + " < ? ";
		query += "GROUP BY " + FIELD_ID + "," + FIELD_ROUND + ";";
		ps = Database.prepare(query);
		ps.setString(1, user);
		ps.setDate(2, Database.java2sql(from));
		ps.setDate(3, Database.java2sql(to));
		rs = ps.executeQuery();
		// "SELECT date,distance,class,id,SUM(value) as result FROM
		// training_target LEFT JOIN arrow ON id = training_id WHERE
		// archer='"+user+"' AND date >= '"+sdf.format(from)+"' AND date <
		// '"+sdf.format(to)+"' GROUP BY id;"
		while (rs.next()) {
			int distance = rs.getInt(FIELD_DISTANCE);
			String target = rs.getString(FIELD_TARGET);
			String date = sdf.format(rs.getDate(FIELD_DATE));
			int result = rs.getInt("result");
			int round = rs.getInt(FIELD_ROUND);

			HashMap<String, HashMap<Integer, HashMap<String, Integer>>> greatgrandparent = dp.results.get(distance);
			if (greatgrandparent == null) {
				greatgrandparent = new HashMap<String, HashMap<Integer, HashMap<String, Integer>>>();
				dp.results.put(distance, greatgrandparent);
			}
			HashMap<Integer, HashMap<String, Integer>> grandparent = greatgrandparent.get(target);
			if (grandparent == null) {
				grandparent = new HashMap<Integer, HashMap<String, Integer>>();
				greatgrandparent.put(target, grandparent);
			}

			HashMap<String, Integer> parent = grandparent.get(round);
			if (parent == null) {
				parent = new HashMap<String, Integer>();
				grandparent.put(round, parent);
			}
			parent.put(date, result);
		}
		rs.close();

		query = "SELECT AVG(" + FIELD_VALUE + ") AS average,";
		query += FIELD_DATE + ",";
		query += FIELD_ID + ",";
		query += FIELD_TARGET + ",";
		query += FIELD_DISTANCE + " FROM " + TABLE_NAME_GAUGE + " ";
		query += "LEFT JOIN " + TABLE_NAME_ARROW + " ";
		query += "ON " + FIELD_ID + " = " + FIELD_TRAINING_ID + " ";
		query += "WHERE " + FIELD_ARCHER + " = ? ";
		query += "AND " + FIELD_DATE + " >= ? ";
		query += "AND " + FIELD_DATE + " < ? ";
		query += "GROUP BY " + FIELD_DATE + "," + FIELD_TARGET + "," + FIELD_DISTANCE + ";";
		ps = Database.prepare(query);
		ps.setString(1, user);
		ps.setDate(2, Database.java2sql(from));
		ps.setDate(3, Database.java2sql(to));
		rs = ps.executeQuery();
		// "SELECT date,distance,class,id,AVG(value) AS average FROM
		// training_target LEFT JOIN arrow ON id = training_id WHERE
		// archer='"+user+"' AND date >= '"+sdf.format(from)+"' AND date <
		// '"+sdf.format(to)+"' GROUP BY date,class;"
		while (rs.next()) {
			int distance = rs.getInt(FIELD_DISTANCE);
			String target = rs.getString(FIELD_TARGET);
			String date = sdf.format(rs.getDate(FIELD_DATE));
			float result = rs.getFloat("average");
			HashMap<String, HashMap<String, Float>> grandparent = dp.averages.get(distance);
			if (grandparent == null) {
				grandparent = new HashMap<String, HashMap<String, Float>>();
				dp.averages.put(distance, grandparent);
			}
			HashMap<String, Float> parent = grandparent.get(target);
			if (parent == null) {
				parent = new HashMap<String, Float>();
				grandparent.put(target, parent);
			}
			parent.put(date, result);

			if (dp.gauged_trainings.get(date) == null) {
				dp.gauged_trainings.put(date, 1);
			} else {
				dp.gauged_trainings.put(date, dp.gauged_trainings.get(date) + 1);
			}
			if (dp.average_sum.get(date) == null) {
				dp.average_sum.put(date, result);
			} else {
				dp.average_sum.put(date, result + dp.average_sum.get(date));
			}
		}
		rs.close();

		return dp;
	}

	public static boolean insertTraining(String email, String date, String type, float value, int count) {
		String query = "INSERT INTO " + TABLE_NAME + "(";
		query += FIELD_ARCHER + ",";
		query += FIELD_DATE + ",";
		query += FIELD_TYPE + ",";
		query += FIELD_DISTANCE + ",";
		query += FIELD_ARROWS + ")";
		query += " VALUES (?,?,?,?,?);";
		try {
			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, email);
			ps.setString(2, date);
			ps.setString(3, type);
			ps.setFloat(4, value);
			ps.setInt(5, count);
			boolean result = (ps.executeUpdate() > 0);
			ps.close();
			return result;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	public static long insertGauge(String email, String date, float value, String target) {
		try {
			int round = 0;
			String query = "SELECT MAX(" + FIELD_ROUND + ") AS last FROM " + TABLE_NAME_GAUGE + " ";
			query += "WHERE " + FIELD_ARCHER + "=? ";
			query += "AND " + FIELD_DATE + "=? ";
			query += "AND " + FIELD_DISTANCE + "=? ";
			query += "AND " + FIELD_TARGET + "=?;";
			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, email);
			ps.setString(2, date);
			ps.setFloat(3, value);
			ps.setString(4, target);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				round = rs.getInt("last") + 1; // TODO make combination and not
				// ID as PK.
			}
			rs.close();

			query = "INSERT INTO " + TABLE_NAME_GAUGE + "(";
			query += FIELD_ARCHER + ",";
			query += FIELD_DATE + ",";
			query += FIELD_DISTANCE + ",";
			query += FIELD_ROUND + ",";
			query += FIELD_TARGET + ")";
			query += " VALUES (?,?,?,?,?);";
			ps = Database.prepare(query);
			ps.setString(1, email);
			ps.setString(2, date);
			ps.setFloat(3, value);
			ps.setFloat(4, round);
			ps.setString(5, target);
			boolean result = (ps.executeUpdate() > 0);
			ps.close();
			if (!result) {
				return -1;
			} else {
				query = "SELECT " + FIELD_ID + " FROM " + TABLE_NAME_GAUGE + " ";
				query += "WHERE " + FIELD_ARCHER + "=? ";
				query += "AND " + FIELD_DATE + "=? ";
				query += "AND " + FIELD_DISTANCE + "=? ";
				query += "AND " + FIELD_ROUND + "=? ";
				query += "AND " + FIELD_TARGET + "=?;";
				ps = Database.prepare(query);
				ps.setString(1, email);
				ps.setString(2, date);
				ps.setFloat(3, value);
				ps.setFloat(4, round);
				ps.setString(5, target);
				rs = ps.executeQuery();
				if (rs.next()) {
					return rs.getLong(FIELD_ID);
				}
				rs.close();
				ps.close(); // TODO check the rest of the code for leaks
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return -1;
	}

	public static boolean insertArrows(long id, HashMap<Integer, LinkedList<Integer>> ends) {
		String query = "INSERT INTO " + TABLE_NAME_ARROW + "(";
		query += FIELD_TRAINING_ID + ",";
		query += FIELD_VALUE + ",";
		query += FIELD_END + ")";
		query += " VALUES (?,?,?);";
		try {
			PreparedStatement ps = Database.prepare(query);
			for (Integer end : ends.keySet()) {
				for (Integer arrow : ends.get(end)) {
					ps.setLong(1, id);
					ps.setInt(2, arrow);
					ps.setInt(3, end);
					ps.addBatch();
				}
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

	private static HashMap<String, Integer> compileDailyArrowsSince(String archer, Date start, Date end) {
		try {
			HashMap<String, Integer> data = new HashMap<String, Integer>();
			String query = "SELECT " + FIELD_DATE + ",SUM(arrow_count) AS arrow_count FROM (";
			query += "SELECT " + FIELD_DATE + ",COUNT(" + FIELD_VALUE + ") AS arrow_count FROM ";
			query += TABLE_NAME_ARROW + " LEFT JOIN " + TABLE_NAME_GAUGE + " ON ";
			query += FIELD_ID + " = " + FIELD_TRAINING_ID + " ";
			query += "WHERE " + FIELD_ARCHER + " = ? ";
			query += "AND " + FIELD_DATE + " >= ? ";
			query += "AND " + FIELD_DATE + " <= ? ";
			query += "GROUP BY " + FIELD_DATE + " ";
			query += "UNION SELECT " + FIELD_DATE + ",SUM(" + FIELD_ARROWS + ") AS arrow_count FROM " + TABLE_NAME
					+ " "; // TODO bla
			query += "WHERE " + FIELD_ARCHER + " = ? ";
			query += "AND " + FIELD_DATE + " >= ? ";
			query += "AND " + FIELD_DATE + " <= ? ";
			query += "GROUP BY " + FIELD_DATE + ") AS everyone ";
			query += "GROUP BY " + FIELD_DATE + ";";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ps.setString(2, Database.sdf.format(start));
			ps.setString(3, Database.sdf.format(end));
			ps.setString(4, archer);
			ps.setString(5, Database.sdf.format(start));
			ps.setString(6, Database.sdf.format(end));
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int count = rs.getInt("arrow_count");
				String date = Database.sdf.format(rs.getDate(FIELD_DATE));
				data.put(date, count);
			}
			rs.close();
			ps.close();
			return data;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private static HashMap<String, Float[]> compileDailyGaugeSince(String archer, Date time) {
		try {
			HashMap<String, Float[]> data = new HashMap<String, Float[]>();
			String query = "SELECT " + FIELD_DATE + ",COUNT(" + FIELD_VALUE + ") AS arrow_count,SUM(" + FIELD_VALUE
					+ ") AS value_sum FROM ";
			query += TABLE_NAME_ARROW + " LEFT JOIN " + TABLE_NAME_GAUGE + " ON " + FIELD_ID + " = " + FIELD_TRAINING_ID
					+ " ";
			query += "WHERE " + FIELD_ARCHER + " = ? ";
			query += "AND " + FIELD_DATE + " >= ? ";
			query += "GROUP BY " + FIELD_DATE + ";";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ps.setString(2, Database.sdf.format(time));

			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				float count = rs.getFloat("arrow_count");
				float sum = rs.getFloat("value_sum");
				Float[] pair = new Float[] { count, sum };
				String date = Database.sdf.format(rs.getDate(FIELD_DATE));
				data.put(date, pair);
			}
			rs.close();
			ps.close();
			return data;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private static HashMap<Integer, Integer> compileValuesSince(String archer, Date time) {
		try {
			HashMap<Integer, Integer> data = new HashMap<Integer, Integer>();
			String query = "SELECT " + FIELD_VALUE + ",COUNT(" + FIELD_VALUE + ") AS arrow_count FROM ";
			query += TABLE_NAME_ARROW + " LEFT JOIN " + TABLE_NAME_GAUGE + " ON " + FIELD_ID + " = " + FIELD_TRAINING_ID
					+ " ";
			query += "WHERE " + FIELD_ARCHER + " = ? ";
			query += "AND " + FIELD_DATE + " >= ? ";
			query += "GROUP BY " + FIELD_VALUE + ";";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ps.setString(2, Database.sdf.format(time));

			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int count = rs.getInt("arrow_count");
				int value = rs.getInt(FIELD_VALUE);
				data.put(value, count);
			}
			rs.close();
			ps.close();
			return data;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private static HashMap<Integer, Float[]> compileEndsSince(String archer, Date time) {
		try {
			HashMap<Integer, Float[]> data = new HashMap<Integer, Float[]>();
			String query = "SELECT " + FIELD_END + ",COUNT(" + FIELD_VALUE + ") AS arrow_count,";
			query += "AVG(" + FIELD_VALUE + ") AS value_avg FROM ";
			query += TABLE_NAME_ARROW + " LEFT JOIN " + TABLE_NAME_GAUGE + " ON " + FIELD_ID + " = " + FIELD_TRAINING_ID
					+ " ";
			query += "WHERE " + FIELD_ARCHER + " = ? ";
			query += "AND " + FIELD_DATE + " >= ? ";
			query += "GROUP BY " + FIELD_END + ";";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ps.setString(2, Database.sdf.format(time));

			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				float count = rs.getFloat("arrow_count");
				float avg = rs.getFloat("value_avg");
				Float[] pair = new Float[] { count, avg };
				int end = rs.getInt(FIELD_END);
				data.put(end, pair);
			}
			rs.close();
			ps.close();
			return data;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private static final Date getNow() {
		return new Date(System.currentTimeMillis());
	}

	private static final Date getWeekAgo() {
		return new Date(System.currentTimeMillis() - 7L * 24 * 60 * 60 * 1000);
	}

	public static final Date getMonthAgo() {
		return new Date(System.currentTimeMillis() - 30L * 24 * 60 * 60 * 1000);
	}

	private static final Date getYearAgo() {
		// TODO move all this Gregorian stuff to some controller...
		GregorianCalendar gc = new GregorianCalendar(Locale.UK);
		Date year_ago = new Date(System.currentTimeMillis() - 365L * 24 * 60 * 60 * 1000);
		gc.setTime(year_ago);
		gc.set(Calendar.DATE, 1);
		return gc.getTime();
	}

	public static String getWeeksArrows(String archer) {
		HashMap<String, Integer> arrows = compileDailyArrowsSince(archer, getWeekAgo(), getNow());
		int max = 0;
		String json = "{";
		for (String day : arrows.keySet()) {
			json += "\"" + day + "\":" + arrows.get(day) + ",";
			if (arrows.get(day) > max) {
				max = arrows.get(day);
			}
		}

		json += "\"max\":" + max;

		json += "}";

		return json;
	}

	public static String getYearSummary(String archer) {
		HashMap<String, Float[]> performance = compileDailyGaugeSince(archer, getYearAgo());
		HashMap<String, Integer> counts = new HashMap<String, Integer>();
		HashMap<String, Float> sums = new HashMap<String, Float>();

		for (String day : performance.keySet()) {
			GregorianCalendar gc = new GregorianCalendar(Locale.UK);
			try {
				gc.setTime(Database.sdf.parse(day));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			String month = gc.get(Calendar.YEAR) + "-" + gc.get(Calendar.MONTH);
			Integer i = counts.get(month);
			if (i != null)
				counts.put(month, i + performance.get(day)[0].intValue());
			else
				counts.put(month, performance.get(day)[0].intValue());

			Float f = sums.get(month);
			if (f != null)
				sums.put(month, f + performance.get(day)[1]);
			else
				sums.put(month, performance.get(day)[1]);
		}

		HashMap<String, Integer> arrows = compileDailyArrowsSince(archer, getYearAgo(), getNow());
		HashMap<String, Integer> totals = new HashMap<String, Integer>();
		for (String day : arrows.keySet()) {
			GregorianCalendar gc = new GregorianCalendar(Locale.UK);
			try {
				gc.setTime(Database.sdf.parse(day));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			String month = gc.get(Calendar.YEAR) + "-";
			if (gc.get(Calendar.MONTH) < 10) {
				month += "0";
			}
			month += gc.get(Calendar.MONTH);
			Integer i = totals.get(month);
			if (i != null)
				totals.put(month, i + arrows.get(day));
			else
				totals.put(month, arrows.get(day));
		}

		String json = "{";
		for (String month : totals.keySet()) {
			json += "\"" + month + "\":";
			json += "{";
			if (counts.get(month) != null)
				json += "\"average_value\":" + sums.get(month) / counts.get(month) + ",";
			if (counts.get(month) != null)
				json += "\"target_count\":" + counts.get(month) + ",";
			json += "\"total_count\":" + totals.get(month) + "";
			json += "},";
		}

		if (json.endsWith(","))
			json = json.substring(0, json.length() - 1);

		json += "}";

		return json;
	}

	public static String getValueDistribution(String archer) {
		HashMap<Integer, Integer> week = compileValuesSince(archer, getWeekAgo());
		HashMap<Integer, Integer> month = compileValuesSince(archer, getMonthAgo());
		HashMap<Integer, Integer> year = compileValuesSince(archer, getYearAgo());
		float total_week = 0;
		float total_month = 0;
		float total_year = 0;
		float max = 0;

		for (Integer i : week.keySet()) {
			total_week += week.get(i);
		}

		for (Integer i : month.keySet()) {
			total_month += month.get(i);
		}

		for (Integer i : year.keySet()) {
			total_year += year.get(i);
		}
		String json = "{";
		for (int i = 0; i <= 10; i++) {
			json += "\"" + i + "\":{";
			json += "\"week\":";
			if (total_week > 0 && week.get(i) != null) {
				json += week.get(i) / total_week + ",";
				if (week.get(i) / total_week > max)
					max = week.get(i) / total_week;
			} else {
				json += "0,";
			}
			json += "\"month\":";
			if (total_month > 0 && month.get(i) != null) {
				json += month.get(i) / total_month + ",";
				if (month.get(i) / total_month > max)
					max = month.get(i) / total_month;
			} else {
				json += "0,";
			}
			json += "\"year\":";
			if (total_year > 0 && year.get(i) != null) {
				json += year.get(i) / total_year;
				if (year.get(i) / total_year > max)
					max = year.get(i) / total_year;
			} else {
				json += "0";
			}
			json += "},";
		}
		// FIXME should be an if here?
		json = json.substring(0, json.length() - 1);
		json += ",\"max\":" + max;
		json += "}";

		return json;
	}

	public static String getEndDistribution(String archer) {
		HashMap<Integer, Float[]> week = compileEndsSince(archer, getWeekAgo());
		HashMap<Integer, Float[]> month = compileEndsSince(archer, getMonthAgo());
		int max_end = 0;
		float max_value = 0;
		int max_count = 0;
		for (int i : week.keySet()) {
			if (i > max_end)
				max_end = i;
			if (week.get(i) != null) {
				if (week.get(i)[0] > max_count)
					max_count = week.get(i)[0].intValue();
				if (week.get(i)[1] > max_value)
					max_value = week.get(i)[1];
			}
		}
		for (int i : month.keySet()) {
			if (i > max_end)
				max_end = i;
			if (month.get(i) != null) {
				if (month.get(i)[0] > max_count)
					max_count = month.get(i)[0].intValue();
				if (month.get(i)[1] > max_value)
					max_value = month.get(i)[1];
			}
		}

		String json_counts = "{";
		for (int i = 0; i <= max_end; i++) {
			json_counts += "\"" + i + "\":{\"week\":";
			if (week.get(i) != null) {
				json_counts += week.get(i)[0] + ",";
			} else {
				json_counts += "0,";
			}
			json_counts += "\"month\":";
			if (month.get(i) != null) {
				json_counts += month.get(i)[0] + "},";
			} else {
				json_counts += "0},";
			}
		}
		if (json_counts.endsWith(","))
			json_counts = json_counts.substring(0, json_counts.length() - 1);
		json_counts += "}";

		String json_values = "{\"week\":{";
		for (int i : week.keySet()) {
			json_values += "\"" + i + "\":" + week.get(i)[1] + ",";
		}
		if (json_values.endsWith(","))
			json_values = json_values.substring(0, json_values.length() - 1);
		json_values += "},\"month\":{";
		for (int i : month.keySet()) {
			json_values += "\"" + i + "\":" + month.get(i)[1] + ",";
		}
		if (json_values.endsWith(","))
			json_values = json_values.substring(0, json_values.length() - 1);
		json_values += "}}";

		String json = "{";
		json += "\"counts\":" + json_counts + ",";
		json += "\"values\":" + json_values + ",";
		json += "\"max_value\":" + max_value + ",";
		json += "\"max_count\":" + max_count + ",";
		json += "\"max_end\":" + max_end;
		json += "}";
		return json;
	}
}
