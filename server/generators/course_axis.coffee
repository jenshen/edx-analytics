root = exports ? this

root.CourseAxisFactory = 
  create: (course) ->    
    @course = course
    @startDate = course.start_date

    courseDoc = 
      name: @course.name
      course_id: @course.course_id
      start_date: this._parseDate(@startDate)
      end_date: this._parseDate(@course.end_date)
      category: 'course'

    # console.log courseDoc
    CourseAxis.insert(courseDoc)

    this._createChapter chapter for chapter in @course.chapters
    
  _createChapter: (chapter) ->
    @chapter = chapter
    @startDate = @chapter.start_date ? @startDate

    chapterDoc =
      name: @chapter.name
      module_id: @chapter.module_id
      start_date: this._parseDate(@startDate)
      course_id: @course.course_id
      category: 'chapter' 

    # console.log chapterDoc
    CourseAxis.insert(chapterDoc)

    this._createLecture lecture for lecture in @chapter.lecture_sequences
    this._createProblemSet problemSet for problemSet in @chapter.problem_sets
    
  _createProblemSet: (problemSet) ->
    @sequence = problemSet
    @startDate = @sequence.start_date ? @startDate

    sequenceDoc =
      name: @sequence.name
      module_id: @sequence.module_id
      start_date: this._parseDate(@startDate)
      course_id: @course.course_id
      chapter_id: @chapter.module_id
      category: "problem_set"
      gformat: "homework"

    # console.log sequenceDoc
    CourseAxis.insert(sequenceDoc)

    this._createProblem problem for problem in @sequence.problems

  _createProblem: (problem) ->
    @problem = problem
    @startDate = @problem.start_date ? @startDate

    problemDoc =
      name: @problem.name
      module_id: @problem.module_id
      start_date: this._parseDate(@startDate)
      course_id: @course.course_id
      chapter_id: @chapter.module_id
      sequence_id: @sequence.module_id
      category: "problem"
      gformat: "homework"

    # console.log problemDoc
    CourseAxis.insert(problemDoc)

  _createLecture: (lecture) ->
    @sequence = lecture
    @startDate = @sequence.start_date ? @startDate

    sequenceDoc =
      name: @sequence.name
      module_id: @sequence.module_id
      start_date: this._parseDate(@startDate)
      course_id: @course.course_id
      chapter_id: @chapter.module_id
      category: "lecture_sequence"
      gformat: "lecture" 

    # console.log sequenceDoc
    CourseAxis.insert(sequenceDoc)

    this._createVideo video for video in @sequence.videos

  _createVideo: (video) ->
    @video = video
    @startDate = @video.start_date ? @startDate

    videoDoc = 
      name: @video.name
      module_id: @video.module_id
      start_date: this._parseDate(@startDate)
      course_id: @course.course_id
      chapter_id: @chapter.module_id
      sequence_id: @sequence.module_id
      category: 'video'
      gformat: 'lecture'

    # console.log videoDoc
    CourseAxis.insert(videoDoc)

  _parseDate: (date) ->
    moment(date, 'MM-DD-YYYY').format('YYYY-MM-DD hh:mm:ss')
    