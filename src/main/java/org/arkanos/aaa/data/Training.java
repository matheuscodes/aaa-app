package org.arkanos.aaa.data;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedList;

import org.arkanos.aaa.controllers.Database;

public class Training {
	/** SQL table name **/
	static public final String	TABLE_NAME = "training";
	static public final String	TABLE_NAME_GAUGE = "gauge";
	static public final String	TABLE_NAME_ARROW = "arrow";
	
	/*Common*/
	static final public String	FIELD_ID = "id";
	static final public String	FIELD_ARCHER = "archer";
	static final public String	FIELD_DISTANCE = "distance";
	static final public String	FIELD_DATE = "date";
	
	/*Training only*/
	static final public String	FIELD_ARROWS = "arrows";
	static final public String	FIELD_TYPE = "type";
	
	/*Gauge only*/
	static final public String	FIELD_TARGET = "target";
	
	/*Arrow only*/
	static final public String	FIELD_TRAINING_ID = "training_id";
	static final public String	FIELD_END = "end";
	static final public String	FIELD_VALUE = "value";
	
	
	static final public String	ENDS = "ends";
	
	public static boolean insertTraining(String email, String date, String type, float value, int count) {
		String query = "INSERT INTO " + TABLE_NAME + "(";
		query += FIELD_ARCHER+",";
		query += FIELD_DATE+",";
		query += FIELD_TYPE+",";
		query += FIELD_DISTANCE+",";
		query += FIELD_ARROWS+")";
		query += " VALUES (?,?,?,?,?);";
		try {
			PreparedStatement ps = Database.prepare(query);
			ps.setString(1,email);
			ps.setString(2,date);
			ps.setString(3,type);
			ps.setFloat(4,value);
			ps.setInt(5,count);
			boolean result = (ps.executeUpdate() > 0);
			ps.close();
			return result;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	public static long insertGauge(String email, String date,float value, String target) {
		String query = "INSERT INTO " + TABLE_NAME_GAUGE + "(";
		query += FIELD_ARCHER+",";
		query += FIELD_DATE+",";
		query += FIELD_DISTANCE+",";
		query += FIELD_TARGET+")";
		query += " VALUES (?,?,?,?);";
		try {
			PreparedStatement ps = Database.prepare(query);
			ps.setString(1,email);
			ps.setString(2,date);
			ps.setFloat(3,value);
			ps.setString(4,target);
			boolean result = (ps.executeUpdate() > 0);
			ps.close();
			if(!result){
				return -1;
			}
			else{
				query = "SELECT "+FIELD_ID+" FROM "+TABLE_NAME_GAUGE+" ";
				query += "WHERE "+FIELD_ARCHER+"=? ";
				query += "AND "+FIELD_DATE+"=? ";
				query += "AND "+FIELD_DISTANCE+"=? ";
				query += "AND "+FIELD_TARGET+"=?;";
				ps = Database.prepare(query);
				ps.setString(1,email);
				ps.setString(2,date);
				ps.setFloat(3,value);
				ps.setString(4,target);
				ResultSet rs = ps.executeQuery();
				if(rs.next()){
					return rs.getLong(FIELD_ID);
				}
			}
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return -1;
	}

	public static boolean insertArrows(long id, HashMap<Integer, LinkedList<Integer>> ends) {
		String query = "INSERT INTO " + TABLE_NAME_ARROW + "(";
		query += FIELD_TRAINING_ID+",";
		query += FIELD_VALUE+",";
		query += FIELD_END+")";
		query += " VALUES (?,?,?);";
		try {
			PreparedStatement ps = Database.prepare(query);
			for(Integer end: ends.keySet()){
				for(Integer arrow: ends.get(end)){
					ps.setLong(1,id);
					ps.setInt(2,arrow);
					ps.setInt(3,end);
					ps.addBatch();
				}
			}
			
			for(int i: ps.executeBatch()){
				if(i <= 0){
					ps.close();
					return false;
				}
			}
			ps.close();
			return true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
}
