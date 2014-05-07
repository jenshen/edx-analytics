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
      buttonText: dropDownLabel,
    });

    this.$('.multiselect.time-filter').multiselect({
      enableCaseInsensitiveFiltering: true,
      filterBehavior: 'both',
    });

    setFilterOptions(EducationLevels.find());
};

var setFilterOptions = function(collection) {
  console.log(collection);
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
