root = exports ? this

root.VideoActivityGenerator = 
  create: (obj) ->
    # Grab parameters
    @video = obj.video
    @course = obj.course
    @countries = obj.countries
    @loe = obj.educationLevels
    @SNR = obj.SNR ? 1
    @scalingConstant = obj.scalingConstant ? 1000

    # Parse start and end dates
    @start_date = moment @video.start_date, 'MM-DD-YYYY'
    @current_date = moment(@start_date)
    @end_date = moment @course.end_date, 'MM-DD-YYYY'

    while @current_date.isBefore(@end_date)
      this._generateActivity()
      @current_date = @current_date.add('days', 1)
    
  _generateActivity: ->
    this._generateCountry country for country in @countries

  _generateCountry: (country) ->
    console.log "cc: #{country.short}"
    this._generateLOE country, loe for loe in @loe

  _generateLOE: (country, loe) ->
    console.log "Number of Days: #{@num_days}"
    console.log "loe: #{loe.short}"
    @num_days = @current_date.diff(@start_date, 'days')
    
    constant = @scalingConstant * country.scale * loe.scale
    pure_count = Math.ceil(constant * Math.pow(Math.E, - 0.01*@num_days))
    noise = Math.ceil((Math.random() * pure_count) / @SNR)
    count = pure_count - noise

    doc = 
      date: @current_date.format 'MM-DD-YYYY'
      loe: loe.short
      cc: country.short
      count: count
      module_id: @video.module_id

    # console.log noise
    console.log count
    # ViewCount.insert doc