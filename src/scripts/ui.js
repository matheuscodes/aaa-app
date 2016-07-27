//TODO study a way to call this properly via event.
var makeFreakingMDLwork = function() {
  "classList" in document.createElement("div") && "querySelector" in document && "addEventListener" in window && Array.prototype.forEach ? (document.documentElement.classList.add("mdl-js"), componentHandler.upgradeAllRegistered()) : componentHandler.upgradeElement = componentHandler.register = function() {}
}

var Application = {
	loadUserData: function(){
		$("#aaa_sidebar_header_avatar").html("<img id='aaa_avatar' src='/avatar' />");
		$("#aaa_sidebar_header_email").html(User['email']);
		makeFreakingMDLwork();
		$("#aaa_header_logout").fadeIn(3000);
		$(".mdl-layout__drawer-button").fadeIn(3000);
	},

	unloadUserData: function(){
		makeFreakingMDLwork();
		$("#aaa_header_logout").fadeOut(1000);
		$(".mdl-layout__drawer-button").fadeOut(1000);
	},

	destroyCurrentPage: function(next,loader,afterall){
		$("#aaa_content").hide("slide", { direction: "right"}, 1000,function(){
			var html = loader();
			$("#aaa_content").hide(); //TODO remove this
			$("#aaa_content").html(html);
			makeFreakingMDLwork();
			$("#aaa_content").show("slide", { direction: "left" }, 1000);
			if(afterall) afterall();
		});
		$("#aaa_drawer").removeClass("is-visible");
		$("#aaa_header_title").fadeOut(1000,function(){
			$("#aaa_header_title").html(next);
			$("#aaa_header_title").fadeIn(1000);
		});
	},

	buildApplication: function(){
		Application.initializeApplication();

		var html = "";
		// Always shows a header, even in smaller screens. -->
		html += "";
		html += "";
		html += "HTML.getHeader('')";
		html += "";
		html += "HTML.getDrawerMenu()";
		html += "";
		html += "";
		html += "";
		html += "";
		html += "HTML.getFooter()";
		html += "";
		document.body.innerHTML = html;
		//$("#aaa_content").hide();

		if(User.isLoggedIn()){
			Application.loadUserData();
			HomePage.buildHomePage();
		}
		else{
			LoginPage.buildLoginPage();
		}
	},

	initializeApplication: function(){
		var browser_language =  navigator.userLanguage || navigator.languages[0];
		User.processLogin();
		var language = browser_language;
		if(localStorage.getItem("aaa-last-language")){
			language = localStorage.getItem("aaa-last-language");
		}
		if(User.getLanguage()){
			language = User.getLanguage();
		}

		Text.loadLanguage(language.substring(0,2));

		window.onbeforeunload = function(){
			if(User.getLanguage()){
				localStorage.setItem("aaa-last-language",User.getLanguage());
			}
		}
	},

	swapLanguage: function(code){
		User.setLanguage(code);
		location.reload();
	}
}

var LoginPage = {
	doLogin: function(){
		User.processLogin(function(){
			Application.loadUserData();
			HomePage.buildHomePage();
		});
	},

	doLogout: function(){
		User.processLogout(function(){
			LoginPage.buildLoginPage();
			Application.unloadUserData();
		});
	},

	buildLoginPage: function(){
		Application.destroyCurrentPage("Arkanos Advanced Archery",LoginPage.HTML.getLoginCard);
	},

	HTML: {
		getLoginCard: function(){
			var html = "";
			html += "";
			html +=  "";
			html += "";
			html += "";

			html += "";

			html += "";

			html += "";
			html += "";
			html += "";
			html += "";
			html += "";

			html += "";
			html += "";
			html += "";
			html += "";

			html += "";

			html += "";
			html += "";
			html += "";
			html += "";

			html += ""; //TODO fix that it is too low.


			html += "";
			html += "";
			html += "";
			html += "";
			html += "";


			html += "";
			html += "";

			return html;
		}
	}
}

