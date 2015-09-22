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
import org.arkanos.aaa.data.Strength;

/**
 * Servlet implementation class Strenghts
 */
@WebServlet("/strengths/*")
public class Strenghts extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Strenghts() {
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
		if (!resource.equals("/strengths/")) {
			response.sendError(400);
			return; // TODO set error message
		}
		HTTP.setUpDefaultHeaders(response);
		response.getWriter().println(Strength.getAllStrengthsJSON(requester.getUsername()));
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

		String resource = request.getRequestURI();
		if (!resource.endsWith("/"))
			resource += "/";
		resource = resource.replace("/strengths/", "");
		if (resource.length() > 10) {
			String date = resource.substring(0, 11);
			if (Strength.addStrength(requester.getUsername(), date)) {
				response.setStatus(201);
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
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
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
		resource = resource.replace("/strengths/", "");
		if (resource.length() > 10) {
			String date = resource.substring(0, 11);
			if (Strength.deleteStrength(requester.getUsername(), date)) {
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
