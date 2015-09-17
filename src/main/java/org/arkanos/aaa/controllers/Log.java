package org.arkanos.aaa.controllers;

import java.util.Date;

/**
 * Controls the logging.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 */
public class Log {

    /**
     * Logs an entry as an error.
     * 
     * @param who
     *            should define the class calling.
     * @param what
     *            specifies a message to record.
     */
    static public void error(String who, String what) {
	System.out.println("[ERROR] " + new Date(System.currentTimeMillis()) + " - " + who + ": " + what);
    }

}