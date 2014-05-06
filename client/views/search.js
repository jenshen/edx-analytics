Template.search.events = {
  'keypress input#search-box': function (evt, template) {
        if (evt.which === 13) {
	      	var query = template.find("#search-box").value;
	      	query = ".*"+ query +".*$";
	      	console.log(query);
	      	var result = Visualizations.findOne({"name" : {$regex : query, $options: 'i'}});
	    	console.log(result);
	    	$("div.data").html('<h2>Success! You selected <b>' + result.name+ '</b></h2>');
	    	$("#search-box").val('');


	    	//Cody - add code here
	    	//result containst he database object of the 
	    	//visualization to be added.
	    	//if it is undefined, do nothing!
        }	
    },
    'click input#search-box': function() {
    	console.log('click');
    }
};
