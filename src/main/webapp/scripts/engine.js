var API = {
	postTraining: function(string,type){
		var xmlhttp = new XMLHttpRequest();
		var url = "/trainings";
		xmlhttp.open("POST", url, true);
	
		xmlhttp.setRequestHeader("Content-type", "application/x-json");
		xmlhttp.setRequestHeader("Content-length", string.length);
		xmlhttp.setRequestHeader("Connection", "close");
		xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState == 4){
				if(xmlhttp.status == 201){
					console.log("SAVED TRAINING.");
					if(type == "training") User.discardTrainingDraft();
					if(type == "gauge") User.discardGaugeDraft();
				}
				else{
			    	console.log("TRAINING NOT SAVED. "+xmlhttp.status);
			    }
			}
		}
		xmlhttp.send(string);
	}
}


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
	},
	
	getTrainingDraft: function(){
		return this.training_draft;
	},
	
	discardTrainingDraft: function(){
		if(this.training_draft) delete this.training_draft;
	},
	
	pushTrainingDraft: function(distance,type,count){
		if(!this.training_draft) this.training_draft = {type:"training"};
		if(!this.training_draft[""+type]) this.training_draft[""+type] = {};
		this.training_draft[""+type][""+distance] = count;
	},
	
	getGaugeDraft: function(){
		return this.gauge_draft;
	},
	
	pushGaugeDraft: function(arrows){
		if(!this.gauge_draft) this.gauge_draft = {ends:[],type:"gauge"};
		this.gauge_draft.ends.push(arrows);
	},
	
	setGaugeDraft: function(date,distance,target){
		if(!this.gauge_draft) this.gauge_draft = {ends:[],type:"gauge"};
		this.gauge_draft.date = date;
		this.gauge_draft.distance = distance;
		this.gauge_draft.target = target;;
	},
	
	discardGaugeDraft: function(){
		if(this.gauge_draft) delete this.gauge_draft;
	}
}

var Text = {
	language_code: "__",
	language_name: "unloaded",
	language_all: {},
	loaded: false,
	targets: [],
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
			
			//TODO think whether this stays here or move somewhere as "constant"
			this.targets.push("FITA 40cm");
			this.targets.push("FITA 60cm");
			this.targets.push("FITA 80cm");
			this.targets.push("FITA 80cm Centre");
			this.targets.push("FITA 80cm 6-Ring");
			this.targets.push("FITA 122cm");
			this.targets.push("FITA 3x20cm Vertical");
			this.targets.push("FITA 3x20cm Las Vegas");
			this.targets.push("Field 3x20cm");
			this.targets.push("Field 40cm");
			this.targets.push("Field 60cm");
			this.targets.push("Field 80cm");
			
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