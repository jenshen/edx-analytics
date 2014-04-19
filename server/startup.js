Meteor.startup(function() {
  // Visualizations.remove({});
  if (Visualizations.find().count() === 0) {
    Visualizations.insert({
      name: 'Course Summary',
      standard: true,
      ready: true,
      iframe: true,
      favorite: false,
      url: 'course_summary.html'
    });
    Visualizations.insert({
      name: 'Demographics',
      standard: true,
      ready: true,
      iframe: true,
      favorite: false,
      url: 'demographics.html'
    });
    Visualizations.insert({
      name: 'Video Activity',
      standard: true,
      ready: true,
      iframe: true,
      favorite: false,
      url: 'video_activity.html'
    });
    Visualizations.insert({
      name: 'Forum Activity',
      standard: true,
      ready: true,
      iframe: true,
      favorite: false,
      url: 'forum_activity.html'
    });
    Visualizations.insert({
      name: 'Certifications',
      standard: true,
      ready: false,
      iframe: true,
      favorite: false,
      url: 'certifications.html'
    });
  }
});