var TrainingsPage = {
	buildTrainingsPage: function(){
		Application.destroyCurrentPage(Text['manage_trainings'],TrainingsPage.getTrainingsPage);
	},
	getTrainingsPage: function(){
		var html = "<div class='mdl-cell--12-col'>";
		html += "<button id='aaa_new_training' onClick='TrainingsPage.openTraining();' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>";
		html += "<i class='material-icons'>add gps_off</i>";
		html += "</button>";

		html += "<div class='mdl-tooltip' for='aaa_new_training'>"+Text['add_new_training']+"</div>";

		html += "<button id='aaa_new_gauge' onClick='TrainingsPage.openGauge();' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>";
		html += "<i class='material-icons'>add gps_fixed</i>";
		html += "</button>";

		html += "<div class='mdl-tooltip' for='aaa_new_gauge'>"+Text['add_new_gauge']+"</div>";

		html += "</div>";

		html += "<div id='aaa_training_page_content' class='mdl-grid mdl-cell--12-col'></div>";

		return html;
	},

	addTraining: function(){
		var caller = this; //TODO fix  the problem with date being overwritten all the time.
		var type = $("#aaa_training_options input[type='radio']:checked").val();
		var count = $("#aaa_training_arrow_count").val();
		var distance = $("#aaa_training_distance").val();
		if(count.length > 0 && distance.length > 0){
			User.pushTrainingDraft(distance,type,count);
			$("#aaa_training_content").fadeOut(1000,function(){
				$("#aaa_training_content").html(caller.HTML.getTrainingDraft());
				makeFreakingMDLwork();
				$("#aaa_training_content").fadeIn(1000);
			});
		}
	},

	closeEnd: function(){
		var arrows = []
		$( "#aaa_gauge_end" ).children().each(function( index ) {
		  arrows.push($( this ).text());
		});
		if(arrows.length > 0){
			User.pushGaugeDraft(arrows);
			//TODO block user input during transition, otherwise... shit will happen.
			$( "#aaa_gauge_ends" ).fadeOut(500,function(){
				$("#aaa_gauge_ends").html(TrainingsPage.HTML.getGaugeEnds(User.getGaugeDraft().ends));
				makeFreakingMDLwork();
				$("#aaa_gauge_ends").fadeIn(500);
			});
			$( "#aaa_gauge_end" ).fadeOut(500,function(){
				$("#aaa_gauge_end").html("");
				$("#aaa_gauge_end").show();
				makeFreakingMDLwork();
			});
		}
		else{
			//TODO tell the user it is empty
		}
	},

	addArrow: function(i){
		$("#aaa_gauge_end").append("<div>"+i+"</div>");
		$("#aaa_gauge_end :last-child").addClass("aaa-arrow-input");
		$("#aaa_gauge_end :last-child").addClass("aaa-arrow-end");
		switch(i){
			case 1:
			case 2: $("#aaa_gauge_end :last-child").addClass("mdl-color--white");
					break;
			case 3:
			case 4: $("#aaa_gauge_end :last-child").addClass("mdl-color--black");
					$("#aaa_gauge_end :last-child").addClass("mdl-color-text--white");
					break;
			case 5:
			case 6: $("#aaa_gauge_end :last-child").addClass("mdl-color--blue-400");
					break;
			case 7:
			case 8: $("#aaa_gauge_end :last-child").addClass("mdl-color--red-400");
					break;
			case 9:
			case 10: $("#aaa_gauge_end :last-child").addClass("mdl-color--yellow-400");
					break;
		}
	},

	removeArrow: function(){
		$("#aaa_gauge_end :last-child").fadeOut(500,function(){
			$("#aaa_gauge_end :last-child").remove();
		});
	},


	//TODO unify both methods
	openGauge: function(){
		//TODO improve display and scales of this... not very optimal ATM. Looks bad.
		var caller = this;
		$("#aaa_new_gauge").attr('disabled','disabled');
		$("#aaa_training_page_content").hide("slide", { direction: "right" }, 1000, function(){
			$("#aaa_training_page_content").html(caller.HTML.getGaugeCard());
			makeFreakingMDLwork();
			$("#aaa_training_page_content").show("slide", { direction: "left" }, 1000);
			$("#aaa_new_training").removeAttr('disabled');
			$(".mdl-tooltip").each(function(i){$(this).removeClass("is-active");});//TODO fix this better
		});
	},

	openTraining: function(){
		var caller = this;
		$("#aaa_new_training").attr('disabled','disabled');
		$("#aaa_training_page_content").hide("slide", { direction: "right" }, 1000, function(){
			$("#aaa_training_page_content").html(caller.HTML.getTrainingCard());
			makeFreakingMDLwork();
			$("#aaa_training_page_content").show("slide", { direction: "left" }, 1000);
			$("#aaa_new_gauge").removeAttr('disabled');
			$(".mdl-tooltip").each(function(i){$(this).removeClass("is-active")});
		});
	},

	submitGauge: function(){
		if($("#aaa_gauge_date").parent().hasClass("is-invalid") || $("#aaa_gauge_date").val().length == 0 ||
				$("#aaa_gauge_distance").parent().hasClass("is-invalid") || $("#aaa_gauge_distance").val().length == 0){
			//TODO hint the user about missing/invalid date or distance.
		}
		else{
			if(User.getGaugeDraft()){
				var date = $("#aaa_gauge_date").val();
				var distance = $("#aaa_gauge_distance").val();
				var target = $("#aaa_gauge_targets input[type='radio']:checked").val();
				User.setGaugeDraft(date,distance,target);
				var json = User.getGaugeDraft();
				console.log(JSON.stringify(json));
				API.postTraining(JSON.stringify(json),json.type);
				$("#aaa_gauge_card").parent().hide("slide", { direction: "right",
							complete: function(){
								$("#aaa_new_gauge").removeAttr('disabled');
							}
						}, 1000);
			}
			else{
				//TODO hint the user about nothing to add.
			}
		}
	},

	discardGauge: function(){
		User.discardGaugeDraft();

		$("#aaa_gauge_card").parent().hide("slide", { direction: "right" }, 1000);

		$("#aaa_new_gauge").removeAttr('disabled');

	},

	submitTraining: function(){
		if($("#aaa_training_date").parent().hasClass("is-invalid") || $("#aaa_training_date").val().length == 0){
			//TODO hint the user about missing/invalid date.
		}
		else{
			if(User.getTrainingDraft()){
				var json = User.getTrainingDraft();
				json.date = $("#aaa_training_date").val();
				console.log(JSON.stringify(json));
				API.postTraining(JSON.stringify(json),json.type);
				$("#aaa_training_card").parent().hide("slide", { direction: "right",
							complete: function(){
								$("#aaa_new_training").removeAttr('disabled');
							}
						}, 1000);
			}
			else{
				//TODO hint the user about nothing to add.
			}
		}
	},

	discardTraining: function(){
		User.discardTrainingDraft();

		$("#aaa_training_card").parent().hide("slide", { direction: "right" }, 1000);

		$("#aaa_new_training").removeAttr('disabled');

	},

	HTML: {
		getTrainingCard: function(){
			var html = "<div class='mdl-layout-spacer'></div>";
			html += "<div id='aaa_training_card' class='mdl-cell mdl-cell--4-col'>";
			html += "<div class='mdl-card mdl-shadow--2dp'>";
			html += "<div class='mdl-card__title'>";
			html += "<h1 class='mdl-card__title-text'>"+Text['add_new_training']+"</h1>";
			html += "</div>";


			html += "<form onsubmit='return false'>";
			html += "<div class='mdl-card__supporting-text mdl-grid'>";


			var now = new Date().toJSON().substring(0,10);
			html += "<div class='mdl-cell mdl-cell--4-col mdl-cell--2-col-phone'>";
			html += "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
			html += "<input class='mdl-textfield__input' type='text' pattern='[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])' id='aaa_training_date' value='"+now+"'/>";
			html += "<label class='mdl-textfield__label' for='aaa_training_date'>"+Text['date']+"</label>";
			html += "<span class='mdl-textfield__error'>"+Text['not_a_date']+"</span>";
			html += "</div>";
			html += "</div>";

			html += "<div class='mdl-cell mdl-cell--1-col'></div>";

			html += "<div class='mdl-cell mdl-cell--4-col mdl-cell--2-col-phone'>";
			html += "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
			html += "<input class='mdl-textfield__input' type='text' pattern='^[0-9]+$' id='aaa_training_arrow_count' />";
			html += "<label class='mdl-textfield__label' for='aaa_training_arrow_count'>"+Text['arrow_count']+"</label>";
			html += "<span class='mdl-textfield__error'>"+Text['not_an_integer']+"</span>";
			html += "</div>";
			html += "</div>";

			html += "<div class='mdl-cell mdl-cell--4-col mdl-cell--2-col-phone'>";
			html += "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
			html += "<input class='mdl-textfield__input' type='text' pattern='-?[0-9]*(\.[0-9]+)?' id='aaa_training_distance' />";
			html += "<label class='mdl-textfield__label' for='aaa_training_distance'>"+Text['distance']+"</label>";
			html += "<span class='mdl-textfield__error'>"+Text['not_a_number']+"</span>";
			html += "</div>";
			html += "</div>";

			html += "<div id='aaa_training_options' class='mdl-cell mdl-cell--11-col mdl-cell--7-col-tablet mdl-cell--3-col-phone'>";

			html += "<label class='mdl-radio mdl-js-radio mdl-js-ripple-effect' for='aaa_option_1'>";
			html += "<input type='radio' id='aaa_option_1' class='mdl-radio__button' name='options' value='warmup' checked />";
			html += "<span class='mdl-radio__label'>"+Text['warmup']+"</span>";
			html += "</label>";

			html += "<label class='mdl-radio mdl-js-radio mdl-js-ripple-effect' for='aaa_option_2'>";
			html += "<input type='radio' id='aaa_option_2' class='mdl-radio__button' name='options' value='target' />";
			html += "<span class='mdl-radio__label'>"+Text['target']+"</span>";
			html += "</label>";

			html += "<label class='mdl-radio mdl-js-radio mdl-js-ripple-effect' for='aaa_option_3'>";
			html += "<input type='radio' id='aaa_option_3' class='mdl-radio__button' name='options' value='board' />";
			html += "<span class='mdl-radio__label'>"+Text['board']+"</span>";
			html += "</label>";

			html += "<label class='mdl-radio mdl-js-radio mdl-js-ripple-effect' for='aaa_option_4'>";
			html += "<input type='radio' id='aaa_option_4' class='mdl-radio__button' name='options' value='warmout' />";
			html += "<span class='mdl-radio__label'>"+Text['warmout']+"</span>";
			html += "</label>";

			html += "</div>";

			html += "<button id='aaa_add_training' onClick='TrainingsPage.addTraining();' class='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-cell mdl-cell--2-col'>";
			html += "<i class='material-icons'>add</i>";
			html += "</button>";

			html += "<div class='mdl-tooltip' for='aaa_add_training'>"+Text['add_training']+"</div>";


			html += "</div>";

			html += "</form>";

			html += "<div id='aaa_training_content' class='mdl-card__actions mdl-card--border'>";

			html += TrainingsPage.HTML.getTrainingDraft();

			html += "</div>";


			html += "<div class='mdl-card__menu'>";
			html += "<button id='aaa_upload_training' onClick='TrainingsPage.submitTraining();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>";
			html += "<i class='material-icons'>backup</i>";
			html += "</button>";

			html += "<div class='mdl-tooltip' for='aaa_upload_training'>"+Text['upload_training']+"</div>";

			html += "<button id='aaa_discard_training' onClick='TrainingsPage.discardTraining();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>";
			html += "<i class='material-icons'>delete</i>";
			html += "</button>";

			html += "<div class='mdl-tooltip' for='aaa_discard_training'>"+Text['discard_training']+"</div>";

			html += "</div>";

			html += "</div>";

			html += "</div>";

			html += "<div class='mdl-layout-spacer'></div>";

			return html;
		},

		getGaugeCard: function(){
			var html = "<div class='mdl-layout-spacer'></div>";
			html += "<div id='aaa_gauge_card' class='mdl-cell mdl-cell--8-col'>";
			html += "<div class='mdl-card mdl-shadow--2dp'>";
			html += "<div class='mdl-card__title'>";
			html += "<h1 class='mdl-card__title-text'>"+Text['add_new_gauge']+"</h1>";
			html += "</div>";
			html += "<div id='aaa_gauge_content' class='mdl-card__supporting-text mdl-grid'>";

			html += TrainingsPage.HTML.getGaugeDraft();

			html += "<div class='mdl-cell mdl-cell--12-col'>";

			html += "<form onsubmit='return false'>";

			html += "<div class='mdl-grid'>";

			html += "<div id='aaa_gauge_end' class='aaa-arrows'></div>";

			html += "<button id='aaa_close_end' onClick='TrainingsPage.closeEnd();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--colored'>";
			html += "<i class='material-icons'>done</i>";
			html += "</button>";
			html += "<div class='mdl-tooltip' for='aaa_close_end'>"+Text['add_close_end']+"</div>";

			html += "<div class='aaa-arrows'>";

			for(var i = 0; i <= 10; i++){
				html += "<button id='aaa_arrow_"+i+"' onClick='TrainingsPage.addArrow("+i+");' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect aaa-arrow-input'>";
				html += "<strong>"+i+"</strong>";
				html += "</button>";
			}

			html += "</div>";


			html += "<button id='aaa_remove_arrow' onClick='TrainingsPage.removeArrow();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--colored'>";
			html += "<i class='material-icons'>undo</i>";
			html += "</button>";

			html += "<div class='mdl-tooltip' for='aaa_remove_arrow'>"+Text['remove_end_arrow']+"</div>";


			html += "</form>";


			html += "</div>";

			html += "</div>";
			html += "<div class='mdl-card__actions mdl-card--border'>";

			html += "<div id='aaa_gauge_ends'>";
			if(User.getGaugeDraft()){
				html += TrainingsPage.HTML.getGaugeEnds(User.getGaugeDraft().ends);
			}
			html += "</div>";


			html += "</div>";

			html += "</div>";

			html += "<div class='mdl-card__menu'>";
			html += "<button id='aaa_upload_gauge' onClick='TrainingsPage.submitGauge();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>";
			html += "<i class='material-icons'>backup</i>";
			html += "</button>";

			html += "<div class='mdl-tooltip' for='aaa_upload_gauge'>"+Text['upload_gauge']+"</div>";

			html += "<button id='aaa_discard_gauge' onClick='TrainingsPage.discardGauge();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>";
			html += "<i class='material-icons'>delete</i>";
			html += "</button>";

			html += "<div class='mdl-tooltip' for='aaa_discard_gauge'>"+Text['discard_gauge']+"</div>";

			html += "</div>";

			html += "</div>";

			html += "</div>";

			html += "<div class='mdl-layout-spacer'></div>";

			return html;
		},

    getFooter: function(){
      var html =  "";
      html += "";
      html += "";
      html += "";
      html += "";
      html += "";
      html += "";
      html += "";

      html += "";

      html += "";
      html +=
      html += "";

      //TODO shorten this line
      html += "";

      html += "";

      for(language in Text.allLanguages()){
        html += "";
        html += " ";
        html += "";
        html += "";
        html += "";
      }

      html += "";

      html += "";
      return html;
    },

		getGaugeDraft: function(){
			var now = new Date().toJSON().substring(0,10);
			var html = "<div class='mdl-cell mdl-cell--2-col'>";
			//TODO rename training field class (Both cards use it)
			html += "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
			html += "<input class='mdl-textfield__input' type='text' pattern='[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])' id='aaa_gauge_date' value='"+now+"'/>";
			html += "<label class='mdl-textfield__label' for='aaa_gauge_date'>"+Text['date']+"</label>";
			html += "<span class='mdl-textfield__error'>"+Text['not_a_date']+"</span>";
			html += "</div>";
			html += "</div>";

			html += "<div class='mdl-cell mdl-cell--2-col'>";
			html += "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
			html += "<input class='mdl-textfield__input' type='text' pattern='-?[0-9]*(\.[0-9]+)?' id='aaa_gauge_distance' />";
			html += "<label class='mdl-textfield__label' for='aaa_gauge_distance'>"+Text['distance']+"</label>";
			html += "<span class='mdl-textfield__error'>"+Text['not_a_number']+"</span>";
			html += "</div>";
			html += "</div>";

			html += "<div id='aaa_gauge_targets' class='mdl-cell mdl-cell--8-col mdl-grid'>";

			for(var i = 0; i < Text['targets'].length;i++){
				html += "<label class='mdl-radio mdl-js-radio mdl-js-ripple-effect mdl-cell mdl-cell--2-col' for='aaa_option_"+i+"'>";
				html += "<input type='radio' id='aaa_option_"+i+"' class='mdl-radio__button' name='targets' value='"+Text['targets'][i]+"' checked />";
				html += "<span class='mdl-radio__label'>"+Text['targets'][i]+"</span>";
				html += "</label>";
			}

			html += "</div>";

			return html;
		},

		getGaugeEnds: function(ends){
			var html = "<div>";
			for(var i = ends.length-1; i >= 0; i--){
				html += "<br/><strong>"+Text['end']+" "+(i+1)+":</strong>";
				for(var j = 0; j < ends[i].length; j++){
					html += "<div class='aaa-arrow-input aaa-arrow-end ";
					var arrow = parseInt(ends[i][j]);
					switch(arrow){
						case 1:
						case 2: html += "mdl-color--white";
								break;
						case 3:
						case 4: html += "mdl-color--black";
								html += " mdl-color-text--white";
								break;
						case 5:
						case 6: html += "mdl-color--blue-400";
								break;
						case 7:
						case 8: html += "mdl-color--red-400";
								break;
						case 9:
						case 10: html += "mdl-color--yellow-400";
								break;
					}
					html += "'>"+arrow+"</div>";
				}
			}
			html += "</div>";
			return html;
		},

		getTrainingDraft: function(){
			var html = "<table><tr>";
			var columns = [];
			if(User.getTrainingDraft()){
				var draft = User.getTrainingDraft();
				for(type in draft){
					if(Text[type] && type != 'date'){
						html += "<td>";
						html += "<h2>"+Text[type]+"</h2>";
						for(distance in draft[type]){
							var number = parseInt(distance);
							if(number > 0){
								html+="<p><strong>"+distance+"m:</strong> "+draft[type][distance]+"</p>";
							}
						}
						html += "</td>";
					}
				}
			}
			html += "</tr></table>";
			return html;
		}
	}
}


