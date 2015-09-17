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
    }

}
