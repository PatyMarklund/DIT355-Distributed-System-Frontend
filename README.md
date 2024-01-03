# DIT355 - Distributed Systems - Frontend Repository

This repository contains the code for the frontend of our web application. The frontend is built using HTML, CSS, and JavaScript, and is designed to provide a seamless and intuitive user experience for our users. For a more detailed view of the DENS CURA system, please view the [Main repository](https://github.com/PatyMarklund/DIT355-Distributed-System-Main).

## Component responsibilities

- Present a landing page to welcome users to Dens Cura.

- Display a Google Map with all locations of dental clinics.

- Search for booking options, for returning users.

- Direct user from chosen clinic on map to booking view.

- Request and publish time slots in the calendar view, which includes:
  - Reserving a time slot during the booking session.
  - Allowing users to confirm bookings.
  - Displaying a confirmation pop-up.

## Installing and running

### Prerequisites:
Node

The following versions were used by our team during development, newer versions might also work: Windows v16.17.0 - Linux v12.22.9 - MacOS 14.20.0 - [Download](https://nodejs.org/en/download/)
### Instructions:

| Step: | Instruction: |
| ------ | ------ |
| Clone this project on your machine | `git clone < SSH address or HTTPS address >` |
| Install necessary dependencies  | `npm i` |
| Start the system from the repo by running the following  | `npm run serve` |
 
Make sure to also start the other systems since they are dependent on each other to work properly.
