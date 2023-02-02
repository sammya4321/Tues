
/* Constants */
// The page is split into sevenths - with a fourteenth on the far left and right
// and six in the centre. The left and right panels are evenly split with 3 each.
// Text takes 2 columns and the media takes 3. Defined here as constants.
const constants = {
    PANEL_COLUMNS: 3,       // left and right panels take 3 columns each
    SMALL_IMAGE_WIDTH: 1/2, // small pic above text - 1/2 a column
    TEXT_COLUMNS: 2,        // text on left takes 2 columns
    MEDIA_COLUMNS: 3,       // media takes 3 columns
    IMG_LOOP_DELAY: 1,      // delay for 1 sec between image loops
    PANEL_LIST: {name: "Intro and Singles", id: "qzEshFK2djTS5a6BfYUVq"}, // This is the Entry ID for the panel list so that we know what panels to show in what order.
    mediaTypes: {VID: 0, IMGS: 1}
};

/** 
 * Maps the response from Contentful to the format described in data_template.js
 * that can be passed into the panels prop of <Tues/>.
 */
function mapContentfulResponseToTuesPanels(response) {
    const panelsData = response.fields.introAndSingles.map((rawPanel) => {
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
    })
    return panelsData;
}

// Export as a module that can be imported in backend or frontend
(function(exports) {
    exports.commonConstants = constants;
    exports.commonFunctions = {
        mapCtflRespToTues: mapContentfulResponseToTuesPanels
    };
}(typeof exports === 'undefined' ? this.common = {} : exports));
