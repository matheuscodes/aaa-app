function getHeader(title){
	var html = "<div class='mdl-layout__header-row'>";
    // Title -->
	html += "<span id='aaa_header_title' class='mdl-layout-title'>"+title+"</span>";
	
	html += "<div class='mdl-layout-spacer'></div>";
    
	html += "<button id='aaa_header_logout' class='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-color-text--accent-contrast'>";
	html += "<i class='material-icons'>exit_to_app</i>";
	html += "</button>";
	html += "<div class='mdl-tooltip' for='aaa_header_logout'>"+Text['logout']+"</div>";
	html += "</div>";

	//html += getDrawerMenu();
    return html;
}

function getFooter(){
	var html =  "<footer class='mdl-mini-footer'>";
	html += "<div class='mdl-mini-footer__left-section'>";
	html += "<div class='mdl-logo'>Title</div>";
	html += "<ul class='mdl-mini-footer__link-list'>";
	html += "<li><a href='coisa'>Help</a></li>";
	html += "<li><a href='#'>Privacy & Terms</a></li>";
	html += "</ul>";
	html += "</div>";
	
	html += "<div class='mdl-layout-spacer'></div>";
	
	html += "<button id='aaa_languages' class='mdl-button mdl-js-button mdl-button--icon aaa-languages'>";
	html += Text.getLanguageCode();
	html += "</button>";

	//TODO shorten this line
	html += "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 100 75.446' enable-background='new 0 0 100 75.446' xml:space='preserve'><g><path d='M19.198,44.002v-8.201h-8.575c-3.319,0-6.021-2.874-6.021-6.406V10.903c0-3.533,2.701-6.408,6.021-6.408h38.345   c3.319,0,6.019,2.875,6.019,6.408v18.492c0,3.532-2.7,6.406-6.019,6.406v4.496c5.797,0,10.514-4.891,10.514-10.902V10.903   C59.482,4.892,54.766,0,48.968,0H10.623C4.824,0,0.107,4.892,0.107,10.903v18.492c0,6.011,4.717,10.902,10.516,10.902h4.08v7.968   c0,1.223,0.789,2.332,1.963,2.764c0.334,0.123,0.677,0.184,1.014,0.184c0.821,0,1.609-0.354,2.165-1.01l8.369-9.905h8.353v-4.496   H26.128L19.198,44.002z'/><path d='M89.377,24.233h-25.96v4.496h25.96c3.319,0,6.021,2.875,6.021,6.408v18.489c0,3.533-2.701,6.408-6.021,6.408h-8.574v8.205   l-6.931-8.203H51.031c-3.318,0-6.019-2.875-6.019-6.408V35.137c0-3.533,2.701-6.408,6.019-6.408v-4.496   c-5.797,0-10.515,4.892-10.515,10.903v18.491c0,6.014,4.717,10.904,10.515,10.904h20.754l8.372,9.91   c0.555,0.652,1.342,1.004,2.161,1.004c0.337,0,0.68-0.059,1.014-0.182c1.176-0.432,1.967-1.543,1.967-2.768V64.53h4.078   c5.799,0,10.516-4.891,10.516-10.904V35.137C99.893,29.125,95.176,24.233,89.377,24.233z'/><path d='M26.532,7.437l-7.952,20.951h4.665l1.644-4.665h7.834l1.584,4.665h4.782L31.255,7.437H26.532z M26.093,20.29l2.729-7.688   h0.058l2.641,7.688H26.093z'/><path d='M60.12,49.114c0,2.297,1.468,3.787,3.862,3.787c2.876-0.061,5.721-1.887,6.647-2.711c0.926-0.826,3.42-3.693,4.521-5.963   c1.393,0.658,2.053,1.76,2.053,2.98c0,2.639-2.542,4.17-6.599,4.635l1.968,2.725c6.354-0.832,8.516-3.5,8.516-7.408   c0-3.301-2.077-5.305-4.74-6.183c0.049-0.242,0.138-0.495,0.188-0.74l-3.611-0.643c-0.024,0.365-0.097,0.432-0.168,0.798   c-1.297-0.074-2.738,0.121-3.202,0.219c0-0.66,0.024-2.421,0.049-3.055c3.006-0.122,5.962-0.365,8.699-0.781l-0.318-3.566   c-2.81,0.562-5.523,0.856-8.186,1.003c0.072-0.71,0.172-2.717,0.172-2.717l-3.813-0.291c-0.05,0.978-0.072,2.127-0.121,3.128   c-1.688,0.024-3.689,0.024-4.742,0l0.171,3.446h0.414c1.003,0,2.641-0.051,4.109-0.099c0,0.952,0.023,3.005,0.048,3.934   C62.589,43.051,60.12,45.717,60.12,49.114z M71.606,43.59c-0.514,1.025-1.124,1.957-1.808,2.736   c-0.1-0.807-0.148-1.637-0.196-2.516C69.87,43.762,70.945,43.59,71.606,43.59z M66.229,45.008c0.123,1.369,0.27,2.688,0.489,3.885   c-0.634,0.318-1.244,0.514-1.809,0.539c-1.223,0.049-1.223-0.732-1.223-1.076C63.687,47.059,64.689,45.864,66.229,45.008z'/></g></svg>";
	
	html += "<ul class='mdl-menu mdl-menu--top-right mdl-js-menu mdl-js-ripple-effect' for='aaa_languages'>";
	
	for(language in Text.allLanguages()){
		html += "<li class='mdl-menu__item'";
		html += " onClick='swapLanguage(\""+Text.allLanguages()[language].code+"\")' >";
		html += "<button class='mdl-button mdl-js-button mdl-button--icon aaa-languages'>";
		html += Text.allLanguages()[language].code;
		html += "</button>";
		html += Text.allLanguages()[language].name;
		html += "</li>";
	}
	
	html += "</ul>";
	
	html += "</footer>";
	return html;
}

