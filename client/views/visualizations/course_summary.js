Template.course_summary.created = function(){
  // Initialize filter options
  Session.set('filters', {
    cc: [],
    loe: [],
    module_id: [],
    time: ['lw']
  });
  // Initialize data streams
  Session.set('streams', {
    // view: [],
    // minutes_watched: [],
    // problem_corrects: [],
    // problem_attempts: [],
    // certification: []
  });
}
Template.course_summary.rendered = function(){
  // Update data based on initial filter options
  Template.course_summary.updateData();

  // Establish graph dependency on data
  Deps.autorun(Template.course_summary.renderGraphs);
}
Template.course_summary.updateData = function(){
  var filters = Session.get('filters');

  var match = {};
  var end_date = moment().format('YYYY-MM-DD hh:mm:ss');
  var start_date = moment(end_date);
  var date = {};

  if (filters['time'].length > 0){
    if (filters['time'][0] == 'lm'){
      start_date.subtract(1, 'months');
      match['date'] = {
        $gt: start_date.format('YYYY-MM-DD hh:mm:ss'),
        $lt: end_date
      };
    }
    if (filters['time'][0] == 'lw'){
      start_date.subtract(1, 'weeks');
      match['date'] = {
        $gt: start_date.format('YYYY-MM-DD hh:mm:ss'),
        $lt: end_date
      }
    }
    if (filters['time'][0] == 'ts'){
      start_date.subtract(4, 'months');
      match['date'] = {
        $gt: start_date.format('YYYY-MM-DD hh:mm:ss'),
        $lt: end_date
      }
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
}
Template.course_summary.updateVideoViews = function(match){
  Progress.add();
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
    Progress.finish();
  }); 
}
Template.course_summary.updateMinutesWatched = function(match){
  Progress.add();
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
    Progress.finish();
  }); 
}
Template.course_summary.updateProblemAttempts = function(match){
  Progress.add();
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
    Progress.finish();
  }); 
}
Template.course_summary.updateProblemCorrects = function(match){
  Progress.add();
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
    Progress.finish();
  }); 
}
Template.course_summary.updateCertification = function(match){
  Progress.add();
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
    streams['certification'] = stream
    Session.set('streams', streams);
    Progress.finish();
  }); 
}
Template.course_summary.renderGraphs = function () {
  var streams = Session.get('streams');
  if (typeof(streams['view']) != 'undefined'){
    Template.course_summary.renderVideoViewsGraph(streams['view']);
  }
  if (typeof(streams['minutes_watched']) != 'undefined'){
    Template.course_summary.renderMinutesWatchedGraph(streams['minutes_watched']);
  }
  if((typeof(streams['problem_attempts']) != 'undefined')&
    (typeof(streams['problem_corrects']) != 'undefined')){
    Template.course_summary.renderPerformanceGraph(
      streams['problem_attempts'],
      streams['problem_corrects']
    );
  }
  if (typeof(streams['certification']) != 'undefined'){
    Template.course_summary.renderCertificationGraph(streams['certification']);
  }
}
Template.course_summary.renderPerformanceGraph = function(attempts, corrects){
  var set3_data = [{
    "key": "Attempts",
    "values": attempts,
    "color": "#d21673"
  }, {
    "key": "Correct",
    "values": corrects,
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
}
Template.course_summary.renderVideoViewsGraph = function(stream){
  var data = [{
    "key": "DOWN",
    "values": stream,
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
}
Template.course_summary.renderMinutesWatchedGraph = function(stream){
  var line_data = [{
    "key": "Minutes",
    "values": stream,
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
}
Template.course_summary.renderCertificationGraph = function(stream){
  var set5_data = [{
    "key": "Certifications",
    "values": stream,
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
}