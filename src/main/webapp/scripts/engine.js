
var User = {
		email:"matheus.sss"
}

function processLogin(){
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

	var alright = false;
	xmlhttp.setRequestHeader("Content-type", "application/x-json");
	xmlhttp.setRequestHeader("Content-length", string.length);
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4){
		    if (xmlhttp.status == 201) {
		    	console.log("LOGGED.");
		    	alright = true;
		    }
		    else{
		    	if (xmlhttp.status == 200){
		    		console.log("ALREADY LOGGED.");
			    	alright = true;
		    	}
		    	else{
			    	console.log("ERROR.");
			    	alright = false;
		    	}
		    }
	    }
	}
	xmlhttp.send(string);
	return alright;
}
