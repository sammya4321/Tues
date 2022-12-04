/*
 * This static site genorator fetches data from Contentful and writes it in the 
 * form described by src/js/data_templace.js to an exported variable in
 * src/js/fetched_data.js. For this script to work, the CDA Access Token and 
 * Space ID must be set as environment variables CDA_ACCESS_TOKEN and SPACE_ID
 * respectively.
 */

import * as constants from "../src/js/constants.js";
import fs from "fs";
import contentful from "contentful";

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
client.getEntry(constants.PANEL_LIST.id)
.then( (response) => {
  let panelsData = response.fields.introAndSingles.map((rawPanel) => {
    let singlePanelData = {
      panelName: {name: rawPanel.fields.title, display: rawPanel.fields.displayTitle},
      text: {
        pic:  {path: rawPanel.fields?.smallImage?.fields?.file?.url, width: constants.SMALL_IMAGE_WIDTH},
        text: {contents: rawPanel.fields.description.content, width: constants.TEXT_COLUMNS},
      }
    };
    
    if ( rawPanel.fields.largeImage ) {
      singlePanelData.media = {
        type:  constants.mediaTypes.IMGS,
        width: constants.MEDIA_COLUMNS,
        content: {
          autoLoopDelay: constants.IMG_LOOP_DELAY,
          urls: rawPanel.fields.largeImage.map((img) => img.fields.file.url)
        }
      }
    }

    if ( rawPanel.fields.video ) {
      singlePanelData.media = {
        type:  constants.mediaTypes.VID,
        width: constants.MEDIA_COLUMNS,
        content: {
          url: rawPanel.fields.video.fields.file.url,
          thumbnail: rawPanel.fields.videoThumbnail?.fields.file.url
        }
      }
    }

    return singlePanelData;
  })    // map end
  const file_contents = `export const data = ${JSON.stringify(panelsData)};`;
  fs.writeFile('./src/js/fetched_data.js', file_contents, err => {if (err) {console.error(err)}});
})  // .then end
.catch(console.error)

