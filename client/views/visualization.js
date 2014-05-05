// Visualization Template
Template.visualization.rendered = function () {
  UI.insert(
      UI.render(Template.test), this.find('.data')
  );
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
