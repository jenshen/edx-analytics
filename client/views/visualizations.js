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