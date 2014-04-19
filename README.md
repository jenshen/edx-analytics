edX Analytics
=============

# Overview
## Motivation
Although an enormous amount of data is stored for each student as he or she progresses through a course, instructors and administrators of edX courses are currently unable to access any of this information. Data including course progress, overall course statistics, and logs of all student user interactions all exist, but are inaccessible to a market that would find it the most valuable. Even if granted access to this raw data, instructors would need to learn data-processing techniques and frameworks, followed by hours spent converting the data to an understandable form. Instructors desperately need a way to track student progress, visualize class performance, and view student-level and class level statistics; yet there is no usable system available.

For content teams, professors, and teachers, our project for MIT's UI Design & Implementation class (6.813/6.831) is an edX analytics tool that provides up-to-date analytics of student progress and overall course statistics.

## Technical Background
Our prototype was created using Meteor.js and Meteorite (a Meteor version manager and package manager).

For development the following libraries and tools were also used:

+ Foundation (http://foundation.zurb.com/)
+ Compass (http://compass-style.org/)
+ SCSS (http://sass-lang.com/)
+ jQuery (http://jquery.com/)
+ D3 (http://d3js.org/)

# Setup
## Dependencies

Before downloading and running our application be sure to install the following software:
+ [Meteor - 0.8.0](https://www.meteor.com/)
+ [Meteorite](https://github.com/oortcloud/meteorite/)
+ [Compass](http://compass-style.org/)

### Installation Instructions

edX Analytics can be cloned directly from this website.

``` sh
$ git clone git@github.com:jenshen/edx-analytics.git
$ cd edx-analytics
```

Using Meteorite a development server can be started as follows:

``` sh
# In the project's root directory
$ mrt install
$ mrt
```

Finally, to compile the scss documents use compass to watch the files in the project directory:

``` sh
# In the project's root directory
$ compass watch
```

# Directories
+ <strong>client</strong>: loaded only by the client-side application
    * Example: Templates, views, etc.
+ <strong>server</strong>: loaded only by the server-side application
    * Example: Database seeding and cleaning
+ <strong>shared</strong>: loaded by both the client and server side applications
    * Example: Collection definitions, data validations
+ <strong>public</strong>: storage location for static files that should be publicly viewable. This directory isn't loaded by the server or client
    * Example: Images
+ <strong>private</strong>: storage location for private static file used by the development team. This directory isn't loaded by the server or client
    * Example: Development documents
