function getDrawerMenu(){
	var html =  "<div class='mdl-layout__drawer'>";
	
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
	var html =  "";
	html += "<header class='mdl-layout__header'>";
	html += "<div class='mdl-layout__header-row'>";
    // Title -->
	html += "<span class='mdl-layout-title'>"+title+"</span>";
    html += "</div>";
	html += "</header>";
	
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

function processLogin(){
	console.log("Oie!");
}

function getLoginCard(){
	var html = "<div class='mdl-cell mdl-cell--middle mdl-cell--4-col mdl-cell--2-col-tablet mdl-cell--hide-phone'></div>";
	html += "<div class='mdl-cell mdl-cell--middle mdl-cell--4-col'>";
	html +=  "<div id='login_box' class='mdl-card mdl-shadow--2dp'>";
	html += "<div class='mdl-card__title'" +
			" style='background: url(\"img/random/"+Math.floor(Math.random()*7)+".jpg\") center / cover;'"+
			">";
	html += "</div>";

	html += "<form onSubmit='JavaScript:processLogin()'>";
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
	html += "<i class='material-icons'>perm_identity add</i>";
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

function buildLogin(){
	var html = "";
	// Always shows a header, even in smaller screens. -->
	html += "<div class='mdl-layout mdl-js-layout mdl-layout--fixed-header'>";
	html += getHeader("Arkanos Advanced Archery");
	html += "<main class='mdl-layout__content'>";
	html += "<div class='page-content mdl-grid'>";
	html += getLoginCard();
	html += "</div>";
	html += "</main>";
	html += getFooter();
	html += "</div>";
	document.body.innerHTML = html;
}
