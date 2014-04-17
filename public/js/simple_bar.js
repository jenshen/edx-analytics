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

      var new_dataset = [];              //Initialize empty array
      for (var i = 0; i < 25; i++) {       //Loop 25 times
        var newNumber = Math.random() * 30;  //New random number (0-30)
        new_dataset = new_dataset.concat(newNumber); //Add new number to array
      }

      d3.select(".graph").selectAll("div")
        .data(new_dataset)
        .enter()
        .append("div")
        .attr("class", "bar")
        .style("height", function(d) {
          return (d * 5) + "px";
        })
        .transition(1000);
    }

});

