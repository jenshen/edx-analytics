$(document).ready(function () {
  // Wrapping in nv.addGraph allows for '0 timeout render', stores rendered charts in nv.graphs, and may do more in the future... it's NOT required
  var set_1 = [{x: 1025409600000, y: 5}, {x: 1122782400000, y: 1}, {x: 1304136000000, y: 2}];
  
  var data = [{"key":"DOWN", "values": set_1, "color": "#2F73BC"}];

  nv.addGraph(function() {
    var chart = nv.models.lineChart()
    .options({
      margin: {left: 30, bottom: 30},
      x: function(d,i) { return i},
      showXAxis: false,
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
      .axisLabel("Total Views")
      //.tickFormat(d3.format(',.1f'))
      .tickFormat(function(d) {
            return d3.time.format('%x')(new Date(d))
          });
      ;

    chart.yAxis
      .axisLabel("Views (millions)")
      .tickFormat(d3.format(',.f'))
      ;

    d3.select('#chart1 svg')
      .datum(data)
      .call(chart);

    //TODO: Figure out a good way to do this automatically
    nv.utils.windowResize(chart.update);
    //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

    return chart;
  });


// Wrapping in nv.addGraph allows for '0 timeout render', stores rendered charts in nv.graphs, and may do more in the future... it's NOT required
  var set_2 = [{x: 0, y: 2}, {x: 1, y: 3}, {x: 2, y: 1}];
  
  var line_data = [{"key": "Total Minutes", "values": set_2, "color": "#2F73BC"}];

  nv.addGraph(function() {
    var chart = nv.models.lineChart()
    .options({
      margin: {left: 30, bottom: 30},
      x: function(d,i) { return i},
      showXAxis: false,
      showYAxis: true,
      transitionDuration: 250,
      showLegend: false
    })
    .tooltipContent(function (key, x, y, e, graph) {
         return "<h3 class='tool-tip'>" + x + '</h3>' +"<p class='tool-tip'>" + y + '</p>' ;
        });
    ;

    // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
    chart.xAxis
      .axisLabel("Total Minutes")
      //.tickFormat(function (d) {return '';})
      .tickFormat(d3.format(',.1f'))
      ;

    chart.yAxis
      .axisLabel("Minutes")
      .tickFormat(d3.format(',.f'))
      ;

    d3.select('#chart2 svg')
      .datum(line_data)
      .call(chart);

    //TODO: Figure out a good way to do this automatically
    nv.utils.windowResize(chart.update);
    //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

    return chart;
  });

  var set_3 = [{x: 0, y: 10}, {x: 1, y: 8}, {x: 2, y: 7}, {x: 3, y: 5}, {x: 4, y: 9}];
  var set_4 = [{x: 0, y: 7}, {x: 1, y: 7}, {x: 2, y: 4}, {x: 3, y: 3}, {x: 4, y: 7}];
  
  var set3_data = [{"key": "Total Attempts", "values": set_3, "color": "#d21673"},
  {"key": "Total Correct", "values": set_4, "color": "#2F73BC"}];

  nv.addGraph(function() {
    var chart = nv.models.lineChart()
    .options({
      margin: {left: 30, bottom: 30},
      x: function(d,i) { return i},
      showXAxis: false,
      showYAxis: true,
      transitionDuration: 250,
      showLegend: false
    })
    .tooltipContent(function (key, x, y, e, graph) {
         return "<h3 class='tool-tip'>" + x + '</h3>' +"<p class='tool-tip'>" + y + '</p>' ;
        });
    ;

    // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
    chart.xAxis
      .axisLabel("Total Minutes")
      //.tickFormat(function (d) {return '';})
      .tickFormat(d3.format(',.1f'))
      ;

    chart.yAxis
      .axisLabel("Minutes")
      .tickFormat(d3.format(',.f'))
      ;

    d3.select('#chart3 svg')
      .datum(set3_data)
      .call(chart);

    //TODO: Figure out a good way to do this automatically
    nv.utils.windowResize(chart.update);
    //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

    return chart;
  });


  var set_5 = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 1}, {x: 3, y: 2}, {x: 4, y: 4}, {x: 5, y: 10}];
  
  var set5_data = [{"key": "Total Attempts", "values": set_5, "color": "#d21673"}];

  nv.addGraph(function() {
    var chart = nv.models.lineChart()
    .options({
      margin: {left: 30, bottom: 30},
      x: function(d,i) { return i},
      showXAxis: false,
      showYAxis: true,
      transitionDuration: 250,
      showLegend: false
    })
    .tooltipContent(function (key, x, y, e, graph) {
         return "<h3 class='tool-tip'>" + x + '</h3>' +"<p class='tool-tip'>" + y + '</p>' ;
        });
    ;

    // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
    chart.xAxis
      .axisLabel("Total Minutes")
      //.tickFormat(function (d) {return '';})
      .tickFormat(d3.format(',.1f'))
      ;

    chart.yAxis
      .axisLabel("Minutes")
      .tickFormat(d3.format(',.f'))
      ;

    d3.select('#chart4 svg')
      .datum(set5_data)
      .call(chart);

    //TODO: Figure out a good way to do this automatically
    nv.utils.windowResize(chart.update);
    //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

    return chart;
  });

  var pie_data = [{"label": "Male", "value": 1000234}, {"label": "Female", "value": 999200}, {"label": "Unreported", "value": 20000}];

  nv.addGraph(function() {
    var chart = nv.models.pieChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .showLabels(true)     //Display pie labels
        .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
        .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
        .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
        .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
        // Can customize tooltip content. Not sure how to customize style yet.
        .tooltipContent(function (key, y, e, graph) {
         return "<h3 class='tool-tip'>" + key + '</h3>' +"<p class='tool-tip'>" + y + '</p>' ;
        });
        ;

      d3.select("#chart0 svg")
          .datum(pie_data)
          .transition().duration(350)
          .call(chart);

    return chart;
  });
});