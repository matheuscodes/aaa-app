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
import org.arkanos.aaa.data.Season;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 * Servlet implementation class Seasons
 */
@WebServlet("/seasons/*")
public class Seasons extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Seasons() {
		super();
		// TODO Auto-generated constructor stub
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

		String resource = request.getRequestURI();
		if (!resource.endsWith("/"))
			resource += "/";
		if (resource.equals("/seasons/")) {
			HTTP.setUpDefaultHeaders(response);
			response.getWriter().println(Season.getAllSeasonsJSON(requester.getEmail()));
			response.setStatus(200);
		} else {
			// TODO specific season
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
		resource = resource.replace("/seasons/", "");
		if (resource.length() > 0) {
			int id = Integer.parseInt(resource.substring(0, resource.length() - 1));
			if (Season.deleteSeason(requester.getEmail(), id)) {
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

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@Override
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
			if (!resource.equals("/seasons/")) {
				response.sendError(400);
				return; // TODO set error message
			}
			JSONParser parser = new JSONParser();
			JSONObject json = (JSONObject) parser.parse(request.getReader().readLine());
			if (Season.createSeason(requester.getEmail(), json)) {
				response.getWriter().print(Season.getRecentAddedSeason(requester.getEmail(), json));
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
	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		TokenInfo requester = Security.authenticateToken(request);
		if (requester == null) {
			response.sendError(403); // TODO better message and logging.
			return;
		}

		String resource = request.getRequestURI();
		if (!resource.endsWith("/"))
			resource += "/";
		resource = resource.replace("/seasons/", "");
		if (resource.length() > 0) {
			try {
				int id = Integer.parseInt(resource.substring(0, resource.length() - 1));
				JSONParser parser = new JSONParser();
				JSONObject json = (JSONObject) parser.parse(request.getReader().readLine());

				if (Season.updateSeason(requester.getEmail(), id, json)) {
					response.setStatus(204);
					return;
				}
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			response.sendError(500);
			return;
		} else {
			response.sendError(400); // TODO message
			return;
		}
	}

}
