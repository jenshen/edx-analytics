Meteor.startup(function() {
  // Visualizations.remove({});
  if (Visualizations.find().count() === 0) {
    Visualizations.insert({
      name: 'Course Summary',
      standard: true,
      ready: true,
      iframe: false,
      favorite: false,
      url: 'course_summary'
    });
    Visualizations.insert({
      name: 'Demographics',
      standard: true,
      ready: true,
      iframe: false,
      favorite: false,
      url: 'demographics'
    });
    Visualizations.insert({
      name: 'Video Activity',
      standard: true,
      ready: true,
      iframe: false,
      favorite: false,
      url: 'video_activity'
    });
    Visualizations.insert({
      name: 'Forum Activity',
      standard: true,
      ready: true,
      iframe: false,
      favorite: false,
      url: 'forum_activity'
    });
    Visualizations.insert({
      name: 'Certifications',
      standard: true,
      ready: false,
      iframe: false,
      favorite: false,
      url: 'certifications'
    });
  }
});