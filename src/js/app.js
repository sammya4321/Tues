'use strict';

/* imports */
import ReactDOM from 'react-dom/client';
import React from 'react';
import Tues from "./tues.js";
import Preview from './preview.js';
import { data } from "./fetched_data.js";

/* routes */
let page_contents;
if (window.location.pathname === '/' || 
    window.location.pathname === '/index.html' ||
    window.location.pathname === '/index')
{
    page_contents = <Tues panels={data}/>;
}
else if (window.location.pathname === '/preview.html' ||
         window.location.pathname === '/preview')
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
