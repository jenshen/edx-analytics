UI.registerHelper('videoData', function(){
  records = []
  CourseAxis.find({category: 'video'}).forEach(function(video){
    records.push({
      display: video.name,
      value: video.module_id
    });
  });
  
  return {
    records: records,
    classes: 'video-filter',
    noneSelected: 'All Videos',
    multiple: true,
    category: 'module_id'
  };
});

UI.registerHelper('moduleData', function(){
  records = []
  CourseAxis.find({category: {$in: ['video','problem']}}).forEach(function(module){
    records.push({
      display: module.name,
      value: module.module_id
    });
  });
  
  return {
    records: records,
    classes: 'module-filter',
    noneSelected: 'All Modules',
    multiple: true,
    category: 'module_id'
  };
});



UI.registerHelper('countryData', function(){
  records = []
  Country.find({}).forEach(function(country){
    records.push({
      display: country.name,
      value: country.short
    });
  });
  
  return {
    records: records,
    classes: 'country-filter',
    noneSelected: 'All Countries',
    multiple: true,
    category: 'cc'
  };
});

UI.registerHelper('educationData', function(){
  records = []
  EducationLevels.find({}).forEach(function(loe){
    records.push({
      display: loe.name,
      value: loe.short
    });
  });
  
  return {
    records: records,
    classes: 'edu-filter',
    noneSelected: 'All Educations',
    multiple: true,
    category: 'loe'
  };
});

UI.registerHelper('timeData', function() {
  records = []
  TimeRanges.find({}).forEach(function(tr){
    records.push({
      display: tr.name,
      value: tr.short
    });
  });
  
  return {
    records: records,
    classes: 'time-filter',
    noneSelected: '',
    multiple: false,
    category: 'time'
  };
});