'use strict';

import ReactDOM from 'react-dom/client';
import React from 'react';
import Tues from "./tues.js";
import Preview from './preview.js';
import { data } from "./fetched_data.js";

let page_contents;

const hostname_prefix = '/Tues';

if (window.location.pathname === `${hostname_prefix}/` || 
    window.location.pathname === `${hostname_prefix}/index.html` ||
    window.location.pathname === `${hostname_prefix}/index`)
{
    page_contents = <Tues panels={data} displayErrors={false}/>;
}
else if (window.location.pathname === `${hostname_prefix}/preview.html` ||
         window.location.pathname === `${hostname_prefix}/preview`)
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