function getLoginCard(){
	var html = "<div class='mdl-cell mdl-cell--middle mdl-cell--4-col mdl-cell--2-col-tablet mdl-cell--hide-phone'></div>";
	html += "<div class='mdl-cell mdl-cell--middle mdl-cell--4-col'>";
	html +=  "<div id='login_box' class='mdl-card mdl-shadow--2dp'>";
	html += "<div class='mdl-card__title'" +
			" style='background: url(\"img/random/"+Math.floor(Math.random()*7)+".jpg\") center / cover;'"+
			">";
	html += "</div>";

	html += "<form onsubmit='doLogin();return false'>";
	
	html += "<div class='mdl-card__supporting-text'>";
	
	html += "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label aaa-login'>";
	html += "<input class='mdl-textfield__input' type='text' pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' id='email' />";
	html += "<label class='mdl-textfield__label' for='email'>"+Text['email']+"</label>";
	html += "<span class='mdl-textfield__error'>"+Text['email_error']+"</span>";
	html += "</div>";
	
	html += "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label aaa-login'>";
	html += "<input class='mdl-textfield__input' type='password' id='password' />";
	html += "<label class='mdl-textfield__label' for='password'>"+Text['password']+"</label>";
	html += "</div>";
	
	html += "</div>";
	
	html += "<div class='mdl-card__actions mdl-card--border'>";
	html += "<a id='aaa_sign_up' class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effec'>";
	html += "<i class='material-icons'>person_add</i>";
	html += "</a>";
	
	html += "<div class='mdl-tooltip' for='aaa_sign_up'>"+Text['sign_up']+"</div>"; //TODO fix that it is too low.
	
	
	html += "<button type='submit' id='login' class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effec'>";
	html += Text['login']+" <i class='material-icons'>chevron_right</i>";
	html += "</button>";
	html += "</div>";
	html += "</form>";
	
	
	html += "</div>";
	html += "</div>";
	
	return html;
}

function doLogin(){
	if(User.processLogin()){
		$("#aaa_content").hide("slide", { direction: "right" }, 1000);
		$("#aaa_header_title").fadeOut(1000,function(){
			$("#aaa_header_title").html(Text['home']);
		});
		$("#aaa_header_title").fadeIn(2000);
		buildHomePage();
	}
	else{
		alert("Error!");
	}
}

function buildLoginPage(){
	$("#aaa_header_title").html("Arkanos Advanced Archery");
	$("#aaa_header_title").fadeIn(2000);
	document.getElementById("aaa_content").innerHTML = getLoginCard();
	$("#aaa_content").show("slide", { direction: "left" }, 1000);
}

