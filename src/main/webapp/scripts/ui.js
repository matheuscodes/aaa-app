function getDrawerMenu(){
	var html =  "<div id='aaa_drawer' class='mdl-layout__drawer'>";
	
	html += "<span class='mdl-layout-title'>Title</span>";
	html += "<nav class='mdl-navigation'>";
	html += "<a class='mdl-navigation__link' href=''>Link</a>";
	html += "<a class='mdl-navigation__link' href=''>Link</a>";
	html += "<a class='mdl-navigation__link' href=''>Link</a>";
	html += "<a class='mdl-navigation__link' href=''>Link</a>";
	html += "</nav>";
	html += "</div>";
	
	return html;
}

function getHeader(title){
	var html = "<div class='mdl-layout__header-row'>";
    // Title -->
	html += "<span id='aaa_header_title' class='mdl-layout-title'>"+title+"</span>";
	html += "<div class='mdl-layout-spacer'></div>";
    // Navigation. We hide it in small screens. -->
    /*<nav class="mdl-navigation mdl-layout--large-screen-only">
      <a class="mdl-navigation__link" href="">Link</a>
      <a class="mdl-navigation__link" href="">Link</a>
      <a class="mdl-navigation__link" href="">Link</a>
      <a class="mdl-navigation__link" href="">Link</a>
    </nav>*/
	html += "<button id='aaa_header_logout' class='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab'>";
	html += "<i class='material-icons'>exit_to_app</i>";
	html += "</button>";
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
	if($("#aaa_header_title").html() == "") $("#aaa_header_title").html("Home");
	$("#aaa_header_title").fadeIn(2000);
	$("#aaa_header_logout").fadeIn(3000);
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
