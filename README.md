# City Explorer API

**Author**: Chris Fanucchi
**Version**: 1.4.0

## Overview

A web back-end server for providing data to other servers for fronts-end development.

## Getting Started

This app can be copied and used, but knowledge of the hardcoded APIs is required.

## Architecture

This app uses JavaScript and Node.js to handle the back-end processing.

![Server Communication](server-comms.png)
![API data flow](city-explorer-dataflow.png)
![API data flow](dataflow-lab-8.png)
![API data flow with cache](server-comms-with-cache.png)

## Change Log

09-27-2022 14:45 - Setup initial files and file structure for app.
09-28-2022 17:30 - Added retrieval of weather and movie data from external server through API.
09-29-2022 18:15 - Modularized API retrieval functions.
09-30-2022 15:30 - Added caching for data retrieved via API.

## Credit and Collaborations

Worked with Mehtab Riar, Erik Dobb, and Ian Forrester on http request cycle process diagrams.

## Feature Addition Tracking

1. Name of feature: Initial setup and coding
   Estimate of time needed to complete: 2.5 hours
   Start time: 14:45
   Finish time: 16:45
   Actual time needed to complete: 2 hours

2. Name of feature: Get API weather data from external server
   Estimate of time needed to complete: 1.5 hours
   Start time: 15:30
   Finish time: 17:00
   Actual time needed to complete: 1.5 hours

3. Name of feature: Modularize retrieving weather and movies data
   Estimate of time needed to complete: 1 hour
   Start time: 12:45
   Finish time: 13:15
   Actual time needed to complete: 0.5 hours

4. Name of feature: Add caching of API retrieved data
   Estimate of time needed to complete: 1 hour
   Start time: 14:00
   Finish time: 14:40
   Actual time needed to complete: 40 mins
