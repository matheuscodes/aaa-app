package org.arkanos.aaa.api;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aaa.controllers.Database;
import org.arkanos.aaa.controllers.HTTP;
import org.arkanos.aaa.controllers.Security;
import org.arkanos.aaa.controllers.Security.TokenInfo;
import org.arkanos.aaa.data.Archer;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 * Login REST API.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 */
@WebServlet("/login")
public class Login extends HttpServlet {
	/** Default version number **/
	private static final long serialVersionUID = 1L;

	/** When last deletion occurred **/
	private static long last_deletion = 0;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Login() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		JSONObject json = null;
		try {
			JSONParser parser = new JSONParser();
			json = (JSONObject) parser.parse(request.getReader().readLine());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		System.out.println(json.toJSONString());

		String email = Database.sanitizeString((String) json.get("email"));
		String hashed_password = Database.sanitizeString((String) json.get("hashed_password"));

		HTTP.setUpDefaultHeaders(response);
		/** Run deletion once a day **/
		if ((Login.last_deletion + (24 * 60 * 60 * 1000)) < System.currentTimeMillis()) {
			// TODO User.removeUnconfirmed();
			Login.last_deletion = System.currentTimeMillis();
		}
		// TODO relogin
		TokenInfo requester = Security.authenticateToken(request);
		if (requester == null) {
			if ((email == null) || (hashed_password == null)) {
				response.sendError(400, "Email and password are required.");
				return;
			} else {
				if (Archer.credentialsMatch(email, hashed_password)) {
					String token = Security.createToken(email);
					Cookie c = null;
					if (token != null) {
						c = new Cookie(Security.TOKEN_COOKIE_NAME, token);
					}
					response.addCookie(c);
					response.getWriter().println("{\"email\":\"" + email + "\"}");
					response.setStatus(201);
					return;
				} else {
					response.sendError(403, "Credentials do not match.");
					return;
				}
			}
		}
		response.getWriter().println("{\"email\":\"" + requester.getUsername() + "\"}");
		response.setStatus(200);
	}
}