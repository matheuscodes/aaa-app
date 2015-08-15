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
		html += "<h2>"+week+"</h2><p>week_number</p>";
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
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='warmup' class='label'>"
	html += "<p>warmup</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	current = new Date(download.start);
	week = download.week_start;
	while(current < stop){
		html = document.getElementById("week-data-"+week).innerHTML;
		for(i = 0; i < 7;i++){
			html += "<div class='day end";
			if(i > 4) html += " weekend";
			if(current.getMonth() + 1 != download.month) html += " offtime";
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
		console.log(week+","+current);
		document.getElementById("week-data-"+week).innerHTML = html;
		week++;				
	}
	
	
	
	for(var distance in download.arrow_counts){		
		if(!isNaN(distance)){ 
			html = document.getElementById("labels").innerHTML;
			html += "<div id='counts-"+distance+"' class='label'>"
			html += "</div>";
			document.getElementById("labels").innerHTML = html;
			var label = "";
			label += "<table cellspacing='0' cellpadding='0'><tr>"
			label += "<td class='text'><p>"+distance+" m</p></td>";
			label += "<td class='text'>";
			for(var type in download.arrow_counts[distance]){
				label += "<p>"+type+"</p>";
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
					document.getElementById("week-data-"+week).innerHTML = html;
					week++;				
				}
			}
			for(var i = download.week_start;i < week; i++){
				var element = document.getElementById('week-data-'+i).getElementsByClassName('day');
				var length = element.length;
				for(j = 0; j < 7; j++){
					element[length-1-j]['className'] += " end";
				}
			}
			label += "</td>";
			label += "</table></tr>"
			document.getElementById("counts-"+distance).innerHTML = label;
		}
	}
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='warmout' class='label'>"
	html += "<p>warmout</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	current = new Date(download.start);
	week = download.week_start;
	while(current < stop){
		html = document.getElementById("week-data-"+week).innerHTML;
		for(i = 0; i < 7;i++){
			html += "<div class='day end";
			if(i > 4) html += " weekend";
			if(current.getMonth() + 1 != download.month) html += " offtime";
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
		console.log(week+","+current);
		document.getElementById("week-data-"+week).innerHTML = html;
		week++;				
	}
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='technique_totals' class='label'>"
	html += "<p>technique_totals</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	current = new Date(download.start);
	week = download.week_start;
	while(current < stop){
		html = document.getElementById("week-data-"+week).innerHTML;
		for(i = 0; i < 7;i++){
			html += "<div class='day end subtotal";
			if(i > 4) html += " weekend";
			if(current.getMonth() + 1 != download.month) html += " offtime";
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
		console.log(week+","+current);
		document.getElementById("week-data-"+week).innerHTML = html;
		week++;				
	}
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='totals' class='label'>"
	html += "<p>totals</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	current = new Date(download.start);
	week = download.week_start;
	while(current < stop){
		html = document.getElementById("week-data-"+week).innerHTML;
		for(i = 0; i < 7;i++){
			html += "<div class='day end";
			if(i > 4) html += " weekend";
			if(current.getMonth() + 1 != download.month) html += " offtime";
			html += " summary'>";
			if(download.arrow_counts.totals[current.toJSON().substring(0,10)]){
				html += download.arrow_counts.totals[current.toJSON().substring(0,10)];
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
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='weekly_technique' class='label'>"
	html += "<p>weekly_technique</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	for(week in download.weekly){
		html = document.getElementById("week-data-"+week).innerHTML;
		html += "<div class='week-summary end";
		html += " '>";
		if(download.weekly[week].total){
			html += download.weekly[week].technique_total;
		}
		html += "</div>";
		document.getElementById("week-data-"+week).innerHTML = html;
	}
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='weekly_technique' class='label'>"
	html += "<p>weekly_total</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	for(week in download.weekly){
		html = document.getElementById("week-data-"+week).innerHTML;
		html += "<div class='week-summary end";
		html += " '>";
		if(download.weekly[week].total){
			html += download.weekly[week].total;
		}
		html += "</div>";
		document.getElementById("week-data-"+week).innerHTML = html;
	}
	
	
	for(var distance in download.results){		
		if(!isNaN(distance)){ 
			html = document.getElementById("labels").innerHTML;
			html += "<div id='results-"+distance+"' class='label'>"
			html += "</div>";
			document.getElementById("labels").innerHTML = html;
			var label = "";
			label += "<table cellspacing='0' cellpadding='0'><tr>"
			label += "<td class='text'><p>"+distance+" m</p></td>";
			label += "<td class='text'>";
			for(var classes in download.results[distance]){
				label += "<p class='classes'>"+classes+"</p>";
				console.log(classes);
				console.log(download.results);
				for(var order in download.results[distance][classes]){
					if(order != 0){
						label += "<p class='individual_results'>"+order+"</p>";
						current = new Date(download.start);
						week = download.week_start;
						while(current < stop){
							html = document.getElementById("week-data-"+week).innerHTML;
							for(i = 0; i < 7;i++){
								html += "<div class='day";
								if(i > 4) html += " weekend";
								if(current.getMonth() + 1 != download.month) html += " offtime";
								html += "'>";
								console.log(download.results[distance][classes]);
								if(download.results[distance][classes][order][current.toJSON().substring(0,10)]){
									html += download.results[distance][classes][order][current.toJSON().substring(0,10)];
								}
								else{
									html += " ";
								}
								html += "</div>";
								current.setDate(current.getDate() + 1);
							}
							document.getElementById("week-data-"+week).innerHTML = html;
							week++;				
						}
					}
				}
				
				label += "<p> average_inacurracy </p>";
				
				current = new Date(download.start);
				week = download.week_start;
				while(current < stop){
					html = document.getElementById("week-data-"+week).innerHTML;
					for(i = 0; i < 7;i++){
						html += "<div class='day subtotal";
						if(i > 4) html += " weekend";
						if(current.getMonth() + 1 != download.month) html += " offtime";
						html += "'>";
						console.log(download.results[distance][classes]);
						if(download.results[distance][classes][0][current.toJSON().substring(0,10)]){
							html += (10-download.results[distance][classes][0][current.toJSON().substring(0,10)]).toPrecision(3);
						}
						else{
							html += " ";
						}
						html += "</div>";
						current.setDate(current.getDate() + 1);
					}
					document.getElementById("week-data-"+week).innerHTML = html;
					week++;				
				}
				
				for(var i = download.week_start;i < week; i++){
					var element = document.getElementById('week-data-'+i).getElementsByClassName('day');
					var length = element.length;
					for(j = 0; j < 7; j++){
						element[length-1-j]['className'] += " end";
					}
				}
				
			}
			for(var i = download.week_start;i < week; i++){
				var element = document.getElementById('week-data-'+i).getElementsByClassName('day');
				var length = element.length;
				for(j = 0; j < 7; j++){
					element[length-1-j]['className'] += " end";
				}
			}
			label += "</td>";
			label += "</table></tr>"
			document.getElementById("results-"+distance).innerHTML = label;
		}
	}
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='result_totals' class='label'>"
	html += "<p>result_totals</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	current = new Date(download.start);
	week = download.week_start;
	while(current < stop){
		html = document.getElementById("week-data-"+week).innerHTML;
		for(i = 0; i < 7;i++){
			html += "<div class='day end";
			if(i > 4) html += " weekend";
			if(current.getMonth() + 1 != download.month) html += " offtime";
			html += " summary'>";
			if(download.results.result_totals[current.toJSON().substring(0,10)]){
				html += (10-download.results.result_totals[current.toJSON().substring(0,10)]).toPrecision(3);
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
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='weekly_technique' class='label'>"
	html += "<p>weekly_technique</p>";
	html += "</div>";
	document.getElementById("labels").innerHTML = html;
	for(week in download.weekly){
		html = document.getElementById("week-data-"+week).innerHTML;
		html += "<div class='week-summary end";
		html += " summary'>";
		if(download.weekly[week].result_total){
			html += (10-download.weekly[week].result_total).toPrecision(3);
		}
		html += "</div>";
		document.getElementById("week-data-"+week).innerHTML = html;
	}
	
	document.body.innerHTML += "<img src='/img/seasons/2015/summer' style='padding:10pt 0' width='100%'/>";
}