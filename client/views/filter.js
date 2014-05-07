Template.filter.rendered = function() {
    data = this.$('.multiselect').data();

    this.$('.multiselect').multiselect({
        includeSelectAllOption: true,
        includeSelectAllDivider: true,
        enableCaseInsensitiveFiltering: true,
        filterBehavior: 'both',
        nonSelectedText: data['noneSelected'],
        onChange: Template.filter.updateFilters
    });
};

Template.filter.updateFilters = function() {
  // Get Element and Category
  var el = $(this['$select']['context']);
  var category = el.data()['category'];

  // Get Selected Items
  var selected = [];
  el.find('option:selected').each(function(index, item){
    if ($(this).val() != "multiselect-all") {
      selected.push($(this).val());
    }
  });

  // Update Session Filters
  var filters = Session.get('filters');
    if (typeof(filters) == 'undefined'){
        var filters = {};
  }
  filters[category] = selected;
  Session.set('filters', filters);
  el.trigger("updatedFilters");
}