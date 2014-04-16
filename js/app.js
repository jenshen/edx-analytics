Visualizations = new Meteor.Collection("visualizations");

if (Meteor.isClient) {
  UI.registerHelper('overview',function() {
    summary = Visualizations.findOne({name: 'Course Summary'});
    if(typeof(summary) != 'undefined') {
      if (typeof(Session.get('selected')) == 'undefined'){
        console.log('test')
        Session.set('selected', summary._id);
      }
      return Visualizations.findOne({_id: Session.get('selected')})
    }else {
      return [];
    }
  });
  Template.visualizations.standard = function() {
    return Visualizations.find({
      standard: true
    });
  };
  Template.visualizations.selected = function() {
    return Session.equals("selected", this._id) ? "selected" : '';
  }
  Template.visualizations.events = {
    'click li': function(event) {
      Session.set("selected", this._id);
    }
  };
  Template.visualization.rendered = function () {
    $(this.firstNode).css('opacity', 1);
  }
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Visualizations.find().count() === 0) {
      Visualizations.insert({
        name: 'Course Summary',
        standard: true,
        ready: true,
        iframe: true,
        favorite: false,
        url: 'http://www.w3schools.com'
      });
      Visualizations.insert({
        name: 'Demographics',
        standard: true,
        ready: true,
        iframe: true,
        favorite: false,
        url: 'http://www.w3schools.com'
      });
      Visualizations.insert({
        name: 'Video Activity',
        standard: true,
        ready: true,
        iframe: true,
        favorite: false,
        url: 'http://www.w3schools.com'
      });
      Visualizations.insert({
        name: 'Forum Activity',
        standard: true,
        ready: true,
        iframe: true,
        favorite: false,
        url: 'http://www.w3schools.com'
      });
      Visualizations.insert({
        name: 'Certifications',
        standard: true,
        ready: false,
        iframe: true,
        favorite: false,
        url: 'http://www.w3schools.com'
      });
    }
  });
}
