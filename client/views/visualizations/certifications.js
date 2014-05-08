Template.certifications.created = function(){
  // Initialize filter options
  Session.set('filters', {
    cc: [],
    loe: [],
  });
  // Initialize data streams
  Session.set('streams', {certification: []});
}

Template.certifications.rendered = function(){
  // Update data based on initial filter options
  Template.certifications.updateData();

  // Establish graph dependency on data
  Deps.autorun(Template.certifications.renderGraphs);

}

Template.certifications.updateData = function(){
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
  }); 
}

Template.certifications.events = {
  'updatedFilters': Template.certifications.updateData
}

Template.certifications.renderGraphs = function(){
  var streams = Session.get('streams');
  var data = [{
    "key":"DOWN",
    "values": streams['certification'],
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
      .axisLabel("Number of Certifications")
      .tickFormat(d3.format(',.f'))
      .axisLabelDistance(40)
      ;

    d3.select('#certifications_chart svg')
      .datum(data)
      .call(chart);

    //TODO: Figure out a good way to do this automatically
    nv.utils.windowResize(chart.update);
    //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

    return chart;
  });

}