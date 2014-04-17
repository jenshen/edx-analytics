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
    $('.multiselect.video-filter').multiselect({
    	includeSelectAllOption: true,
    	includeSelectAllDivider: true,
        enableCaseInsensitiveFiltering: true,
      	filterBehavior: 'both',
      	buttonWidth: '240px',
        nonSelectedText: 'All Videos',
    	buttonText: dropDownLabel,
        onChange: filter,
    });

    $('.geo-filter').multiselect({
    	includeSelectAllOption: true,
    	includeSelectAllDivider: true,
        enableCaseInsensitiveFiltering: true,
      	filterBehavior: 'both',
        nonSelectedText: 'All Countries',
    	buttonText: dropDownLabel,
        onChange: filter,
    });

    $('.edu-filter').multiselect({
    	includeSelectAllOption: true,
    	includeSelectAllDivider: true,
        enableCaseInsensitiveFiltering: true,
      	filterBehavior: 'both',
        nonSelectedText: 'All Educations',
    	buttonText: dropDownLabel,
        onChange: filter,
    });

    $('.time-filter').multiselect({
        enableCaseInsensitiveFiltering: true,
      	filterBehavior: 'both',
        onChange: filter,
    });

    // Generates a simple one bar graph
      var dataset = [];              //Initialize empty array
      for (var i = 0; i < 25; i++) {       //Loop 25 times
        var newNumber = Math.random() * 30;  //New random number (0-30)
        dataset = dataset.concat(newNumber); //Add new number to array
      }

      var width = $("#simple").attr("width");
      console.log(width);
      
      d3.select(".graph").selectAll("div")
        .data(dataset)
        .enter()
        .append("div")
        .attr("class", "bar")
        .style("height", function(d) {
          var barHeight = d * 5;
          return barHeight + "px";
        });


    // Generates random data when filter selected
    function filter () {
      console.log("hi");
      var n = 4, // number of layers
      m = 50, // number of samples per layer
      stack = d3.layout.stack(),
      layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); })),
      yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
      yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

      layer = svg.selectAll(".layer")
          .data(layers)
          .attr("class", "layer")
          .style("fill", function(d, i) { return color(i); });

      rect = layer.selectAll("rect")
          .data(function(d) { return d; })
          .attr("x", function(d) { return x(d.x); })
          .attr("y", height)
          .attr("width", x.rangeBand())
          .attr("height", 0);
    }

});