var PerformancePage = {
	setMonth: function(month){
		PerformancePage.month = month;
		PerformancePage.updateReport();
	},

	setYear: function(year){
		PerformancePage.year = year;
		PerformancePage.updateReport();
	},

	updateReport: function(){
		$("#aaa_report_month").html(Text["month_full_"+PerformancePage.month]);
		$("#aaa_report_year").html(PerformancePage.year);
		API.getCompleteReport(PerformancePage.month,PerformancePage.year);
	},

	buildPerformancePage: function(){
		Application.destroyCurrentPage(Text['performance_history'],PerformancePage.getPerformancePage, PerformancePage.updateReport);
	},
	getPerformancePage: function(){
		//TODO fix fix transition bug
		var html = "<div id='aaa_full_report' class='mdl-grid'>";

		var now = new Date();
		if(!PerformancePage.month){
			PerformancePage.month = now.getMonth();
		}
		if(!PerformancePage.year){
			PerformancePage.year = 1900+now.getYear();
		}
		html += "<div id='aaa_report_selector'>";
		html += "<div class='mdl-layout-spacer'></div>";

		html += "<p id='aaa_report_month'>"+Text["month_full_"+PerformancePage.month]+"</p>";

		html+= "<button id='aaa_report_set_month' class='mdl-button mdl-js-button mdl-button--icon'>";
		html+= "<i class='material-icons'>expand_more</i>";
		html+= "</button>";

		html+= "<ul class='mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect' for='aaa_report_set_month'>";
		for(var i = 0; i < 12; i++){
			html+= "<li class='mdl-menu__item' onClick='PerformancePage.setMonth("+i+")'>"+Text["month_full_"+i]+"</li>";
		}
		html+= "</ul>";

		html += "<p id='aaa_report_year'>"+PerformancePage.year+"</p>";

		html+= "<button id='aaa_report_set_year' class='mdl-button mdl-js-button mdl-button--icon'>";
		html+= "<i class='material-icons'>expand_more</i>";
		html+= "</button>";

		html+= "<ul class='mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect' for='aaa_report_set_year'>";
		for(var i = now.getYear()+1900; i > now.getYear()+1900-10; i--){
			html+= "<li class='mdl-menu__item' onClick='PerformancePage.setYear("+i+")'>"+i+"</li>";
		}
		html+= "</ul>";
		html += "<div class='mdl-layout-spacer'></div>";
		html += "</div>";
		//TODO fix bug with ghost scroll bar when displaying the menu and closing.
		html += "<div id='aaa_report_content'></div>";
		html += "</div>";



		return html;
	},

	buildMonthlyReport: function(download){
		var current = new Date(download.start);
		var stop = new Date(download.end);
		var request = download.month;
		var week = download.week_start;
		current.setHours(1);
		stop.setHours(1);
		var html = "<h2>"+Text['statistics_title']+"</h2>";

		html += "<div id='aaa_report_viewport'>";

		html += "<div class='aaa-report-sidebar'>";
		html += "<div class='aaa-report-skip-header'></div>";
		html += "<div id='aaa_report_labels'>";

		html += "</div>";
		html += "</div>";

		while(current < stop){
			html += "<div class='aaa-report-week'>";

			html += "<div class='aaa-report-week-title'>"
			html += "<h3>"+week+"</h3><p>"+Text['week_number']+"</p>";
			html += "</div>";

			html += "<div class='aaa-report-days'>"
			for(var i = 0; i < 7;i++){
				html += "<div class='aaa-report-day aaa-report-header-day'>";
				html += current.getDate();
				html += "</div>";
				current.setDate(current.getDate() + 1);
			}
			html += "<div id='aaa_report_week_data_"+week+"'></div>";

			html += "</div>";

			html += "</div>";
			week++;
		}
		html += "</div>"
		$("#aaa_report_content").html(html);

		html = $("#aaa_report_labels").html();
		html += "<div id='aaa_report_warmup' class='aaa-report-label'>"
		html += "<p>"+Text['warmup']+"</p>";
		html += "</div>";
		$("#aaa_report_labels").html(html);

		current = new Date(download.start);
		stop = new Date(download.end);
		week = download.week_start;

		while(current < stop){
			html = $("#aaa_report_week_data_"+week).html();
			for(i = 0; i < 7;i++){
				html += "<div class='aaa-report-day aaa-report-end";
				if(i > 4) html += " aaa-report-weekend";
				if(current.getMonth() + 1 != download.month) html += " aaa-report-offtime";
				html += "'>";
				if(download.arrow_counts.warmup && download.arrow_counts.warmup[current.toJSON().substring(0,10)]){
					html += download.arrow_counts.warmup[current.toJSON().substring(0,10)];
				}
				else{
					html += " ";
				}
				html += "</div>";
				current.setDate(current.getDate() + 1);
			}
			$("#aaa_report_week_data_"+week).html(html);
			week++;
		}



		for(var distance in download.arrow_counts){
			if(!isNaN(distance)){
				html = $("#aaa_report_labels").html();
				html += "<div id='aaa_report_counts_"+distance+"' class='aaa-report-label'>"
				html += "</div>";
				$("#aaa_report_labels").html(html);
				var label = "";
				label += "<table cellspacing='0' cellpadding='0'><tr>"
				label += "<td class='aaa-report-text'><p>"+distance+" m</p></td>";
				label += "<td class='aaa-report-text'>";
				for(var type in download.arrow_counts[distance]){
					label += "<p>"+Text[type]+"</p>";
					current = new Date(download.start);
					week = download.week_start;
					while(current < stop){
						html = $("#aaa_report_week_data_"+week).html();
						for(i = 0; i < 7;i++){
							html += "<div class='aaa-report-day";
							if(i > 4) html += " aaa-report-weekend";
							if(current.getMonth() + 1 != download.month) html += " aaa-report-offtime";
							html += "'>";
							if(download.arrow_counts[distance][type][current.toJSON().substring(0,10)]){
								html += download.arrow_counts[distance][type][current.toJSON().substring(0,10)];
							}
							else{
								html += " ";
							}
							html += "</div>";
							current.setDate(current.getDate() + 1);
						}
						$("#aaa_report_week_data_"+week).html(html);
						week++;
					}
				}
				for(var i = download.week_start;i < download.week_end; i++){
					//TODO improve this with JQuery
					console.log('aaa_report_week_data_'+i);
					var element = document.getElementById('aaa_report_week_data_'+i).getElementsByClassName('aaa-report-day');
					var length = element.length;
					for(var j = 0; j < 7; j++){
						element[length-1-j]['className'] += " aaa-report-end";
					}
				}
				label += "</td>";
				label += "</table></tr>";
				$("#aaa_report_counts_"+distance).html(label);
			}
		}

		html = $("#aaa_report_labels").html();
		html += "<div id='aaa_report_warmout' class='aaa-report-label'>"
		html += "<p>"+Text['warmout']+"</p>";
		html += "</div>";
		$("#aaa_report_labels").html(html);
		current = new Date(download.start);
		week = download.week_start;
		while(current < stop){
			html = $("#aaa_report_week_data_"+week).html();
			for(i = 0; i < 7;i++){
				html += "<div class='aaa-report-day aaa-report-end";
				if(i > 4) html += " aaa-report-weekend";
				if(current.getMonth() + 1 != download.month) html += " aaa-report-offtime";
				html += "'>";
				if(download.arrow_counts.warmout && download.arrow_counts.warmout[current.toJSON().substring(0,10)]){
					html += download.arrow_counts.warmout[current.toJSON().substring(0,10)];
				}
				else{
					html += " ";
				}
				html += "</div>";
				current.setDate(current.getDate() + 1);
			}
			$("#aaa_report_week_data_"+week).html(html);
			week++;
		}

		html = $("#aaa_report_labels").html();
		html += "<div id='aaa_report_technique_totals' class='aaa-report-label'>"
		html += "<p>"+Text['technique_totals']+"</p>";
		html += "</div>";
		$("#aaa_report_labels").html(html);
		current = new Date(download.start);
		week = download.week_start;
		while(current < stop){
			//TODO improve this using .append() instead
			html = $("#aaa_report_week_data_"+week).html();
			for(i = 0; i < 7;i++){
				html += "<div class='aaa-report-day aaa-report-end aaa-report-subtotal";
				if(i > 4) html += " aaa-report-weekend";
				if(current.getMonth() + 1 != download.month) html += " aaa-report-offtime";
				html += "'>";
				if(download.arrow_counts.technique_totals[current.toJSON().substring(0,10)]){
					html += download.arrow_counts.technique_totals[current.toJSON().substring(0,10)];
				}
				else{
					html += " ";
				}
				html += "</div>";
				current.setDate(current.getDate() + 1);
			}
			$("#aaa_report_week_data_"+week).html(html);
			week++;
		}

		html = $("#aaa_report_labels").html();
		html += "<div id='aaa_report_totals' class='aaa-report-label'>"
		html += "<p>"+Text['totals']+"</p>";
		html += "</div>";
		$("#aaa_report_labels").html(html);
		current = new Date(download.start);
		week = download.week_start;
		while(current < stop){
			html = $("#aaa_report_week_data_"+week).html();
			for(i = 0; i < 7;i++){
				html += "<div class='aaa-report-day aaa-report-end";
				if(i > 4) html += " aaa-report-weekend";
				if(current.getMonth() + 1 != download.month) html += " aaa-report-offtime";
				html += " aaa-report-summary'>";
				if(download.arrow_counts.totals[current.toJSON().substring(0,10)]){
					html += download.arrow_counts.totals[current.toJSON().substring(0,10)];
				}
				else{
					html += " ";
				}
				html += "</div>";
				current.setDate(current.getDate() + 1);
			}
			$("#aaa_report_week_data_"+week).html(html);
			week++;
		}

		html = $("#aaa_report_labels").html();
		html += "<div id='aaa_report_weekly_technique' class='aaa-report-label'>"
		html += "<p>"+Text['weekly_technique']+"</p>";
		html += "</div>";
		$("#aaa_report_labels").html(html);
		for(week in download.weekly){
			html = $("#aaa_report_week_data_"+week).html();
			html += "<div class='aaa-report-week-summary aaa-report-end";
			html += " '>";
			if(download.weekly[week].total){
				html += download.weekly[week].technique_total;
			}
			/**Dummies not to break the CSS child rule**/
			html += "</div><div></div><div></div><div></div><div></div><div></div><div></div>";
			$("#aaa_report_week_data_"+week).html(html);
		}

		html = $("#aaa_report_labels").html();
		html += "<div id='aaa_report_weekly_technique' class='aaa-report-label'>"
		html += "<p>"+Text['weekly_total']+"</p>";
		html += "</div>";
		$("#aaa_report_labels").html(html);
		for(week in download.weekly){
			html = $("#aaa_report_week_data_"+week).html();
			html += "<div class='aaa-report-week-summary aaa-report-end";
			html += " '>";
			if(download.weekly[week].total){
				html += download.weekly[week].total;
			}
			/**Dummies not to break the CSS child rule**/
			html += "</div><div></div><div></div><div></div><div></div><div></div><div></div>";
			$("#aaa_report_week_data_"+week).html(html);
		}


		for(var distance in download.results){
			if(!isNaN(distance)){
				html = $("#aaa_report_labels").html();
				html += "<div id='aaa_report_results_"+distance+"' class='aaa-report-label'>"
				html += "</div>";
				$("#aaa_report_labels").html(html);
				var label = "";
				label += "<table cellspacing='0' cellpadding='0'><tr>"
				label += "<td class='aaa-report-text'><p>"+distance+" m</p></td>";
				label += "<td class='aaa-report-text'>";
				for(var classes in download.results[distance]){
					label += "<p class='aaa-report-classes'>"+classes+"</p>";
					for(var order in download.results[distance][classes]){
						if(order != 0){
							label += "<p class='aaa-report-individual-results'>"+Text['result']+" "+order+"</p>";
							current = new Date(download.start);
							week = download.week_start;
							while(current < stop){
								html = $("#aaa_report_week_data_"+week).html();
								for(i = 0; i < 7;i++){
									html += "<div class='aaa-report-day";
									if(i > 4) html += " aaa-report-weekend";
									if(current.getMonth() + 1 != download.month) html += " aaa-report-offtime";
									html += "'>";
									if(download.results[distance][classes][order][current.toJSON().substring(0,10)]){
										html += download.results[distance][classes][order][current.toJSON().substring(0,10)];
									}
									else{
										html += " ";
									}
									html += "</div>";
									current.setDate(current.getDate() + 1);
								}
								$("#aaa_report_week_data_"+week).html(html);
								week++;
							}
						}
					}

					label += "<p class='aaa-report-individual-inacurracy'> "+Text['average_inacurracy']+" </p>";

					current = new Date(download.start);
					week = download.week_start;
					while(current < stop){
						html = $("#aaa_report_week_data_"+week).html();
						for(i = 0; i < 7;i++){
							html += "<div class='aaa-report-day aaa-report-subtotal";
							if(i > 4) html += " aaa-report-weekend";
							if(current.getMonth() + 1 != download.month) html += " aaa-report-offtime";
							html += "'>";
							if(download.results[distance][classes][0][current.toJSON().substring(0,10)]){
								html += (10-download.results[distance][classes][0][current.toJSON().substring(0,10)]).toPrecision(3);
							}
							else{
								html += " ";
							}
							html += "</div>";
							current.setDate(current.getDate() + 1);
						}
						$("#aaa_report_week_data_"+week).html(html);
						week++;
					}

					for(var i = download.week_start;i < week; i++){
						//TODO improve this with JQuery
						var element = document.getElementById('aaa_report_week_data_'+i).getElementsByClassName('aaa-report-day');
						var length = element.length;
						for(j = 0; j < 7; j++){
							element[length-1-j]['className'] += " aaa-report-end";
						}
					}

				}
				for(var i = download.week_start;i < week; i++){
					var element = document.getElementById('aaa_report_week_data_'+i).getElementsByClassName('aaa-report-day');
					var length = element.length;
					for(j = 0; j < 7; j++){
						element[length-1-j]['className'] += " aaa-report-end";
					}
				}
				label += "</td>";
				label += "</table></tr>"
				$("#aaa_report_results_"+distance).html(label);
			}
		}

		html = $("#aaa_report_labels").html();
		html += "<div id='aaa_report_result_totals' class='aaa-report-label'>"
		html += "<p>"+Text['result_totals']+"</p>";
		html += "</div>";
		$("#aaa_report_labels").html(html);
		current = new Date(download.start);
		week = download.week_start;
		while(current < stop){
			html = $("#aaa_report_week_data_"+week).html();
			for(i = 0; i < 7;i++){
				html += "<div class='aaa-report-day aaa-report-end";
				if(i > 4) html += " aaa-report-weekend";
				if(current.getMonth() + 1 != download.month) html += " aaa-report-offtime";
				html += " aaa-report-summary'>";
				if(download.results.result_totals[current.toJSON().substring(0,10)]){
					html += (10-download.results.result_totals[current.toJSON().substring(0,10)]).toPrecision(3);
				}
				else{
					html += " ";
				}
				html += "</div>";
				current.setDate(current.getDate() + 1);
			}
			$("#aaa_report_week_data_"+week).html(html);
			week++;
		}

		html = $("#aaa_report_labels").html();
		html += "<div id='aaa_report_weekly_technique' class='aaa-report-label'>"
		html += "<p>"+Text['weekly_inacurracy']+"</p>";
		html += "</div>";
		$("#aaa_report_labels").html(html);
		for(week in download.weekly){
			html = $("#aaa_report_week_data_"+week).html();
			html += "<div class='aaa-report-week-summary aaa-report-end";
			html += " aaa-report-summary'>";
			if(download.weekly[week].result_total){
				html += (10-download.weekly[week].result_total).toPrecision(3);
			}
			html += "</div>";
			$("#aaa_report_week_data_"+week).html(html);
		}
		$("#aaa_report_content").append("<h2>"+Text['overview_title']+"</h2>");
		$("#aaa_report_content").append(SVG.getDailySeasonGraph(download));
		$("#aaa_report_content").append("<h2>"+Text['season_title']+"</h2>");
		console.log(download);
		for(season in download.seasons){
			$("#aaa_report_content").append(SVG.getSeasonGraph(download.seasons[season],"aaa_report_season_graph"));
		}

		$("#aaa_report_viewport").width($("#aaa_report_daily_graph").width());
		$("#aaa_content").show("slide", { direction: "left" }, 1000);
	}
}

