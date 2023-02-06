# Tues

A statically generated site for Tues with content pulled from Contentful.

## How it works

The site uses Github Actions to run a node script (using the CDA access Token 
which is saved as an environment variable in a Github secret) that pulls 
content from Contentful and writes it to a file. The actions are triggered 
either by:

a) A publish event from Contentful (using a webhook)
b) Pushing to the main branch of the repo

The response is formatted using the map function in src/js/common.js into the
format described in src/js/data_template.js, written to a file and passed in as
a prop to the `Tues` React component (src/js/tues.js).

## TODO

* Add preview page - in progress - done?
    * Restructure to use webpack and build with babel
    * Update workflows for new build scripts (remember to include the new env var)
    * Add form to get CPA access token
* Make mobile friendly
* Sort out custom domain
* Add favicon
* Add License
* replace any width: {width} with a class: {class}, apply the style with a css 
  class instead, use media queries to adjust layout for smaller screens