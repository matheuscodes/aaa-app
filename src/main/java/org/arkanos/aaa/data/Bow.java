package org.arkanos.aaa.data;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.arkanos.aaa.controllers.Database;
import org.json.simple.JSONObject;

public class Bow {

	static public final String TABLE_NAME = "bow";

	static public final String FIELD_ID = "id";
	static public final String FIELD_NAME = "name";
	static public final String FIELD_TYPE = "type";
	static public final String FIELD_ARMS = "arms";
	static public final String FIELD_WEIGHT = "weight";
	static public final String FIELD_ARROW = "arrow";
	static public final String FIELD_ARROWS = "arrows";
	static public final String FIELD_ARCHER = "archer";

	static public String getAllBowsJSON(String archer) {
		try {
			String query = "SELECT * FROM " + TABLE_NAME + " ";
			query += "WHERE " + FIELD_ARCHER + " = ? ";
			query += "ORDER BY " + FIELD_ID + " DESC;";

			String array = "{";
			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int id = rs.getInt(FIELD_ID); // TODO make it long
				String name = rs.getString(FIELD_NAME).replace("\"", "\\\"");
				String type = rs.getString(FIELD_TYPE).replace("\"", "\\\"");
				String arms = rs.getString(FIELD_ARMS).replace("\"", "\\\"");
				float weight = rs.getFloat(FIELD_WEIGHT);
				String arrow = rs.getString(FIELD_ARROW).replace("\"", "\\\"");
				int arrows = rs.getInt(FIELD_ARROWS);

				String json = "\"" + id + "\":{"; // TODO verify all entities
													// with ID follow this
													// pattern
				json += "\"" + FIELD_ID + "\":" + id + ",";
				json += "\"" + FIELD_NAME + "\":\"" + name + "\",";
				json += "\"" + FIELD_TYPE + "\":\"" + type + "\",";
				json += "\"" + FIELD_ARMS + "\":\"" + arms + "\",";
				json += "\"" + FIELD_WEIGHT + "\":" + weight + ",";
				json += "\"" + FIELD_ARROW + "\":\"" + arrow + "\",";
				json += "\"" + FIELD_ARROWS + "\":" + arrows + "";
				json += "}";

				array += json + ",";
			}
			rs.close();
			ps.close();
			if (array.endsWith(","))
				array = array.substring(0, array.length() - 1);
			array += "}";
			return array;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public static boolean addBow(String archer, JSONObject json) {
		try {
			String query = "INSERT INTO " + TABLE_NAME + "(";
			query += FIELD_NAME + ",";
			query += FIELD_TYPE + ",";
			query += FIELD_ARMS + ",";
			query += FIELD_WEIGHT + ",";
			query += FIELD_ARROW + ",";
			query += FIELD_ARROWS + ",";
			query += FIELD_ARCHER + ")";
			query += " VALUES (?,?,?,?,?,?,?);";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, json.get(FIELD_NAME).toString());
			ps.setString(2, json.get(FIELD_TYPE).toString());
			ps.setString(3, json.get(FIELD_ARMS).toString());
			ps.setFloat(4, Float.parseFloat(json.get(FIELD_WEIGHT).toString()));
			ps.setString(5, json.get(FIELD_ARROW).toString());
			ps.setInt(6, Integer.parseInt(json.get(FIELD_ARROWS).toString()));
			ps.setString(7, archer);

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

	static public boolean deleteBow(String archer, long id) {
		try {
			String query = "DELETE FROM " + TABLE_NAME + " ";
			query += "WHERE " + FIELD_ARCHER + " = ?";
			query += "AND " + FIELD_ID + " = ?;";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ps.setLong(2, id);

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

	static public boolean updateBow(String archer, long id, JSONObject json) {
		try {
			String query = "UPDATE " + TABLE_NAME + " SET ";
			query += FIELD_NAME + " = ?,";
			query += FIELD_TYPE + " = ?,";
			query += FIELD_ARMS + " = ?,";
			query += FIELD_WEIGHT + " = ?,";
			query += FIELD_ARROW + " = ?,";
			query += FIELD_ARROWS + " = ?";
			query += " WHERE " + FIELD_ARCHER + " = ?";
			query += " AND " + FIELD_ID + " = ?;";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, json.get(FIELD_NAME).toString());
			ps.setString(2, json.get(FIELD_TYPE).toString());
			ps.setString(3, json.get(FIELD_ARMS).toString());
			ps.setFloat(4, Float.parseFloat(json.get(FIELD_WEIGHT).toString()));
			ps.setString(5, json.get(FIELD_ARROW).toString());
			ps.setInt(6, Integer.parseInt(json.get(FIELD_ARROWS).toString()));
			ps.setString(7, archer);
			ps.setLong(8, Long.parseLong(json.get(FIELD_ID).toString()));

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

	static public String getRecentAddedBow(String archer, JSONObject json) {
		try {
			String query = "SELECT MAX(" + FIELD_ID + ") as " + FIELD_ID + " ";
			query += "FROM " + TABLE_NAME + " ";
			query += "WHERE " + FIELD_ARCHER + " = ?;";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);

			ResultSet rs = ps.executeQuery();
			String result = "{";
			if (rs.next()) {
				int id = rs.getInt(FIELD_ID);
				String name = json.get(FIELD_NAME).toString().replace("\"", "\\\"");
				String type = json.get(FIELD_TYPE).toString().replace("\"", "\\\"");
				String arms = json.get(FIELD_ARMS).toString().replace("\"", "\\\"");
				String weight = json.get(FIELD_WEIGHT).toString().replace("\"", "\\\"");
				String arrow = json.get(FIELD_ARROW).toString().replace("\"", "\\\"");
				String arrows = json.get(FIELD_ARROWS).toString().replace("\"", "\\\"");

				// TODO maybe reduce this to json.put()
				result += "\"" + FIELD_ID + "\":" + id + ",";
				result += "\"" + FIELD_NAME + "\":\"" + name + "\",";
				result += "\"" + FIELD_TYPE + "\":\"" + type + "\",";
				result += "\"" + FIELD_ARMS + "\":\"" + arms + "\",";
				result += "\"" + FIELD_WEIGHT + "\":" + weight + ",";
				result += "\"" + FIELD_ARROW + "\":\"" + arrow + "\",";
				result += "\"" + FIELD_ARROWS + "\":" + arrows + "";
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
