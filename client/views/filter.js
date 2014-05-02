var dropDownLabel = function(options, select) {
    if (options.length == 0) {
        return this.nonSelectedText + ' <b class="caret"></b>';
    }
    else {
        var selected = '';
        options.each(function() {
          var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).html();
          selected += label + ', ';
        });
        return selected.substr(0, selected.length - 2) + ' <b class="caret"></b>';
    }
  };


$(document).ready(function() {
    var chart;
    var filter = function() {
      d3.select('#chart1 svg')
      .datum(exampleData())
      .call(chart);
    };

    $('.multiselect.video-filter').multiselect({
      includeSelectAllOption: true,
      includeSelectAllDivider: true,
      enableCaseInsensitiveFiltering: true,
      filterBehavior: 'both',
      buttonWidth: '240px',
      nonSelectedText: 'All Videos',
      buttonText: dropDownLabel,
      onChange: filter
    });

    $('.geo-filter').multiselect({
      includeSelectAllOption: true,
      includeSelectAllDivider: true,
      enableCaseInsensitiveFiltering: true,
      filterBehavior: 'both',
      nonSelectedText: 'All Countries',
      buttonText: dropDownLabel,
      onChange: filter
    });

    $('.edu-filter').multiselect({
      includeSelectAllOption: true,
      includeSelectAllDivider: true,
      enableCaseInsensitiveFiltering: true,
      filterBehavior: 'both',
      nonSelectedText: 'All Educations',
      buttonText: dropDownLabel,
      onChange: filter
    });

    $('.time-filter').multiselect({
      enableCaseInsensitiveFiltering: true,
      filterBehavior: 'both',
      onChange: filter
    });

    function exampleData() {
      return stream_layers(3,20,.1).map(function(data, i) {
        //var test_data = stream_layers(3,1,.1).map(function(data, i) { //for testing single data point
        return {
          key: 'Stream' + i,
          values: data
        };
      });
    }

    nv.addGraph(function() {
        chart = nv.models.multiBarChart()
          .barColor(d3.scale.category20().range())
          .transitionDuration(350)
          .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
          .rotateLabels(0)      //Angle to rotate x-axis labels.
          .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
          .groupSpacing(0.1)    //Distance between each group of bars.
          ;

        chart.multibar
          .hideable(true);

        chart.reduceXTicks(false).staggerLabels(true);

        chart.xAxis
            .axisLabel("DATE")
            .showMaxMin(true)
            .tickFormat(d3.format(',f'));

        chart.yAxis
            .tickFormat(d3.format(',.1f'))

        d3.select('#chart1 svg')
            .datum(exampleData())
           .call(chart);

        nv.utils.windowResize(chart.update);

        chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

        return chart;
    });

});