function buildHomePage(){
	if($("#aaa_header_title").html() == "") $("#aaa_header_title").html(Text['home']);
	$("#aaa_header_title").fadeIn(2000);
	$("#aaa_header_logout").fadeIn(3000);
	//TODO recheck compliance of the header/layout to see if this hack is necessary.
	//Check whether the structure is exactly like the example, not like the template code.
	if($(".mdl-layout__drawer-button").length <= 0){
		$('#aaa_header').bind('DOMNodeInserted', 
				function() {
					$(".mdl-layout__drawer-button").fadeIn(2000);
				}
		);
	}
	else{
		$(".mdl-layout__drawer-button").fadeIn(3000);
	}
}

function destroyCurrentPage(next){
	$("#aaa_content").hide("slide", { direction: "right" }, 1000);
	$("#aaa_content").html(""); //TODO fix this, disappears all at once, async
	$("#aaa_drawer").removeClass("is-visible");
	$("#aaa_header_title").fadeOut(1000,function(){
		$("#aaa_header_title").html(next);
		$("#aaa_header_title").fadeIn(1000);
	});
}





function getAvatarHeader(){
	var html = "<header class='aaa-drawer-header mdl-layout__header'>";
	html += "<img src='/avatar' />";
	html += "<div class='aaa-options-dropdown'>";
	html += "<span>"+User['email']+"</span>";
	
	html += "<div class='mdl-layout-spacer'></div>";
	
	html += "<button id='aaa_user_options' class='mdl-button mdl-js-button mdl-button--icon'>";
	html += "<i class='material-icons'>arrow_drop_down</i>";
	html += "</button>";

	html += "<div class='mdl-tooltip' for='aaa_user_options'>"+Text['options']+"</div>"; //TODO fix that it is too low.
	
	html += "<ul class='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect' for='aaa_user_options'>";
	html += "<li class='mdl-menu__item'><i class='material-icons'>settings</i> "+Text['settings']+"</li>";
	html += "<li class='mdl-menu__item'><i class='material-icons'>exit_to_app</i> "+Text['logout']+"</li>";
	html += "</ul>";
	
	
	html += "</div>";
	html += "</header>";
	return html;
}

function getDrawerMenu(){
	var html =  "<div id='aaa_drawer' class='mdl-layout__drawer'>";
	//document.getElementById("aaa_drawer").className = document.getElementById("aaa_drawer").className.replace(" is-visible","");
	html += getAvatarHeader();
	html += "<nav class='mdl-navigation'>";
	html += "<a class='mdl-navigation__link mdl-color-text--primary-dark' onClick=''><i class='material-icons'>home</i> "+Text['home']+"</a>";
	html += "<a class='mdl-navigation__link mdl-color-text--primary-dark' onClick=''><i class='material-icons'>assignment_ind</i> "+Text['manage_profile']+"</a>";
	html += "<a class='mdl-navigation__link mdl-color-text--primary-dark' onClick='TrainingPage.buildTrainingsPage();'><i class='material-icons'>create</i> "+Text['manage_trainings']+"</a>";
	html += "<a class='mdl-navigation__link mdl-color-text--primary-dark' onClick=''><i class='material-icons'>history</i> "+Text['performance_history']+"</a>";
	html += "<a class='mdl-navigation__link mdl-color-text--primary-dark' onClick=''><i class='material-icons'>help_outline</i> "+Text['help']+"</a>";
	html += "</nav>";
	html += "</div>";
	
	return html;
}

function buildApplication(){
	initializeApplication();
	var html = "";
	// Always shows a header, even in smaller screens. -->
	html += "<div class='mdl-layout mdl-js-layout mdl-layout--fixed-header'>";
	html += "<header id='aaa_header' class='mdl-layout__header'>";
	html += getHeader("");
	html += "</header>";
	html += getDrawerMenu();
	html += "<main class='mdl-layout__content'>";
	html += "<div id='aaa_content' class='page-content mdl-grid'>";
	html += "</div>";
	html += "</main>";
	html += getFooter();
	html += "</div>";
	document.body.innerHTML = html;
	//$("#aaa_content").hide();

	if(User.isLoggedIn()){
		buildHomePage();
	}
	else{
		buildLoginPage();
	}
}

