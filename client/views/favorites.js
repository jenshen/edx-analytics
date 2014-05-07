// Favorites Templates
Template.favorites.events = {
  'click li': function(event) {
    if (typeof(this._id) != 'undefined'){
      Session.set("selected", this._id);
    }
  },
  'click .favorites-heading': function(event){
    $('.favorites-heading').toggleClass('selected');
    $('.favorite').fadeToggle();
  },
  'click .favorite': function(event) {
    $('.favorites-heading').toggleClass('selected');    
    $('.favorite').fadeToggle();
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