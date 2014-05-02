var root = typeof exports !== "undefined" && exports !== null ? exports : this;

Meteor.startup(function() {
  // CourseAxis.remove({});
  if (CourseAxis.find().count() === 0){
    root.CourseAxisFactory.create(courses[0]);
  }

  course = CourseAxis.findOne({category: 'course'})
  video = CourseAxis.findOne({
    category: 'video',
    course_id: course.course_id
  })

  root.VideoActivityGenerator.create({
    video: video,
    course: course,
    educationLevels: educationLevels,
    countries: countries,
    scalingConstant: 10000,
    SNR: 10
  })
  
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