package org.arkanos.aaa.languages;

public class German extends Base {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public German() {
		super("de", "Deutsch");

		put("email", "Email");
		put("email_error", "Ungültige Email Adresse!");
		put("password", "Passwort");
		put("sign_up", "Registrierung");
		put("login", "Einloggen");
		put("home", "Home");
		put("manage_profile", "Ausrüstungsverwaltung");
		put("manage_trainings", "Trainingsverwaltung");
		put("performance_history", "Leistungsverlauf");
		put("help", "Hilfe");
		put("options", "Benutzeroptionen");
		put("settings", "Kontoeinstellungen");
		put("logout", "Abmeldung");

		put("not_an_integer", "Es muss eine ganze Zahl sein!");
		put("arrow_count", "Anzahl der Pfeile");
		put("not_a_number", "Es muss eine Zahl sein!");
		put("distance", "Entfernung (m)");
		put("warmup", "Einschießen");
		put("target", "Zielpunkt");
		put("board", "Tafel");
		put("warmout", "Ausschießen");

		put("upload_training", "Training hochladen");
		put("discard_training", "Entwurf löschen");
		put("add_training", "Daten hinzufügen");
		put("add_new_training", "Neues Training");
		put("not_a_date", "Datum muss in Format YYYY-MM-dd sein!");
		put("date", "Datum");

		put("upload_gauge", "Leistungskontrolle hochladen");
		put("discard_gauge", "Entwurf löschen");
		put("add_gauge_end", "Daten hinzufügen");
		put("remove_end_arrow", "Das Letzte zurücknehmen");
		put("add_new_gauge", "Neue Leistungskontrolle");
		put("end", "End");

		put("gauged", "Scheibe");
		put("statistics_title", "Trainingsbericht");
		put("week_number", "Wochen-Nr.");
		put("wk", "KW");
		put("technique_totals", "Summe Technikschüsse");
		put("target_totals", "Summe auf Auflage");
		put("totals", "Schußzahl gesamt");
		put("weekly_technique", "Technikzahl pro Woche");
		put("weekly_total", "Schußzahl pro Woche");
		put("result", "Erg.");
		put("average_inacurracy", "Umrechnung");
		put("result_totals", "Umrechnung Durchschnitt");
		put("weekly_inacurracy", "Wochendurchschnitt");
		put("overview_title", "Tagesauswertung");
		put("total_plan", "Vorgabe Gesamt");
		put("technique_share", "Vorgabe Auflage");
		put("strength_training", "Krafttraining");
		put("results", "Ergebnisse");
		put("season_title", "Wochenauswertung");

		put("month_full_0", "Januar");
		put("month_full_1", "Februar");
		put("month_full_2", "März");
		put("month_full_3", "April");
		put("month_full_4", "Mai");
		put("month_full_5", "Juni");
		put("month_full_6", "Juli");
		put("month_full_7", "August");
		put("month_full_8", "September");
		put("month_full_9", "Oktober");
		put("month_full_10", "November");
		put("month_full_11", "Dezember");

		put("month_short_0", "Jan");
		put("month_short_1", "Feb");
		put("month_short_2", "Mrz");
		put("month_short_3", "Apr");
		put("month_short_4", "Mai");
		put("month_short_5", "Jun");
		put("month_short_6", "Jul");
		put("month_short_7", "Aug");
		put("month_short_8", "Sep");
		put("month_short_9", "Okt");
		put("month_short_10", "Nov");
		put("month_short_11", "Dez");

		put("home_arrows", "Pfeil Verlauf");
		put("home_events", "Demnächste Events");
		put("home_tasks", "Ungelöste Aufgaben");
		put("home_values", "Aufteilung der Pfeile pro Wert");
		put("home_ends", "Pfeil Zahl und durchschnittliche Punkte pro Ende");
		put("home_year_summary", "Zusammenfassung");
		put("home_seasons", "Aktuelle Saisons");

		put("profile_seasons", "Seaisons");
		put("profile_new_season_size", "Saison Größe:");
		put("weeks", "Wochen");
		put("profile_season_name", "Name");
		put("profile_season_start", "Saisonsanfang");
		put("profile_season_end", "Saisonende");
		put("days", "Tage");

		put("profile_events", "Events");
		put("profile_event_name", "Name");
		put("profile_event_start", "Anfangstermin");
		put("profile_event_name_short", "Kürzel");
		put("color", "Farbe");

		put("profile_inventory", "Ausrüstung");
		put("profile_inventory_name", "Bogen Beschreibung");
		put("profile_inventory_arms", "Wurfarme Beschreibung");
		put("profile_inventory_weight", "Zuggewicht");
		put("profile_inventory_arrow", "Pfeil Beschreibung");
		put("profile_inventory_arrows", "Pfeil Zahl");
		put("profile_inventory_quiver", "Pfeile im Köcher");
		put("compound", "Compoundbogen");
		put("recurve", "Recurvebogen");
		put("longbow", "Langbogen");

		put("profile_tasks", "Aufgaben");
		put("profile_tasks_description", "Beschreibung");
		put("profile_tasks_close", "Aufgaben schlißen");

		put("profile_calendar", "Krafttrainings");
	}
}
