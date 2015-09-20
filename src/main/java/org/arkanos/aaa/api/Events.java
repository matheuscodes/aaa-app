package org.arkanos.aaa.api;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aaa.controllers.HTTP;
import org.arkanos.aaa.controllers.Security;
import org.arkanos.aaa.controllers.Security.TokenInfo;
import org.arkanos.aaa.data.Event;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 * Servlet implementation class Events
 */
@WebServlet("/events/*")
public class Events extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Events() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		TokenInfo requester = Security.authenticateToken(request);
		if (requester == null) {
			response.sendError(403); // TODO better message and logging.
			return;
		}

		String resource = request.getRequestURI();
		if (!resource.endsWith("/"))
			resource += "/";
		if (!resource.equals("/events/")) {
			response.sendError(400);
			return; // TODO set error message
		}
		HTTP.setUpDefaultHeaders(response);
		response.getWriter().println(Event.getAllEventsJSON(requester.getUsername()));
		response.setStatus(200);
		return;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		TokenInfo requester = Security.authenticateToken(request);
		if (requester == null) {
			response.sendError(403); // TODO better message and logging.
			return;
		}

		try {
			String resource = request.getRequestURI();
			if (!resource.endsWith("/"))
				resource += "/";
			if (!resource.equals("/events/")) {
				response.sendError(400);
				return; // TODO set error message
			}
			JSONParser parser = new JSONParser();
			JSONObject json = (JSONObject) parser.parse(request.getReader().readLine());
			if (Event.addEvent(requester.getUsername(), json)) {
				response.setStatus(201); // TODO send content created
				return;
			} else {
				response.sendError(500);
				return; // TODO message
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		TokenInfo requester = Security.authenticateToken(request);
		if (requester == null) {
			response.sendError(403); // TODO better message and logging.
			return;
		}

		String resource = request.getRequestURI();
		if (!resource.endsWith("/"))
			resource += "/";
		resource = resource.replace("/events/", "");
		if (resource.length() > 11) {
			String date = resource.substring(0, 10);
			String name_short = resource.substring(11, resource.length() - 1);
			if (Event.deleteEvent(requester.getUsername(), date, name_short)) {
				response.setStatus(204);
				return;
			}
			response.sendError(500);
			return;
		} else {
			response.sendError(400); // TODO message
			return;
		}
	}

}
