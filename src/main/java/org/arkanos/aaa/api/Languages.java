package org.arkanos.aaa.api;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aaa.controllers.HTTP;
import org.arkanos.aaa.controllers.Language;

/**
 * Servlet implementation class Languages
 */
@WebServlet("/languages/*")
public class Languages extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Languages() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String path = request.getRequestURI();
		if (!path.endsWith("/")) {
			path += "/";
		}

		String whichone = path.replaceAll("/languages/", "");
		whichone = whichone.replaceAll("/", "");
		Language.initializeLanguages();
		if (whichone.length() == 0) {
			response.getWriter().print(Language.getAllLanguagesJSON());
		} else {
			response.getWriter().print(Language.getLanguageJSON(whichone));
		}
		HTTP.setUpDefaultHeaders(response);
	}
}
