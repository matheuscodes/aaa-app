package org.arkanos.aaa.languages;

public class English extends Base {

	public English(){
		super("en","English");
		
		put("email", "Email");
		put("email_error", "Invalid email address!");
		put("password", "Password");
		put("sign_up", "Sign Up");
		put("login", "Login");
		put("home", "Home");
		put("manage_profile","Profile Management");
		put("manage_trainings","Training Management");
		put("performance_history","Performance History");
		put("help","Help");
		put("options","User Options");
		put("settings","Account Settings");
		put("logout","Logout");
		
		put("not_an_integer","Must be an integer number!");
		put("arrow_count","Arrow Count");
		put("not_a_number","Must be a number!");
		put("distance","Distance (m)");
		put("warmup","Warm up");
		put("target","Target");
		put("board","Blank board");
		put("warmout","Warm out");
		
		put("upload_training","Upload training");
		put("discard_training","Discard draft");
		put("add_training","Add to training");
		put("add_new_training","New training");
		put("not_a_date","Must be a date in format YYYY-MM-dd!");
		put("date","Date");
		
		put("upload_gauge","Upload gauged training");
		put("discard_gauge","Discard draft");
		put("add_gauge_end","Add new end");
		put("remove_end_arrow","Remove last arrow");
		put("add_new_gauge","New gauged training");
		put("end","End");
	}
	
}
