Template.demographics.created = function(){
  // Initialize filter options
  Session.set('filters',{
    cc: [],
    loe: [],
    time: ['lw']
  });

  // Initialize data streams
  Session.set('streams', {
    // enrollment: [],
    // gender: []
  });
}

Template.demographics.rendered = function(){
  // Update data based on initial filter options
  Template.demographics.updateData();

  // Establish graph dependency on data
  Deps.autorun(Template.demographics.renderGraphs);
}

Template.demographics.updateData = function(){
    var filters = Session.get('filters');

    var match = {};
    console.log(filters);
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

    Template.demographics.updateEnrollment(match);
    Template.demographics.updateGender(match);
}

Template.demographics.events = {
  'updatedFilters': Template.demographics.updateData
}

Template.demographics.updateEnrollment = function(match){
  Progress.add();
  var params = {
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
    collection: 'enrollment'
  }
  Meteor.call('aggregate',
    params,
    function (error, result) {
      var resultLength = result.length;
      var stream = []
      for (var i = 0; i < resultLength; i++){
          date = moment(result[i]['_id']['date'], 'YYYY-MM-DD hh:mm:ss')
          stream.push({
              x: date.valueOf(), 
              y: result[i]['count']
          });
      }
      streams = Session.get('streams');
      streams['enrollment'] = stream
      Session.set('streams', streams);
      Progress.finish();
  }); 
}

Template.demographics.updateGender = function(match){
  Progress.add();
  var params = {
    pipe: [{
      $match: match
    },{
      $group: {
        _id: {gender: "$gender"},
        count: {$sum: "$count"}
      }
    },{
      $sort: {'_id.date': 1}
    }],
    collection: 'enrollment'
  }
  Meteor.call('aggregate',
    params,
    function (error, result) {
      var resultLength = result.length;
      var stream = []
      for (var i = 0; i < resultLength; i++){
          stream.push({
              label: result[i]['_id']['gender'], 
              value: result[i]['count']
          });
      }
      streams = Session.get('streams');
      streams['gender'] = stream
      Session.set('streams', streams);
      Progress.finish();
  }); 
}

Template.demographics.renderGraphs = function() {
  streams = Session.get('streams');

  if(typeof(streams['enrollment']) != 'undefined'){
    Template.demographics.renderEnrollmentGraph(streams['enrollment']);
  }
  if(typeof(streams['gender']) != 'undefined'){
    Template.demographics.renderGenderGraph(streams['gender']);
  }

  var bar_data = [{"key":"Age","values":[{"label":"A","value":13},{"label":"B","value":15}]}];
  nv.addGraph(function() {  
        var chart = nv.models.discreteBarChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .options({
              margin: {left: 60, bottom: 50, right: 40},
              showXAxis: true,
              showYAxis: true,
              showValues: true,
              transitionDuration: 250,
              showLegend: false,
              tootips: false,
            })
            ;

        chart.xAxis
          .axisLabel("Age")
          .axisLabelDistance(20)
          ;

        chart.yAxis
          .axisLabel("Students Enrolled")
          .axisLabelDistance(30)
          ;

        d3.select('#age_chart svg')
            .datum(bar_data)
            .call(chart);

        nv.utils.windowResize(chart.update);

      return chart;
    });
    //World Map
    //var map = new Datamap({element: document.getElementById('map_chart')});
}
Template.demographics.renderEnrollmentGraph = function(stream){
  // Enrollment graph  
  var data = [{
    "key":"DOWN",
    "values": stream,
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
      .tickFormat(function(d) {
            return d3.time.format('%x')(new Date(d))
          });
      ;

    chart.yAxis
      .axisLabel("Number of Students")
      .axisLabelDistance(40)
      .tickFormat(d3.format(',.f'))
      ;

    d3.select('#enrollment_chart svg')
      .datum(data)
      .call(chart);

    //TODO: Figure out a good way to do this automatically
    nv.utils.windowResize(chart.update);
    //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

    return chart;
  });
}
Template.demographics.renderGenderGraph = function(stream){
  // Gender Donut Graph
  var pie_data = stream;

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
        .tooltipContent(function (key, y, e, graph) {
         return "<h3 class='tool-tip'>" + key + '</h3>' +"<p class='tool-tip'>" + y + '</p>' ;
        });
        ;

      d3.select("#chart0 svg")
          .datum(pie_data)
          .transition().duration(350)
          .call(chart);

    return chart;
  });

}