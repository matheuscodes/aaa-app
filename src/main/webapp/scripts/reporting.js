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
	
	var request = download.month;
	var current = new Date(download.start);
	var stop = new Date(download.end);
	
	var width = 85/((stop - current)/(1000*60*60*24*7))
	var html = "<div>";

	html += "<div class='sidebar'>";
	html += "<div class='skip_header'></div>";
	html += "<div id='labels'>";
	
	html += "</div>";
	html += "</div>";
	
	while(current < stop){
		html += "<div class='week' style='width:"+width+"%'>";
		
		html += "<div class='week-title'>"
		html += "<h2>"+week+"</h2><p>Wochen-Nr.</p>";
		html += "</div>";

		html += "<div class='days'>"
		for(i = 0; i < 7;i++){
			html += "<div class='day header_day'>";
			html += current.getDate();
			html += "</div>";
			current.setDate(current.getDate() + 1);
			console.log(current);
		}
		html += "<div id='week-data-"+week+"'></div>";
		
		html += "</div>";
		
		html += "</div>";
		week++;
	}
	html += "</div>"
	document.body.innerHTML = html;
	
	
	for(var distance in download.arrow_counts){
		
		if(distance != 'warmup' && distance != 'warmout'){
			html = document.getElementById("labels").innerHTML;
			html += "<div id='counts-"+distance+"' class='label'>"
			html += "<p>"+distance+" m</p>";
			html += "</div>";
			document.getElementById("labels").innerHTML = html;
			for(var type in download.arrow_counts[distance]){
				
				html = document.getElementById("counts-"+distance).innerHTML;
				html += "<div>"+type+"</div>";
				document.getElementById("counts-"+distance).innerHTML = html;
				
				current = new Date(download.start);
				week = download.week_start;
				while(current < stop){
					html = document.getElementById("week-data-"+week).innerHTML;
					for(i = 0; i < 7;i++){
						html += "<div class='day";
						if(i > 4) html += " weekend";
						if(current.getMonth() + 1 != download.month) html += " offtime";
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
					console.log(week+","+current);
					document.getElementById("week-data-"+week).innerHTML = html;
					week++;				
				}
			}
		}
	}
	
}