'use strict';

import React from 'react';
import { useState } from 'react';
import '../css/form.css';
import Tues from './tues.js'
const contentful = require('contentful');
const common = require("./common.js");
    
const CPA_COOKIE_NAME = "cpa_token";
const SID_COOKIE_NAME = "space_id";

// from https://stackoverflow.com/a/25490531/20431655
const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

// from https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function login(space_id, cpa_token) {
    return ( new Promise ((resolve, reject) => {
        const client = contentful.createClient({
            space: space_id,
            accessToken: cpa_token,
            host: 'preview.contentful.com'
        });
        console.log(client);

        client.getEntry(common.commonConstants.PANEL_LIST.id)
        .then( (response) => {
            console.log('logged in');
            resolve(response);
        })
        .catch( (rej) => {
            console.error('failed to login');
            reject(rej);
        })
    }));
}

function SignInForm(props) {
    const [inputs, setInputs] = useState({renemba: false});
    const [attempt, setAttempt] = useState({bad: false, good: false});

    let formColouring='';

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // try log in, return tues if successful or highlight form red if wrong
        console.log(inputs);
        login(inputs.spaceID, inputs.cpaToken)
        .then( (response) => {
            if (inputs.renemba) {
                setCookie(SID_COOKIE_NAME, inputs.spaceID, 30);
                setCookie(CPA_COOKIE_NAME, inputs.cpaToken, 30);       
            }
            setAttempt({bad: false, good: true});
            props.setPanels({signedIn: true, data: response});
        })
        .catch( (resp) => {
            console.log(resp);
            setAttempt({bad: true, good: false});
        })
    }

    if (attempt.bad === true) {
        formColouring = 'badDetails';
    } else if (attempt.good === true) {
        formColouring = 'goodDetails';
    }

    return (
        <form onSubmit={handleSubmit} className={formColouring}>
            <p>
                Find the 'Space ID' and 'Preview Access Token' by logging into <a 
                href="https://www.contentful.com/" target={'_blank'}>Contentful</a>,
                clicking on 'Settings', then 'API Keys', then selecting any of the 
                listed keys.
                <br/><br/>
                (Note, it's the <b>Preview</b> token you want, <b>not</b> the Delivery token.)
            </p>
            <label><p>Space ID:</p>
                <input 
                    type="text"
                    name="spaceID"
                    value={inputs.spaceID || ""} 
                    onChange={handleChange}
                    autoComplete="username"
                />
            </label>
            <label><p>Content Preview API - access token:</p>
                <input 
                    type="password"
                    name="cpaToken"
                    value={inputs.cpaToken || ""} 
                    onChange={handleChange}
                    autoComplete="current-password"
                />
            </label>
            <div style={{'marginTop': "10px"}}>
                <label>Remember Me?
                    <input
                        type="checkbox"
                        name="renemba"
                        checked={inputs.renemba}
                        onChange={handleChange}
                    />
                </label>    
            </div>        
            <input type="submit"/> 

        </form>
    )
}

const Preview = props => {
    const [panels, setPanels] = useState({signedIn: false, data: []});
    const [triedCookie, setTriedCookie] = useState(false);

    // on first mount try sign in with cookies
    if (panels.signedIn === false && triedCookie === false) {
        let cookies = document.cookie;
        if ( cookies.includes(CPA_COOKIE_NAME) && 
                cookies.includes(SID_COOKIE_NAME)) {

            const cpa_token = getCookieValue(CPA_COOKIE_NAME);
            const space_id = getCookieValue(SID_COOKIE_NAME);

            login(space_id, cpa_token)
            .then ( (response) => {
                console.log('logged in from previously stored cookies,  +30 days');
                setCookie(SID_COOKIE_NAME, space_id, 30);
                setCookie(CPA_COOKIE_NAME, cpa_token, 30);
                setPanels({signedIn: true, data: response});
            } )
            .catch ( () => {
                console.log('failed to log in with the provided cookies...');
                console.log('removing the bad cookies');
                setCookie(SID_COOKIE_NAME, '', -1);
                setCookie(CPA_COOKIE_NAME, '', -1);
            } )
            .finally( () => {
                setTriedCookie(true);
            })
        } else {
            // there were no cookies to try
            setTriedCookie(true);
        }
    }

    if (triedCookie === true) {
        if (panels.signedIn === false) {
            return <SignInForm setPanels={setPanels}></SignInForm>
        } else {
            const panelsData = common.commonFunctions.mapCtflRespToTues(panels.data);
            return <Tues panels={panelsData} displayErrors={true}/>;
        }
    } else {
        console.log('loading...');
        return <p>LLOADINGG!</p>;
    }
}

export default Preview;
