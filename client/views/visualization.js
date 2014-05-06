// Visualization Template
Template.visualization.rendered = function () {

};
Template.visualization.events = {
  'click #favorite': function(event){
    console.log('Favorited');
    Visualizations.update(this._id, {$set: {favorite: true}});
  },
  'click #share': function(event){
    console.log('Share');
  },
  'click #download': function(event){
    console.log('Download');
    params = {
      pipe: [{
        $match: {
          module_id: {$in: ["MITx/Spring_2014/test_course1/C0_LS1_V3"]},
          loe: {$in: ["p"]},
          date: {
            $gt: "2020-02-03 05:00:00",
            $lt: "2020-02-05 05:00:00"
          },
          cc: {$in: ["US"]}
        }
      },{
        $group: {
          _id: {date: "$date"},
          count: {$sum: "$count"}
        }
      }],
      collection: 'daily_count'
    }
    console.log(this)
    Meteor.call('aggregate',
      params,
      function (error, result) {
        csvContent = "data:text/csv;charset=utf-8,"
        console.log(error);
        console.log(result);
    }) 
  }
};
Template.visualization.figures = function(){
  if (typeof(this.url) != 'undefined'){
    return Template[this.url];
  }
  return Template['blank'];
};