var HomePage = {
	buildHomePage: function(){
		Application.destroyCurrentPage(Text['home'],HomePage.getHomePage);
	},
	getHomePage: function(){
		var html = "";

		html += "HomePage.HTML.getTotalArrowsCard()";
		html += "HomePage.HTML.getEventsCard()";
		html += "HomePage.HTML.getTasksCard()";
		html += "HomePage.HTML.getYearOverviewCard()";

		html += "";
		html += "";

		html += "HomePage.HTML.getValueDistributionCard()";
		html += "HomePage.HTML.getEndDistributionCard()";

		html += "";
		html += "";

		html += "HomePage.HTML.getSeasonsCard()";

		html += "";

		return html;
	},

	HTML: {
			getTotalArrowsCard: function(){
				var html = "";
				API.Reports.getHomescreen('arrows_total',function(download){
					var html = "";
					html += "";
					for(var i in download){
						if(i != "max"){
							html += "HTML.getDayUnit(i,download[i],download['max'])";
						}
					}
					html += "";
					$("#aaa_home_arrows").html(html);
				});
				html += "";
				return html;
			},
			getEventsCard: function(){
				var html = "";
				API.Reports.getHomescreen('events',function(download){
					var html = "";
					for(var i = 0; i < download.length; i++){
						html += "HTML.getEventUnit(download[i])";
					}
					$("#aaa_home_events").html(html);
				});
				html += "";
				return html;
			},
			getTasksCard: function(){
				var html = "";
				API.Reports.getHomescreen('tasks',function(download){
					var html = "";
					html += "";
					for(var i in download){
						html += "HTML.getTaskUnit(download[i])";
					}
					html += "";
					$("#aaa_home_tasks").html(html);
				});
				html += "";
				return html;
			},
			getValueDistributionCard: function(){
				var html = "";
				API.Reports.getHomescreen('value_distribution',function(download){
					var html = "";
					html += "SVG.getValueDistributionGraph(download)";
					$("#aaa_home_values").html(html);
				});
				html += "";
				return html;
			},
			getEndDistributionCard: function(){
				var html = "<div id='aaa_home_ends' class='mdl-cell--4-col mdl-cell mdl-shadow--2dp'>";
				API.Reports.getHomescreen('end_distribution',function(download){
					var html = "<h6>"+Text['home_ends']+"</h6>";
					html += SVG.getEndDistributionGraph(download);
					$("#aaa_home_ends").html(html);
				});
				html += "</div>";
				return html;
			},
			getYearOverviewCard: function(){
				var html = "";
				API.Reports.getHomescreen('year_summary',function(download){
					var html = "";
					html += "";
					for(var i in download){
						console.log(i);
						html += "HTML.getYearUnit(download[i],i.substring(0,4),i.substring(5))";
					}
					html += "";
					$("#aaa_home_year_summary").html(html);
				});
				html += "";
				return html;
			},
			getSeasonsCard: function(){
				var html = "<div id='aaa_home_seasons' class='mdl-cell--8-col mdl-cell mdl-shadow--2dp'>";
				API.Reports.getHomescreen('seasons',function(download){
					var html = "<h6>"+Text['home_seasons']+"</h6>";
					for(var i in download){
						html += SVG.getSeasonGraph(download[i],"aaa_home_seasons_graph");
					}
					$("#aaa_home_seasons").html(html);
				});
				html += "</div>";
				return html;
			}
	}
}

