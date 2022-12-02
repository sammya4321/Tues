/* 
 * This file contains constants the client required for pulling content from
 * Contentful. 
 */

/* Constants */
// The page is split into sevenths - with a fourteenth on the far left and right
// and six in the centre. The left and right panels are evenly split with 3 each.
// Text takes 2 columns and the media takes 3. Defining it here rather than in
// css is to allow individual panels to easily overwrite the norm if required in
// the future.
export const constants = {
    PANEL_COLUMNS: 3,       // left and right panels take 3 columns each
    SMALL_IMAGE_WIDTH: 1/2, // small pic above text - 1/2 a column
    TEXT_COLUMNS: 2,        // text on left takes 2 columns
    MEDIA_COLUMNS: 3,       // media takes 3 columns
    IMG_LOOP_DELAY: 1,      // delay for 1 sec between image loops
    PANEL_LIST: {name: "Intro and Singles", id: "qzEshFK2djTS5a6BfYUVq"}, // This is the Entry ID for the panel list so that we know what panels to show in what order.
    BANNER_PATH: "assets/intro/spinny.mp4"  // keeping this local for now
}

export const mediaTypes = {
    VID: 0,
    IMGS: 1,
};

/* Load the Contentful client used for retrieving the content */
export const client = contentful.createClient({
    // This is the space ID.
    space: "b2zbjs9kymaz",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "xJ2EZB3neDvXjs4PTcS7u5Qzv23uksfvsLe70q2bFOU"
});
