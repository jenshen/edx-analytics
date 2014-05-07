Template.course_summary.rendered = function(){
    $('.multiselect').on('graphRender', renderCourseSummaryGraphs);
    renderCourseSummaryGraphs();
}

Template.course_summary.events({
    // Video Enagement: Views
    'click #chart1': function (event) {
      console.log("You've clicked video views!");
      var viz = Visualizations.findOne({name:"Video Activity"});
      Session.set("selected", viz._id);
    },
    // Video Engagement: Minutes
    'click #chart2': function (event) {
      console.log("You've clicked video minutes!");
      var viz = Visualizations.findOne({name:"Video Activity"});
      Session.set("selected", viz._id);
    },
    // Pset Performance
    'click #chart3': function (event) {
      console.log("You've clicked pset performance!");
    },
    // Certifications
    'click #chart4': function (event) {
      console.log("You've clicked certifications!");
      var viz = Visualizations.findOne({name:"Certifications"});
      Session.set("selected", viz._id);
    }
});

var renderCourseSummaryGraphs = function () {
    console.log('rerendering course summary');
    // Wrapping in nv.addGraph allows for '0 timeout render', stores rendered charts in nv.graphs, and may do more in the future... it's NOT required
    var set_1 = [{
        x: 1025409600000,
        y: 5
    }, {
        x: 1122782400000,
        y: 1
    }, {
        x: 1304136000000,
        y: 2
    }];

    var data = [{
        "key": "DOWN",
        "values": set_1,
        "color": "#2F73BC"
    }];

    nv.addGraph(function () {
        var chart = nv.models.lineChart()
            .options({
                margin: {
                    left: 50,
                    bottom: 50,
                    right: 50
                },
                showXAxis: true,
                showYAxis: true,
                transitionDuration: 250,
                showLegend: false,
            })
            .tooltipContent(function (key, x, y, e, graph) {
                return "<h3 class='tool-tip'>" + x + '</h3>' + "<p class='tool-tip'>" + y + " views" + '</p>';
            });;

        // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        chart.xAxis
            .axisLabel("Date")
            .axisLabelDistance(30)
        .tickFormat(function (d) {
            return d3.time.format('%x')(new Date(d))
        });;

        chart.yAxis
            .axisLabel("Views")
            .tickFormat(d3.format(',.f'))
            .axisLabelDistance(40);

        d3.select('#chart1 svg')
            .datum(data)
            .call(chart);

        //TODO: Figure out a good way to do this automatically
        nv.utils.windowResize(chart.update);
        //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

        chart.dispatch.on('stateChange', function (e) {
            nv.log('New State:', JSON.stringify(e));
        });

        return chart;
    });


    // Wrapping in nv.addGraph allows for '0 timeout render', stores rendered charts in nv.graphs, and may do more in the future... it's NOT required
    var set_2 = [{
        x: 1025409600000,
        y: 2
    }, {
        x: 1026409600000,
        y: 3
    }, {
        x: 1045409600000,
        y: 1
    }];

    var line_data = [{
        "key": "Minutes",
        "values": set_2,
        "color": "#2F73BC"
    }];

    nv.addGraph(function () {
        var chart = nv.models.lineChart()
            .options({
                margin: {
                    left: 50,
                    bottom: 50,
                    right: 50
                },
                showXAxis: true,
                showYAxis: true,
                transitionDuration: 250,
                showLegend: false
            })
            .tooltipContent(function (key, x, y, e, graph) {
                return "<h3 class='tool-tip'>" + x + '</h3>' + "<p class='tool-tip'>" + y + " minutes" + '</p>';
            });;

        // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        chart.xAxis
            .axisLabel("Date")
            .axisLabelDistance(30)
            .tickFormat(function (d) {
              return d3.time.format('%x')(new Date(d))
            });;

        chart.yAxis
            .axisLabel("Minutes")
            .axisLabelDistance(40)
            .tickFormat(d3.format(',.f'));

        d3.select('#chart2 svg')
            .datum(line_data)
            .call(chart);

        //TODO: Figure out a good way to do this automatically
        nv.utils.windowResize(chart.update);
        //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

        chart.dispatch.on('stateChange', function (e) {
            nv.log('New State:', JSON.stringify(e));
        });

        return chart;
    });

    var set_3 = [{
        x: 0,
        y: 10
    }, {
        x: 1,
        y: 8
    }, {
        x: 2,
        y: 7
    }, {
        x: 3,
        y: 5
    }, {
        x: 4,
        y: 9
    }];
    var set_4 = [{
        x: 0,
        y: 7
    }, {
        x: 1,
        y: 7
    }, {
        x: 2,
        y: 4
    }, {
        x: 3,
        y: 3
    }, {
        x: 4,
        y: 7
    }];

    var set3_data = [{
        "key": "Attempts",
        "values": set_3,
        "color": "#d21673"
    }, {
        "key": "Correct",
        "values": set_4,
        "color": "#2F73BC"
    }];

    nv.addGraph(function () {
        var chart = nv.models.lineChart()
            .options({
                margin: {
                    left: 50,
                    bottom: 50,
                    right: 50
                },
                showXAxis: true,
                showYAxis: true,
                transitionDuration: 250,
                showLegend: true
            })
            .tooltipContent(function (key, x, y, e, graph) {
                return "<h3 class='tool-tip'>" + key + '</h3>' + "<p class='tool-tip'>" + y + " problems" + '</p>';
            });;

        // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        chart.xAxis
            .axisLabel("Date")
            .axisLabelDistance(30)
            .tickFormat(function (d) {
                return d3.time.format('%x')(new Date(d))
            });;

        chart.yAxis
            .axisLabel("Number of Problems")
            .axisLabelDistance(40)
            .tickFormat(d3.format(',.f'));

        d3.select('#chart3 svg')
            .datum(set3_data)
            .call(chart);

        //TODO: Figure out a good way to do this automatically
        nv.utils.windowResize(chart.update);
        //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

        chart.dispatch.on('stateChange', function (e) {
            nv.log('New State:', JSON.stringify(e));
        });

        return chart;
    });


    var set_5 = [{
        x: 0,
        y: 0
    }, {
        x: 1,
        y: 0
    }, {
        x: 2,
        y: 1
    }, {
        x: 3,
        y: 2
    }, {
        x: 4,
        y: 4
    }, {
        x: 5,
        y: 10
    }];

    var set5_data = [{
        "key": "Certifications",
        "values": set_5,
        "color": "#d21673"
    }];

    nv.addGraph(function () {
        var chart = nv.models.lineChart()
            .options({
                margin: {
                    left: 50,
                    bottom: 50,
                    right: 50
                },
                showXAxis: true,
                showYAxis: true,
                transitionDuration: 250,
                showLegend: false
            })
            .tooltipContent(function (key, x, y, e, graph) {
                return "<h3 class='tool-tip'>" + x + '</h3>' + "<p class='tool-tip'>" + y + " certifications" + '</p>';
            });;

        // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        chart.xAxis
            .axisLabel("Date")
            .axisLabelDistance(30)
            .tickFormat(function (d) {
                return d3.time.format('%x')(new Date(d))
            });;

        chart.yAxis
            .axisLabel("Certifications")
            .axisLabelDistance(40)
            .tickFormat(d3.format(',.f'));

        d3.select('#chart4 svg')
            .datum(set5_data)
            .call(chart);

        //TODO: Figure out a good way to do this automatically
        nv.utils.windowResize(chart.update);
        //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

        chart.dispatch.on('stateChange', function (e) {
            nv.log('New State:', JSON.stringify(e));
        });

        return chart;
    });
};