package org.arkanos.aaa.api;

import java.io.IOException;
import java.sql.Blob;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aaa.controllers.Database;
import org.arkanos.aaa.controllers.HTTP;
import org.arkanos.aaa.controllers.Security;
import org.arkanos.aaa.data.Archer;

/**
 * Servlet implementation class Avatar
 */
@WebServlet("/avatar")
public class Avatar extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Avatar() {
        super();
        Database.initialize();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		byte[] content = null;
		if (Security.authenticateToken(request) != null) {
			try {
				ResultSet rs = Database.query("SELECT "+ Archer.FIELD_AVATAR +" FROM "+Archer.TABLE_NAME+" WHERE "+ Archer.FIELD_EMAIL +"= 'matheus.bt@gmail.com';");
				while(rs.next()){
					Blob b = rs.getBlob(Archer.FIELD_AVATAR);
					content = b.getBytes(1, (int) b.length());
				}
				rs.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		if(content != null){
			response.getOutputStream().write(content);
			HTTP.setUpImageHeaders(response, content.length);
		}
		else{
			response.getOutputStream().println("Oops.");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
