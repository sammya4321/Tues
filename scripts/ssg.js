/*
 * This 'static site generator' fetches data from Contentful and writes it in
 * the form described by src/js/data_templace.js to an exported variable in
 * src/js/fetched_data.js. For this script to work, the CDA Access Token and
 * Space ID must be set as environment variables CDA_ACCESS_TOKEN and SPACE_ID
 * respectively.
 */

const common = require("../src/js/common.js");
const fs = require("fs");
const contentful = require("contentful");

const client = contentful.createClient({
    // This is the space ID
    space: process.env.SPACE_ID,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: process.env.CDA_ACCESS_TOKEN
});

/*
 * Fetch the panels from the 'Intro and Singles' list and write it to a file in 
 * the schema expected by tues.js and described in data_template.js
 */
client.getEntry(common.commonConstants.PANEL_LIST.id)
.then( (response) => {
  console.log('Succesfully fetched from contentful');
  let panelsData = common.commonFunctions.mapCtflRespToTues(response);
  const file_contents = `export const data = ${JSON.stringify(panelsData)};`;
  const path = './src/js/fetched_data.js';
  console.log(`writing to ${path}`);
  fs.writeFile(path, file_contents, err => {if (err) {console.error(err)}});
})  // .then end
.catch(console.error)

