package org.arkanos.aaa.data;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

import org.arkanos.aaa.controllers.Database;

public class Strength {
	static public final String TABLE_NAME = "strength";

	static public final String FIELD_DATE = "date";
	static public final String FIELD_ARCHER = "archer";

	static public String getAllStrengthsJSON(String archer) {
		try {
			String query = "SELECT * FROM " + TABLE_NAME + " ";
			query += "WHERE " + FIELD_ARCHER + " = ? ";
			query += "ORDER BY " + FIELD_DATE + " DESC;";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ResultSet rs = ps.executeQuery();
			String json = "{";
			while (rs.next()) {
				Date date = rs.getDate(FIELD_DATE);
				json += "\"" + Database.sdf.format(date) + "\":true,";
			}
			if (json.endsWith(","))
				json = json.substring(0, json.length() - 1);
			json += "}";
			rs.close();
			ps.close();
			return json;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	static public boolean deleteStrength(String archer, String date) {
		try {
			String query = "DELETE FROM " + TABLE_NAME;
			query += " WHERE " + FIELD_ARCHER + " = ?";
			query += " AND " + FIELD_DATE + " = ?;";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ps.setString(2, date);

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

	static public boolean addStrength(String archer, String date) {
		try {
			String query = "INSERT INTO " + TABLE_NAME + "(";
			query += FIELD_DATE + ",";
			query += FIELD_ARCHER + ")";
			query += " VALUES (?,?);";

			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, date);
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
}
