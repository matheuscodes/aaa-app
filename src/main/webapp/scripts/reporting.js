console.log('hello');

var xmlhttp = new XMLHttpRequest();
var url = "/reports/monthly/2015/08";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	console.log(xmlhttp.responseText);
        var download = JSON.parse(xmlhttp.responseText);
        buildMonthlyReport(download);
    }
}

xmlhttp.open("GET", url, true);
xmlhttp.send();

function buildMonthlyReport(download){
	var week = download.week_start;
	
	var current = new Date(download.start);
	var stop = new Date(download.end);
	
	var width = 100/((stop - current)/(1000*60*60*24*7))
	var html = "<div>";
	
	while(current < stop){
		html += "<div class='week' style='width:"+width+"%'>";

		html += "<div class='week-title'>"
		html += "<h2>"+week+"</h2><p>Wochen-Nr.</p>";
		html += "</div>";
		
		html += "<div class='days'>"
		for(i = 0; i < 7;i++){
			html += "<div class='day'>";
			html += current.getDate();
			html += "</div>";
			current.setDate(current.getDate() + 1);
			console.log(current);
		}
		week++;
		html += "</div>";
		html += "</div>";
	}
	html += "</div>"
	document.body.innerHTML = html;
}