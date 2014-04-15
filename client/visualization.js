$(document).ready(function() {
  $('.multiselect').multiselect({
    includeSelectAllOption: true,
    enableCaseInsensitiveFiltering: true,
    onChange: function() {
    	console.log('filter adjusted');
    },
    maxHeight: 200,
    includeSelectAllDivider: true,
    filterBehavior: 'both',
    numberDisplayed: 4,
    buttonText: function(options, select) {
      return "Hello <b class='caret'></b>";
    },
    buttonWidth: false
  });
});
