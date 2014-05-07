Template.filter.rendered = function() {
    data = this.$('.multiselect').data();
    this.$('.multiselect').multiselect({
        includeSelectAllOption: true,
        includeSelectAllDivider: true,
        enableCaseInsensitiveFiltering: true,
        filterBehavior: 'both',
        nonSelectedText: data['noneSelected'],
        // buttonText: dropDownLabel,
    });
};

var getSelected = function(element, checked) {
  var filter = $(this).find('option:selected');
  var selected = [];
  $(filter).each(function(index, item){
    selected.push([$(this).val()]);
  });
  console.log(filter);
};

var dropDownLabel = function(options, select) {
  if (options.length == 0) {
      return this.nonSelectedText + ' <b class="caret"></b>';
  }
  else {
      var selected = '';
      options.each(function() {
        var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).html();
        selected += label + ', ';
      });
      return selected.substr(0, selected.length - 2) + ' <b class="caret"></b>';
  }
};