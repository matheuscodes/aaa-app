function getHeader(title){
	var html = "<div class='mdl-layout__header-row'>";
    // Title -->
	html += "<span id='aaa_header_title' class='mdl-layout-title'>"+title+"</span>";
	html += "<div class='mdl-layout-spacer'></div>";
    
	html += "<button id='aaa_header_logout' class='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-color-text--accent-contrast'>";
	html += "<i class='material-icons'>exit_to_app</i>";
	html += "</button>";
	html += "<div class='mdl-tooltip' for='aaa_header_logout'>logout</div>";
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
	html += "<label class='mdl-textfield__label' for='email'>Email</label>";
	html += "<span class='mdl-textfield__error'>This is not a valid email!</span>";
	html += "</div>";
	
	html += "<div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label aaa-login'>";
	html += "<input class='mdl-textfield__input' type='password' id='password' />";
	html += "<label class='mdl-textfield__label' for='password'>Password</label>";
	html += "</div>";
	
	html += "</div>";
	
	html += "<div class='mdl-card__actions mdl-card--border'>";
	html += "<a class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effec'>";
	html += "<i class='material-icons'>person_add</i>";
	html += "</a>";
	html += "<button type='submit' id='login' class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effec'>";
	html += "Login <i class='material-icons'>chevron_right</i>";
	html += "</button>";
	html += "</div>";
	html += "</form>";
	
	
	html += "</div>";
	html += "</div>";
	
	return html;
}

function doLogin(){
	if(processLogin()){
		$("#aaa_content").hide("slide", { direction: "right" }, 1000);
		$("#aaa_header_title").fadeOut(1000,function(){
			$("#aaa_header_title").html("Home");
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
	if($("#aaa_header_title").html() == "") $("#aaa_header_title").html("home");
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

function getAvatarHeader(){
	var html = "<header class='aaa-drawer-header mdl-layout__header'>";
	html += "<img src='/avatar'>";
	html += "<div class='aaa-options-dropdown'>";
	html += "<span>"+User['email']+"</span>";
	
	html += "<div class='mdl-layout-spacer'></div>";
	
	html += "<button id='aaa_user_options' class='mdl-button mdl-js-button mdl-button--icon'>";
	html += "<i class='material-icons'>arrow_drop_down</i>";
	html += "</button>";

	html += "<div class='mdl-tooltip' for='aaa_user_options'>options</div>"; //TODO fix that it is too low.
	
	html += "<ul class='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect' for='aaa_user_options'>";
	html += "<li class='mdl-menu__item'><i class='material-icons'>settings</i> settings</li>";
	html += "<li class='mdl-menu__item'><i class='material-icons'>exit_to_app</i> logout</li>";
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
	html += "<a class='mdl-navigation__link mdl-color-text--primary-dark' onClick=''><i class='material-icons'>home</i> home</a>";
	html += "<a class='mdl-navigation__link mdl-color-text--primary-dark' onClick=''><i class='material-icons'>assignment_ind</i> manage_profile</a>";
	html += "<a class='mdl-navigation__link mdl-color-text--primary-dark' onClick=''><i class='material-icons'>create</i> manage_trainings</a>";
	html += "<a class='mdl-navigation__link mdl-color-text--primary-dark' onClick=''><i class='material-icons'>history</i> performance_history</a>";
	html += "<a class='mdl-navigation__link mdl-color-text--primary-dark' onClick=''><i class='material-icons'>help_outline</i> help</a>";
	html += "</nav>";
	html += "</div>";
	
	return html;
}

function buildApplication(){
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
	$("#aaa_content").hide();

	if(processLogin()){
		buildHomePage();
	}
	else{
		buildLoginPage();
	}
}
