Template.video_activity.created = function(){
  // Initialize filter options
  Session.set('filters', {
    cc: [],
    loe: [],
    module_id: []
  });
  // Initialize data streams
  Session.set('streams', {view: []});
}

Template.video_activity.rendered = function(){
  // Update data based on initial filter options
  Template.video_activity.updateData();

  // Establish graph dependency on data
  Deps.autorun(Template.video_activity.renderGraphs);

}

Template.video_activity.updateData = function(){
    filters = Session.get('filters');
    match = {
          date: {
            $gt: "2020-02-03 05:00:00",
            $lt: "2020-04-30 05:00:00"
          },
          event_type: 'view'
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

Template.video_activity.events = {
  'updatedFilters': Template.video_activity.updateData
}

Template.video_activity.renderGraphs = function() {
  streams = Session.get('streams');

  // Views graph
  var data = [{
    "key":"DOWN",
    "values": streams['view'],
    "color": "#2F73BC"
  }];

  nv.addGraph(function() {
    var chart = nv.models.lineChart()
    .options({
      margin: {left: 50, bottom: 50, right: 40},
      showXAxis: true,
      showYAxis: true,
      transitionDuration: 250,
      showLegend: false,
    })
    .tooltipContent(function (key, x, y, e, graph) {
         return "<h3 class='tool-tip'>" + x + '</h3>' +"<p class='tool-tip'>" + y + " views" +'</p>' ;
        });
    ;

    // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
    chart.xAxis
      .axisLabel("Date")
      //.tickFormat(d3.format(',.1f'))
      .tickFormat(function(d) {
            return d3.time.format('%x')(new Date(d))
          });
      ;

    chart.yAxis
      .axisLabel("")
      .tickFormat(d3.format(',.f'))
      ;

    d3.select('#video_chart svg')
      .datum(data)
      .call(chart);

    //TODO: Figure out a good way to do this automatically
    nv.utils.windowResize(chart.update);
    //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

    return chart;
  });


  // minutes graph
  var set_2 = [{x: 1025409600000, y: 0}, {x: 1122782400000, y: 900}, {x: 1304136000000, y: 800}, {x: 1504136000000, y: 70}];
  
  var data_2 = [{"key":"DOWN", "values": set_2, "color": "#d21673"}];

  nv.addGraph(function() {
    var chart = nv.models.lineChart()
    .options({
      margin: {left: 50, bottom: 50, right: 40},
      showXAxis: true,
      showYAxis: true,
      transitionDuration: 250,
      showLegend: false,
    })
    .tooltipContent(function (key, x, y, e, graph) {
         return "<h3 class='tool-tip'>" + x + '</h3>' +"<p class='tool-tip'>" + y + " views" +'</p>' ;
        });
    ;

    // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
    chart.xAxis
      .axisLabel("Date")
      //.tickFormat(d3.format(',.1f'))
      .tickFormat(function(d) {
            return d3.time.format('%x')(new Date(d))
          });
      ;

    chart.yAxis
      .axisLabel("")
      .tickFormat(d3.format(',.f'))
      ;

    d3.select('#minutes_chart svg')
      .datum(data_2)
      .call(chart);

    //TODO: Figure out a good way to do this automatically
    nv.utils.windowResize(chart.update);
    //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

    return chart;
  });

}