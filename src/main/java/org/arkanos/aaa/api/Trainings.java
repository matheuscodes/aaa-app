package org.arkanos.aaa.api;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aaa.controllers.Database;
import org.arkanos.aaa.controllers.Security;
import org.arkanos.aaa.controllers.Security.TokenInfo;
import org.arkanos.aaa.data.Training;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 * Servlet implementation class Trainings
 */
@WebServlet("/trainings")
public class Trainings extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Trainings() {
		super();
		Database.initialize();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		if (Security.authenticateToken(request) == null) {
			response.sendError(403); // TODO better message and logging.
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
			JSONParser parser = new JSONParser();
			JSONObject json = (JSONObject) parser.parse(request.getReader().readLine());

			System.out.println(json.toJSONString());

			String email = requester.getEmail(); // TODO rename method to
			// getEmail
			String type = Database.sanitizeString((String) json.get("type"));
			boolean success = true;
			switch (type) {
			case "training":
				success = writeTraining(json, email);
				break;
			case "gauge":
				success = writeGaugedTraining(json, email);
				break;
			default:
				System.out.println("Oops..."); // TODO throw error
			}
			if (success) {
				response.setStatus(201);
			} else {
				response.sendError(500); // TODO send messages
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	// TODO maybe move JSON interpretation to Training.java
	private boolean writeGaugedTraining(JSONObject json, String email) {
		String date = (String) json.get(Training.FIELD_DATE);
		String target = (String) json.get(Training.FIELD_TARGET);
		float distance = Float.parseFloat((String) json.get(Training.FIELD_DISTANCE));

		long id = Training.insertGauge(email, date, distance, target);
		if (id <= 0) {
			return false;
		}
		JSONArray jends = (JSONArray) json.get(Training.ENDS);
		HashMap<Integer, LinkedList<Integer>> ends = new HashMap<Integer, LinkedList<Integer>>();
		int end_count = 0;
		for (Object end : jends.toArray()) {
			JSONArray jarrows = (JSONArray) end;
			LinkedList<Integer> arrows = new LinkedList<Integer>();
			for (Object s : jarrows.toArray()) {
				int value = Integer.parseInt(s.toString());
				arrows.add(new Integer(value));
			}
			ends.put(end_count, arrows);
			end_count++;
		}

		return Training.insertArrows(id, ends);
	}

	private boolean writeTraining(JSONObject json, String email) throws ParseException {
		boolean alright = true;
		String date = (String) json.get(Training.FIELD_DATE);
		for (Object type : json.keySet()) {
			if (!type.equals(Training.FIELD_DATE) && !type.equals(Training.FIELD_TYPE)) {
				JSONObject item = (JSONObject) json.get(type);
				for (Object distance : item.keySet()) {
					float value = Float.parseFloat((String) distance);
					int count = Integer.parseInt((String) item.get(distance));
					if (!Training.insertTraining(email, date, (String) type, value, count)) {
						alright = false;
					}
				}
			}
		}
		return alright;
	}

}
