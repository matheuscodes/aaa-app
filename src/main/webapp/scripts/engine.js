
var User = {
	logged_in: false,
	processLogin: function(){
		var content = {};
		if(document.getElementById("email")){
			content['email'] = document.getElementById("email").value;
		}
		if(document.getElementById("password")){
			var password = document.getElementById("password").value;
			content['hashed_password'] = ""+CryptoJS.MD5(password);
		}
		
		var string = JSON.stringify(content);
		
		var xmlhttp = new XMLHttpRequest();
		var url = "/login";
		xmlhttp.open("POST", url, false);
	
		var user = this;
		xmlhttp.setRequestHeader("Content-type", "application/x-json");
		xmlhttp.setRequestHeader("Content-length", string.length);
		xmlhttp.setRequestHeader("Connection", "close");
		xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState == 4){
			    if (xmlhttp.status == 201) {
			    	console.log("LOGGED.");
			    	user.logged_in = true;
			    }
			    else{
			    	if (xmlhttp.status == 200){
			    		console.log("ALREADY LOGGED.");
			    		user.logged_in = true;
			    	}
			    	else{
				    	console.log("ERROR.");
				    	user.logged_in = false;
			    	}
			    }
		    }
		}
		xmlhttp.send(string);
		return this.isLoggedIn();
	},
	
	isLoggedIn: function(){
		return this.logged_in;
	},
	
	setLanguage: function(code){
		this.language = code;
	},
	
	getLanguage: function(){
		return this.language;
	}
}

var Text = {
	language_code: "__",
	language_name: "unloaded",
	language_all: {},
	loaded: false,

	loadLanguage: function(code){
		if(this.language_code != code){
			var caller = this;
			caller.loaded = false;
			
			var xmlhttp = new XMLHttpRequest();
			var url = "/languages/"+code+"/";
			xmlhttp.open("GET", url, false);
			xmlhttp.onreadystatechange = function() {
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				    var download = JSON.parse(xmlhttp.responseText);
				    for(field in download){
				    	caller[field] = download[field];
				    }
				    caller.loaded = true;
			    }
			}
			xmlhttp.send();
		}
	},
	
	isLoaded: function(){
		return this.loaded;
	},

	allLanguages: function(){
		return this.language_all;
	},
	
	getLanguageCode: function(){
		return this.language_code;
	}
} 
