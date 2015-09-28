package org.arkanos.aaa.data;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.arkanos.aaa.controllers.Database;
import org.json.simple.JSONObject;

public class Event {
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

	static public final String TABLE_NAME = "event";

	static public final String FIELD_DATE = "date";
	static public final String FIELD_DAYS = "days";
	static public final String FIELD_NAME = "name";
	static public final String FIELD_NAME_SHORT = "name_short";
	static public final String FIELD_ARCHER = "archer";
	static public final String FIELD_COLOR = "color";

	static public String getAllEventsJSON(String archer) {
		try {
			String query = "SELECT * FROM " + TABLE_NAME + " ";
			query += "WHERE " + FIELD_ARCHER + " = ?;";
			String array = "[";
			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int days = rs.getInt(FIELD_DAYS);
				String name = rs.getString(FIELD_NAME);
				String name_short = rs.getString(FIELD_NAME_SHORT);
				Date date = rs.getDate(FIELD_DATE);
				String color = rs.getString(FIELD_COLOR);

				String json = "{";
				json += "\"" + FIELD_DATE + "\":\"" + sdf.format(date) + "\",";
				json += "\"" + FIELD_NAME + "\":\"" + name + "\",";
				json += "\"" + FIELD_NAME_SHORT + "\":\"" + name_short + "\",";
				json += "\"" + FIELD_COLOR + "\":\"" + color + "\",";
				json += "\"" + FIELD_DAYS + "\":" + days + "";
				json += "}";

				array += json + ",";
			}
			rs.close();
			ps.close();
			if (array.endsWith(","))
				array = array.substring(0, array.length() - 1);
			array += "]";
			return array;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public static boolean addEvent(String archer, JSONObject json) {
		try {
			String query = "INSERT INTO " + TABLE_NAME + "(";
			query += FIELD_DATE + ",";
			query += FIELD_DAYS + ",";
			query += FIELD_NAME + ",";
			query += FIELD_NAME_SHORT + ",";
			query += FIELD_COLOR + ",";
			query += FIELD_ARCHER + ")";
			query += " VALUES (?,?,?,?,?,?);";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, json.get(FIELD_DATE).toString());
			ps.setInt(2, Integer.parseInt(json.get(FIELD_DAYS).toString()));
			ps.setString(3, json.get(FIELD_NAME).toString());
			ps.setString(4, json.get(FIELD_NAME_SHORT).toString());
			ps.setString(5, json.get(FIELD_COLOR).toString());
			ps.setString(6, archer);

			int result = ps.executeUpdate();
			ps.close();
			if (result > 0) {
				return true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	static public boolean deleteEvent(String archer, String date, String name_short) {
		try {
			String query = "DELETE FROM " + TABLE_NAME + " ";
			query += "WHERE " + FIELD_ARCHER + " = ?";
			query += "AND " + FIELD_DATE + " = ? ";
			query += "AND " + FIELD_NAME_SHORT + " = ?;";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ps.setString(2, date);
			ps.setString(3, name_short);

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

	static public String getUpcomingEvents(String archer, int limit) {
		try {
			Date when = new Date(System.currentTimeMillis());
			String query = "SELECT * FROM " + TABLE_NAME + " ";
			query += "WHERE " + FIELD_ARCHER + " = ? ";
			query += "AND " + FIELD_DATE + " >= ? ";
			query += "ORDER BY " + FIELD_DATE + " ASC ";
			query += "LIMIT ?;";
			String array = "[";
			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ps.setDate(2, Database.java2sql(when));
			ps.setInt(3, limit);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int days = rs.getInt(FIELD_DAYS);
				String name = rs.getString(FIELD_NAME);
				String name_short = rs.getString(FIELD_NAME_SHORT);
				Date date = rs.getDate(FIELD_DATE);
				String color = rs.getString(FIELD_COLOR);

				String json = "{";
				json += "\"" + FIELD_DATE + "\":\"" + sdf.format(date) + "\",";
				json += "\"" + FIELD_NAME + "\":\"" + name + "\",";
				json += "\"" + FIELD_NAME_SHORT + "\":\"" + name_short + "\",";
				json += "\"" + FIELD_COLOR + "\":\"" + color + "\",";
				json += "\"" + FIELD_DAYS + "\":" + days + "";
				json += "}";

				array += json + ",";
			}
			rs.close();
			ps.close();
			if (array.endsWith(","))
				array = array.substring(0, array.length() - 1);
			array += "]";
			return array;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

}
