Template.demographics.rendered = function(){
  // Enrollment graph
  var set_1 = [{x: 1025409600000, y: 5}, {x: 1122782400000, y: 9}, {x: 1304136000000, y: 12}, {x: 1504136000000, y: 13}];
  
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

    d3.select('#enrollment_chart svg')
      .datum(data)
      .call(chart);

    //TODO: Figure out a good way to do this automatically
    nv.utils.windowResize(chart.update);
    //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

    return chart;
  });

  // Gender Donut Graph
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

  var bar_data = [{"key":"Progress","values":[{"label":"A","value":13},{"label":"B","value":15}]}];
  nv.addGraph(function() {  
        var chart = nv.models.discreteBarChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .staggerLabels(true)
            //.staggerLabels(historicalBarChart[0].values.length > 8)
            .tooltips(false)
            .showValues(true)
            .transitionDuration(250)
            .showXAxis(false)
            ;

        d3.select('#age_chart svg')
            .datum(bar_data)
            .call(chart);

        nv.utils.windowResize(chart.update);

      return chart;
    });

    //World Map
    var map = new Datamap({element: document.getElementById('map_chart')});
}