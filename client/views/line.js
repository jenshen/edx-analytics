$(document).ready(function () {
  // Wrapping in nv.addGraph allows for '0 timeout render', stores rendered charts in nv.graphs, and may do more in the future... it's NOT required
  var chart;
  var down = [{x: 0, y: 1}, {x: 1, y: 0}, {x: 2, y: 1}];
  var up = [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 0}];
  
  var data = [{"key":"DOWNWARD", "values": down, "color": "#2ca02c"},
  {"key": "UPWARD", "values": up}];

  nv.addGraph(function() {
    chart = nv.models.lineChart()
    .options({
      margin: {left: 100, bottom: 100},
      x: function(d,i) { return i},
      showXAxis: true,
      showYAxis: true,
      transitionDuration: 250
    })
    ;

    // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
    chart.xAxis
      .axisLabel("Month")
      .tickFormat(d3.format(',.1f'));

    chart.yAxis
      .axisLabel("Test Score")
      .tickFormat(d3.format(',.2f'))
      ;

    d3.select('#example_chart svg')
      .datum(data)
      .call(chart);

    //TODO: Figure out a good way to do this automatically
    nv.utils.windowResize(chart.update);
    //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

    return chart;
  });
});