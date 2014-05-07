Template.video_activity.rendered = function(){
    // Rendering code goes here
    console.log("Rendered video_activity");

      // Enrollment graph
  var set_1 = [{x: 1025409600000, y: 5}, {x: 1122782400000, y: 9}, {x: 1304136000000, y: 12}, {x: 1504136000000, y: 13}];
  
  var data = [{"key":"DOWN", "values": set_1, "color": "#2F73BC"}];

  nv.addGraph(function() {
    var chart = nv.models.lineChart()
    .options({
      margin: {left: 50, bottom: 50},
      showXAxis: true,
      showYAxis: true,
      transitionDuration: 250,
      showLegend: false,
    })
    .tooltipContent(function (key, x, y, e, graph) {
         return "<h3 class='tool-tip'>" + x + '</h3>' +"<p class='tool-tip'>" + y + " views" +'</p>' ;
        });
    ;

    // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
    chart.xAxis
      .axisLabel("Date")
      //.tickFormat(d3.format(',.1f'))
      .tickFormat(function(d) {
            return d3.time.format('%x')(new Date(d))
          });
      ;

    chart.yAxis
      .axisLabel("")
      .tickFormat(d3.format(',.f'))
      ;

    d3.select('#video_chart svg')
      .datum(data)
      .call(chart);

    //TODO: Figure out a good way to do this automatically
    nv.utils.windowResize(chart.update);
    //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

    return chart;
  });

}