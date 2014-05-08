root = exports ? this

root.EnrollmentGenerator = 
  create: (obj) ->
    # Grab parameters
    @course = obj.course
    @SNR = obj.SNR ? 1
    @scalingConstant = obj.scalingConstant ? 1000

    # Parse start and end dates
    @start_date = moment @course.start_date, 'YYYY-MM-DD hh:mm:ss'
    @end_date = moment()
    @current_date = moment(@start_date)

    while @current_date.isBefore(@end_date)
      @femaleRatio = Math.random()
      this._generateActivity()
      @current_date = @current_date.add('days', 1)

  _generateActivity: ->
    @countries = Country.find()
    @countries.forEach (country) =>
      this._generateCountry country

  _generateCountry: (country) ->
    # console.log "cc: #{country.short}"
    @loe = EducationLevels.find()
    @loe.forEach (loe) =>
      this._generateLOE country, loe

  _generateLOE: (country, loe) ->
    # console.log "Number of Days: #{@num_days}"
    # console.log "loe: #{loe.short}"
    @num_days = @current_date.diff(@start_date, 'days')
    
    constant = @scalingConstant * country.scale * loe.scale
    pure_count = Math.ceil(constant * Math.pow(Math.E, - 0.03*@num_days))
    noise = Math.ceil((Math.random() * pure_count) / @SNR)
    count = pure_count - noise

    femaleDoc = 
      date: @current_date.format 'YYYY-MM-DD hh:mm:ss'
      loe: loe.short
      cc: country.short
      count: count*@femaleRatio
      gender: 'female'
      course_id: @course.course_id

    maleDoc = 
      date: @current_date.format 'YYYY-MM-DD hh:mm:ss'
      loe: loe.short
      cc: country.short
      count: count*(1.0 - @femaleRatio)
      gender: 'male'
      course_id: @course.course_id

    # console.log count
    Enrollment.insert femaleDoc
    Enrollment.insert maleDoc