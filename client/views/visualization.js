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
  }
};
Template.visualization.figures = function(){
  if (typeof(this.url) != 'undefined'){
    return Template[this.url];
  }
  return Template['blank'];
};