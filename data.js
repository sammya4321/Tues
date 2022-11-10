/* This file contains proxy data to simulate the data pulled from Contentful. */

import { mediaTypes } from "./common.js";

const introPanel = {
    panelName: {name: "Intro", display: false},
    bannerImg: {type: mediaTypes.VID, path: "assets/intro/spinny.mp4"},
    text: {
        pic: {path: 'assets/intro/flower.svg', width: 0.5},
        contents: `
        'tues.' (chews/choose) sounds like cheap wine and daydreams; close friends in small rooms between the city and a grey beach.

        'tues.' is Ben Deans (production) and Owen Sutcliffe (words). The pair have been making music together for a decade in various projects, and 'tues.' is the culmination of that work.

        Shifting; spitting; lamenting; prodding; this music exists somewhere between rap and everything else.

        Written and fully self-produced in Glasgow, these songs are instinctive.

        'tues.' wisely.
        `,
        width: 2
    },
    media: {
        type: mediaTypes.IMGS,
        width: 3,
        content: {
            autoLoopDelay: 1,
            urls: ["assets/intro/ben_and_owen_stumps1.JPG", "assets/intro/ben_and_owen_stumps2.JPG"],
            track: null
        }
    }
};

const singleExample = {
    panelName: {name: "TWO SUDDEN", display: true},
    text: {
        // pic: {path: 'assets/two-sudden/two-sudden.png', width: 1},
        pic: false,
        contents: `
        It's all deep colours and I'm torchlit.

        'Two Sudden' is the first single from Glasgow alternative rap duo 'tues.'

        It is an unsettled stumble through dense woodland. It is looking over your shoulder. 
        
        It is wondering who you are and who you've been. It is pausing on the edge of the forest, weighing up the dark behind and the city ahead.

        A pulsing, plodding baseline and minimal percussion carry the song forward. The narrative begins as brooding and grows more frantic, anxious as the song progresses. 

        Inspired by grey days in Scotland, ramshackle dens and the films of Ben Wheately; 

        'Two Sudden' is here. 
        `,
        width: 2
    },
    media: {
        type: mediaTypes.VID,
        width: 3,
        content: {
            url: "assets/two-sudden/trailer.mp4",
            thumbnail: "assets/two-sudden/poster.png"
        }
    }
};

export const example_data = {
    textSizes: {headers: null, body: null},
    panelSizes: {leftPanel: 3, rightPanel: 3},
    panels: [introPanel, singleExample],
};
