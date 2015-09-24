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
		query += FIELD_DISTANCE + " FROM " + TABLE_NAME_GAUGE + " ";
		query += "LEFT JOIN " + TABLE_NAME_ARROW + " ";
		query += "ON " + FIELD_ID + " = " + FIELD_TRAINING_ID + " ";
		query += "WHERE " + FIELD_ARCHER + " = ? ";
		query += "AND " + FIELD_DATE + " >= ? ";
		query += "AND " + FIELD_DATE + " < ? ";
		query += "GROUP BY " + FIELD_ID + ";";
		ps = Database.prepare(query);
		ps.setString(1, user);
		ps.setDate(2, Database.java2sql(from));
		ps.setDate(3, Database.java2sql(to));
		rs = ps.executeQuery();
		// "SELECT date,distance,class,id,SUM(value) as result FROM
		// training_target LEFT JOIN arrow ON id = training_id WHERE
		// archer='"+user+"' AND date >= '"+sdf.format(from)+"' AND date <
		// '"+sdf.format(to)+"' GROUP BY id;"
		HashMap<String, Integer> result_order = new HashMap<String, Integer>();
		while (rs.next()) {
			int distance = rs.getInt(FIELD_DISTANCE);
			String target = rs.getString(FIELD_TARGET);
			String date = sdf.format(rs.getDate(FIELD_DATE));
			int result = rs.getInt("result");

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

			/** ID to order magic **/
			Integer order = result_order.get(distance + target + date);
			if (order == null) {
				order = 1;
			}

			result_order.put(distance + target + date, order);
			HashMap<String, Integer> parent = grandparent.get(order);
			if (parent == null) {
				parent = new HashMap<String, Integer>();
				grandparent.put(order, parent);
			}
			order += 1;
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

	private static HashMap<String, Integer> compileDailyArrowsSince(String archer, Date time) {
		try {
			HashMap<String, Integer> data = new HashMap<String, Integer>();
			String query = "SELECT " + FIELD_DATE + ",SUM(arrow_count) AS arrow_count FROM (";
			query += "SELECT " + FIELD_DATE + ",COUNT(" + FIELD_VALUE + ") AS arrow_count FROM ";
			query += TABLE_NAME_ARROW + " LEFT JOIN " + TABLE_NAME_GAUGE + " ON " + FIELD_ID + " = " + FIELD_TRAINING_ID
					+ " ";
			query += "WHERE " + FIELD_ARCHER + " = ? ";
			query += "AND " + FIELD_DATE + " >= ? ";
			query += "GROUP BY " + FIELD_DATE + " ";
			query += "UNION SELECT " + FIELD_DATE + ",SUM(" + FIELD_ARROWS + ") as arrow_count FROM " + TABLE_NAME
					+ " ";
			query += "WHERE " + FIELD_ARCHER + " = ? ";
			query += "AND " + FIELD_DATE + " >= ? ";
			query += "GROUP BY " + FIELD_DATE + ") AS everyone ";
			query += "GROUP BY " + FIELD_DATE + ";";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ps.setString(2, Database.sdf.format(time));
			ps.setString(3, archer);
			ps.setString(4, Database.sdf.format(time));
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

	private static HashMap<String, Integer> compileDailyValueSince(String archer, Date time) {
		// TODO SELECT value,COUNT(value) as value_count FROM arrow LEFT JOIN
		// gauge ON id = training_id GROUP BY value
		return null;
	}

	private static HashMap<String, Float[]> compileDailyEndSince(String archer, Date time) {
		// TODO SELECT end,COUNT(value),AVG(value) FROM arrow LEFT JOIN gauge ON
		// id = training_id GROUP BY end
		return null;
	}

	private static final Date getWeekAgo() {
		return new Date(System.currentTimeMillis() - 7L * 24 * 60 * 60 * 1000);
	}

	private static final Date getMonthAgo() {
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
		HashMap<String, Integer> arrows = compileDailyArrowsSince(archer, getWeekAgo());
		String json = "{";
		for (String day : arrows.keySet()) {
			json += "\"" + day + "\":" + arrows.get(day) + ",";
		}

		if (json.endsWith(","))
			json = json.substring(0, json.length() - 1);

		json += "}";

		return json;
	}

	public static String getYearSummary(String archer) {
		HashMap<String, Float[]> performance = compileDailyGaugeSince(archer, getYearAgo());
		HashMap<Integer, Integer> counts = new HashMap<Integer, Integer>();
		HashMap<Integer, Float> sums = new HashMap<Integer, Float>();

		for (String day : performance.keySet()) {
			GregorianCalendar gc = new GregorianCalendar();
			try {
				gc.setTime(Database.sdf.parse(day));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			int month = gc.get(Calendar.MONTH);
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

		HashMap<String, Integer> arrows = compileDailyArrowsSince(archer, getYearAgo());
		HashMap<Integer, Integer> totals = new HashMap<Integer, Integer>();
		for (String day : arrows.keySet()) {
			GregorianCalendar gc = new GregorianCalendar();
			try {
				gc.setTime(Database.sdf.parse(day));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			int month = gc.get(Calendar.MONTH);
			Integer i = totals.get(month);
			if (i != null)
				totals.put(month, i + arrows.get(day));
			else
				totals.put(month, arrows.get(day));
		}

		String json = "{";
		for (Integer month : totals.keySet()) {
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
}
