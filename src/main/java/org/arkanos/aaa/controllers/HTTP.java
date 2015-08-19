package org.arkanos.aaa.controllers;

import javax.servlet.http.HttpServletResponse;

/**
 * Controls the settings for HTTP protocol.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 */
public class HTTP {
	
	/**
	 * Defines a common set of header settings.
	 * 
	 * @param response
	 *            to be set.
	 */
	static public void setUpDefaultHeaders(HttpServletResponse response) {
		response.addHeader("Cache-Control", "no-store");
		response.setContentType("application/x-json");
	}
	
}
