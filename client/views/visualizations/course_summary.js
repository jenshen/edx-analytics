Template.course_summary.created = function(){
    // Initialize filter options
    Session.set('filters', {
        cc: [],
        loe: [],
        module_id: []
    });
    // Initialize data streams
    Session.set('streams', {
        view: [],
        minutes_watched: [],
        problem_corrects: [],
        problem_attempts: [],
        certifications: []
    });
}

Template.course_summary.rendered = function(){
    // Update data based on initial filter options
    Template.course_summary.updateData();

    // Establish graph dependency on data
    Deps.autorun(Template.course_summary.renderGraphs);
}

Template.course_summary.updateData = function(){
    filters = Session.get('filters');

    match = {
          date: {
            $gt: "2020-02-03 05:00:00",
            $lt: "2020-04-30 05:00:00"
          }
    }

    if (filters['cc'].length > 0){
        match['cc'] = {$in: filters['cc']};
    }
    if (filters['loe'].length > 0){
        match['loe'] = {$in: filters['loe']};
    }
    if (filters['module_id'].length > 0){
        match['module_id'] = {$in: filters['module_id']};
    }

    Template.course_summary.updateVideoViews(match);
    Template.course_summary.updateMinutesWatched(match);
    Template.course_summary.updateProblemAttempts(match);
    Template.course_summary.updateProblemCorrects(match);
    Template.course_summary.updateCertification(match);
};

Template.course_summary.events = {
    // Video Enagement: Views
    'click #chart1': function (event) {
      var viz = Visualizations.findOne({name:"Video Activity"});
      Session.set("selected", viz._id);
    },
    'updatedFilters': Template.course_summary.updateData,
    // Video Engagement: Minutes
    'click #chart2': function (event) {
      var viz = Visualizations.findOne({name:"Video Activity"});
      Session.set("selected", viz._id);
    },
    // Pset Performance
    'click #chart3': function (event) {
    },
    // Certifications
    'click #chart4': function (event) {
      var viz = Visualizations.findOne({name:"Certifications"});
      Session.set("selected", viz._id);
    },
};

Template.course_summary.updateVideoViews = function(match){
    match['event_type'] = 'view'

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
        resultLength = result.length;
        stream = []
        for (var i = 0; i < resultLength; i++){
            date = moment(result[i]['_id']['date'], 'YYYY-MM-DD hh:mm:ss')
            stream.push({
                x: date.valueOf(), 
                y: result[i]['count']
            });
        }
        streams = Session.get('streams');
        streams['view'] = stream
        Session.set('streams', streams);
    }); 
}

Template.course_summary.updateMinutesWatched = function(match){
    match['event_type'] = 'minutes_watched'

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
        resultLength = result.length;
        stream = []
        for (var i = 0; i < resultLength; i++){
            date = moment(result[i]['_id']['date'], 'YYYY-MM-DD hh:mm:ss')
            stream.push({
                x: date.valueOf(), 
                y: result[i]['count']
            });
        }
        streams = Session.get('streams');
        streams['minutes_watched'] = stream
        Session.set('streams', streams);
    }); 
}
Template.course_summary.updateProblemAttempts = function(match){
    match['event_type'] = 'problem_attempts'

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
        resultLength = result.length;
        stream = []
        for (var i = 0; i < resultLength; i++){
            date = moment(result[i]['_id']['date'], 'YYYY-MM-DD hh:mm:ss')
            stream.push({
                x: date.valueOf(), 
                y: result[i]['count']
            });
        }
        streams = Session.get('streams');
        streams['problem_attempts'] = stream
        Session.set('streams', streams);
    }); 
}
Template.course_summary.updateProblemCorrects = function(match){
    match['event_type'] = 'problem_corrects'

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
        resultLength = result.length;
        stream = []
        for (var i = 0; i < resultLength; i++){
            date = moment(result[i]['_id']['date'], 'YYYY-MM-DD hh:mm:ss')
            stream.push({
                x: date.valueOf(), 
                y: result[i]['count']
            });
        }
        streams = Session.get('streams');
        streams['problem_corrects'] = stream
        Session.set('streams', streams);
    }); 
}

Template.course_summary.updateCertification = function(match){
    match['module_id'] = undefined;
    match['event_type'] = undefined;

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
      collection: 'certification'
    }
    Meteor.call('aggregate',
      params,
      function (error, result) {
        resultLength = result.length;
        stream = []
        for (var i = 0; i < resultLength; i++){
            date = moment(result[i]['_id']['date'], 'YYYY-MM-DD hh:mm:ss')
            stream.push({
                x: date.valueOf(), 
                y: result[i]['count']
            });
        }
        streams = Session.get('streams');
        streams['certifications'] = stream
        Session.set('streams', streams);
    }); 
}


Template.course_summary.renderGraphs = function () {
    streams = Session.get('streams');
    var data = [{
        "key": "DOWN",
        "values": streams['view'],
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
        "values": streams['minutes_watched'],
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
        "values":streams['problem_attempts'],
        "color": "#d21673"
    }, {
        "key": "Correct",
        "values": streams['problem_corrects'],
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
        "values": streams['certifications'],
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