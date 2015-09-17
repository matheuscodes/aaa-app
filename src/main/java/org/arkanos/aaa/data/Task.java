package org.arkanos.aaa.data;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.arkanos.aaa.controllers.Database;
import org.json.simple.JSONObject;

public class Task {
	static public final String TABLE_NAME = "task";

	static public final String FIELD_ID = "id";
	static public final String FIELD_STATUS = "status";
	static public final String FIELD_DESCRIPTION = "description";
	static public final String FIELD_ARCHER = "archer";

	static public String getAllTasksJSON(String archer) {
		try {
			String query = "SELECT * FROM " + TABLE_NAME + " ";
			query += "WHERE " + FIELD_ARCHER + " = ? ";
			query += "ORDER BY " + FIELD_ID + " DESC;";
			String array = "[";
			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int id = rs.getInt(FIELD_ID);
				String status = rs.getString(FIELD_STATUS);
				String description = rs.getString(FIELD_DESCRIPTION);

				String json = "{";
				json += "\"" + FIELD_ID + "\":" + id + ",";
				json += "\"" + FIELD_STATUS + "\":\"" + status + "\",";
				json += "\"" + FIELD_DESCRIPTION + "\":\"" + description + "\"";
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

	static public boolean deleteTask(String archer, long id) {
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

	static public boolean updateTask(String archer, long id, JSONObject json) {
		try {
			String query = "UPDATE " + TABLE_NAME + " SET ";
			query += FIELD_STATUS + " = ?";
			query += " WHERE " + FIELD_ARCHER + " = ?";
			query += " AND " + FIELD_ID + " = ?;";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, json.get(FIELD_STATUS).toString());
			ps.setString(2, archer);
			ps.setLong(3, id);

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

	static public boolean addTask(String archer, JSONObject json) {
		try {
			String query = "INSERT INTO " + TABLE_NAME + "(";
			query += FIELD_DESCRIPTION + ",";
			query += FIELD_ARCHER + ")";
			query += " VALUES (?,?);";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, json.get(FIELD_DESCRIPTION).toString());
			ps.setString(2, archer);

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

	static public String getRecentAddedTask(String archer, JSONObject json) {
		try {
			String query = "SELECT MAX(" + FIELD_ID + ") as " + FIELD_ID + ",";
			query += FIELD_STATUS + " FROM " + TABLE_NAME + " WHERE ";
			query += FIELD_DESCRIPTION + " = ? ";
			query += "AND " + FIELD_ARCHER + " = ?;";

			String description = json.get(FIELD_DESCRIPTION).toString();
			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, description);
			ps.setString(2, archer);

			ResultSet rs = ps.executeQuery();
			String result = "{";
			if (rs.next()) {
				int id = rs.getInt(FIELD_ID);
				String status = rs.getString(FIELD_STATUS);
				result += "\"" + FIELD_ID + "\":" + id + ",";
				result += "\"" + FIELD_STATUS + "\":\"" + status + "\",";
				result += "\"" + FIELD_DESCRIPTION + "\":\"" + description + "\"";
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
}
