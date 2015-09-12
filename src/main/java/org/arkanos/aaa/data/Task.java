package org.arkanos.aaa.data;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;

import org.arkanos.aaa.controllers.Database;

public class Task {
	
	private static final Task factory = new Task();
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	
	static public final String TABLE_NAME = "task";
	
	static public final String FIELD_ID = "id";
	static public final String FIELD_STATUS = "status";
	static public final String FIELD_DESCRIPTION = "description";
	static public final String FIELD_ARCHER = "archer";
	
	static public String getAllTasksJSON(String archer){
		try{
			String query = "SELECT * FROM "+TABLE_NAME+" WHERE "+FIELD_ARCHER+" = ?;";
			String array = "[";
			PreparedStatement ps = Database.prepare(query);
			ps.setString(1, archer);
			ResultSet rs = ps.executeQuery();
			while(rs.next()){
				int id = rs.getInt(FIELD_ID);
				String status = rs.getString(FIELD_STATUS);
				String description = rs.getString(FIELD_DESCRIPTION);
				
				String json = "{";
				json += "\"" + FIELD_ID + "\":"+id+",";
				json += "\"" + FIELD_STATUS + "\":\""+status+"\",";
				json += "\"" + FIELD_DESCRIPTION + "\":\""+description+"\"";
				json += "}";
				
				array += json + ",";
			}
			rs.close();
			ps.close();
			if(array.endsWith(",")) array = array.substring(0, array.length()-1);
			array += "]";
			return array;
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
