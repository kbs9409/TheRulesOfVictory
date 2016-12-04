////////////////////////////////////////////////////////////// 
//////////////////////// Set-Up ////////////////////////////// 
////////////////////////////////////////////////////////////// 

var margin = {top: 100, right: 100, bottom: 100, left: 100},
	width = Math.min(650, window.innerWidth - 10) - margin.left - margin.right,
	height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

////////////////////////////////////////////////////////////// 
//////////////////// Draw the Chart ////////////////////////// 
////////////////////////////////////////////////////////////// 

var radarChartOptions = {
		w: width,
		h: height,
		margin: margin,
		maxValue: 1,
		levels: 5,
		roundStrokes: true,
		color: d3.scale.category10()
	};

function getCorrelation(x, y){
	var ArrayLength = x.length;

	  var xy = [];
	  var x2 = [];
	  var y2 = [];

	  for(var i=0; i<ArrayLength; i++) {
	      xy.push(x[i] * y[i]);
	      x2.push(x[i] * x[i]);
	      y2.push(y[i] * y[i]);
	  }

	  var sum_x = 0;
	  var sum_y = 0;
	  var sum_xy = 0;
	  var sum_x2 = 0;
	  var sum_y2 = 0;

	  for(var i=0; i<ArrayLength; i++) {
	      sum_x += x[i];
	      sum_y += y[i];
	      sum_xy += xy[i];
	      sum_x2 += x2[i];
	      sum_y2 += y2[i];
	  }

	  var step1 = (ArrayLength * sum_xy) - (sum_x * sum_y);
	  var step2 = (ArrayLength * sum_x2) - (sum_x * sum_x);
	  var step3 = (ArrayLength * sum_y2) - (sum_y * sum_y);
	  var step4 = Math.sqrt(step2 * step3);
	  var answer = step1 / step4;

	  return answer;
}

////////////////////////////////////////////////////////////// 
////////////////////////// Data ////////////////////////////// 
////////////////////////////////////////////////////////////// 

var stack = [];

// Initial radar chart structure
RadarChart(".radarChart", [stack], radarChartOptions);

