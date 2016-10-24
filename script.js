var w = 400,
	h = 400;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Absolute value of R'];

//Data
var d = [
		   [
			{axis:"AVG(H)",value:0.869557},
			{axis:"R(H)",value:0.704632},
			{axis:"H",value:0.733069},
			{axis:"2B",value:0.719906},
			{axis:"3B",value:0.486041},
			{axis:"HR",value:0.548867},
			{axis:"SLG",value:0.777514},
			{axis:"OBP",value:0.652344},
			{axis:"OPS",value:0.804744},
			{axis:"RISP",value:0.537394},
			{axis:"ERA",value:0.88132},
			{axis:"SV",value:0.622991},
			{axis:"IP",value:0.499774},
			{axis:"BB(P)",value:0.50854},
			{axis:"R(P)",value:0.9206},
			{axis:"WHIP",value:0.84414},
			{axis:"QS",value:0.524433},
			{axis:"TBF",value:0.74444},
			{axis:"AVG(P)",value:0.78519},
			{axis:"PKO",value:0.50479},
			{axis:"PO",value:0.88472}
		   ]
		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 1.0,
  levels: 10,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)
	;

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 15)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("Pearson correlation coefficient (R)");

//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 35)
	  .attr("y", function(d, i){ return i * 20 + 5;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 22)
	  .attr("y", function(d, i){ return i * 20 + 14;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	