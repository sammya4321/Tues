
/* Constants */

const constants = {
    IMG_LOOP_DELAY: 1,    // delay used in autoloop
    PANEL_LIST: {name: "Intro and Singles", id: "qzEshFK2djTS5a6BfYUVq"}, // This is the Entry ID for the panel list so that we know what panels to show in what order.
    mediaTypes: {VID: 0, IMGS: 1} // enumerations for media types
};

/** 
 * Maps the response from Contentful to the format described in data_template.js
 * that can be passed into the panels prop of <Tues/>.
 */
function mapContentfulResponseToTuesPanels(response) {
    const panelsData = response.fields.introAndSingles.map((rawPanel) => {
        let singlePanelData = {
          panelName: {},
          text: {},
          media: {}
        };

        try {
          singlePanelData.panelName = { 
            name: rawPanel.fields.title, 
            display: rawPanel.fields.displayTitle,
            error: false
          };
        } catch(err) {
          singlePanelData.panelName = { error: true, errorMsg: err.message };
        }

        try {
          singlePanelData.text = { 
            pic:  {path: rawPanel.fields?.smallImage?.fields?.file?.url},
            text: {contents: rawPanel.fields.description.content},
            error: false
          };
        } catch(err) {
          singlePanelData.text = { error: true, errorMsg: err.message };
        }
        
        if ( rawPanel.fields.largeImage ) {
          try {
            singlePanelData.media = {
              type:  constants.mediaTypes.IMGS,
              content: {
                autoLoopDelay: constants.IMG_LOOP_DELAY,
                urls: rawPanel.fields.largeImage.map((img) => img.fields.file.url)
              },
              error: false
            }
          } catch (err) {
            singlePanelData.media = { error: true, errorMsg: err.message };
          }
        }
    
        if ( rawPanel.fields.video ) {
          try {
            singlePanelData.media = {
              type:  constants.mediaTypes.VID,
              content: {
                url: rawPanel.fields.video.fields.file.url,
                thumbnail: rawPanel.fields.videoThumbnail?.fields.file.url
              },
              error: false
            }
          } catch(err) {
            singlePanelData.media = { error: true, errorMsg: err.message };
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
