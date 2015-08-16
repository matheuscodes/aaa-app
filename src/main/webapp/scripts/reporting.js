var xmlhttp = new XMLHttpRequest();
var url = "/reports/monthly/2015/08";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
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
	
	//TODO maybe use it again...
	//var width = 85/((stop - current)/(1000*60*60*24*7))
	var html = "<div>";

	html += "<div class='sidebar'>";
	html += "<div class='skip_header'></div>";
	html += "<div id='labels'>";
	
	html += "</div>";
	html += "</div>";
	
	while(current < stop){
		html += "<div class='week' style='width:140pt'>";
		
		html += "<div class='week-title'>"
		html += "<h2>"+week+"</h2><p>week_number</p>";
		html += "</div>";

		html += "<div class='days'>"
		for(i = 0; i < 7;i++){
			html += "<div class='day header_day'>";
			html += current.getDate();
			html += "</div>";
			current.setDate(current.getDate() + 1);
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
		/**Dummies not to break the CSS child rule**/
		html += "</div><div></div><div></div><div></div><div></div><div></div><div></div>";
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
		/**Dummies not to break the CSS child rule**/
		html += "</div><div></div><div></div><div></div><div></div><div></div><div></div>";
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
		document.getElementById("week-data-"+week).innerHTML = html;
		week++;				
	}
	
	html = document.getElementById("labels").innerHTML;
	html += "<div id='weekly_technique' class='label'>"
	html += "<p>weekly_inacurracy</p>";
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
	
	//TODO put max in json
	document.body.innerHTML += drawDailyGraph(download);
	document.body.innerHTML += drawSeasonGraph(download);
}

function getGrid(height, columns){
	var s = "<g>";
	for(var i = 0; i <= columns; i++){
		s += "<path class='grid' d='m "+100*i+",0 0,"+(-height)+"  ' />";
	}
	for(var i = height; i > 0; i -= height/10){
		s += "<path class='grid' d='m 0,"+(-i)+" "+(columns*100)+",0  ' />";
	}
	s += "</g>";
	return s;
}

function getPlan(value, column){
	var s = "<g transform='translate(0,"+(-value)+")'>";
	s += "<rect class='plan' x='"+(10+column*100)+"' height='"+value+"' width='80' />";
	s += "</g>";
	return s;
}

function getActual(target, training, column){
	var s = "<g transform='translate(0,"+(-target-training)+")'>";
	s += "<rect class='target' x='"+(10+column*100)+"' height='"+ target +"' width='80' />";
	s += "<rect class='training' x='"+(10+column*100)+"' y='"+target+"' height='"+ training +"' width='80' />";
	s += "</g>";
	return s;
}

function getShare(value, column){
	var s = "<g transform='translate("+(column*100)+","+(-value)+")'>";
	s += "<rect class='share-shadow' x='5' y='0' height='20' width='100' />";
	s += "<rect class='share' y='-5' height='20' width='100' />";
	s += "</g>";
	return s;
}

function getResult(value,position,size,min,max) {
	var s = "<g>";
	var k = -((value-min)/(max-min));
	s+= "<circle class='result' cx='"+(position*100+50)+"' cy='"+(k*size)+"' r='10'/>";
	s+="</g>";
	return s;
}

function getEstimations(data, size,min,max) {
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
}

function drawDailyGraph(download){

	var days = (new Date(download.end) - new Date(download.start))/(1000*60*60*24);
	var season = download.season;
	var max = Math.ceil(download.season.max/50)*50+50;
	
	var general_width = (days*100+700+150);
	var general_height = max+100+50;
	var width = 20.2/(100/general_width);
	
	html = "<svg xmlns='http://www.w3.org/2000/svg'";
	html += " id='season'";
	html += " version='1.1'";
	html += " viewBox='0 "+(-general_height)+" "+(general_width+2)+" "+(general_height+1)+"'";
	html += " preserveAspectRatio='xMidYMid meet'";
	html += " width='"+width+"pt'>";
	
	html += getStyle();
	
	html += "<g id='main'>";
	
	html += getLabels(max);
	
	html += "<g id='data' transform='translate(700,-100) scale(1,1)'>";
	
	html += getGrid(max,days);
	
	html += drawBottomDays(download.start,download.end);
	html += drawLeftAxis(0,max,"arrow_count",max);
	
	var estimate = false;
	var estimations = [];
	var bullets = {};
	
	current = new Date(download.start);
	week = download.week_start;
	stop = new Date(download.end);
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
			html += getActual(gauged,technique,i);
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
	
	difference = max_result - min_result;
	max_result += 0.1*difference;
	min_result -= 0.1*difference;
	html += getEstimations(estimations,max,min_result,max_result);
	
	html += drawRightAxis(10-min_result,10-max_result,"results",max,days*100);
	
	for(bullet in bullets){
		html += getResult(bullets[bullet],bullet,max,min_result,max_result);
	}
	
	
	html += "</g>";
	
	html += "</g>";
	
	html += "</svg>";
	
	return html;
}