function initializeApplication(){
	var browser_language = navigator.languages[0] || navigator.userLanguage;
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
	//document.body.innerHTML = "";
	//while(!Text.isLoaded());
}

function swapLanguage(code){
	User.setLanguage(code);
	location.reload();
}

//TODO study a way to call this properly via event.
function makeFreakingMDLwork() {
  "classList" in document.createElement("div") && "querySelector" in document && "addEventListener" in window && Array.prototype.forEach ? (document.documentElement.classList.add("mdl-js"), componentHandler.upgradeAllRegistered()) : componentHandler.upgradeElement = componentHandler.register = function() {}
}

//TODO rename to TrainingsPage
var TrainingPage = {
	buildTrainingsPage: function(){
		destroyCurrentPage(Text['manage_trainings']);
		
		var html = "<div class='mdl-cell--12-col'>"; 
		html += "<button id='aaa_new_training' onClick='TrainingPage.openTraining();' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>";
		html += "<i class='material-icons'>add gps_off</i>";
		html += "</button>";
		
		html += "<div class='mdl-tooltip' for='aaa_new_training'>"+Text['add_new_training']+"</div>";
		
		html += "<button id='aaa_new_gauge' onClick='TrainingPage.openGauge();' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>";
		html += "<i class='material-icons'>add gps_fixed</i>";
		html += "</button>";
		
		html += "<div class='mdl-tooltip' for='aaa_new_gauge'>"+Text['add_new_gauge']+"</div>";
		
		html += "</div>";
		
		html += "<div id='aaa_training_page_content' class='mdl-grid mdl-cell--12-col'></div>";
		$("#aaa_content").html(html);
		makeFreakingMDLwork();
		$("#aaa_content").show("slide", { direction: "left" }, 1000);
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
				$("#aaa_gauge_ends").html(TrainingPage.HTML.getGaugeEnds(User.getGaugeDraft().ends));
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
			html += "<div class='demo-card-wide mdl-card mdl-shadow--2dp'>";
			html += "<div class='mdl-card__title'>";
			html += "<h1 class='mdl-card__title-text'>"+Text['add_new_training']+"</h1>";
			html += "</div>";
			
			var now = new Date().toJSON().substring(0,10);
			html += "<div class='aaa-training-field'>";
			html += "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
			html += "<input class='mdl-textfield__input' type='text' pattern='[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])' id='aaa_training_date' value='"+now+"'/>";
			html += "<label class='mdl-textfield__label' for='aaa_training_date'>"+Text['date']+"</label>";
			html += "<span class='mdl-textfield__error'>"+Text['not_a_date']+"</span>";
			html += "</div>";
			html += "</div>";
			
			html += "<div id='aaa_training_content' class='mdl-card__supporting-text'>";
			html += this.getTrainingDraft();
			html += "</div>";
			
			html += "<div class='mdl-card__actions mdl-card--border'>";
			
			html += "<form onsubmit='return false'>";
			
			html += "<div class='aaa-training-field'>";
			html += "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
			html += "<input class='mdl-textfield__input' type='text' pattern='^[0-9]+$' id='aaa_training_arrow_count' />";
			html += "<label class='mdl-textfield__label' for='aaa_training_arrow_count'>"+Text['arrow_count']+"</label>";
			html += "<span class='mdl-textfield__error'>"+Text['not_an_integer']+"</span>";
			html += "</div>";
			html += "</div>";
			
			html += "<div class='aaa-training-field'>";
			html += "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
			html += "<input class='mdl-textfield__input' type='text' pattern='-?[0-9]*(\.[0-9]+)?' id='aaa_training_distance' />";
			html += "<label class='mdl-textfield__label' for='aaa_training_distance'>"+Text['distance']+"</label>";
			html += "<span class='mdl-textfield__error'>"+Text['not_a_number']+"</span>";
			html += "</div>";
			html += "</div>";
			
			html += "<button id='aaa_add_training' onClick='TrainingPage.addTraining();' class='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored'>";
			html += "<i class='material-icons'>add</i>";
			html += "</button>";
			
			html += "<div class='mdl-tooltip' for='aaa_add_training'>"+Text['add_training']+"</div>";
			
			
			html += "<div id='aaa_training_options'>";
			
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
			
			
			
			html += "</form>";
			
			html += "</div>";
			
			html += "<div class='mdl-card__menu'>";
			html += "<button id='aaa_upload_training' onClick='TrainingPage.submitTraining();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>";
			html += "<i class='material-icons'>backup</i>";
			html += "</button>";
			
			html += "<div class='mdl-tooltip' for='aaa_upload_training'>"+Text['upload_training']+"</div>";
			
			html += "<button id='aaa_discard_training' onClick='TrainingPage.discardTraining();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>";
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
			html += "<div id='aaa_gauge_card' class='mdl-cell mdl-cell--4-col'>";
			html += "<div class='demo-card-wide mdl-card mdl-shadow--2dp'>";
			html += "<div class='mdl-card__title'>";
			html += "<h1 class='mdl-card__title-text'>"+Text['add_new_gauge']+"</h1>";
			html += "</div>";
			html += "<div id='aaa_gauge_content' class='mdl-card__supporting-text'>";
			html += this.getGaugeDraft();
			html += "</div>";
			html += "<div class='mdl-card__actions mdl-card--border'>";
			
			html += "<form onsubmit='return false'>";
			
			html += "<div class='mdl-grid'>";
			
			html += "<div id='aaa_gauge_end' class='aaa-arrows'></div>";
			
			html += "<button id='aaa_close_end' onClick='TrainingPage.closeEnd();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--colored'>";
			html += "<i class='material-icons'>done</i>";
			html += "</button>";
			//TODO rename the text to match id
			html += "<div class='mdl-tooltip' for='aaa_close_end'>"+Text['add_gauge_end']+"</div>";
			
			html += "<div class='aaa-arrows'>";
			
			for(var i = 1; i <= 10; i++){
				html += "<button id='aaa_arrow_"+i+"' onClick='TrainingPage.addArrow("+i+");' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect aaa-arrow-input'>";
				html += "<strong>"+i+"</strong>";
				html += "</button>";
			}
			
			html += "</div>";
			
			
			html += "<button id='aaa_remove_arrow' onClick='TrainingPage.removeArrow();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--colored'>";
			html += "<i class='material-icons'>undo</i>";
			html += "</button>";
			
			html += "<div class='mdl-tooltip' for='aaa_remove_arrow'>"+Text['remove_end_arrow']+"</div>";
			
			
			html += "</form>";
			
			html += "</div>";
			
			html += "</div>";
			
			html += "<div class='mdl-card__menu'>";
			html += "<button id='aaa_upload_gauge' onClick='TrainingPage.submitGauge();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>";
			html += "<i class='material-icons'>backup</i>";
			html += "</button>";
			
			html += "<div class='mdl-tooltip' for='aaa_upload_gauge'>"+Text['upload_gauge']+"</div>";
			
			html += "<button id='aaa_discard_gauge' onClick='TrainingPage.discardGauge();' class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>";
			html += "<i class='material-icons'>delete</i>";
			html += "</button>";
			
			html += "<div class='mdl-tooltip' for='aaa_discard_gauge'>"+Text['discard_gauge']+"</div>";
			
			html += "</div>";
			
			html += "</div>";
			
			html += "</div>";
			
			html += "<div class='mdl-layout-spacer'></div>";
			
			return html;
		},
		
		getGaugeDraft: function(){
			var now = new Date().toJSON().substring(0,10);
			var html = "<div class='aaa-training-field'>";
			//TODO rename training field class (Both cards use it)
			html += "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
			html += "<input class='mdl-textfield__input' type='text' pattern='[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])' id='aaa_gauge_date' value='"+now+"'/>";
			html += "<label class='mdl-textfield__label' for='aaa_gauge_date'>"+Text['date']+"</label>";
			html += "<span class='mdl-textfield__error'>"+Text['not_a_date']+"</span>";
			html += "</div>";
			html += "</div>";
			
			html += "<div class='aaa-training-field'>";
			html += "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>";
			html += "<input class='mdl-textfield__input' type='text' pattern='-?[0-9]*(\.[0-9]+)?' id='aaa_gauge_distance' />";
			html += "<label class='mdl-textfield__label' for='aaa_gauge_distance'>"+Text['distance']+"</label>";
			html += "<span class='mdl-textfield__error'>"+Text['not_a_number']+"</span>";
			html += "</div>";
			html += "</div>";
			
			html += "<div id='aaa_gauge_targets'>";
			
			for(var i = 0; i < Text['targets'].length;i++){
				html += "<label class='mdl-radio mdl-js-radio mdl-js-ripple-effect' for='aaa_option_"+i+"'>";
				html += "<input type='radio' id='aaa_option_"+i+"' class='mdl-radio__button' name='targets' value='"+Text['targets'][i]+"' checked />";
				html += "<span class='mdl-radio__label'>"+Text['targets'][i]+"</span>";
				html += "</label>";
			}
			
			html += "</div>";
			
			html += "<div id='aaa_gauge_ends'>";
			if(User.getGaugeDraft()){
				html += this.getGaugeEnds(User.getGaugeDraft().ends);
			}
			html += "</div>";
			return html;
		},
		
		getGaugeEnds: function(ends){
			var html = "<div>";
			for(var i = 0; i < ends.length; i++){
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
			var html = "";
			if(User.getTrainingDraft()){
				var draft = User.getTrainingDraft();
				for(type in draft){
					if(Text[type] && type != 'date'){
						html+="<h2>"+Text[type]+"</h2>";
						for(distance in draft[type]){
							var number = parseInt(distance);
							if(number > 0){
								html+="<p><strong>"+distance+"m:</strong> "+draft[type][distance]+"</p>";
							}
						}
					}
				}
			}
			return html;
		}
	}
}