var ProfilePage = {
	buildProfilePage: function(){
		Application.destroyCurrentPage(Text['manage_profile'],ProfilePage.getProfilePage, function(){
			$("#aaa_new_season_content").hide();
			$("#aaa_new_event_content").hide();
			$("#aaa_new_item_content").hide();
		});
	},

	getProfilePage: function(){
		var html = "<div class='mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone'></div>";


		html += ProfilePage.HTML.getEventsCard();

		html += ProfilePage.HTML.getTasksCard();

		html += ProfilePage.HTML.getCalendarCard();

		html += "<div class='mdl-cell--2-col mdl-cell mdl-cell--hide-tablet mdl-cell--hide-phone'></div>";

		html += "<div class='mdl-cell--2-col mdl-cell mdl-cell--hide-tablet mdl-cell--hide-phone'></div>";

		html += ProfilePage.HTML.getInventoryCard();


		html += "<div class='mdl-cell--2-col mdl-cell mdl-cell--hide-tablet mdl-cell--hide-phone'></div>";
		html += "<div class='mdl-cell--2-col mdl-cell mdl-cell--hide-tablet mdl-cell--hide-phone'></div>";

		html += ProfilePage.HTML.getSeasonsCard();

		html += "<div class='mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone'></div>";

		return html;
	},

	createNewSeason: function(weeks,week_labels){
		var html = "<form onSubmit='ProfilePage.submitSeason("+weeks+");return false'>";
		var labels = [];
		if(week_labels){
			labels = week_labels;
		}
		else{
			for(var i = 0; i < weeks; i++) labels.push(i+1);
		}
		html += "<h2>"+Text['total_plan']+"</h2>";
		for(var i = 0; i < weeks; i++){
			html += "<div class='aaa-field-tiny mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
			html += "<input class='mdl-textfield__input' type='text' id='aaa_new_season_week_arrows_"+i+"' />";
			html += "<label class='mdl-textfield__label' for='aaa_new_season_week_arrows_"+i+"'>"+Text['wk']+" "+labels[i]+"</label>";
			html += "<span class='mdl-textfield__error'>error</span>";
			html += "</div>";
		}
		html += "<h2>"+Text['target_totals']+"</h2>";
		for(var i = 0; i < weeks; i++){
			html += "<div class='aaa-field-tiny mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
			html += "<input class='mdl-textfield__input' type='text' id='aaa_new_season_week_target_"+i+"' />";
			html += "<label class='mdl-textfield__label' for='aaa_new_season_week_target_"+i+"'>"+Text['wk']+" "+labels[i]+"</label>";
			html += "<span class='mdl-textfield__error'>error</span>"; //TODO replace all those 'error'... damn copy paste.
			html += "</div>";
		}

		html += "<div>";

		html += "<div class='aaa-field-medium mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
		html += "<input class='mdl-textfield__input' type='text' id='aaa_new_season_name' />";
		html += "<label class='mdl-textfield__label' for='aaa_new_season_name'>"+Text['profile_season_name']+"</label>";
		html += "<span class='mdl-textfield__error'>error</span>";
		html += "</div>";

		html += "<div class='aaa-field-small mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
		html += "<input class='mdl-textfield__input' type='text' id='aaa_new_season_start' />";
		html += "<label class='mdl-textfield__label' for='aaa_new_season_start'>"+Text['profile_season_start']+"</label>";
		html += "<span class='mdl-textfield__error'>error</span>";
		html += "</div>";

		html += "<div class='aaa-field-small'>";
		html += "<button  class='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>";
		html += "<i class='material-icons'>backup</i>";
		html += "</button>";
		html += "</div>";

		html += "</div>";

		html += "<input type='hidden' id='aaa_new_season_id' />";
		html += "</form>";

		$("#aaa_new_season_content").html(html);
		makeFreakingMDLwork();

		$("#aaa_new_season_content").show("slide", { direction: "up" }, 1000);
	},

	removeSeason: function(id){
		API.deleteSeason(id,function(){
			console.log("fading out");
			$("#aaa_season_"+id).fadeOut(500);
		});
	},

	updateSeason: function(id){
		var season = API.getSeasons(id);
		if(season){
			ProfilePage.createNewSeason(season.weeks.length,season.weeks);
			for(var i = 0; i < season.weeks.length; i++){
				$("#aaa_new_season_week_arrows_"+i).val(season.arrows[i]);
				$("#aaa_new_season_week_arrows_"+i).parent().addClass("is-dirty");
				$("#aaa_new_season_week_target_"+i).val(season.targets[i]);
				$("#aaa_new_season_week_target_"+i).parent().addClass("is-dirty");
			}
			$("#aaa_new_season_start").val(season.start_date);
			$("#aaa_new_season_start").parent().addClass("is-dirty");
			$("#aaa_new_season_name").val(season.name);
			$("#aaa_new_season_name").parent().addClass("is-dirty");
			$("#aaa_new_season_id").val(season.id);
		}
	},

	compileSeason: function(weeks){
		var arrows = [];
		for(var i = 0; i < weeks; i++){
			if($("#aaa_new_season_week_arrows_"+i).val()){
				arrows.push(parseInt($("#aaa_new_season_week_arrows_"+i).val()));
			}
		}
		var targets = [];
		for(var i = 0; i < weeks; i++){
			if($("#aaa_new_season_week_target_"+i).val()){
				var value = parseInt($("#aaa_new_season_week_target_"+i).val());
				if(value <= arrows[i]){
					targets.push(value);
				}
			}
		}

		if(arrows.length == targets.length && arrows.length == weeks){
			var result = {};
			result['arrows'] = arrows;
			result['targets'] = targets;
			return result;
		}

	},

	submitSeason: function(weeks){
		var season = ProfilePage.compileSeason(weeks);
		if(season){
			season['name'] = $("#aaa_new_season_name").val();
			season['start_date'] = $("#aaa_new_season_start").val();
			var end = new Date(Date.parse(season['start_date']));
			end.setDate(end.getDate() + 7*(weeks-1)); //FIXME what about when 1 week? works only for 2+
			season['end_date'] = end.toJSON().substring(0,10);
			if($("#aaa_new_season_id").val()){
				season['id'] = $("#aaa_new_season_id").val();
			}
			var HTML = ProfilePage.HTML;
			console.log(season);
			API.placeSeason(season,function(s){
				console.log(s);
				$("#aaa_new_season_content").hide("slide", { direction: "up" }, 500);
				var html = HTML.getSeasonContent(s);
				var newnode = $(html).hide();
				if($("#aaa_season_"+s['id']).length){
					$("#aaa_season_"+s['id']).html(newnode.html());
				}
				else{
					$('#aaa_seasons_content').prepend(newnode);
					makeFreakingMDLwork();
					$("#aaa_season_"+s['id']).fadeIn(500);
				}
			});
		}
	},

	createNewEvent: function(){
		var html = "<form onSubmit='ProfilePage.submitEvent();return false'>";

		html += "<div class='aaa-field-large mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
		html += "<input class='mdl-textfield__input' type='text' id='aaa_new_event_name' />";
		html += "<label class='mdl-textfield__label' for='aaa_new_event_name'>"+Text['profile_event_name']+"</label>";
		html += "<span class='mdl-textfield__error'>error</span>";
		html += "</div>";

		html += "<div class='aaa-field-medium mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
		html += "<input class='mdl-textfield__input' type='text' id='aaa_new_event_start' />";
		html += "<label class='mdl-textfield__label' for='aaa_new_event_start'>"+Text['profile_event_start']+"</label>";
		html += "<span class='mdl-textfield__error'>error</span>";
		html += "</div>";

		html += "<div class='aaa-field-medium mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
		html += "<input class='mdl-textfield__input' type='text' id='aaa_new_event_name_short' />";
		html += "<label class='mdl-textfield__label' for='aaa_new_event_name_short'>"+Text['profile_event_name_short']+"</label>";
		html += "<span class='mdl-textfield__error'>error</span>";
		html += "</div>";

		html += "<div class='aaa-field-medium'>";
		html += "<input class='mdl-slider mdl-js-slider' type='range' min='1' max='7' value='1' tabindex='0' onChange='$(\"#aaa_new_event_days\").html(this.value);'/>";
		html += "</div>"

		html += "<div class='aaa-field-small'>";
		html += "<p><span id='aaa_new_event_days'>1</span> "+Text['days']+".</p>";
		html += "</div>";

		html += "<div class='aaa-field-small'>";
		html += Text['color']+":";
		html += "<input id='aaa_new_event_color' type='color' value='#0000FF'>";
		html += "</div>";

		html += "<div class='aaa-field-small'>";
		html += "<button  class='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>";
		html += "<i class='material-icons'>backup</i>";
		html += "</button>";
		html += "</div>";

		html += "</div>";

		html += "</form>";

		$("#aaa_new_event_content").html(html);
		makeFreakingMDLwork();

		$("#aaa_new_event_content").show("slide", { direction: "up" }, 1000);
	},

	submitEvent: function(){
		var event = {};
		if(event){
			//TODO maybe modularize this sequence (will be used often, shall save lots of code)
			if($("#aaa_new_event_name").val()){
				event['name'] = $("#aaa_new_event_name").val();
			}
			else{
				$("#aaa_new_event_name").attr('required','required');
				return;
			}

			if($("#aaa_new_event_name_short").val()){
				event['name_short'] = $("#aaa_new_event_name_short").val();
			}
			else{
				$("#aaa_new_event_name_short").attr('required','required');
				return;
			}
			if($("#aaa_new_event_start").val()){
				event['date'] = $("#aaa_new_event_start").val();
			}
			else{
				$("#aaa_new_event_start").attr('required','required');
				return;
			}
			event['days'] = $("#aaa_new_event_days").html();
			event['color'] = $("#aaa_new_event_color").val();
			API.addEvent(event, function(e){
				var html = HTML.getEventUnit(e,true);
				var newnode = $(html).hide();
				$("#aaa_new_event_content").hide("slide", { direction: "up" }, 500);
				$('#aaa_events_content').append(newnode);
				makeFreakingMDLwork();
				$("#aaa_event_"+e.date+"_"+e.name_short).fadeIn(1000);
			});
		}
	},

	removeEvent: function(date,name_short){
		API.deleteEvent(date,name_short, function(){
			$("#aaa_event_"+date+"_"+name_short).fadeOut(500);
		});
	},

	submitTask: function(){
		var task = {};
		//TODO maybe modularize this sequence (will be used often, shall save lots of code)
		if($("#aaa_new_task_description").val()){
			task['description'] = $("#aaa_new_task_description").val();
			$("#aaa_new_task_button").attr('disabled','disabled');
			var HTML = ProfilePage.HTML;
			API.addTask(task, function(t){
				var html = HTML.getTaskCheckbox(t.id,t.description);
				var newnode = $(html).hide();
				$('#aaa_tasks_content').prepend(newnode);
				$("#aaa_new_task_description").val(null);
				$("#aaa_new_task_description").parent().removeClass("is-dirty");
				$("#aaa_new_task_button").removeAttr('disabled');
				makeFreakingMDLwork();
				$("#aaa_task_"+t.id).fadeIn(500);
			});
		}
		else{
			$("#aaa_new_task_description").attr('required','required');
			return;
		}
	},

	removeTask: function(id){
		API.deleteTask(id,function(){
			$("#aaa_task_"+id).fadeOut(500);
		});
	},

	checkTasks: function(id){
		var ids = [];
		var tasks = API.getTasks();
		for(var i = 0; i < tasks.length; i++){
			if($("#aaa_task_check_"+tasks[i].id).is(":checked")){
				ids.push(tasks[i].id);
			}
		}
		API.closeTasks(ids,function(id){
			$("#aaa_task_"+id).fadeOut(500);
		});
	},

	previousMonth: function(){
		$("#aaa_calendar_content").hide("slide", { direction: "right" }, 500,function(){
			ProfilePage.calendar.setMonth(ProfilePage.calendar.getMonth()-1);
			$("#aaa_calendar_content").html(ProfilePage.HTML.getCalendarContent());
			$("#aaa_calendar_content").show("slide", { direction: "left" }, 500);
		});
		$("#aaa_calendar_year").fadeOut(500);
		$("#aaa_calendar_month").fadeOut(500,function(){
			$("#aaa_calendar_month").html(Text['month_full_'+ProfilePage.calendar.getMonth()]);
			$("#aaa_calendar_year").html(ProfilePage.calendar.getFullYear());
			$("#aaa_calendar_month").fadeIn(500);
			$("#aaa_calendar_year").fadeIn(500);
		});
	},

	nextMonth: function(){
		$("#aaa_calendar_content").hide("slide", { direction: "left" }, 500,function(){
			ProfilePage.calendar.setMonth(ProfilePage.calendar.getMonth()+1);
			$("#aaa_calendar_content").html(ProfilePage.HTML.getCalendarContent());
			$("#aaa_calendar_content").show("slide", { direction: "right" }, 500);
		});
		$("#aaa_calendar_year").fadeOut(500);
		$("#aaa_calendar_month").fadeOut(500,function(){
			$("#aaa_calendar_month").html(Text['month_full_'+ProfilePage.calendar.getMonth()]);
			$("#aaa_calendar_year").html(ProfilePage.calendar.getFullYear());
			$("#aaa_calendar_month").fadeIn(500);
			$("#aaa_calendar_year").fadeIn(500);
		});
	},

	toggleDay: function(date){
		API.toggleStrengthTraining(date, function(){
			$("#aaa_calendar_content").html(ProfilePage.HTML.getCalendarContent());
		});
	},

	createNewItem: function(){
		var html = "<form onSubmit='ProfilePage.submitItem();return false'>";
		html += "<div class='aaa-field-small mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
		html += "<input class='mdl-textfield__input' type='text' id='aaa_inventory_name' />";
		html += "<label class='mdl-textfield__label' for='aaa_inventory_name'>"+Text['profile_inventory_name']+"</label>";
		html += "<span class='mdl-textfield__error'>error</span>";
		html += "</div>";

		html += "<div class='aaa-field-small mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
		html += "<input class='mdl-textfield__input' type='text' id='aaa_inventory_arms' />";
		html += "<label class='mdl-textfield__label' for='aaa_inventory_arms'>"+Text['profile_inventory_arms']+"</label>";
		html += "<span class='mdl-textfield__error'>error</span>";
		html += "</div>";

		html += "<div class='aaa-field-small mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
		html += "<input class='mdl-textfield__input' type='text' id='aaa_inventory_weight' />";
		html += "<label class='mdl-textfield__label' for='aaa_inventory_weight'>"+Text['profile_inventory_weight']+"</label>";
		html += "<span class='mdl-textfield__error'>error</span>";
		html += "</div>";

		html += "<div class='aaa-field-small mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
		html += "<input class='mdl-textfield__input' type='text' id='aaa_inventory_arrow' />";
		html += "<label class='mdl-textfield__label' for='aaa_inventory_arrow'>"+Text['profile_inventory_arrow']+"</label>";
		html += "<span class='mdl-textfield__error'>error</span>";
		html += "</div>";

		html += "<div class='aaa-field-small mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
		html += "<input class='mdl-textfield__input' type='text' id='aaa_inventory_arrows' />";
		html += "<label class='mdl-textfield__label' for='aaa_inventory_arrows'>"+Text['profile_inventory_arrows']+"</label>";
		html += "<span class='mdl-textfield__error'>error</span>";
		html += "</div>";

		html += "<div id='aaa_inventory_type' class='aaa-field-medium'>";

		html += "<label class='mdl-radio mdl-js-radio mdl-js-ripple-effect' for='aaa_option_1'>";
		html += "<input type='radio' id='aaa_option_1' class='mdl-radio__button' name='options' value='recurve' checked />";
		html += "<span class='mdl-radio__label'>"+Text['recurve']+"</span>";
		html += "</label>";

		html += "<label class='mdl-radio mdl-js-radio mdl-js-ripple-effect' for='aaa_option_2'>";
		html += "<input type='radio' id='aaa_option_2' class='mdl-radio__button' name='options' value='compound' />";
		html += "<span class='mdl-radio__label'>"+Text['compound']+"</span>";
		html += "</label>";

		html += "<label class='mdl-radio mdl-js-radio mdl-js-ripple-effect' for='aaa_option_3'>";
		html += "<input type='radio' id='aaa_option_3' class='mdl-radio__button' name='options' value='longbow' />";
		html += "<span class='mdl-radio__label'>"+Text['longbow']+"</span>";
		html += "</label>";

		html += "</div>";

		html += "<div class='aaa-field-small'>";
		html += "<button class='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>";
		html += "<i class='material-icons'>backup</i>";
		html += "</button>";
		html += "</div>";

		html += "<input type='hidden' id='aaa_inventory_id' />";

		html += "</form>";

		$("#aaa_new_item_content").html(html);
		makeFreakingMDLwork();

		$("#aaa_new_item_content").show("slide", { direction: "up" }, 1000);
	},

	submitItem: function(){
		var bow = {};
		if(bow){
			//TODO maybe modularize this sequence (will be used often, shall save lots of code)
			if($("#aaa_inventory_name").val()){
				bow['name'] = $("#aaa_inventory_name").val();
			}
			else{
				$("#aaa_inventory_name").attr('required','required');
				return;
			}
			if($("#aaa_inventory_arms").val()){
				bow['arms'] = $("#aaa_inventory_arms").val();
			}
			else{
				$("#aaa_inventory_arms").attr('required','required');
				return;
			}
			if($("#aaa_inventory_weight").val()){
				bow['weight'] = $("#aaa_inventory_weight").val();
			}
			else{
				$("#aaa_inventory_weight").attr('required','required');
				return;
			}
			if($("#aaa_inventory_arrow").val()){
				bow['arrow'] = $("#aaa_inventory_arrow").val();
			}
			else{
				$("#aaa_inventory_arrow").attr('required','required');
				return;
			}
			if($("#aaa_inventory_arrows").val()){
				bow['arrows'] = $("#aaa_inventory_arrows").val();
			}
			else{
				$("#aaa_inventory_arrows").attr('required','required');
				return;
			}
			if($("#aaa_inventory_id").val()){
				bow['id'] = $("#aaa_inventory_id").val();
			}
			bow['type'] = $("#aaa_inventory_type input[type='radio']:checked").val();

			var HTML = ProfilePage.HTML;
			API.placeItem(bow, function(b){
				$("#aaa_new_item_content").hide("slide", { direction: "up" }, 500);
				var html = HTML.getInventoryContent(b);
				var newnode = $(html).hide();
				if($("#aaa_inventory_item_"+b['id']).length){
					$("#aaa_inventory_item_"+b['id']).html(newnode.html());
				}
				else{
					$('#aaa_inventory_content').prepend(newnode);
					makeFreakingMDLwork();
					$("#aaa_inventory_item_"+b['id']).fadeIn(500);
				}
			});
		}
	},

	updateItem: function(id){
		var item = API.getItems(id);
		if(item){
			ProfilePage.createNewItem();
			for(var i in item){
				if(i != "type"){
					$("#aaa_inventory_"+i).val(item[i]);
					$("#aaa_inventory_"+i).parent().addClass("is-dirty");
				}
			}
			$("#aaa_option_1").parent().removeClass("is-checked");
			if(item['type'] == "recurve"){
				$("#aaa_option_1").attr('checked', 'checked');
				$("#aaa_option_1").parent().addClass("is-checked");
			}
			if(item['type'] == "compound"){
				$("#aaa_option_2").attr('checked', 'checked');
				$("#aaa_option_2").parent().addClass("is-checked");
			}
			if(item['type'] == "longbow"){
				$("#aaa_option_3").attr('checked', 'checked');
				$("#aaa_option_3").parent().addClass("is-checked");
			}
			makeFreakingMDLwork();
		}
	},

	removeItem: function(id){
		API.deleteItem(id,function(){
			$("#aaa_inventory_item_"+id).fadeOut(500);
		});
	},

	HTML: {
		getSeasonsCard: function(){
			var html = "<div id='aaa_profile_seasons' class='mdl-cell mdl-cell--8-col mdl-shadow--2dp'>";
			html += "<h1>"+Text['profile_seasons'];


			html += "<div class='aaa-field-medium'>";
			html += "<input class='mdl-slider mdl-js-slider' type='range' min='1' max='52' value='26' tabindex='0' onChange='$(\"#aaa_new_season_size\").html(this.value);'/>";
			html += "</div>"


			html += "<button id='aaa_new_season' onClick='ProfilePage.createNewSeason($(\"#aaa_new_season_size\").html());' class='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>";
			html += "<i class='material-icons'>library_add</i>";
			html += "</button>";
			html += "<p>"+Text['profile_new_season_size']+" <span id='aaa_new_season_size'>26</span> "+Text['weeks']+".</p>";
			html += "</h1>";

			html += "<div id='aaa_new_season_content' class='aaa-downslider'></div>";


			html += "<div id='aaa_seasons_content'>";

			var seasons = API.getSeasons();

			for(var i in seasons){
				html += ProfilePage.HTML.getSeasonContent(seasons[i]);
			}

			html += "</div>";



			html += "</div>";
			return html;
		},

		getSeasonContent: function(season){
			var html = "<div id='aaa_season_"+season.id+"' class='aaa-seasons-item'>";
			html += "<h2>"+season.name+"</h2>";

			html += "<p onClick='ProfilePage.updateSeason("+season.id+");' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effec'>";
			html += "<i class='material-icons'>edit</i>";
			html += "</p>";

			html += "<p onClick='ProfilePage.removeSeason("+season.id+");' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>";
			html += "<i class='material-icons'>delete</i>";
			html += "</p>";

			html += SVG.getEmptySeasonGraph(season);

			html += "<p><strong>"+Text['profile_season_start']+": </strong>"+season.start_date+"</p>";
			html += "<p><strong>"+Text['profile_season_end']+": </strong>"+season.end_date+"</p>";


			html += "</div>";
			return html;
		},

		getEventsCard: function(){
			var html = "<div id='aaa_profile_events' class='mdl-cell mdl-cell--3-col mdl-cell--4-col-phone mdl-shadow--2dp'>";
			html += "<h1>"+Text['profile_events'];
			html += "<button id='aaa_new_event' onClick='ProfilePage.createNewEvent();' class='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>";
			html += "<i class='material-icons'>library_add</i>";
			html += "</button>";
			html += "</h1>";

			html += "<div id='aaa_new_event_content'class='aaa-downslider'></div>";

			html += "<div id='aaa_events_content'>"+ProfilePage.HTML.getEventsContent()+"</div>";

			html += "</div>";
			return html;
		},

		getEventsContent: function(){
			var events = API.getEvents();
			var html = "";
			for(var i = 0; i < events.length; i++){
				html += HTML.getEventUnit(events[i],true);
			}

			return html;
		},

		getTasksCard: function(){
			var html = "<div id='aaa_profile_tasks' class='mdl-cell mdl-cell--3-col mdl-cell--2-col-phone mdl-shadow--2dp'>";
			html += "<h1>"+Text['profile_tasks']+"</h1>";

			html += "<form onSubmit='ProfilePage.submitTask(); return false;'>"
			html += "<div id='aaa_new_task_content' class='aaa-downslider'>";

			html += "<div id='aaa_new_task' class='aaa-field-large mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
			html += "<input class='mdl-textfield__input' type='text' id='aaa_new_task_description' />";
			html += "<label class='mdl-textfield__label' for='aaa_new_description'>"+Text['profile_tasks_description']+"</label>";
			html += "<span class='mdl-textfield__error'>error</span>";
			html += "</div>";

			html += "<button id='aaa_new_task_button' class='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored'>";
			html += "<i class='material-icons'>add</i>";
			html += "</button>";

			html += "</div>";
			html += "</form>"

			html += "<div id='aaa_tasks_content'>";
			html += ProfilePage.HTML.getTasksContent();
			html += "</div>";

			html += "<button onClick='ProfilePage.checkTasks()' class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effec'>";
			html += Text['profile_tasks_close']+" <i class='material-icons'>done</i>";
			html += "</button>";

			html += "</div>";
			return html;
		},

		getTasksContent: function(){ //TODO remove this, merge to parent(see getInventory)
			var tasks = API.getTasks();
			var html = "";
			for(var i = 0; i < tasks.length; i++){
				if(tasks[i].status != "done"){
					html += ProfilePage.HTML.getTaskCheckbox(tasks[i].id,tasks[i].description);
				}
			}

			return html;
		},

		getTaskCheckbox: function(id,description){
			var html = "<div id='aaa_task_"+id+"' class='aaa-tasks-item'>";
			html += "<label class='mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect' for='aaa_task_check_"+id+"'>";
			html += "<input type='checkbox' id='aaa_task_check_"+id+"' class='mdl-checkbox__input' />";
			html += "<span class='mdl-checkbox__label'>"+description +"</span>";
			html += "<button onClick='ProfilePage.removeTask("+id+");' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>";
			html += "<i class='material-icons'>delete</i>";
			html += "</button>";
			html += "</label>";
			html += "</div>";
			return html;
		},

		getCalendarCard: function(){
			ProfilePage.calendar = new Date();
			var html = "<div id='aaa_profile_tasks' class='mdl-cell mdl-cell--2-col mdl-shadow--2dp'>";
			html += "<h1>"+Text['profile_calendar']+"</h1>";

			html += "<div id='aaa_calendar_controller' class='aaa-downslider'>";
			html += "<h2>";
			html += "<p id='aaa_calendar_year'>2015</p>";
			html += "<button onClick='ProfilePage.previousMonth();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>";
			html += "<i class='material-icons'>chevron_left</i>";
			html += "</button>";
			html += "<span id='aaa_calendar_month'>"+Text['month_full_'+ProfilePage.calendar.getMonth()]+"</span>";
			html += "<button onClick='ProfilePage.nextMonth();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>";
			html += "<i class='material-icons'>chevron_right</i>";
			html += "</button>";
			html += "</h2>";

			html += "</div>";
			html += "<div id='aaa_calendar_content'>";
			html += ProfilePage.HTML.getCalendarContent();
			html += "</div>";

			html += "</div>";
			return html;
		},

		getCalendarContent: function(){
			var days = API.getStrengthTrainings();
			var html = "";
			var start = new Date();
			start = new Date(ProfilePage.calendar.setDate(1));
			console.log(start);
			console.log(start.getDay());

			html += "<div class='aaa-calendar'>";
			for(var i = 0,date = new Date(start); date.getMonth() == start.getMonth(); i++){
				var string = date.toJSON().substring(0,10);
				html += "<div class='aaa-calendar-day";
				if(i >= start.getDay() - 1){
					if(days[string]){
						html += " aaa-calendar-filled";
					}
					html += "' onClick='ProfilePage.toggleDay(\""+string+"\");'>";
					html += date.getDate();
					date.setDate(date.getDate()+1);
				}
				else{
					html += " aaa-calendar-empty'>";
				}
				html += "</div>";
			}
			html += "</div>";
			return html;
		},

		getInventoryCard: function(){
			var html = "<div id='aaa_profile_inventory' class='mdl-cell mdl-cell--8-col mdl-shadow--2dp'>";
			html += "<h1>"+Text['profile_inventory'];

			html += "<button onClick='ProfilePage.createNewItem()' id='aaa_new_inventory' class='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>";
			html += "<i class='material-icons'>library_add</i>";
			html += "</button>";
			html += "</h1>";

			html += "<div id='aaa_new_item_content' class='aaa-downslider'>";

			html += "</div>";

			html += "<div id='aaa_inventory_content'>";

			var bows = API.getItems();
			for(var i in bows){
				html += ProfilePage.HTML.getInventoryContent(bows[i]);
			}

			html += "</div>";

			html += "</div>";



			html += "</div>";
			return html;
		},

		getInventoryContent: function(bow){
			var html = "<div id='aaa_inventory_item_"+bow['id']+"'class='aaa-inventory-item'>";
			html += "<img src='/img/bow/"+bow['type']+".png' />";
			html += "<p><strong>ID: </strong>"+bow['id']+"</p>";
			html += "<p><strong>"+Text['profile_inventory_name']+": </strong>"+bow['name']+"</p>";
			html += "<p><strong>"+Text['profile_inventory_arms']+": </strong>"+bow['arms']+"</p>";
			html += "<p><strong>"+Text['profile_inventory_weight']+": </strong>"+bow['weight']+" lbs</p>";
			html += "<p><strong>"+Text['profile_inventory_arrow']+": </strong>"+bow['arrow']+"</p>";
			html += "<p>"+bow['arrows']+" "+Text['profile_inventory_quiver']+".</p>";
			html += "<p onClick='ProfilePage.updateItem("+bow['id']+")' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effec'>";
			html += "<i class='material-icons'>edit</i>";
			html += "</p>";
			html += "<p onClick='ProfilePage.removeItem("+bow['id']+")' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>";
			html += "<i class='material-icons'>delete</i>";
			html += "</p>";
			html += "</div>";
			return html;
		}
	}
}

