package org.arkanos.aaa.languages;

public class German extends Base {
	
	public German(){
		super("de","Deutsch");
		
		put("email", "Email");
		put("email_error", "Ungültige Email Adresse!");
		put("password", "Passwort");
		put("sign_up", "Registrierung");
		put("login", "Einloggen");
		put("home", "Home");
		put("manage_profile","Ausrüstungsverwaltung");
		put("manage_trainings","Trainingsverwaltung");
		put("performance_history","Leistungsverlauf");
		put("help","Hilfe");
		put("options","Benutzeroptionen");
		put("settings","Kontoeinstellungen");
		put("logout","Abmeldung");
	}

}
