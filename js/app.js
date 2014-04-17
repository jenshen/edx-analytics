Visualizations = new Meteor.Collection("visualizations");

if (Meteor.isClient) {
  UI.registerHelper('mainContent',function() {
    if (typeof(Session.get('selected')) == 'undefined'){
      summary = Visualizations.findOne({name: 'Course Summary'});
      if(typeof(summary) != 'undefined') {
        console.log('test')
        Session.set('selected', summary._id);
      }else{
       return []; 
      }

    }else{
      return Visualizations.findOne({_id: Session.get('selected')})
    }
  });

  // Visualizations Templates
  Template.visualizations.standard = function() {
    return Visualizations.find({
      standard: true
    });
  };
  Template.visualizations.selected = function() {
    return Session.equals("selected", this._id) ? "selected" : '';
  };
  Template.visualizations.events = {
    'click li': function(event) {
      Session.set("selected", this._id);
    }
  };

  // Favorites Templates
  Template.favorites.events = {
    'click li': function(event) {
      Session.set("selected", this._id);
    }
  };
  Template.favorites.favs = function() {
      return Visualizations.find({
        favorite: true
      });
  }
  Template.favorites.selected = function() {
    return Session.equals("selected", this._id) ? "selected" : '';
  };

  // Visualization Template
  Template.visualization.rendered = function () {
    $(this.firstNode).css('opacity', 1);
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

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // Visualizations.remove({});
    if (Visualizations.find().count() === 0) {
      Visualizations.insert({
        name: 'Course Summary',
        standard: true,
        ready: true,
        iframe: true,
        favorite: false,
        url: 'course_summary.html'
      });
      Visualizations.insert({
        name: 'Demographics',
        standard: true,
        ready: true,
        iframe: true,
        favorite: false,
        url: 'demographics.html'
      });
      Visualizations.insert({
        name: 'Video Activity',
        standard: true,
        ready: true,
        iframe: true,
        favorite: false,
        url: 'video_activity.html'
      });
      Visualizations.insert({
        name: 'Forum Activity',
        standard: true,
        ready: true,
        iframe: true,
        favorite: false,
        url: 'forum_activity.html'
      });
      Visualizations.insert({
        name: 'Certifications',
        standard: true,
        ready: false,
        iframe: true,
        favorite: false,
        url: 'certifications.html'
      });
    }
  });
}