var HTML = {
		getAvatarHeader: function(){
			var html = "";
			html += "";
			html += "";
			html += "";
			html += "";
			html += "";
			html += "";
			html += "";

			html += ""; //TODO fix that it is too low.

			html += "";
			html += "";
			html += "";
			html += "";


			html += "";
			html += "";
			return html;
		},

		getHeader: function(title){
			var html = "";
		    // Title -->
			html += "";

			html += "";

			html += "";
			html += "";
			html += "";
			html += "";
			html += "";

		    return html;
		},



		getDrawerMenu: function(){
			var html =  "";
			//document.getElementById("aaa_drawer").className = document.getElementById("aaa_drawer").className.replace(" is-visible","");
			html += "HTML.getAvatarHeader()";
			html += "";
			html += "";
			html += "";
			html += "";
			html += "";
			html += "";
			html += "";
			html += "";

			return html;
		},

		getEventUnit: function(event,operate){
			var html = "";
			//html += "<h2>"+seasons.name+"</h2>";
			html += "";

			html += "";
			if(operate){
				html += "";
				html += "";
				html += "";
			}
			html += "";
			html += "";
			html += "";

			html += "";
			html += "";
			return html;
		},

		getTaskUnit: function(task){
			var html = "";
			html += ""
			if(task['status'] == 'done'){
				html += "";
			}
			if(task['status'] == 'open'){
				html += "";
			}
			html += ""
			html += "";
			html += ""
			return html;
		},
		getYearUnit: function(unit,year,month){
			var html = "";
			html += "";
			html += "";
			html += "";
			html += ""
			if(unit['average_value']){
				html += "unit['average_value'].toPrecision(3)";
			}
			html += ""
			html += ""
			return html;
		},
		getDayUnit: function(day,count,max){
			var html = "";
			html += "";
			html += "";
			html += "";
			html += "count";
			html += "";
			return html;
		}
}

