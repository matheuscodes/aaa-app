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
		put("warmup","Warm Up");
		put("target","Target");
		put("board","Blank Board");
		put("warmout","Warm Out");
		put("upload_training","Upload Training");
		put("discard_training","Discard Draft");
		put("add_training","Add to Training");
		put("add_new_training","New training");
		put("not_a_date","Must be a date in format YYYY-MM-dd!");
		put("date","Date");
	}
	
}
