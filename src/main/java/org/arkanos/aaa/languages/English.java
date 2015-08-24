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
	}
	
}
