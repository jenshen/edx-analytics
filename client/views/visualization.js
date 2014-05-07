// Visualization Template
Template.visualization.rendered = function () {

};

Template.visualization.events = {
  'click #favorite': function(event){
    //Visual feedback for favoriting
    $("li.favorites-heading").css("background-color", 'rgb(30,161,229)');
    setTimeout(function() {$("li.favorites-heading").css("background-color", 'white');}, 200);         
    
    //Create selector for this nav
    var selector = $('#' + this._id);
    //console.log(selector);
    //console.log('Favorited' + this.name);
    var isFavorited = Visualizations.findOne({_id:this._id}).favorite;
    if (isFavorited) {
      Visualizations.update(this._id, {$set: {favorite: false}});
    } else {
      Visualizations.update(this._id, {$set: {favorite: true}});
    }

    //Use session to force model to update.
    Session.set('selected',Session.get('selected'));
    selector.fadeToggle();
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
            $lt: "2020-03-05 05:00:00"
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
    that = this
    Meteor.call('aggregate',
      params,
      function (error, result) {
        csvContent = "data:text/csv;charset=utf-8,"
        resultLength = result.length;
        for (var i = 0; i < resultLength; i++){
          dataString = result[i]['_id']['date']+','+result[i]['count'];
          csvContent += dataString + "\n";
        }
        encodedData = encodeURI(csvContent);
        console.log(encodedData);
        window.open(encodedData, '_self');
    }) 
  }
};

Template.visualization.figures = function(){
  if (typeof(this.url) != 'undefined'){
    return Template[this.url];
  }
  return Template['blank'];
};
