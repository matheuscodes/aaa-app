'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.equipment = exports.events = exports.assessments = exports.seasons = exports.default = undefined;

exports.seasons = require('api/Seasons');
exports.assessments = require('api/Assessments');
exports.events = require('api/Events');
exports.equipment = require('api/Equipment');

var API = {
	//TODO modularize this shit ;) (all API)
	//TODO break this call into smaller blocks (multiple downloads)
	Reports: {
		getHomescreen: function(report,builder){
			var xmlhttp = new XMLHttpRequest();
			var url = "/reports/homescreen/";

			xmlhttp.onreadystatechange = function() {
			    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			    	var download = JSON.parse(xmlhttp.responseText);
			        builder(download[report]);
			    }
			}

			xmlhttp.open("GET", url, true); //Review the way downloads are made.
			xmlhttp.send();
		}
	},

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
	},

	getCompleteReport: function(month,year){
		var xmlhttp = new XMLHttpRequest();
		var url = "/reports/monthly/"+year;
		if(month > 8){
			url += "/"+(month+1);
		}
		else{
			url += "/0"+(month+1);
		}

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		    	var download = JSON.parse(xmlhttp.responseText);
		        PerformancePage.buildMonthlyReport(download);
		    }
		}

		xmlhttp.open("GET", url, true); //Review the way downloads are made.
		xmlhttp.send();
	},

	placeSeason: function(season,success){
		var xmlhttp = new XMLHttpRequest();
		var url = "/seasons/";

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4) {
		    	if(xmlhttp.status == 201){
			    	var download = JSON.parse(""+xmlhttp.responseText);
			    	//FIXME super lazy fix with double download, please redo.
			    	success(API.getSeasons(download.id));
		    	}
		    	if(xmlhttp.status == 204){
			    	//FIXME super lazy fix with double download, please redo.
			    	success(API.getSeasons(season.id));
		    	}
		    }
		}
		if(season.id){
			url += season.id+"/";
			console.log(url);
			xmlhttp.open("PUT", url, true);
		}
		else{
			xmlhttp.open("POST", url, true);
		}
		xmlhttp.send(JSON.stringify(season));
	},

	deleteSeason: function(id,success){
		var xmlhttp = new XMLHttpRequest();
		var url = "/seasons/"+id+"/";

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
				console.log("Deleted "+id);
				success();
		    }
		}

		xmlhttp.open("DELETE", url, true);
		xmlhttp.send();
	},

	getEvents: function(){
		//TODO review blocking requests.
		//TODO use callbacks.
		var xmlhttp = new XMLHttpRequest();
		var url = "/events/";

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		    	var download = JSON.parse(""+xmlhttp.responseText);
		    	if(download){
		    		User.events = download;
		    	}
		    }
		}

		xmlhttp.open("GET", url, false); //Review the way downloads are made.
		xmlhttp.send();
		return User.events;
	},

	addEvent: function(event,success){
		var xmlhttp = new XMLHttpRequest();
		var url = "/events/";

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 201) {
		    	success(event);
		    }
		}

		xmlhttp.open("POST", url, true); //Review the way downloads are made.
		xmlhttp.send(JSON.stringify(event));
	},

	deleteEvent: function(date,name_short,success){
		var xmlhttp = new XMLHttpRequest();
		var url = "/events/"+date+"/"+name_short+"/";

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
				success();
		    }
		}
		xmlhttp.open("DELETE", url, true); //Review the way downloads are made.
		xmlhttp.send();
	},

	getTasks: function(){
		//TODO review blocking requests.
		//TODO use callbacks.
		var xmlhttp = new XMLHttpRequest();
		var url = "/tasks/";

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		    	var download = JSON.parse(""+xmlhttp.responseText);
		    	if(download){
		    		User.tasks = download;
		    	}
		    }
		}

		xmlhttp.open("GET", url, false); //Review the way downloads are made.
		xmlhttp.send();
		return User.tasks;
	},

	addTask: function(task,success){
		var xmlhttp = new XMLHttpRequest();
		var url = "/tasks/";

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 201) {
		    	var download = JSON.parse(""+xmlhttp.responseText);
				success(download);
		    }
		}

		xmlhttp.open("POST", url, false); //Review the way downloads are made.
		xmlhttp.send(JSON.stringify(task));
	},

	deleteTask: function(id,success){
		var xmlhttp = new XMLHttpRequest();
		var url = "/tasks/"+id;

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
				success();
		    }
		}
		xmlhttp.open("DELETE", url, true); //Review the way downloads are made.
		xmlhttp.send();
	},

	closeTasks: function(ids,success){
		for(var i = 0; i < ids.length; i++){
			var xmlhttp = new XMLHttpRequest();
			var url = "/tasks/"+ids[i];

			xmlhttp.onreadystatechange = function() {
			    if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
					success(ids[i]);
			    }
			}

			xmlhttp.open("PUT", url, false); //Review the way downloads are made.
			xmlhttp.send('{"status":"done"}');
		}
	},

	getStrengthTrainings: function(){
		var xmlhttp = new XMLHttpRequest();
		var url = "/strengths/";

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		    	var download = JSON.parse(""+xmlhttp.responseText);
		    	if(download){
		    		User.strength_trainings = download;
		    	}
		    }
		}

		xmlhttp.open("GET", url, false); //Review the way downloads are made.
		xmlhttp.send();
		return User.strength_trainings;
	},

	toggleStrengthTraining: function(date,success){
		var xmlhttp = new XMLHttpRequest();
		var url = "/strengths/"+date+"/";


		if(!User.strength_trainings[date]){
			xmlhttp.open("POST", url, true); //Review the way downloads are made.
			xmlhttp.onreadystatechange = function() {
			    if (xmlhttp.readyState == 4 && xmlhttp.status == 201) {
			    	User.strength_trainings[date] = true;
					success();
			    }
			}
		}
		else{
			xmlhttp.open("DELETE", url, true); //Review the way downloads are made.
			xmlhttp.onreadystatechange = function() {
			    if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
					delete User.strength_trainings[date];
					success();
			    }
			}
		}

		xmlhttp.send();
	},

	getItems: function(id){
		//TODO review blocking requests.
		//TODO use callbacks.
		var xmlhttp = new XMLHttpRequest();
		var url = "/inventory/";

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		    	var download = JSON.parse(""+xmlhttp.responseText);
		    	if(download){
		    		User.items = download;
		    	}
		    }
		}

		xmlhttp.open("GET", url, false); //Review the way downloads are made.
		xmlhttp.send();
		if(id){
			return User.items[id];
		}
		else{
			return User.items;
		}
	},

	placeItem: function(bow,success){
		var xmlhttp = new XMLHttpRequest();
		var url = "/inventory/";

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4) {
		    	if(xmlhttp.status == 201){
			    	console.log("Added " + bow)
			    	var download = JSON.parse(""+xmlhttp.responseText);
			    	bow.id = download.id;
			    	success(bow);
		    	}
		    	if(xmlhttp.status == 204){
			    	console.log("Updated " + bow)
			    	success(bow);
		    	}
		    }
		}
		if(bow.id){
			url += bow.id+"/";
			xmlhttp.open("PUT", url, true);
		}
		else{
			xmlhttp.open("POST", url, true);
		}
		xmlhttp.send(JSON.stringify(bow));
	},

	deleteItem: function(id,success){
		var xmlhttp = new XMLHttpRequest();
		var url = "/inventory/"+id+"/";

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
				console.log("Deleted "+id);
				success(id);
		    }
		}

		xmlhttp.open("DELETE", url, true);
		xmlhttp.send();
	}
}


var User = {
	logged_in: false,
	processLogin: function(callback){
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
				var download = JSON.parse(""+xmlhttp.responseText);
			    if (xmlhttp.status == 201) {
			    	console.log("LOGGED.");
			    	User.logged_in = true;
			    	User.email = download.email;
			    	callback();
			    }
			    else{
			    	if (xmlhttp.status == 200){
			    		console.log("ALREADY LOGGED.");
			    		User.logged_in = true;
				    	User.email = download.email;
				    	callback();
			    	}
			    	else{
				    	console.log("ERROR.");
				    	User.logged_in = false;
				    	alert("Error!");
			    	}
			    }
		    }
		}
		xmlhttp.send(string);
		return this.isLoggedIn();
	},

	processLogout: function(callback){
		var xmlhttp = new XMLHttpRequest();
		var url = "/logout";
		xmlhttp.open("POST", url, false);

		xmlhttp.setRequestHeader("Connection", "close");
		xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				callback();
		    }
		}
		xmlhttp.send();
		return;
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
		this.gauge_draft.target = target;
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
			var url = "/languages/"+code+"";
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
