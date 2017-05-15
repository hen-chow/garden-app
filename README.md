# README

#TITLE: Garden Wizard (Customised your garden design web application)

# Live Demo:
[link for Garden Wizard App]https://pacific-peak-96393.herokuapp.com/

# Overview
"Garden Wizard" is a web application which allows users design their own garden layout and plan. Users can specify the size of their backyard to customise the layout, and plan their plant placement accordingly. Plants are found through a search function, which provides not only common names of the plant, but also its sun requirements, height, row spacing and width specs to further assist the user's garden planning process. Finally, a handy drag and drop functionality allows the user to drag and drop the plant wherever they please within the garden plan layout.

## User profile summary
When customers create an online account - a personalised profile account is created. Customers without a user account are able to still play with the garden planning functions, but the plan will not be saved for future use.

## Features
User and sessions functions
* User account creation and login and logout system
* User authentication and validation before proceeding to order
* Auto-save function is built to save the current user's garden plan every time a change has been made (eg moving a plant on the garden plan) if they're a registered user

Search function
* Plant search function is executed through an AJAX request to the Open Farm API
* The return data is then shaped and filtered to ensure that the data returned to the user is user-friendly (ie returning top 5 results that feature an image)
* Plans to expand on this search function once a better plant API is sourced

Garden name and size specifications
* User can specify what they'd like to call this garden plan as well as specify the dimensions of their garden. The garden plan will then be drawn in proportion to the supplied height and width. This information will then be updated in the user's planter box. User can edit the garden dimensions throughout the process.
* The above information is saved in the Rails database - executed through an AJAX request.
* Garden plan is drawn as a canvas once dimensions are submitted.

Plant select option
* Click 'add' to select each plant, which will be then updated to the user's planter box. The user can then use the planter box as their reference point to add and remove plants in their garden layout.

Plant drag and drop functions
* Plant drag and drop functions are built using Jquery-UI draggable and droppable widgets.
* Droppable zones are contained within the garden plan canvas.
* User can hover over each plant icon on the plan to identify the plant name.

## Specifications
* Ruby version 5.0.2
ruby 2.4.0p0 (2016-12-24 revision 57164)
* Use of Ruby on Rails
* Include separate HTML / CSS / JavaScript / Rails files
* Use of Materialize UI for styling
* Use of Font Awesome and Material for icons
Database creation
* Database created through PostgreSQL with 3 data models

* System dependencies

* Configuration
- Heroku web server

* Database creation
- PostgreSQL

* Database initialization
- Run seed file at initial launch of project

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions
