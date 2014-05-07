Template.filter.rendered = function() {
    data = this.$('.multiselect').data();

    this.$('.multiselect').multiselect({
        includeSelectAllOption: true,
        includeSelectAllDivider: true,
        enableCaseInsensitiveFiltering: true,
        filterBehavior: 'both',
        nonSelectedText: data['noneSelected'],
        onChange: renderGraph
        // buttonText: dropDownLabel,
    });
};

var renderGraph = function() {
  console.log('triggering');
  $('.multiselect').trigger("graphRender", getSelectedOptions());
}

var getSelectedOptions = function(element, checked) {
  var filters = $('select.multiselect option:selected');
  var selected = [];
  $(filter).each(function(index, item){
    if ($(this).val() != "multiselect-all") {
      selected.push($(this).val());
    }
  });
  return selected;
}

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