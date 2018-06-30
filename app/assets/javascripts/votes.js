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
                 .range([0, barheight]);


  var yScaleAxis = d3.scaleLinear()
                 .domain([0, d3.max(data)])
                 .range([barheight, 0]);

  var canvas = d3.select("#plot-container")
                  .append("svg")
                  .attr("width", 400)
                  .attr("height", barheight)
                    .append("g")
                    .attr("transform", "translate(60, 0)")

    canvas.append("g")

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
  var yScale = d3.scaleLinear()
                 .domain([0, d3.max(data)])
                 .range([0, barheight]);



    d3.selectAll("rect")
    .data(data)
    .attr("height", function(d){ return yScale(d); })
    .attr("y", function(d){
        return barheight - yScale(d); // scale bars within plotting area
    });
}
