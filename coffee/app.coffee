if Meteor.isClient
  Template.hello.greeting = () ->
    return "Welcome to project.";

  Template.hello.events
    'click input': () ->
      if console?
        console.log "You pressed the button"

if Meteor.isServer
  Meteor.startup () ->