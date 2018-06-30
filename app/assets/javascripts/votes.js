// fetch data on page load
$(document).ready(function(){
  loadData();
});


// ajax call to fetch json
var loadData = function(){
                $.ajax({
                  type: 'GET',
                  contentType: 'application/json; charset=utf-8',
                  url: '/votes',
                  dataType: 'json',
                  success: function(data){
                    drawBarPlot(data);
                  },
                  failure: function(result){
                    error();
                  }
                });
              };

var updateData = function() {
                  $.ajax({
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    url: '/votes',
                    dataType: 'json',
                    success: function(data){
                      updateBar(data);
                    },
                    failure: function(data){
                      error();
                    }

                  });
                };

function error() {
    console.log("Something went wrong!");
}

// draw bar plot
function drawBarPlot(data){};



// set plot parameters
var barWidth = 20;
var colors = ['red', 'yellow'];
var barheight = 280;

// draw bar plot
function drawBarPlot(data){

  // define linear y-axis scale
  var yScale = d3.scaleLinear()
                 .domain([0, d3.max(data)])
                 .range([0, barheight- 10]);


  var yScaleAxis = d3.scaleLinear()
                 .domain([0, d3.max(data)])
                 .range([barheight - 10, 0]);

  var canvas = d3.select("#plot-container")
                  .append("svg")
                  .attr("width", 400)
                  .attr("height", barheight + 20)
                    .append("g")
                    .attr("transform", "translate(60, 0)")

    canvas.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(0, 10)")
          .call(d3.axisRight(yScaleAxis).ticks(5));﻿

    canvas.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", barWidth)
    .attr("height", function(d){ return yScale(d); })
    .attr("fill", function(d, i) {
        return colors[i];
    })
    .attr("x", function(d, i){
        return (i * 100) + 90; // horizontal location of bars
    })
    .attr("y", function(d){
        return barheight - yScale(d); // scale bars within plotting area
    });
}

function updateBar(data) {

  // Updating bars
  var yScale = d3.scaleLinear()
                 .domain([0, d3.max(data)])
                 .range([0, barheight - 10]);

    d3.selectAll("rect")
    .data(data)
    .attr("height", function(d){ return yScale(d); })
    .attr("y", function(d){
        return barheight - yScale(d); // scale bars within plotting area
    });

  // Updating Yaxis
  var yScaleAxis = d3.scaleLinear()
                 .domain([0, d3.max(data)])
                 .range([barheight - 10, 0]);

  d3.selectAll("g .y.axis")
     .call(d3.axisRight(yScaleAxis).ticks(5));﻿
}
