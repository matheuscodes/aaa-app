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
import org.arkanos.aaa.data.Task;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 * Servlet implementation class Tasks
 */
@WebServlet("/tasks/*")
public class Tasks extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Tasks() {
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
		if (!resource.equals("/tasks/")) {
			response.sendError(400);
			return; // TODO set error message
		}
		HTTP.setUpDefaultHeaders(response);
		response.getWriter().println(Task.getAllTasksJSON(requester.getUsername()));
		response.setStatus(200);
		return;

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
			if (!resource.equals("/tasks/")) {
				response.sendError(400);
				return; // TODO set error message
			}
			JSONParser parser = new JSONParser();
			JSONObject json = (JSONObject) parser.parse(request.getReader().readLine());
			if (Task.addTask(requester.getUsername(), json)) {
				response.getWriter().println(Task.getRecentAddedTask(requester.getUsername(), json));
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
		resource = resource.replace("/tasks/", "");
		if (resource.length() > 0) {
			int id = Integer.parseInt(resource.substring(0, resource.length() - 1));
			if (Task.deleteTask(requester.getUsername(), id)) {
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
		resource = resource.replace("/tasks/", "");
		if (resource.length() > 0) {
			try {
				int id = Integer.parseInt(resource.substring(0, resource.length() - 1));
				JSONParser parser = new JSONParser();
				JSONObject json = (JSONObject) parser.parse(request.getReader().readLine());

				if (Task.updateTask(requester.getUsername(), id, json)) {
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
