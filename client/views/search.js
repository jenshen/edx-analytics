Template.search.events = {
  'keypress #search-box': function (evt, template) {
        if (evt.which === 13) {
	      	var selector = $('#visualizations>ul>input');
	      	var query = template.find("#search-box").value;
	      	query = ".*"+ query +".*$";
	      	var result = Visualizations.findOne({"name" : {$regex : query, $options: 'i'}});
	    	//$("div.data").html('<h2>Success! You selected <b>' + result.name+ '</b></h2>');
	    	if (typeof result != 'undefined'){
		        Session.set("selected", result._id);
		        selector.val('');
		    } else {
		    	selector.val('Sorry, no matches.');
		    	setTimeout(function() {selector.val('');}, 800);		    	
		    }
	    }
    }
};
