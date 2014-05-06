Template.filters.rendered = function() {
    this.$('.multiselect.video-filter').multiselect({
      includeSelectAllOption: true,
      includeSelectAllDivider: true,
      enableCaseInsensitiveFiltering: true,
      filterBehavior: 'both',
      nonSelectedText: 'All Videos',
      buttonText: dropDownLabel,
    });

    this.$('.multiselect.geo-filter').multiselect({
      includeSelectAllOption: true,
      includeSelectAllDivider: true,
      enableCaseInsensitiveFiltering: true,
      filterBehavior: 'both',
      nonSelectedText: 'All Countries',
      buttonText: dropDownLabel,
    });

    this.$('.multiselect.edu-filter').multiselect({
      includeSelectAllOption: true,
      includeSelectAllDivider: true,
      enableCaseInsensitiveFiltering: true,
      filterBehavior: 'both',
      nonSelectedText: 'All Educations',
      buttonText: dropDownLabel
    });

    this.$('.multiselect.time-filter').multiselect({
      enableCaseInsensitiveFiltering: true,
      filterBehavior: 'both',
    });

    this.$('.multiselect.geo-filter').multiselect('dataprovider', getFilterOptions(Country.find()));
    this.$('.multiselect.edu-filter').multiselect('dataprovider', getFilterOptions(EducationLevels.find()));
};

var getSelected = function(element, checked) {
  var filter = $(this).find('option:selected');
  var selected = [];
  $(filter).each(function(index, item){
    selected.push([$(this).val()]);
  });
  console.log(filter);
};

var getFilterOptions = function(collection) {
  var options = [];
  collection.forEach(function(item){
    options.push({label: item.name, value: item.name});
  });
  return options;
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
