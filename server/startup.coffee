root = exports ? this

Meteor.startup ->
  if CourseAxis.find().count() == 0
    for course in courses
      root.CourseAxisFactory.create course 

    CourseAxis.find({category: 'course'}).forEach (course) ->
      videos = CourseAxis.find
        category: 'video',
        course_id: course.course_id

      videos.forEach (video) ->
        root.DailyCountsGenerator.create
          module: video,
          course: course,
          scalingConstant: 10000,
          SNR: 10,
          event_type: 'video_view'

      problems = CourseAxis.find
        category: 'problem'
        course_id: course.course_id

      problems.forEach (problem) ->
        root.DailyCountsGenerator.create
          module: problem
          course: course
          scalingConstant: 10000,
          SNR: 10,
          event_type: 'problem_view'

  if EducationLevels.find().count() == 0
    EducationLevels.insert loe for loe in educationLevels
      
  if Country.find().count() == 0
    Country.insert country for country in countries

  if Visualizations.find().count() == 0
    Visualizations.insert viz for viz in visualizations