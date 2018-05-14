# Bart Trip Scheduler

By Nick Chapman

[github.com/nickpchapman](https://github.com/nickpchapman)

## Instructions

1.  Navigate to [project](https://github.com/nickpchapman/bartTripScheduler)
2.  Setup a local clone using
    `git clone https://github.com/nickpchapman/bartTripScheduler.git`
3.  Install dependencies using `yarn`
4.  Navigate to project folder and run server using `yarn server`
5.  Navigate to app in [browser](http://localhost:3001)

## Dependencies

I added the following dependencies:

[axios v0.18.0](https://github.com/axios/axios)
HTTP client used to handle Ajax requests

[bulma v0.7.1](https://bulma.io/)
css library used for styling

[express v4.16.2](https://expressjs.com/)
used for backend server

[react-datepicker v1.4.1](github.com/Hacker0x01/react-datepicker)
used to import date picker

[moment v2.22.1](http://momentjs.com/docs/)
peer-dependency of react-datepicker

[create-react-app](github.com/facebook/create-react-app)
was used to generate the scaffolding for this app.

## GOALS

#### Build a react app which utilizes the BART API

App allows users to plan a trip from one BART station to another. The user indicates their departing station, arriving station, and the date/time they would like to arrive or depart by. The app requests the relevant schedules from the BART API and displays several trains that meet the trip criteria.

App displays additional information relevant to the trip including: standard cost of a ticket, the BART line of each train, and whether the trip will require a transfer.

#### Add a bit of visual flair - make it look like you want it!

I used the bulma.io css library give the app some flair. I didn't include the BART logo because it is illegal according to the BART API docs
