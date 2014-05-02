var root = typeof exports !== "undefined" && exports !== null ? exports : this;

Meteor.startup(function() {
  if (CourseAxis.find().count() === 0){
    root.CourseAxisFactory.create(courses[0]);
  }

  // course = CourseAxis.findOne({category: 'course'})
  // video = CourseAxis.findOne({
  //   category: 'video',
  //   course_id: course.course_id
  // })

  // root.VideoActivityGenerator.create({
  //   video: video,
  //   course: course,
  //   educationLevels: educationLevels,
  //   countries: countries,
  //   scalingConstant: 10000,
  //   SNR: 10
  // })
  
  if (EducationLevels.find().count() === 0){
    EducationLevels.insert({
      'name': 'PhD',
      'short': 'p',
      'scale': 0.15
    });
    EducationLevels.insert({
      'name': 'Masters',
      'short': 'm',
      'scale': 0.15
    });
    EducationLevels.insert({
      'name': 'High School',
      'short': 'hs',
      'scale': 0.25
    });
    EducationLevels.insert({
      'name': 'Bachelors',
      'short': 'b',
      'scale': 0.25
    });
    EducationLevels.insert({
      'name': 'Other',
      'short': 'o',
      'scale': 0.2
    });
  }

  if (Country.find().count() === 0){
    Country.insert({
      'name': 'United States',
      'short': 'US',
      'scale': 1.0
    });
    Country.insert({
      'name': 'United Kingdom',
      'short': 'UK',
      'scale': 0.3
    });
    Country.insert({
      'name': 'Spain',
      'short': 'ES',
      'scale': 0.45
    });
    Country.insert({
      'name': 'China',
      'short': 'CN',
      'scale': 0.15
    });
    Country.insert({
      'name': 'Brazil',
      'short': 'BR',
      'scale': 0.35
    });
  }

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