function setting(){
	var start_year = parseInt(document.getElementById("start_year").value);
	var end_year = parseInt(document.getElementById("end_year").value);

	if(start_year > end_year){
		end_year = start_year;
		document.getElementById("end_year").value = String(start_year);
	}

	d3.selectAll("input").each(function(d){
		if(d3.select(this).attr("id") == "combination")
			if(d3.select(this).node().checked)
				stack = [];
	})

	var teamlist = [];

	d3.selectAll("input").each(function(d)
	{
		if(d3.select(this).attr("type") == "checkbox"){
			if(d3.select(this).node().checked){
				teamlist.push(d3.select(this).node().id);
			}
		}
	})

	d3.csv("https://raw.githubusercontent.com/kbs9409/TheRulesOfVictory/master/data2.csv", function(data){	
	var realval = [];
	var WinRate = [];
	var metric0 = [];
	var metric1 = [];
	var metric2 = [];
	var metric3 = [];
	var metric4 = [];
	var metric5 = [];
	var metric6 = [];
	var metric7 = [];
	var metric8 = [];
	var metric9 = [];
	var metric10 = [];
	var metric11 = [];
	var metric12 = [];
	var metric13 = [];
	var metric14 = [];
	var metric15 = [];
	var metric16 = [];
	var metric17 = [];
	var metric18 = [];
	var metric19 = [];
	var metric20 = [];
	var metric21 = [];

	data.map(function(d){
		for(i=0; i<22; i++){
			var winrate;
			var metric = -1;
			if(parseInt(d.Year) >= start_year && parseInt(d.Year) <= end_year && teamlist.includes(d.Team)){
				if(i == 0){
					WinRate.push(+d.WinRate);
					metric0.push(+d.ERA)
				}
				else if(i == 1){metric1.push(+d.WHIP)}
				else if(i == 2){metric2.push(+d.K9)}
				else if(i == 3){metric3.push(+d.BB9)}
				else if(i == 4){metric4.push(+d.HR9)}
				else if(i == 5){metric5.push(+d.KBB)}
				else if(i == 6){metric6.push(+d.R_P)}
				else if(i == 7){metric7.push(+d.WAR_P)}
				else if(i == 8){metric8.push(+d.LOB)}
				else if(i == 9){metric9.push(+d.AVG)}
				else if(i == 10){metric10.push(+d.R_H)}
				else if(i == 11){metric11.push(+d.OBP)}
				else if(i == 12){metric12.push(+d.SLG)}
				else if(i == 13){metric13.push(+d.OPS)}
				else if(i == 14){metric14.push(+d.HR)}
				else if(i == 15){metric15.push(+d.BB)}
				else if(i == 16){metric16.push(+d.K)}
				else if(i == 17){metric17.push(+d.BBK)}
				else if(i == 18){metric18.push(+d.RISP)}
				else if(i == 19){metric19.push(+d.WAR_H)}
				else if(i == 20){metric20.push(+d.SB)}
				else{metric21.push(+d.EG)}
			}
		}
	})

	if(WinRate.length != 0){
			realval.push({"axis":"ERA", "value":Math.abs(getCorrelation(WinRate, metric0))});
			realval.push({"axis":"WHIP", "value":Math.abs(getCorrelation(WinRate, metric1))});
			realval.push({"axis":"K9", "value":Math.abs(getCorrelation(WinRate, metric2))});
			realval.push({"axis":"BB9", "value":Math.abs(getCorrelation(WinRate, metric3))});
			realval.push({"axis":"HR9", "value":Math.abs(getCorrelation(WinRate, metric4))});
			realval.push({"axis":"KBB", "value":Math.abs(getCorrelation(WinRate, metric5))});
			realval.push({"axis":"R_P", "value":Math.abs(getCorrelation(WinRate, metric6))});
			realval.push({"axis":"WAR_P", "value":Math.abs(getCorrelation(WinRate, metric7))});
			realval.push({"axis":"LOB", "value":Math.abs(getCorrelation(WinRate, metric8))});
			realval.push({"axis":"AVG", "value":Math.abs(getCorrelation(WinRate, metric9))});
			realval.push({"axis":"R_H", "value":Math.abs(getCorrelation(WinRate, metric10))});
			realval.push({"axis":"OBP", "value":Math.abs(getCorrelation(WinRate, metric11))});
			realval.push({"axis":"SLG", "value":Math.abs(getCorrelation(WinRate, metric12))});
			realval.push({"axis":"OPS", "value":Math.abs(getCorrelation(WinRate, metric13))});
			realval.push({"axis":"HR", "value":Math.abs(getCorrelation(WinRate, metric14))});
			realval.push({"axis":"BB", "value":Math.abs(getCorrelation(WinRate, metric15))});
			realval.push({"axis":"K", "value":Math.abs(getCorrelation(WinRate, metric16))});
			realval.push({"axis":"BBK", "value":Math.abs(getCorrelation(WinRate, metric17))});
			realval.push({"axis":"RISP", "value":Math.abs(getCorrelation(WinRate, metric18))});
			realval.push({"axis":"WAR_H", "value":Math.abs(getCorrelation(WinRate, metric19))});
			realval.push({"axis":"SB", "value":Math.abs(getCorrelation(WinRate, metric20))});
			realval.push({"axis":"EG", "value":Math.abs(getCorrelation(WinRate, metric21))});
		}

		stack.push(realval);
		RadarChart(".radarChart", stack, radarChartOptions);

		d3.selectAll("input").each(function(d){
			if(d3.select(this).attr("id") == "combination")
				if(d3.select(this).node().checked)
					stack.pop();
		})
	});
}

function Reset(){
	d3.selectAll("input").each(function(d){
		if(d3.select(this).attr("id") == "combination")
			d3.select(this).node().checked = true;
	})
	Uncheck();
	document.getElementById("start_year").value = "2016";
	document.getElementById("end_year").value = "2016";
	setting();
}

function checkAll(){
	d3.selectAll("input").each(function(d){
		if(d3.select(this).attr("type") == "checkbox")
			d3.select(this).node().checked = true;
	})
}

function Uncheck(){
	d3.selectAll("input").each(function(d){
		if(d3.select(this).attr("type") == "checkbox")
			d3.select(this).node().checked = false;
	})
}