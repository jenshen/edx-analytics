$(document).ready(function () {

  function tooltipContent(key, y, e, graph) {
    return '<h3>' + key + '</h3>' +'<p>' + y + '</p>' ;
  }

  var data = [{"label": "Male", "value": 1000234}, {"label": "Female", "value": 999200}, {"label": "Unreported", "value": 20000}];

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
        //.tooltipContent(function (key, y, e, graph) {
        //  return "<h3 class='tooltip'>" + key + '</h3>' +"<p class='number'>" + y + '</p>' ;
        //});
        ;

      d3.select("#chart1 svg")
          .datum(data)
          .transition().duration(350)
          .call(chart);

    return chart;
  });


});