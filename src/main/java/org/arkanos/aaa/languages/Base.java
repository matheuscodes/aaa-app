package org.arkanos.aaa.languages;

import java.util.HashMap;

public class Base extends HashMap<String, String> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String code = null;
	private String name = null;

	public Base() {
		super();
		this.code = "[master]";
		this.name = "[master]";

		put("email", "Email string in the login screen");
		put("email_error", "Error string when user input wrong email");
		put("password", "Password string in the login screen");
		put("sign_up", "Tooltip text on signup button");
		put("login", "Login button content text");
		put("home", "Home screen title and menu entry");
		put("manage_profile", "Profile title and menu entry");
		put("manage_trainings", "Trainings title and menu entry");
		put("performance_history", "Performance title and menu entry");
		put("help", "Help title and menu entry");
		put("options", "Tooltip of profile drop down menu");
		put("settings", "Profile settings title and menu entry");
		put("logout", "Logout button tooltip and menu entry");

		put("not_an_integer", "Error message when not an integer");
		put("arrow_count", "Number of arrows");
		put("not_a_number", "Error message when not a number");
		put("distance", "Distance in m");
		put("warmup", "Warm up arrow count in trainings");
		put("target", "Arrow count shooting to a target (no gauge)");
		put("board", "Arrow count shooting to a blank board");
		put("warmout", "Warm out arrow count in trainings");

		put("upload_training", "Tooltip of the training upload button");
		put("discard_training", "Tooltip of the training trash button");
		put("add_training", "Tooltip of the training add button");
		put("add_new_training", "Title of the training card");
		put("not_a_date", "Error message when not a date");
		put("date", "Date in format YYYY-MM-dd");

		put("upload_gauge", "Tooltip of the gauge upload button");
		put("discard_gauge", "Tooltip of the gauge trash button");
		put("add_close_end", "Tooltip of the end add button");
		put("remove_end_arrow", "Tooltip of the end undo button");
		put("add_new_gauge", "Title of the gauge card");
		put("end", "Name of the round of arrows");

		put("gauged", "Training which shots are gauged");
		put("statistics_title", "Title of the statistics table");
		put("week_number", "Week number");
		put("wk", "Short for week");
		put("technique_totals", "Total number of technique shots daily");
		put("target_totals", "Total number of target shots");
		put("totals", "Total number of shots");
		put("weekly_technique", "Total number of technique shots weekly");
		put("weekly_total", "Total number of shots weekly");
		put("result", "The sum of points of one round");
		put("average_inacurracy", "The average points missing from 10");
		put("result_totals", "The total average points missing from 10");
		put("weekly_inacurracy", "The total weekly average points missing from 10");
		put("overview_title", "Title of the statistics graph");
		put("total_plan", "Amount of shots planned");
		put("technique_share", "Title of the statistics graph");
		put("strength_training", "Marker to indicate there was extra weight training");
		put("results", "Graded performance");
		put("season_title", "Title of the season graph");

		put("month_full_0", "Month name full");
		put("month_full_1", "Month name full");
		put("month_full_2", "Month name full");
		put("month_full_3", "Month name full");
		put("month_full_4", "Month name full");
		put("month_full_5", "Month name full");
		put("month_full_6", "Month name full");
		put("month_full_7", "Month name full");
		put("month_full_8", "Month name full");
		put("month_full_9", "Month name full");
		put("month_full_10", "Month name full");
		put("month_full_11", "Month name full");

		put("month_short_0", "Month name short");
		put("month_short_1", "Month name short");
		put("month_short_2", "Month name short");
		put("month_short_3", "Month name short");
		put("month_short_4", "Month name short");
		put("month_short_5", "Month name short");
		put("month_short_6", "Month name short");
		put("month_short_7", "Month name short");
		put("month_short_8", "Month name short");
		put("month_short_9", "Month name short");
		put("month_short_10", "Month name short");
		put("month_short_11", "Month name short");

		put("home_arrows", "Last week's arrows title");
		put("home_events", "Upcoming events title");
		put("home_tasks", "Active and recently closed tasks title");
		put("home_values", "Distribution per value title");
		put("home_ends", "Distribution per end title");
		put("home_year_summary", "Year summary title");
		put("home_seasons", "Active Seasons title");

		put("distribution", "Label for distribution graph.");
		put("distribution_week", "Label for distribution graph.");
		put("distribution_month", "Label for distribution graph.");
		put("distribution_year", "Label for distribution graph.");

		put("count_week", "Label for the count per end graph.");
		put("count_month", "Label for the count per end graph.");
		put("value_week", "Label for the count per end graph.");
		put("value_month", "Label for the count per end graph.");

		put("profile_seasons", "Seasons title for profile card");
		put("profile_new_season_size", "Indicates the size of the season to be created");
		put("weeks", "Word 'weeks'");
		put("profile_season_name", "Name in the season profile form");
		put("profile_season_start", "Start date in the season profile form");
		put("profile_season_end", "End date in the season profile form");
		put("days", "Word 'days'");

		put("profile_events", "Events title for profile card");
		put("profile_event_name", "Name in the event profile form");
		put("profile_event_start", "Start date in the event profile form");
		put("profile_event_name_short", "Abbreviation of the name in the event profile form");
		put("color", "Word 'Color'");

		put("profile_inventory", "Inventory title for profile card");
		put("profile_inventory_name", "Name in the inventory profile form");
		put("profile_inventory_arms", "Bow arms in the inventory profile form");
		put("profile_inventory_weight", "Bow weight in the inventory profile form");
		put("profile_inventory_arrow", "Arrow description in the inventory profile form");
		put("profile_inventory_arrows", "Arrow count in the inventory profile form");
		put("profile_inventory_quiver", "'arrows in the quiver' sentence in invetory item");
		put("compound", "Compound bow");
		put("recurve", "Recurve bow");
		put("longbow", "Longbow bow");

		put("profile_tasks", "Tasks title for profile card");
		put("profile_tasks_description", "Description for task form");
		put("profile_tasks_close", "Submit tasks for completion button");

		put("profile_calendar", "Calendar title for profile card");

	}

	protected Base(String code, String name) {
		super();
		this.code = code;
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public String getName() {
		return code;
	}

	public String getInfo() {
		String s = "{";
		s += "\"name\":\"" + name + "\",";
		s += "\"code\":\"" + code + "\"";
		s += "}";

		return s;
	}

	public String stringify() {
		String s = "";
		for (String k : this.keySet()) {
			s += "\"" + k + "\":\"" + this.get(k) + "\",";
		}
		if (s != "")
			s = s.substring(0, s.length() - 1);
		return s;
	}
}
