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
		
		put("not_an_integer","Es muss eine ganze Zahl sein!");
		put("arrow_count","Anzahl der Pfeile");
		put("not_a_number","Es muss eine Zahl sein!");
		put("distance","Entfernung (m)");
		put("warmup","Einschießen");
		put("target","Zielpunkt");
		put("board","Tafel");
		put("warmout","Ausschießen");
		put("upload_training","Training hochladen");
		put("discard_training","Entwurf löschen");
		put("add_training","Daten hinzufügen");
		put("add_new_training","Neues Training");
		put("not_a_date","Datum muss in Format YYYY-MM-dd sein!");
		put("date","Datum");
	}

}
