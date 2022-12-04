
/* 
 * This is a dummy file that doesn't actually get used. It shows the structure 
 * of data that should be returned from Contentful.
 * 
 * The root object has site wide settings followed by an array of panels that
 * have optional components.
 */
root = {
    textSizes: {headers: null, body: null}, /* {int | null , int | null}: size 
                                             * of headers and body text, null 
                                             * if to be left to default value */
    panels: [ panelsObj ] /* [panelObj]: array of panel objects */
};

panelsObj = {
    /* panelName is required and should provide a name or a label for the panel.
     * If used will be displayed above the text on the left of the page. */
    panelName: {
        name: "Intro", /* str: name of the panel, used as heading if display is 
                        * set to true */
        display: false /* bool: whether or not to display it, might not want to 
                        * for intro for exmaple */
    },

    /* bannerImg is optional, it would be used in the intro panel to show
     * spinny.mp4. If used it will be displayed in the cetnre at the top. */
    bannerImg: {
        type: bannerImgTypes.VID, /* int: should be a member of bannerImgTypes */
        path: "assets/banners/spinny.mp4"   /* str: path to the file */
    },
    
    /* text is required and will contain the text for the panel. It will be 
     * aligned on the left of the page. */
    text: {
        contents: ``, /* str: the description of single or bio for intro etc */
        width: 2, /* int: number of columns which the text should span */
    },

    /* media is required but media.content can be of different types as indicated
     * by media.type. It will be aligned to the right of the page. */
    media: {
        type: mediaTypes.VID,   /* int: the type of media */
        witdh: 3, /* int: the columns to span */
        content: mediaObj   /* imgs | vid : mediaObj can be imgs, a vid,
                             * or a track */
    }
};

/* if mediaObj (assigned to media.content) is of type IMGS it will have the
 * following fields */
mediaObj = {
    autoLoopDelay: 1,   /* int: if set to 0, then it won't loop, 
                        * otherwise its the interval used in the loop */
    urls: [""], /* [str]: an array of strings for paths to the images to loop.
                 * can be an array of one element for a non looping image */
};

/* if mediaObj (assigned to media.content) is of type VID it will have the
 * following fields */
mediaObj = {
    url: "", /* str: paths to the images to the vid */
    thumnail: null,  /* str | null : Path to the thumbnail or null if no thumbail */
};
