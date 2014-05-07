root = exports ? this

Meteor.startup ->
  if EducationLevels.find().count() == 0
    console.log 'Adding levels of education'
    EducationLevels.insert loe for loe in educationLevels
      
  if Country.find().count() == 0
    console.log 'Adding Countries'
    Country.insert country for country in countries

  if Visualizations.find().count() == 0
    console.log 'Adding Visualizations'
    Visualizations.insert viz for viz in visualizations

  if TimeRanges.find().count() == 0
    console.log 'Adding time ranges'
    TimeRanges.insert tr for tr in timeRanges
  
  if CourseAxis.find().count() == 0
    console.log('Adding courses')
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