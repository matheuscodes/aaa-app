package org.arkanos.aaa.api;

import java.io.IOException;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aaa.controllers.Security;
import org.arkanos.aaa.controllers.Security.TokenInfo;
import org.arkanos.aaa.data.Event;
import org.arkanos.aaa.data.Season;
import org.arkanos.aaa.data.Task;
import org.arkanos.aaa.data.Training;

/**
 * Servlet implementation class Reports
 */
@WebServlet("/reports/*")
public class Reports extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	private static final DecimalFormat df = new DecimalFormat("#");

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Reports() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		TokenInfo requester = Security.authenticateToken(request);
		if (requester == null) {
			response.sendError(403); // TODO better message and logging.
			return;
		}

		String to_parse = request.getRequestURI();
		if (!to_parse.endsWith("/"))
			to_parse += "/";
		to_parse = to_parse.replaceAll("/reports/", "");
		if (to_parse.substring(0, to_parse.indexOf("/")).equals("monthly")) {
			to_parse = to_parse.substring(to_parse.indexOf("/") + 1);
			int year = Integer.parseInt(to_parse.substring(0, to_parse.indexOf("/")));
			to_parse = to_parse.substring(to_parse.indexOf("/") + 1);
			int month = Integer.parseInt(to_parse.substring(0, to_parse.indexOf("/")));
			to_parse = to_parse.substring(to_parse.indexOf("/") + 1);

			// TODO error if there is still BS in the URI.
			// TODO check if all API sets header correctly
			response.addHeader("Content-Type", "application/json");
			response.getWriter().print(getMonthlyReport(requester.getEmail(), year, month));
			response.setStatus(200);
			return;
		} else if (to_parse.substring(0, to_parse.indexOf("/")).equals("homescreen")) {
			to_parse = to_parse.replaceAll("/homescreen/", "");
			// TODO eliminate BS in the URI or return bad request.
			response.addHeader("Content-Type", "application/json");
			response.getWriter().print(getHomeScreenData(requester.getEmail()));
			response.setStatus(200);
			return;
		}
		// TODO throw error, treat exceptions

		// System.out.println(to_parse.substring(0, to_parse.indexOf("/")));
		// to_parse = to_parse.substring(to_parse.indexOf("/")+1);
		// System.out.println(to_parse.substring(0, to_parse.indexOf("/")));

		response.setStatus(400); // BAD request
		return;
	}

	private String getMonthlyReport(String archer, int year, int month) {
		// FIXME error in PRODUCTION CLOUD CONTROL... locale starts week on
		// sunday, breaks the whole report building on Javascript side
		// (dislocated by one day)
		// FIXME force week to start on monday.
		String json = "";
		GregorianCalendar gc = new GregorianCalendar(Locale.UK);
		gc.clear();
		gc.set(Calendar.YEAR, year);
		gc.set(Calendar.MONTH, month - 1);
		gc.set(Calendar.DATE, 1);
		int week_start = gc.get(Calendar.WEEK_OF_YEAR);

		gc.clear();
		gc.set(Calendar.YEAR, year);
		gc.set(Calendar.MONTH, month);
		gc.set(Calendar.DATE, 0);
		int week_end = gc.get(Calendar.WEEK_OF_YEAR);

		gc.clear();
		gc.set(Calendar.YEAR, year);
		gc.set(Calendar.WEEK_OF_YEAR, week_start);
		Date start = gc.getTime();

		gc.clear();
		if (week_start < week_end) {
			gc.set(Calendar.YEAR, year);
		} else {
			gc.set(Calendar.YEAR, year + 1);
		}
		gc.set(Calendar.WEEK_OF_YEAR, week_end + 1);
		Date end = gc.getTime();

		Season.WeeklyPerformance season = null;
		Training.DailyPerformance report = null;
		try {
			season = Season.compileWeeklies(archer, start).get(0);
			report = Training.compileDaily(start, end, archer);
		} catch (SQLException e) {
			// TODO
			e.printStackTrace();
		}
		// TODO move JSON generation to ReportData objects.
		json += "{";

		json += "\"arrow_counts\":";

		json += "{";
		for (String t : report.technique_days.keySet()) {
			json += "\"" + t + "\":";
			json += "{";
			for (String d : report.technique_days.get(t).keySet()) {
				json += "\"" + d + "\":" + report.technique_days.get(t).get(d) + ",";
			}
			if (json.endsWith(","))
				json = json.substring(0, json.lastIndexOf(','));
			json += "},";
		}

		for (Float di : report.distance_type.keySet()) {
			json += "\"" + df.format(di) + "\":"; // TODO make sure all
			// distances are float and
			// formatted
			json += "{";
			for (String t : report.distance_type.get(di).keySet()) {
				json += "\"" + t + "\":";
				json += "{";
				for (String d : report.distance_type.get(di).get(t).keySet()) {
					json += "\"" + d + "\":" + report.distance_type.get(di).get(t).get(d) + ",";
				}
				if (json.endsWith(","))
					json = json.substring(0, json.lastIndexOf(','));
				json += "},";
			}
			if (json.endsWith(","))
				json = json.substring(0, json.lastIndexOf(','));
			json += "},";
		}

		json += "\"technique_totals\":";
		json += "{";
		for (String d : report.technique_totals.keySet()) {
			json += "\"" + d + "\":" + report.technique_totals.get(d) + ",";
		}
		if (json.endsWith(","))
			json = json.substring(0, json.lastIndexOf(','));
		json += "},";

		json += "\"totals\":";
		json += "{";
		for (String d : report.totals.keySet()) {
			json += "\"" + d + "\":" + report.totals.get(d) + ",";
		}
		if (json.endsWith(","))
			json = json.substring(0, json.lastIndexOf(','));
		json += "}";

		json += "},";

		json += "\"results\":";
		json += "{";
		for (Integer di : report.results.keySet()) {
			json += "\"" + di + "\":";
			json += "{";
			for (String c : report.results.get(di).keySet()) {
				json += "\"" + c + "\":";
				json += "{";
				for (int o : report.results.get(di).get(c).keySet()) {
					json += "\"" + o + "\":";
					json += "{";
					for (String d : report.results.get(di).get(c).get(o).keySet()) {
						json += "\"" + d + "\":" + report.results.get(di).get(c).get(o).get(d) + ",";
					}
					if (json.endsWith(","))
						json = json.substring(0, json.lastIndexOf(','));
					json += "},";
				}

				json += "\"0\":";
				json += "{";
				for (String d : report.averages.get(di).get(c).keySet()) {
					json += "\"" + d + "\":" + report.averages.get(di).get(c).get(d) + ",";
				}
				if (json.endsWith(","))
					json = json.substring(0, json.lastIndexOf(','));
				json += "}";

				json += "},";
			}

			if (json.endsWith(","))
				json = json.substring(0, json.lastIndexOf(','));
			json += "},";
		}

		json += "\"result_totals\":";
		json += "{";
		for (String d : report.gauged_trainings.keySet()) {
			json += "\"" + d + "\":" + (report.average_sum.get(d) / report.gauged_trainings.get(d)) + ",";
		}
		if (json.endsWith(","))
			json = json.substring(0, json.lastIndexOf(','));
		json += "}";

		json += "},";

		json += "\"weekly\":";
		json += "{";
		// TODO Reestructure this JSON so that report uses this duplication
		// from Season.
		for (int i : season.weeks.keySet()) {
			json += "\"" + i + "\":";
			json += "{";
			json += "\"technique_total\":" + season.technique[season.weeks.get(i)] + ",";
			if (season.results[season.weeks.get(i)] > 0)
				json += "\"result_total\":" + (season.sum[season.weeks.get(i)] / season.results[season.weeks.get(i)])
						+ ",";
			json += "\"total\":" + season.totals[season.weeks.get(i)];
			json += "},";
		}
		if (json.endsWith(","))
			json = json.substring(0, json.lastIndexOf(','));

		json += "},";

		/** Adding a week to be sure not to be in the end of previous month **/
		json += "\"seasons\":"
				+ Season.getSeasonsPerformance(archer, new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000)) + ",";

		json += "\"start\":\"" + sdf.format(start) + "\",";
		json += "\"end\":\"" + sdf.format(end) + "\",";
		json += "\"week_start\":" + week_start + ",";
		json += "\"week_end\":" + week_end + ",";
		json += "\"month\":" + month + ",";
		json += "\"response\":200}";

		return json;
	}

	private String getHomeScreenData(String archer) {
		String json = "{";
		json += "\"arrows_total\":" + Training.getWeeksArrows(archer) + ",";
		json += "\"value_distribution\":" + Training.getValueDistribution(archer) + ",";
		json += "\"end_distribution\":" + Training.getEndDistribution(archer) + ",";
		json += "\"seasons\":" + Season.getSeasonsPerformance(archer, new Date(System.currentTimeMillis())) + ",";
		json += "\"events\":" + Event.getUpcomingEvents(archer, 2) + ",";
		json += "\"tasks\":" + Task.getActiveRecentTasks(archer) + ",";
		json += "\"year_summary\":" + Training.getYearSummary(archer);
		json += "}";
		return json;
	}

}
