UI.registerHelper('content',function() {
  if (typeof(Session.get('selected')) == 'undefined'){
    summary = Visualizations.findOne({name: 'Course Summary'});
    if (typeof(summary) != 'undefined') {
      Session.set('selected', summary._id);
    } else {
     return []; 
    }
  } else{
    return Visualizations.findOne({_id: Session.get('selected')})
  }
})