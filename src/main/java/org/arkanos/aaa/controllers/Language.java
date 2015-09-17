package org.arkanos.aaa.controllers;

import java.util.HashMap;

import org.arkanos.aaa.languages.Base;
import org.arkanos.aaa.languages.English;
import org.arkanos.aaa.languages.German;

public class Language {

    static final HashMap<String, Base> translations = new HashMap<String, Base>();
    static final HashMap<String, String> infos = new HashMap<String, String>();
    static final Base master = new Base();

    static public String getAllLanguagesJSON() {
	String s = "{";
	for (String f : infos.keySet()) {
	    s += "\"" + f + "\":" + infos.get(f) + ",";
	}
	s = s.substring(0, s.length() - 1);
	s += "}";
	return s;
    }

    static public String getLanguageJSON(String code) {
	String s = "{";
	s += "\"language_all\":" + getAllLanguagesJSON() + ",";
	Base language = translations.get(code);
	s += "\"language_name\":\"" + language.getName() + "\",";
	s += "\"language_code\":\"" + language.getCode() + "\",";
	s += language.stringify();
	s += "}";
	return s;
    }

    static public void initializeLanguages() {
	if (translations.isEmpty()) {
	    addLanguage(new English());
	    addLanguage(new German());
	}
    }

    static private void addLanguage(Base b) {
	if (verifyLanguage(b.getCode(), b, master)) {
	    translations.put(b.getCode(), b);
	    infos.put(b.getCode(), b.getInfo());
	}
    }

    static public boolean verifyLanguage(String language, Base content, Base master) {
	boolean failed = false;
	for (String s : master.keySet()) {
	    if (content.get(s) == null) {
		if (!failed) {
		    Log.error("Language", "Will not load [" + language + "] due to missing entries.");
		}
		Log.error("Language", "[" + language + "]: Missing " + s + " - " + master.get(s) + ".");
		failed = true;
	    }
	}
	for (String s : content.keySet()) {
	    if (master.get(s) == null) {
		if (!failed) {
		    Log.error("Language", "Will not load [" + language + "] due to extra entries.");
		}
		Log.error("Language", "[" + language + "]: Extra " + s + " which not present in the master.");
		failed = true;
	    }
	}
	return !failed;
    }

    static public void initializeMaster() {

    }

}