var SVG = {
	getEmptySeasonGraph: function(season){
		var max = Math.ceil(season.max/50)*50+50;

		var general_width = (season.weeks.length*100+110+150);
		var general_height = 400 + 150 + 50;
		var width = 20.2/(100/general_width);

		var html = "<svg xmlns='http://www.w3.org/2000/svg'";
		html += " id='aaa_report_season_graph'";
		html += " version='1.1'";
		html += " viewBox='0 "+(-general_height)+" "+(general_width+2)+" "+(general_height+2)+"'";
		html += " preserveAspectRatio='xMidYMid meet'";
		html += " width='"+width+"pt'>";

		html += SVG.getStyle();

		html += "<g id='main'>";

		html += "<g id='data' transform='translate(140,-150)'>";

		html += SVG.getGrid(max,season.weeks.length);
		//FIXME order of the weeks in empty seasons.
		html += SVG.getBottomLabels(season.weeks,Text['wk']);
		html += SVG.getLeftAxis(0,max,"arrow_count",max);

		for(var i = 0; i < season.arrows.length; i++){
			html += SVG.getPlan(season.arrows[i],i);
			html += SVG.getShare(season.arrows[i]-season.targets[i],i);
		}

		html += "</g>";

		html += "</g>";

		html += "</svg>";

		return html;
	},
	getValueDistributionGraph: function(distribution){
		var size = 11;
		var max = Math.ceil((distribution.max*110)/10)*0.1;
		var unit = 1000/max;

		var general_width = (size*100+100+150);
		var general_height = 1000 + 150 + 50 + 100;
		var width = 20.2/(100/general_width);

		var html = "";
		html += "";
		html += "";
		html += "";
		html += "";
		html += "";

		html += "SVG.getStyle()";

		html += "";

		html += "SVG.getValueLabels(666)";

		html += "";

		html += "SVG.getGrid(1000,size)";


		html += 'SVG.getLeftAxis(0,max,"distribution",1000,100,"%")';

		var estimate = false;
		var estimations = [];
		var bullets = {};
		var min_result = 10;
		var max_result = 0;
		var values = [];
		for(i in distribution){
			if(!isNaN(i)){
				html += 'SVG.getBar(distribution[i].week*unit,i,0,3,"week")';
				html += 'SVG.getBar(distribution[i].month*unit,i,1,3,"month")';
				html += 'SVG.getBar(distribution[i].year*unit,i,2,3,"year")';
				values.push(i);
			}
		}
		html += "SVG.getBottomLabels(values)";

		html += "";

		html += "";

		html += "";

		return html;
	},
	getValueLabels: function(max){
		var html = "";

		html += "";
		html += ""

		html += "";
		html += ""

		html += "";
		html += ""

		html += "";

		return html;
	},
	getEndDistributionGraph: function(distribution){
		var size = distribution.max_end+1;
		var max = Math.ceil((distribution.max_count*1.1)/50)*50;
		var unit = 1000/max;

		var general_width = (size*100+100+150);
		var general_height = 1000 + 150 + 50 + 100;
		var width = 20.2/(100/general_width);

		var html = "<svg xmlns='http://www.w3.org/2000/svg'";
		html += " id='aaa_home_ends_graph'";
		html += " version='1.1'";
		html += " viewBox='0 "+(-general_height)+" "+(general_width+2)+" "+(general_height+2)+"'";
		html += " preserveAspectRatio='xMidYMid meet'";
		html += " width='100%'>";

		html += SVG.getStyle();

		html += "<g id='main'>";

		html += SVG.getEndLabels(1000);

		html += "<g id='data' transform='translate(150,-250)'>";

		html += SVG.getGrid(1000,size);

		var ends = [];
		for(var i = 0; i <= distribution.max_end; i++){
			ends.push(i+1);
		}
		html += SVG.getBottomLabels(ends);
		html += SVG.getLeftAxis(0,max,"arrow_count",1000);

		var estimate = false;
		var estimations_week = [];
		var estimations_month = [];
		var bullets_week = {};
		var bullets_month = {};
		var min_result = 10;
		var max_result = 0;
		for(i in distribution.counts){
			if(!isNaN(i)){
				html += SVG.getBar(distribution.counts[i].week*unit,i,0,2,"week");
				html += SVG.getBar(distribution.counts[i].month*unit,i,1,2,"month");

				if(distribution.values.week[i]){
					bullets_week[i] = distribution.values.week[i];
					estimations_week.push(distribution.values.week[i]);
					if(distribution.values.week[i] > max_result) max_result = distribution.values.week[i];
					if(distribution.values.week[i] < min_result) min_result = distribution.values.week[i];
				}
				else{
					estimations_week.push(-1);
				}

				if(distribution.values.month[i]){
					bullets_month[i] = distribution.values.month[i];
					estimations_month.push(distribution.values.month[i]);
					if(distribution.values.month[i] > max_result) max_result = distribution.values.month[i];
					if(distribution.values.month[i] < min_result) min_result = distribution.values.month[i];
				}
				else{
					estimations_month.push(-1);
				}
			}
		}

		var difference = max_result - min_result;
		max_result += 0.1*difference;
		min_result -= 0.1*difference;
		html += SVG.getEstimations(estimations_week,1000,min_result,max_result,"estimation-week");
		html += SVG.getEstimations(estimations_month,1000,min_result,max_result,"estimation-month");

		html += SVG.getRightAxis(10-min_result,10-max_result,"results",1000,size*100);

		for(bullet in bullets_week){
			html += SVG.getResult(bullets_week[bullet],bullet,1000,min_result,max_result,"result-week");
		}

		for(bullet in bullets_month){
			html += SVG.getResult(bullets_month[bullet],bullet,1000,min_result,max_result,"result-month");
		}


		html += "</g>";

		html += "</g>";

		html += "</svg>";

		return html;
	},
	getEndLabels: function(max){
		var html = "<g id='labels' transform='translate(100,-220)'>";

		html += "<rect class='week' x='0' y='"+(1*max/10-25)+"' height='20' width='100' />";
		html += "<text class='graph_label' x='125' y='"+(1*max/10-2)+"'>"+Text['count_week']+"</text>"

		html += "<rect class='month' x='0' y='"+(2*max/10-25)+"' height='20' width='100' />";
		html += "<text class='graph_label' x='125' y='"+(2*max/10-2)+"'>"+Text['count_month']+"</text>"

		html += "</g>";

		html += "<g id='labels' transform='translate(600,-220)'>";

		html += "<path class='estimation-week' d='M 0,"+(1*max/10-12.5)+" l 100,0'/>";
		html += "<circle class='result-week' cx='50' cy='"+(1*max/10-12.5)+"' r='10'/>";
		html += "<text class='graph_label' x='125' y='"+(1*max/10-2)+"'>"+Text['value_week']+"</text>"

		html += "<path class='estimation-month' d='M 0,"+(2*max/10-12.5)+" l 100,0'/>";
		html += "<circle class='result-month' cx='50' cy='"+(2*max/10-12.5)+"' r='10'/>";
		html += "<text class='graph_label' x='125' y='"+(2*max/10-2)+"'>"+Text['value_month']+"</text>"

		html += "</g>";

		return html;
	},

	getDailySeasonGraph: function(download){
		var season_id;//FIXME this crap workaround is not required.
		for(var i in download.seasons){
			season_id = i; //FIXME this crap workaround is not required.
		}
		var season = download.seasons[season_id];
		var max = Math.ceil(download.seasons[season_id].max/50)*50+50;

		var days = (new Date(download.end) - new Date(download.start))/(1000*60*60*24);

		var general_width = (days*100+700+150);
		var general_height = max+100+50;
		var width = 20.2/(100/general_width);

		var html = "<svg xmlns='http://www.w3.org/2000/svg'";
		html += " id='aaa_report_daily_graph'";
		html += " version='1.1'";
		html += " viewBox='0 "+(-general_height)+" "+(general_width+2)+" "+(general_height+1)+"'";
		html += " preserveAspectRatio='xMidYMid meet'";
		html += " width='"+width+"pt'>";

		html += SVG.getStyle();

		html += "<g id='main'>";

		html += SVG.getDailyLabels(max);

		html += "<g id='data' transform='translate(700,-100) scale(1,1)'>";

		html += SVG.getGrid(max,days);

		html += SVG.getBottomDays(download.start,download.end);
		html += SVG.getLeftAxis(0,max,"arrow_count",max);

		var estimate = false;
		var estimations = [];
		var bullets = {};

		var current = new Date(download.start);
		current.setHours(1);
		var week = download.week_start;
		var stop = new Date(download.end);
		stop.setHours(1);
		var i = 0;
		var estimate = false;
		var estimations = [];
		var bullets = {};
		var min_result = 10;
		var max_result = 0;
		while(current < stop){
			var now = current.toJSON().substring(0,10);
			var technique = 0;
			var gauged = 0;

			if(download.arrow_counts.totals[now]){
				if(download.arrow_counts.technique_totals[now]){
					technique = download.arrow_counts.technique_totals[now];
					gauged = download.arrow_counts.totals[now] - technique;
				}
				else{
					gauged = download.arrow_counts.totals[now];
				}
			}

			if(gauged > 0 || technique > 0){
				html += SVG.getActual(gauged,technique,i);
			}

			if(download.results.result_totals[now]){
				bullets[i] = download.results.result_totals[now];
				estimations.push(download.results.result_totals[now]);
				if(download.results.result_totals[now] > max_result) max_result = download.results.result_totals[now];
				if(download.results.result_totals[now] < min_result) min_result = download.results.result_totals[now];
				estimate = true;
			}
			else{
				if(estimate && i > 1){
					//TODO test this... probably not working.
					var estimate = (estimations[i-1]+estimations[i-2])/2;
					estimations.push(estimate);
					if(estimate > max_result) max_result = estimate;
					if(estimate < min_result) min_result = estimate;
				}
				else{
					//TODO fix the bug of the second item being -1 if there is only the first item.
					//TODO fetch previous performance instead of estimating always.
					//TODO keep an eye on the formation of the weeks... something nasty was going on.
					estimations.push(-1);
				}
			}


			current.setDate(current.getDate() + 1);
			i++
		}

		var difference = max_result - min_result;
		max_result += 0.1*difference;
		min_result -= 0.1*difference;
		html += SVG.getEstimations(estimations,max,min_result,max_result,"estimation");

		html += SVG.getRightAxis(10-min_result,10-max_result,"results",max,days*100);

		for(bullet in bullets){
			html += SVG.getResult(bullets[bullet],bullet,max,min_result,max_result,"result");
		}


		html += "</g>";

		html += "</g>";

		html += "</svg>";

		return html;
	},

	getDailyLabels: function(max){
		var html = "<g id='labels' transform='translate(5,-"+max+")'>";

		html += "<rect class='training' x='0' y='"+(1*max/10-25)+"' height='20' width='100' />";
		html += "<text class='graph_label' x='125' y='"+(1*max/10-2)+"'>"+Text['technique_totals']+"</text>"

		html += "<rect class='target' x='0' y='"+(2*max/10-25)+"' height='20' width='100' />";
		html += "<text class='graph_label' x='125' y='"+(2*max/10-2)+"'>"+Text['target_totals']+"</text>"

		html += "<path class='estimation' d='M 0,"+(3*max/10-12.5)+" l 100,0'/>";
		html += "<circle class='result' cx='50' cy='"+(3*max/10-12.5)+"' r='10'/>";
		html += "<text class='graph_label' x='125' y='"+(3*max/10-2)+"'>"+Text['result_totals']+"</text>"

		html += "<circle class='strength' cx='50' cy='"+(4*max/10-12.5)+"' r='10'/>";
		html += "<text class='graph_label' x='125' y='"+(4*max/10-2)+"'>"+Text['strength_training']+"</text>"

		html += "</g>";

		return html;
	},

	getSeasonGraph: function(season,id){
		var weeks = season.size;
		var max = Math.ceil(season.max/50)*50+50;
		var unit = 1000/max;

		var general_width = (weeks*100+700+150);
		var general_height = 1000 + 150 + 50;
		var width = 20.2/(100/general_width);

		var html = "<svg xmlns='http://www.w3.org/2000/svg'";
		html += " id='"+id+"'";
		html += " version='1.1'";
		html += " viewBox='0 "+(-general_height)+" "+(general_width+2)+" "+(general_height+2)+"'";
		html += " preserveAspectRatio='xMidYMid meet'";
		html += " width='"+width+"pt'>";

		html += SVG.getStyle();

		html += "<g id='main'>";

		html += SVG.getSeasonLabels(1000);

		html += "<g id='data' transform='translate(700,-150)'>";

		html += SVG.getGrid(1000,weeks);

		html += SVG.getBottomLabels(season.weeks,Text['wk']);
		html += SVG.getLeftAxis(0,max,"arrow_count",1000);

		var estimate = false;
		var estimations = [];
		var bullets = {};
		var min_result = 10;
		var max_result = 0;
		for(i in season){
			if(!isNaN(i)){
				html += SVG.getPlan(season[i].total_plan*unit,i-season.start);
				html += SVG.getActual(season[i].total*unit-season[i].technique_total*unit,season[i].technique_total*unit,i-season.start);
				html += SVG.getShare(season[i].total_plan*unit-season[i].gauged_plan*unit,i-season.start);
				if(season[i].result_total){
					bullets[i] = season[i].result_total;
					estimations.push(season[i].result_total);
					if(season[i].result_total > max_result) max_result = season[i].result_total;
					if(season[i].result_total < min_result) min_result = season[i].result_total;
					estimate = true;
				}
				else{
					if(estimate && i > 1){
						//TODO test this... probably not working.
						estimate = (estimations[i-season.start-1]+estimations[i-season.start-2])/2;
						estimations.push(estimate);
						if(estimate > max_result) max_result = estimate;
						if(estimate < min_result) min_result = estimate;
					}
					else{
						estimations.push(-1);
					}
				}
			}
		}

		var difference = max_result - min_result;
		max_result += 0.1*difference;
		min_result -= 0.1*difference;
		html += SVG.getEstimations(estimations,1000,min_result,max_result,"estimation");

		html += SVG.getRightAxis(10-min_result,10-max_result,"results",1000,weeks*100);

		for(bullet in bullets){
			html += SVG.getResult(bullets[bullet],bullet-season.start,1000,min_result,max_result,"result");
		}

		html += "</g>";

		html += "</g>";

		html += "</svg>";

		return html;
	},

	getSeasonLabels: function(max){
		var html = "<g id='labels' transform='translate(5,-"+max+")'>";

		html += "<rect class='plan' x='0' y='"+(1*max/10-25)+"' height='20' width='100' />";
		html += "<text class='graph_label' x='125' y='"+(1*max/10-2)+"'>"+Text['total_plan']+"</text>"

		html += "<rect class='training' x='0' y='"+(2*max/10-25)+"' height='20' width='100' />";
		html += "<text class='graph_label' x='125' y='"+(2*max/10-2)+"'>"+Text['technique_totals']+"</text>"

		html += "<rect class='target' x='0' y='"+(3*max/10-25)+"' height='20' width='100' />";
		html += "<text class='graph_label' x='125' y='"+(3*max/10-2)+"'>"+Text['target_totals']+"</text>"

		html += "<rect class='share-shadow' x='5' y='"+(4*max/10-25)+"' height='20' width='100' />";
		html += "<rect class='share' y='"+(4*max/10-5-25)+"' height='20' width='100' />";
		html += "<text class='graph_label' x='125' y='"+(4*max/10-2)+"'>"+Text['technique_share']+"</text>"

		html += "<path class='estimation' d='M 0,"+(5*max/10-12.5)+" l 100,0'/>";
		html += "<circle class='result' cx='50' cy='"+(5*max/10-12.5)+"' r='10'/>";
		html += "<text class='graph_label' x='125' y='"+(5*max/10-2)+"'>"+Text['result_totals']+"</text>"

		html += "<circle class='strength' cx='50' cy='"+(6*max/10-12.5)+"' r='10'/>";
		html += "<text class='graph_label' x='125' y='"+(6*max/10-2)+"'>"+Text['strength_training']+"</text>"

		html += "</g>";

		return html;
	},

	getStyle: function(){
		var html = "";

		html += "";

		html += "";
		html += "";
		html += "";
		html += "";
		html += "";
		html += "";
		html += "";
		html += "";
		html += "";

		html += "";

		html += "";
		html += "";
		html += "";
		html += "";


		html += "";
		html += "";
		html += "";
		html += "";

		html += "";
		html += "";
		html += "";
		html += "";


		html += "";
		return html;
	},

	getGrid: function(height, columns){
		var s = "";
		for(var i = 0; i <= columns; i++){
			s += "";
		}
		for(var i = height; i > 0; i -= height/10){
			s += "";
		}
		s += "";
		return s;
	},

	getBar: function(value, column, position, size, type){
		var s = "";
		s += "";
		s += "";
		s += "";
		return s;
	},

	getPlan: function(value, column){
		var s = "<g transform='translate(0,"+(-value)+")'>";
		s += "<rect class='plan' x='"+(10+column*100)+"' height='"+value+"' width='80' />";
		s += "</g>";
		return s;
	},

	getActual: function(target, training, column){
		var s = "<g transform='translate(0,"+(-target-training)+")'>";
		s += "<rect class='target' x='"+(10+column*100)+"' height='"+ target +"' width='80' />";
		s += "<rect class='training' x='"+(10+column*100)+"' y='"+target+"' height='"+ training +"' width='80' />";
		s += "</g>";
		return s;
	},

	getShare: function(value, column){
		var s = "<g transform='translate("+(column*100)+","+(-value)+")'>";
		s += "<rect class='share-shadow' x='5' y='0' height='20' width='100' />";
		s += "<rect class='share' y='-5' height='20' width='100' />";
		s += "</g>";
		return s;
	},

	getResult: function(value,position,size,min,max,what) {
		var s = "<g>";
		var k = -((value-min)/(max-min));
		s+= "<circle class='"+what+"' cx='"+(position*100+50)+"' cy='"+(k*size)+"' r='10'/>";
		s+="</g>";
		return s;
	},

	getEstimations: function(data, size,min,max,what) {
		var s = "<g><path class='"+what+"' d='M ";
		var first = true;
		for(var i = 0; i < data.length;i++){
			var k = -((data[i]-min)/(max-min));
			if(k <= 0){
				if(first){
					s += (50+i*100)+" "+(k*size)+" C "+ (i*100+100) +","+(k*size)+" ";
					first = false;
				}
				else {
					s += (50+i*100-50)+","+(k*size)+" "+(i*100+50)+" "+(k*size)+" S ";
				}
			}
		}
		s+="'/></g>";
		return s;
	},

	getRightAxis: function(min, max,title,size,offset){
		var html = "<g id='right' transform='translate(0,0)'>";
		var unit = (max - min) / 10;
		var block = (size/10);
		for(var i = min,j = 0; j <= size; i+=unit,j+=block){
			html += "<text class='right' x='"+(offset+10)+"' y='-"+j+"'>"+(i).toPrecision(3)+"</text>";
		}
		html += "<text transform='translate("+(offset+10+90)+",0) rotate(-90)' class='title' x='0' y='0'>"+Text[title]+"</text>";
		html += "</g>";
		return html;
	},

	getLeftAxis: function(min, max,title,size, multiplier,suffix){
		var html = [""];
		var unit = (max - min) / 10;
		if(unit <= 0) return "";
		if(multiplier) {
			unit *= multiplier;
			max *= multiplier;
		}
		var block = (size/10);
		var j = 0;
		for(var i = min; i <= max; i+=unit){
			html.push(""+Math.floor(i));
			if(suffix){
				html.push(suffix);
			}
			html.push("");
			j+=block;
		}
		html.push("");
		html.push("");
		//TODO use this technique EVERYWHERE, this is JS memory optimization
		//FIXME URGENT!
		return html.join("");
	},

	getBottomDays: function(min, max){
		var html = "<g id='bottom'>";
		var end =  new Date(max);
		var i = new Date(min)
		end.setHours(23);
		i.setHours(23)
		for(var j = 0; i < end; i.setDate(i.getDate() + 1),j++ ){
			html += "<g transform=translate("+(j*100+50)+",50)>";
			html += "<text class='bottom' x='0' y='0'>"+i.toJSON().substring(8,10)+"</text>";
			html += "</g>";
			console.log(i);
		}
		html += "</g>";
		return html;
	},

	getBottomLabels: function(weeks,prefix){
		var html = "";
		for(var i = 0; i < weeks.length; i++){
			html += "";
			html += ""
			if(prefix){
				html += prefix+"";
				html += ""
			}
			html += weeks[i]+"";
			html += "";
		}
		html += "";
		return html;
	}
}
