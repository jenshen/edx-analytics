Template.search.events = {
  'keypress input#search-box': function (evt, template) {
        if (evt.which === 13) {
	      	var query = template.find("#search-box").value;
	      	$("#search-box").value = "";
	      	query = ".*"+ query +".*$";
	      	var result = Visualizations.findOne({"name" : {$regex : query, $options: 'i'}});
	    	//$("div.data").html('<h2>Success! You selected <b>' + result.name+ '</b></h2>');
	    	Session.set("selected", result._id);
	    }
    }
};
