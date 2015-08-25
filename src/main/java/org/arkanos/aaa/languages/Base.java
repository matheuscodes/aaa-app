package org.arkanos.aaa.languages;

import java.util.HashMap;

public class Base extends HashMap<String, String> {

	private String code = null;
	private String name = null;
	
	public Base(){
		super();
		this.code = "[master]";
		this.name = "[master]";
		
		put("email", "Email string in the login screen");
		put("email_error", "Error string when user input wrong email");
		put("password", "Password string in the login screen");
		put("sign_up", "Tooltip text on signup button");
		put("login", "Login button content text");
		put("home", "Home screen title and menu entry");
		put("manage_profile","Profile title and menu entry");
		put("manage_trainings","Trainings title and menu entry");
		put("performance_history","Performance title and menu entry");
		put("help","Help title and menu entry");
		put("options","Tooltip of profile drop down menu");
		put("settings","Profile settings title and menu entry");
		put("logout","Logout button tooltip and menu entry");
		
		put("not_an_integer","Error message when not an integer");
		put("arrow_count","Number of arrows");
		put("not_a_number","Error message when not a number");
		put("distance","Distance in m");
		put("warmup","Warm up arrow count in trainings");
		put("target","Arrow count shooting to a target (no gauge)");
		put("board","Arrow count shooting to a blank board");
		put("warmout","Warm out arrow count in trainings");
		put("upload_training","Tooltip of the training upload button");
		put("discard_training","Tooltip of the training trash button");
		put("add_training","Tooltip of the training add button");
		put("add_new_training","Title of the training card");
		put("not_a_date","Error message when not a date");
		put("date","Date in format YYYY-MM-dd");
	}
	
	protected Base(String code, String name){
		super();
		this.code = code;
		this.name = name;
	}
	
	public String getCode(){
		return code;
	}
	public String getName(){
		return code;
	}
	
	public String getInfo(){
		String s = "{";
		s += "\"name\":\""+name+"\",";
		s += "\"code\":\""+code+"\"";
		s += "}";
		
		return s;
	}

	public String stringify() {
		String s = "";
		for(String k: this.keySet()){
			s += "\""+k+"\":\""+this.get(k)+"\",";
		}
		if(s != "") s = s.substring(0,s.length()-1);
		return s;
	}
}