function drawSeasonGraph(download){
	
	var weeks = download.season.size;
	var season = download.season;
	var max = Math.ceil(download.season.max/50)*50+50;
	
	var general_width = (weeks*100+700+150);
	var general_height = max + 150 + 50;
	var width = 20.2/(100/general_width);
	
	html = "<svg xmlns='http://www.w3.org/2000/svg'";
	html += " id='season'";
	html += " version='1.1'";
	html += " viewBox='0 "+(-general_height)+" "+(general_width+2)+" "+(general_height+2)+"'";
	html += " preserveAspectRatio='xMidYMid meet'";
	html += " width='"+width+"pt'>";
	
	html += getStyle();
	
	html += "<g id='main'>";
	
	html += getLabels(max);
	
	html += "<g id='data' transform='translate(700,-150)'>";
	
	html += getGrid(max,weeks);
	
	html += drawBottomWeeks(season.start,season.start+season.size);
	html += drawLeftAxis(0,max,"arrow_count",max);
	
	var estimate = false;
	var estimations = [];
	var bullets = {};
	var min_result = 10;
	var max_result = 0;
	for(i in season){
		if(!isNaN(i)){
			html += getPlan(season[i].total_plan,i-season.start);
			html += getActual(season[i].total-season[i].technique_total,season[i].technique_total,i-season.start);
			html += getShare(season[i].total_plan-season[i].gauged_plan,i-season.start);
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
	
	difference = max_result - min_result;
	max_result += 0.1*difference;
	min_result -= 0.1*difference;
	html += getEstimations(estimations,max,min_result,max_result);
	
	html += drawRightAxis(10-min_result,10-max_result,"results",max,weeks*100);
	
	for(bullet in bullets){
		html += getResult(bullets[bullet],bullet-season.start,max,min_result,max_result);
	}
	
	html += "</g>";
	
	html += "</g>";
	
	html += "</svg>";
	
	return html;
}

function drawRightAxis(min, max,title,size,offset){
	var html = "<g id='right' transform='translate(0,0)'>";
	unit = (max - min) / 10;
	block = (size/10);
	for(var i = min,j = 0; j <= size; i+=unit,j+=block){
		html += "<text class='right' x='"+(offset+10)+"' y='-"+j+"'>"+(i).toPrecision(3)+"</text>";
	}
	html += "<text transform='translate("+(offset+10+90)+",0) rotate(-90)' class='title' x='0' y='0'>"+title+"</text>";
	html += "</g>";
	return html;
}

function drawLeftAxis(min, max,title,size){
	var html = "<g id='left' transform='translate(0,0)'>";
	unit = (max - min) / 10;
	block = (size/10);
	for(var i = min,j = 0; i <= max; i+=unit,j+=block){
		html += "<text class='left' x='-10' y='-"+j+"'>"+Math.floor(i)+"</text>";
	}
	html += "<text transform='translate("+(-10-60)+",0) rotate(-90)' class='title' x='0' y='0'>"+title+"</text>";
	html += "</g>";
	return html;
}

function drawBottomDays(min, max){
	var html = "<g id='bottom'>";
	end =  new Date(max);
	for(var i = new Date(min), j = 0; i < end; i.setDate(i.getDate() + 1,j++) ){
		html += "<g transform=translate("+(j*100+50)+",50)>";
		html += "<text class='bottom' x='0' y='0'>"+i.toJSON().substring(8,10)+"</text>";
		html += "</g>";
	}
	html += "</g>";
	return html;
}



//TODO change all from get to draw
function drawBottomWeeks(min, max){
	var html = "<g id='bottom'>";
	for(var i = min; i < max; i++){
		html += "<g transform=translate("+((i-min)*100+50)+",50)>";
		html += "<text class='bottom' x='0' y='0'>wk</text>";
		html += "<text class='bottom' x='0' y='45'>"+i+"</text>";
		html += "</g>";
	}
	html += "</g>";
	return html;
}

function getLabels(max){
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

function getStyle(){
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
}