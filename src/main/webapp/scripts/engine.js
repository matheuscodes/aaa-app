
function processLogin(){
	var content = {};
	content['email'] = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	content['hashed_password'] = ""+CryptoJS.MD5(password);
	
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
		    	console.log("OK: "+xmlhttp.responseText);
		    	alright = true;
		    }
		    else{
		    	console.log("ERROR.");
		    	alright = false;
		    }
	    }
	}
	xmlhttp.send(string);
	return alright;
}
