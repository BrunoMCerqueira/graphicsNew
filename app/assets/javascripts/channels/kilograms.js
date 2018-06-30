


var loadKilogramGraphic = function() {
                        $.ajax({
                          type: 'GET',
                          url: '/kilograms',
                          contentType: 'application/json; charset=utf-8',
                          dataType: 'json',
                          success: function(data){
                            drawKiloGraph(data);
                          },
                          failure: function(result){
                            error();
                          }
                        });
                      };

function error() {
    console.log("Something went wrong!");
}


// set plot parameters
var width = 600;
var height = 380;

function drawKiloGraph(data) {



  var maxKilogram = d3.max(data, function(d) { return d.kg });
  var minKilogram = d3.min(data, function(d) { return d.kg });

  var maxDate = d3.max(data, function(d) { return d.kg_date });
  var minDate = d3.min(data, function(d) { return d.kg_date });


  var parseDate = d3.timeParse("%Y-%m-%d");
  console.log(minDate);
  console.log(typeof(maxKilogram));

  function sortByDateAscending(a, b) {
    // Dates will be cast to numbers automagically:
    return parseDate(a.kg_date) - parseDate(b.kg_date);
  }

  var midpoint = new Date((parseDate(minDate).getTime() + parseDate(maxDate).getTime()) / 2);

  console.log(parseDate(minDate));
  console.log(parseDate(maxDate));
  console.log(midpoint);
  var data = data.sort(sortByDateAscending);

  var y = d3.scaleLinear()
                 .domain([minKilogram - 20, maxKilogram])
                 .range([height - 80, 0]);

  var x = d3.scaleTime()
                 .domain([parseDate(minDate), parseDate(maxDate)])
                 .range([0, width - 100]);

  var arrayDates = [parseDate(minDate), midpoint, parseDate(maxDate)];
  var yAxis = d3.axisLeft(y);
  var xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%d %b")).tickValues(arrayDates) ;

  var svg = d3.select('.kgGraph').append('svg')
              .attr('height', height)
              .attr('width', width);

  var chatGroup = svg.append('g')
                      .attr('transform', 'translate(50, 40)');

  var line = d3.line()
                  .x(function(d){
                    return x(parseDate(d.kg_date));})
                  .y(function(d){ return y(d.kg);})
                  .curve(d3.curveMonotoneX);

  var lineTarget = d3.line()
                  .x(function(d){
                    return x(parseDate(d.kg_date));})
                  .y(function(d){ return y(50);});

  chatGroup.append("path").attr('class', 'mainline').attr("d", line(data));
  chatGroup.append("path").attr('class', 'targetline').style("stroke-dasharray", ("3, 3")) .attr("d", lineTarget(data));

  chatGroup.append('g').attr('class', 'x axis')
                      .attr('transform', 'translate(0, 300)')
                      .call(xAxis);
  chatGroup.append('g').attr('class', 'y axis').call(yAxis);


  var mouseG = chatGroup.append("g")
      .attr("class", "mouse-over-effects");


};

