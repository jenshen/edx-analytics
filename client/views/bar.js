$(document).ready(function() {
  // Raw data
  var data = [{"key":"Progress","values":[{"label":"A","value":13},{"label":"B","value":15}]}];

  // Uncommen below to replace data generation with JSON file
  // d3.json("data.json", function (data) {
    nv.addGraph(function() {  
        var chart = nv.models.discreteBarChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .staggerLabels(true)
            //.staggerLabels(historicalBarChart[0].values.length > 8)
            .tooltips(false)
            .showValues(true)
            .transitionDuration(250)
            ;

        d3.select('#chart1 svg')
            .datum(data)
            .call(chart);

        nv.utils.windowResize(chart.update);

      return chart;
    });

  //})


});
