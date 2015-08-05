package org.arkanos.aaa.graphs;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aaa.controllers.Database;

/**
 * Servlet implementation class SeasonGraph
 */
@WebServlet("/seasons/*")
public class SeasonGraph extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SeasonGraph() {
        super();
        Database.initialize();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		PrintWriter writer = response.getWriter();
		writer.print("<?xml version='1.0' encoding='UTF-8' standalone='no'?>");
		
		writer.print("<svg");
		writer.print(" xmlns:dc='http://purl.org/dc/elements/1.1/'");
		writer.print(" xmlns:cc='http://creativecommons.org/ns#'");
		writer.print(" xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'");
		writer.print(" xmlns:svg='http://www.w3.org/2000/svg'");
		writer.print(" xmlns='http://www.w3.org/2000/svg'");
		writer.print(" xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'");
		writer.print(" xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'");
		writer.print(" id='season'");
		writer.print(" version='1.1'");
		writer.print(" width='100%'");
		
		try {
			ResultSet rs = Database.query("SELECT COUNT(*),MAX(arrow_count) FROM season_goals WHERE season_id = 1;");
			rs.next();
			int weeks = rs.getInt(1);
			int max_plan = rs.getInt(2);
			rs.close();
			writer.print(" viewBox='0 0 "+weeks*100+" "+max_plan+"'");
			
			writer.print(" preserveAspectRatio='xMidYMid meet'");
			writer.print(" height='100%'");
			writer.print(">");
			
			writer.print("<style>");
			
			writer.print(".border {fill:none;stroke:#00F;stroke-width:1;stroke-opacity:1}");
			
			writer.print(".plan {fill:#FFF;stroke:#000;stroke-opacity:1}");
			
			writer.print(".grid {fill:none;stroke:#000;stroke-opacity:1;stroke-dasharray: 10 5}");
			
			writer.print(".share {fill:#777}");
			writer.print(".share-shadow {fill:#000}");
			
			writer.print("</style>");
			
			writer.print("<g id='main'>");
			
			writer.print("<rect class='plan' height='100' width='2700' />");
			
			
			writer.print("<g id='data' transform='translate("+weeks/2+","+weeks/2+") scale(0.99)'>");
			
			writer.print("<rect class='border' height='100' width='2700' />");
			
			writer.println(getGrid(max_plan,weeks));
			
			rs = Database.query("SELECT * FROM season LEFT JOIN season_goals ON id = season_id WHERE season_id = 1 ORDER BY week ASC;");
			int i = 0;
			while(rs.next()){
				int count = rs.getInt("arrow_count");
				int share = rs.getInt("target_share");
				writer.print(getPlan(count,i));
				writer.print(getShare(count-share,i++));
			}
			rs.close();
		
			writer.print("</g>");
			
			writer.print("</g>");
			
			writer.print("</svg>");

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.addHeader("Content-Type", "image/svg+xml");
	}
	
	static public String getShare(double value, int column){
		String s = "<g transform='translate("+(column*100)+","+(-value)+")'>";
		s += "<rect class='share-shadow' x='5' y='0' height='20' width='100' />";
		s += "<rect class='share' y='-5' height='20' width='100' />";
		s += "</g>";
		return s;
	}
	
	static public String getGrid(int height, int columns){
		String s = "<g>";
		for(int i = 0; i < columns; i++){
			s += "<path class='grid' d='m "+100*i+",0 0,"+(-height)+"  ' />";
		}
		for(int i = height; i > 0; i -= height/10){
			s += "<path class='grid' d='m 0,"+(-i)+" "+(columns*100)+",0  ' />";
		}
		s += "</g>";
		return s;
	}
	
	static public String getPlan(double value, int column){
		String s = "<g transform='translate(0,"+(-value)+")'>";
		s += "<rect class='plan' x='"+(10+column*100)+"' height='"+value+"' width='80' />";
		s += "</g>";
		return s;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