var Report = {
	buildMonthlyReport: function(download){
		var current = new Date(download.start);
		var stop = new Date(download.end);
		var request = download.month;
		var week = download.week_start;
		
		var html = "<div>";

		html += "<div class='aaa-report-sidebar'>";
		html += "<div class='aaa-report-skip-header'></div>";
		html += "<div id='aaa_report_labels'>";
		
		html += "</div>";
		html += "</div>";
		
		while(current < stop){
			html += "<div class='aaa-report-week'>";
			
			html += "<div class='aaa-report-week-title'>"
			html += "<h2>"+week+"</h2><p>week_number</p>";
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
		html += "<p>warmup</p>";
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
				if(download.arrow_counts.warmup[current.toJSON().substring(0,10)]){
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
					label += "<p>"+type+"</p>";
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
				for(var i = download.week_start;i < week; i++){
					//TODO improve this with JQuery
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
		html += "<p>warmout</p>";
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
				if(download.arrow_counts.warmout[current.toJSON().substring(0,10)]){
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
		html += "<p>technique_totals</p>";
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
		html += "<p>totals</p>";
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
		html += "<p>weekly_technique</p>";
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
		html += "<p>weekly_total</p>";
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
							label += "<p class='aaa-report-individual-results'>"+order+"</p>";
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
					
					label += "<p> average_inacurracy </p>";
					
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
		html += "<p>result_totals</p>";
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
		html += "<p>weekly_inacurracy</p>";
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
		
		$("#aaa_report_content").append(this.HTML.getDailyGraph(download));
		$("#aaa_report_content").append(this.HTML.getSeasonGraph(download));
	},
	
	HTML:{
		getStyle: function(){
			var html = "<style>";
			
			html += ".border {fill:none;stroke:#00F;stroke-width:1;stroke-opacity:1}";
			
			html += ".plan {fill:#FFF;stroke:#000;stroke-opacity:1}";
			html += ".training {fill:#CCFFFF;stroke:#000;stroke-opacity:1}";
			html += ".target {fill:#FFCC99;stroke:#000;stroke-opacity:1}";
			html += ".result {fill:#33CCCC;stroke:#000;stroke-opacity:1}";
			html += ".estimation {fill:none;stroke:#00F;stroke-opacity:1;stroke-width:2}";
			html += ".strength {fill:#FFCC00;stroke:#000;stroke-opacity:1}";
			
			html += ".grid {fill:none;stroke:#000;stroke-opacity:1;stroke-dasharray: 10 5;stroke-width:2}";
			
			html += ".share {fill:#777}";
			html += ".share-shadow {fill:#000}";
			
			html += ".graph_scale {}";
			html += ".graph_label {font-size:40}";
			

			html += ".bottom {font-size:40; text-anchor:middle}";
			html += ".left {font-size:30; text-anchor:end}";
			html += ".right {font-size:30; text-anchor:start}";
			html += ".title {font-size:40;font-weight:bold; text-anchor:start}";
			
			html += "</style>";
			return html;
		},
		
		getGrid: function(height, columns){
			var s = "<g>";
			for(var i = 0; i <= columns; i++){
				s += "<path class='grid' d='m "+100*i+",0 0,"+(-height)+"  ' />";
			}
			for(var i = height; i > 0; i -= height/10){
				s += "<path class='grid' d='m 0,"+(-i)+" "+(columns*100)+",0  ' />";
			}
			s += "</g>";
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

		getResult: function(value,position,size,min,max) {
			var s = "<g>";
			var k = -((value-min)/(max-min));
			s+= "<circle class='result' cx='"+(position*100+50)+"' cy='"+(k*size)+"' r='10'/>";
			s+="</g>";
			return s;
		},

		getEstimations: function(data, size,min,max) {
			var s = "<g><path class='estimation' d='M ";
			var first = true;
			for(var i = 0; i < data.length;i++){ //TODO improve this
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
		
		//TODO maybe move calls from HTML to HTML.SVG
		getDailyGraph: function(download){

			var days = (new Date(download.end) - new Date(download.start))/(1000*60*60*24);
			var season = download.season;
			var max = Math.ceil(download.season.max/50)*50+50;
			
			var general_width = (days*100+700+150);
			var general_height = max+100+50;
			var width = 20.2/(100/general_width);
			
			var html = "<svg xmlns='http://www.w3.org/2000/svg'";
			html += " id='season'";
			html += " version='1.1'";
			html += " viewBox='0 "+(-general_height)+" "+(general_width+2)+" "+(general_height+1)+"'";
			html += " preserveAspectRatio='xMidYMid meet'";
			html += " width='"+width+"pt'>";
			
			html += this.getStyle();
			
			html += "<g id='main'>";
			
			html += this.getLabels(max);
			
			html += "<g id='data' transform='translate(700,-100) scale(1,1)'>";
			
			html += this.getGrid(max,days);
			
			html += this.getBottomDays(download.start,download.end);
			html += this.getLeftAxis(0,max,"arrow_count",max);
			
			var estimate = false;
			var estimations = [];
			var bullets = {};
			
			var current = new Date(download.start);
			var week = download.week_start;
			var stop = new Date(download.end);
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
					html += this.getActual(gauged,technique,i);
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
						estimations.push(-1);
					}
				}

					
				current.setDate(current.getDate() + 1);
				i++
			}
			
			var difference = max_result - min_result;
			max_result += 0.1*difference;
			min_result -= 0.1*difference;
			html += this.getEstimations(estimations,max,min_result,max_result);
			
			html += this.getRightAxis(10-min_result,10-max_result,"results",max,days*100);
			
			for(bullet in bullets){
				html += this.getResult(bullets[bullet],bullet,max,min_result,max_result);
			}
			
			
			html += "</g>";
			
			html += "</g>";
			
			html += "</svg>";
			
			return html;
		},
		
		getSeasonGraph: function(download){
			
			var weeks = download.season.size;
			var season = download.season;
			var max = Math.ceil(download.season.max/50)*50+50;
			
			var general_width = (weeks*100+700+150);
			var general_height = max + 150 + 50;
			var width = 20.2/(100/general_width);
			
			var html = "<svg xmlns='http://www.w3.org/2000/svg'";
			html += " id='season'";
			html += " version='1.1'";
			html += " viewBox='0 "+(-general_height)+" "+(general_width+2)+" "+(general_height+2)+"'";
			html += " preserveAspectRatio='xMidYMid meet'";
			html += " width='"+width+"pt'>";
			
			html += this.getStyle();
			
			html += "<g id='main'>";
			
			html += this.getLabels(max);
			
			html += "<g id='data' transform='translate(700,-150)'>";
			
			html += this.getGrid(max,weeks);
			
			html += this.getBottomWeeks(season.start,season.start+season.size);
			html += this.getLeftAxis(0,max,"arrow_count",max);
			
			var estimate = false;
			var estimations = [];
			var bullets = {};
			var min_result = 10;
			var max_result = 0;
			for(i in season){
				if(!isNaN(i)){
					html += this.getPlan(season[i].total_plan,i-season.start);
					html += this.getActual(season[i].total-season[i].technique_total,season[i].technique_total,i-season.start);
					html += this.getShare(season[i].total_plan-season[i].gauged_plan,i-season.start);
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
			html += this.getEstimations(estimations,max,min_result,max_result);
			
			html += this.getRightAxis(10-min_result,10-max_result,"results",max,weeks*100);
			
			for(bullet in bullets){
				html += this.getResult(bullets[bullet],bullet-season.start,max,min_result,max_result);
			}
			
			html += "</g>";
			
			html += "</g>";
			
			html += "</svg>";
			
			return html;
		},

		getRightAxis: function(min, max,title,size,offset){
			var html = "<g id='right' transform='translate(0,0)'>";
			var unit = (max - min) / 10;
			var block = (size/10);
			for(var i = min,j = 0; j <= size; i+=unit,j+=block){
				html += "<text class='right' x='"+(offset+10)+"' y='-"+j+"'>"+(i).toPrecision(3)+"</text>";
			}
			html += "<text transform='translate("+(offset+10+90)+",0) rotate(-90)' class='title' x='0' y='0'>"+title+"</text>";
			html += "</g>";
			return html;
		},

		getLeftAxis: function(min, max,title,size){
			var html = "<g id='left' transform='translate(0,0)'>";
			var unit = (max - min) / 10;
			var block = (size/10);
			for(var i = min,j = 0; i <= max; i+=unit,j+=block){
				html += "<text class='left' x='-10' y='-"+j+"'>"+Math.floor(i)+"</text>";
			}
			html += "<text transform='translate("+(-10-60)+",0) rotate(-90)' class='title' x='0' y='0'>"+title+"</text>";
			html += "</g>";
			return html;
		},

		getBottomDays: function(min, max){
			var html = "<g id='bottom'>";
			var end =  new Date(max);
			for(var i = new Date(min), j = 0; i < end; i.setDate(i.getDate() + 1,j++) ){
				html += "<g transform=translate("+(j*100+50)+",50)>";
				html += "<text class='bottom' x='0' y='0'>"+i.toJSON().substring(8,10)+"</text>";
				html += "</g>";
			}
			html += "</g>";
			return html;
		},

		getBottomWeeks: function(min, max){
			var html = "<g id='bottom'>";
			for(var i = min; i < max; i++){
				html += "<g transform=translate("+((i-min)*100+50)+",50)>";
				html += "<text class='bottom' x='0' y='0'>wk</text>";
				html += "<text class='bottom' x='0' y='45'>"+i+"</text>";
				html += "</g>";
			}
			html += "</g>";
			return html;
		},

		getLabels: function(max){
			var html = "<g id='labels' transform='translate(0,-"+max+")'>";
			
			html += "<rect class='plan' x='0' y='"+(1*max/10-25)+"' height='20' width='100' />";
			html += "<text class='graph_label' x='125' y='"+(1*max/10-2)+"'> total_plan </text>"
			
			html += "<rect class='training' x='0' y='"+(2*max/10-25)+"' height='20' width='100' />";
			html += "<text class='graph_label' x='125' y='"+(2*max/10-2)+"'> technique_totals </text>"
			
			html += "<rect class='target' x='0' y='"+(3*max/10-25)+"' height='20' width='100' />";
			html += "<text class='graph_label' x='125' y='"+(3*max/10-2)+"'> totals </text>"
			
			html += "<rect class='share-shadow' x='5' y='"+(4*max/10-25)+"' height='20' width='100' />";
			html += "<rect class='share' y='"+(4*max/10-5-25)+"' height='20' width='100' />";
			html += "<text class='graph_label' x='125' y='"+(4*max/10-2)+"'> technique_share </text>"
			
			html += "<path class='estimation' d='M 0,"+(5*max/10-12.5)+" l 100,0'/>";
			html += "<circle class='result' cx='50' cy='"+(5*max/10-12.5)+"' r='10'/>";
			html += "<text class='graph_label' x='125' y='"+(5*max/10-2)+"'> result_totals </text>"
			
			html += "<circle class='strength' cx='50' cy='"+(6*max/10-12.5)+"' r='10'/>";
			html += "<text class='graph_label' x='125' y='"+(6*max/10-2)+"'> strength_training </text>"
			
			html += "</g>";
			
			return html;
		}
	}
}