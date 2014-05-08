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
      console.log 'Adding enrollment data'
      root.EnrollmentGenerator.create
        course: course
        scalingConstant: 50000,
        SNR: 1

      console.log 'Adding certification data'
      root.CertificationGenerator.create
        course: course
        scalingConstant: 50000*0.05,
        SNR: 1

      console.log 'Adding post count data'
      root.PostCountGenerator.create
        course: course
        scalingConstant: 1000,
        SNR: 1

      videos = CourseAxis.find
        category: 'video',
        course_id: course.course_id

      console.log 'Adding video views'
      videos.forEach (video) ->
        root.DailyCountsGenerator.create
          module: video
          course: course
          scalingConstant: 10000
          SNR: 5
          event_type: 'view'

      videos = CourseAxis.find
        category: 'video',
        course_id: course.course_id

      console.log 'Adding minutes_watched'
      videos.forEach (video) ->
        root.DailyCountsGenerator.create
          module: video
          course: course
          scalingConstant: 100000
          SNR: 1
          event_type: 'minutes_watched'

      problems = CourseAxis.find
        category: 'problem'
        course_id: course.course_id

      console.log 'Adding problem_attempts'
      problems.forEach (problem) ->
        root.DailyCountsGenerator.create
          module: problem
          course: course
          scalingConstant: 100000
          SNR: 1
          event_type: 'problem_attempts'

      problems = CourseAxis.find
        category: 'problem'
        course_id: course.course_id

      console.log 'Adding problem_corrects'
      problems.forEach (problem) ->
        root.DailyCountsGenerator.create
          module: problem
          course: course
          scalingConstant: 10000
          SNR: 5
          event_type: 'problem_corrects'