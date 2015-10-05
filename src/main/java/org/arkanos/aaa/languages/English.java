package org.arkanos.aaa.languages;

public class English extends Base {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public English() {
		super("en", "English");

		put("email", "Email");
		put("email_error", "Invalid email address!");
		put("password", "Password");
		put("sign_up", "Sign Up");
		put("login", "Login");
		put("home", "Home");
		put("manage_profile", "Profile Management");
		put("manage_trainings", "Training Management");
		put("performance_history", "Performance History");
		put("help", "Help");
		put("options", "User Options");
		put("settings", "Account Settings");
		put("logout", "Logout");

		put("not_an_integer", "Must be an integer number!");
		put("arrow_count", "Arrow Count");
		put("not_a_number", "Must be a number!");
		put("distance", "Distance (m)");
		put("warmup", "Warm up");
		put("target", "Target");
		put("board", "Blank board");
		put("warmout", "Warm out");

		put("upload_training", "Upload training");
		put("discard_training", "Discard draft");
		put("add_training", "Add to training");
		put("add_new_training", "New training");
		put("not_a_date", "Must be a date in format YYYY-MM-dd!");
		put("date", "Date");

		put("upload_gauge", "Upload gauged training");
		put("discard_gauge", "Discard draft");
		put("add_gauge_end", "Add new end");
		put("remove_end_arrow", "Remove last arrow");
		put("add_new_gauge", "New gauged training");
		put("end", "End");

		put("gauged", "Scheibe");
		put("statistics_title", "Trainingsbericht");
		put("week_number", "Wochen-Nr.");
		put("wk", "wk");
		put("technique_totals", "Summe Technikschüsse");
		put("target_totals", "Summe auf Auflage");
		put("totals", "Schußzahl gesamt");
		put("weekly_technique", "Technikzahl pro Woche");
		put("weekly_total", "Schußzahl pro Woche");
		put("result", "Ergebniss");
		put("average_inacurracy", "Umrechnung");
		put("result_totals", "Umrechnung Durchschnitt");
		put("weekly_inacurracy", "Wochendurchschnitt");
		put("overview_title", "Tagesauswertung");
		put("total_plan", "Vorgabe Gesamt");
		put("technique_share", "Vorgabe Auflage");
		put("strength_training", "Krafttraining");
		put("results", "Ergebnisse");
		put("season_title", "Wochenauswertung");

		put("month_full_0", "January");
		put("month_full_1", "February");
		put("month_full_2", "March");
		put("month_full_3", "April");
		put("month_full_4", "May");
		put("month_full_5", "June");
		put("month_full_6", "July");
		put("month_full_7", "August");
		put("month_full_8", "September");
		put("month_full_9", "October");
		put("month_full_10", "November");
		put("month_full_11", "December");

		put("month_short_0", "Jan");
		put("month_short_1", "Feb");
		put("month_short_2", "Mar");
		put("month_short_3", "Apr");
		put("month_short_4", "May");
		put("month_short_5", "Jun");
		put("month_short_6", "Jul");
		put("month_short_7", "Aug");
		put("month_short_8", "Sep");
		put("month_short_9", "Oct");
		put("month_short_10", "Nov");
		put("month_short_11", "Dec");

		put("home_arrows", "Recent arrows history");
		put("home_events", "Upcoming events");
		put("home_tasks", "Active and recent tasks");
		put("home_values", "Distribution of arrows per value");
		put("home_ends", "Arrow count and average points per end");
		put("home_year_summary", "Year's summary");
		put("home_seasons", "Active seasons");

		put("profile_seasons", "Seasons");
		put("profile_new_season_size", "Season size:");
		put("weeks", "weeks");
		put("profile_season_name", "Name");
		put("profile_season_start", "Start date");
		put("profile_season_end", "End date");
		put("days", "days");

		put("profile_events", "Events");
		put("profile_event_name", "Name");
		put("profile_event_start", "Start date");
		put("profile_event_name_short", "Abbreviation");
		put("color", "Color");

		put("profile_inventory", "Inventory");
		put("profile_inventory_name", "Bow description");
		put("profile_inventory_arms", "Bow arm description");
		put("profile_inventory_weight", "Bow weight");
		put("profile_inventory_arrow", "Arrow description");
		put("profile_inventory_arrows", "Arrow count");
		put("profile_inventory_quiver", "arrows in the quiver");
		put("compound", "Compound Bow");
		put("recurve", "Recurve Bow");
		put("longbow", "Longbow");

		put("profile_tasks", "Tasks");
		put("profile_tasks_description", "Description");
		put("profile_tasks_close", "Close Tasks");

		put("profile_calendar", "Weight Trainings");
	}

}
