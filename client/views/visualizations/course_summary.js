var selectedOptions = {};

Template.course_summary.rendered = function(){
    Session.set('filters', {});
    this.$('select.multiselect').on('graphRender', updateOptions);
    params = {
      pipe: [{
        $match: {
          date: {
            $gt: "2020-02-03 05:00:00",
            $lt: "2020-04-30 05:00:00"
          }
        }
      },{
        $group: {
          _id: {date: "$date"},
          count: {$sum: "$count"}
        },
      },{
        $sort: {'_id.date': 1}
      }],
      collection: 'daily_count'
    }
    Meteor.call('aggregate',
      params,
      function (error, result) {
        console.log(result);

        resultLength = result.length;
        video_stream = []
        for (var i = 0; i < resultLength; i++){
            date = moment(result[i]['_id']['date'], 'YYYY-MM-DD hh:mm:ss')
            video_stream.push({
                x: date.valueOf(), 
                y: result[i]['count']
            });
        }
        renderCourseSummaryGraphs(video_stream);
    }); 
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
    },
});

var updateOptions = function (event, selectedOptions) {
    var filters = Session.get('filters');
    if (typeof(filters) == 'undefined'){
        var filters = {};
    }

    filters[selectedOptions['category']] = selectedOptions['selected'];
    Session.set('filters', filters);
    filters = Session.get('filters');


    match = {
          date: {
            $gt: "2020-02-03 05:00:00",
            $lt: "2020-04-30 05:00:00"
          }
    }

    if (typeof(filters['countries']) != 'undefined'){
        if (filters['countries'].length > 0){
            match['cc'] = {$in: filters['countries']};
        }
    }
    if (typeof(filters['loe']) != 'undefined'){
        if (filters['loe'].length > 0){
            match['loe'] = {$in: filters['loe']};
        }
    }
    if (typeof(filters['module_id']) != 'undefined'){
        if (filters['module_id'].length > 0){
            match['module_id'] = {$in: filters['module_id']};
        }
    }

    console.log(match);

    params = {
      pipe: [{
        $match: match
      },{
        $group: {
          _id: {date: "$date"},
          count: {$sum: "$count"}
        }
      },{
        $sort: {'_id.date': 1}
      }],
      collection: 'daily_count'
    }
    Meteor.call('aggregate',
      params,
      function (error, result) {
        console.log(result);

        resultLength = result.length;
        video_stream = []
        for (var i = 0; i < resultLength; i++){
            date = moment(result[i]['_id']['date'], 'YYYY-MM-DD hh:mm:ss')
            video_stream.push({
                x: date.valueOf(), 
                y: result[i]['count']
            });
        }
        renderCourseSummaryGraphs(video_stream);
    }); 
}

var renderCourseSummaryGraphs = function (video_stream) {
    console.log(selectedOptions)

    var num_views = [];

    var data = [{
        "key": "DOWN",
        "values": video_stream,
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

    var line_data = [{
        "key": "Minutes",
        "values": video_stream,
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

    var set3_data = [{
        "key": "Attempts",
        "values":video_stream,
        "color": "#d21673"
    }, {
        "key": "Correct",
        "values": video_stream,
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



    var set5_data = [{
        "key": "Certifications",
        "values": video_stream,
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