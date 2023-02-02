'use strict';

/* imports */
import ReactDOM from 'react-dom/client';
import React from 'react';
import Tues from "./tues.js";
import Preview from './preview.js';
import { data } from "./fetched_data.js";

/* routes */
let page_contents;

// remove '/Tues' after moving from gh pages domain to custom domain
if (window.location.pathname === '/Tues/' || 
    window.location.pathname === '/Tues/index.html' ||
    window.location.pathname === '/Tues/index')
{
    page_contents = <Tues panels={data}/>;
}
else if (window.location.pathname === '/Tues/preview.html' ||
         window.location.pathname === '/Tues/preview')
{
    page_contents = <Preview/>;
}
else
{
    page_contents = <p>Error</p>;
}

/* render */
const domContainer = document.querySelector('#tues');
const root = ReactDOM.createRoot(domContainer);
root.render(page_contents);
