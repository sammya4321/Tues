'use strict';

import React from 'react';
import * as common from "./common.js";
import '../css/tues.css';
import BANNER_PATH from '../assets/spinny.mp4'

const constants = common.commonConstants;

class ImgLoop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imgIndex: 0};
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    setInterval(this.tick, this.props.images.content.autoLoopDelay*1000);
    handle_aspect_ratio(mq);
  }

  tick() {
    let newIndex = this.state.imgIndex + 1;
    if ( this.state.imgIndex >= this.props.images.content.urls.length - 1) {
      newIndex = 0;
    }
    this.setState({imgIndex: newIndex});
  }

  render() {
    const ret = this.props.images.content.urls.map(
      (url, index) => <img
        className={`media img-loop ${(index == 0) ? 'first-image-in-loop' : ''}`}
        src={url}
        key={index}
        style={{
          visibility: (index == this.state.imgIndex) ? "visible" : "hidden" 
        }}
      />
    );
    return ret;
  }
}

class Vid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {controls: false};
    this.showControls = this.showControls.bind(this);
    this.hideControls = this.hideControls.bind(this);
  }

  showControls() {
    this.setState({controls: true});
  }

  hideControls() {
    this.setState({controls: false});
  }

  render() {
    return (<video 
      className="media"
      poster={this.props.media.content.thumbnail}
      onMouseOver={this.showControls}
      onMouseOut={this.hideControls}
      controls={this.state.controls}
    >
      <source src={this.props.media.content.url} type="video/mp4"/>
    </video>);
  }
}

function PanelMedia(props) {
  if (props.media.error === true) {
    return <Err/>;
  }

  switch ( props.media.type ) {
    case  constants.mediaTypes.IMGS:
      if (props.media.content.autoLoopDelay > 0) {
        return <ImgLoop images={props.media}/>;
      }
      break;
    case  constants.mediaTypes.VID:
      return <Vid media={props.media}/>
    default:
      console.warn('unexpected mediaType');
  }
  return null;
}

function LeftImg(props) {
  if ( props.content.pic.path ) {
    return (
      <img 
        className="text-img"
        src={props.content.pic.path}
        key={0}
      />);
  } else {
    return null;
  }
}

function PanelText(props) {
  if (props.content.error === true) {
    return <Err/>;
  }

  if (props.content.text.contents.find(elm => elm.content.length > 1))
  {console.warn('Might have missed some text content?!'); console.log(props);}

  let text = props.content.text.contents.map( (elm, i) => {
    return ( <p  className="text" key={i}>{elm.content[0].value}</p> );
  })
  return( <>{text}</> )
}

function PanelBanner(props) {
  if ( props.img ) {
    switch ( props.img.type ) {
      case  constants.mediaTypes.VID:
        return (
          <video className="banner" loop autoPlay muted>
              <source src={props.img.path} type="video/mp4"/>
          </video>
        );
      case  constants.mediaTypes.IMGS:
        console.warn('mediaType.IMGS not yet implemented for PanelBanner');
        break;
      default:
        console.warn('unrecognised mediaType');
    }
  }
  return null;
}

function PanelTitle(props) {
  if (props.name.error === true) {
    return <Err/>;
  }

  if ( props.name.display === true ) {
    return <h1 className={`panel-title ${props.screenClass}`}>{props.name.name}</h1>;
  }
  return null;
}

function isPanelValid(panel) {
  let ret = {errors: false, errMsgs: [], errComponents: []};
  if (panel.panelName.error === true)
  {
    ret.errors = true;
    ret.errMsgs.push(panel.panelName.errorMsg);
    ret.errComponents.push("There is something wrong with the title");
  }
  if (panel.text.error === true)
  {
    ret.errors = true;
    ret.errMsgs.push(panel.text.errorMsg);
    ret.errComponents.push("There is something wrong with the text");
  }
  if (panel.media.error === true)
  {
    ret.errors = true;
    ret.errMsgs.push(panel.media.errorMsg);
    ret.errComponents.push("There is something wrong with the images or video");
  }
  return ret;
}

function Err(props) {
  if (gDisplayErrs === true) {return (<p><i>error</i></p>);}
  else {return null;}
}

function PanelError(props) {
  let summary;

  const err = isPanelValid(props.panelData);
  if (err.errors === false) {return null;}

  if (err.errMsgs.length === 1) {
    summary = `Error in '${props.panelData.panelName.name}'`;
  } else if ( err.errMsgs.length > 1 ) {
    summary = `Errors in '${props.panelData.panelName.name}'`;
  }
  
  if (props.panelData.panelName.error === false) {
    console.log(summary);
  }
  err.errComponents.forEach(msg => console.log(msg));
  err.errMsgs.forEach(err => console.error(err));

  if (gDisplayErrs === true) {
    let ret = [];
    let key = 0;
    if (props.panelData.panelName.error === false) {
      ret.push(<h1 key={key}>{summary}</h1>)
      key++;
    }
    err.errComponents.forEach((msg, i) => {ret.push(<p key={key+i} style={{fontWeight: 'bold'}}>{msg}</p>)});
    key += err.errComponents.length;
    err.errMsgs.forEach((err, i) => {ret.push(<p key={key+i}>{err}</p>)});
    key += err.errMsgs.length;
    return (
      <div style={{border: '5px solid red'}}>
        {ret}
      </div>
    )
  } else {
    return null;
  }
}

function Panel(props) {
  let panelData = props.panel;

  let panel = (
    <div className="panel">
      <PanelError panelData={panelData}/>
      <PanelTitle name={panelData.panelName} screenClass="small-screen-title"/>
      <div className="right-panel">
        <PanelMedia media={panelData.media}/>
      </div>
      <div className="left-panel">
        <LeftImg content={panelData.text}/>
        <PanelTitle name={panelData.panelName} screenClass="large-screen-title"/>
        <PanelText content={panelData.text}/>
      </div>
    </div>
  );

  return panel;
}

const Tues = props => {
  let content = [];
  let tuesData;

  if (props.displayErrors === true) {
    gDisplayErrs = true;
  }

  tuesData = {
    panelSizes: {leftPanel: constants.PANEL_COLUMNS, rightPanel: constants.PANEL_COLUMNS},
    panels: props.panels
  };
  content.push(<PanelBanner key={0} img={{type:  constants.mediaTypes.VID, path: BANNER_PATH}}/>);
  content = content.concat(tuesData.panels.map((panel, i) => {
    return (
      <Panel 
        panel={panel} 
        key={i+1}
        columns={tuesData.panelSizes}
      />
    )
  }));
  
  return content;
}

/** handle layout in portrait mode */
async function handle_aspect_ratio(mq) {
  if (mq.matches) {
    // in portrait
    var img_loops = document.getElementsByClassName("first-image-in-loop");
    for (var i = 0; i < img_loops.length; i++) {
      await img_loops[i].decode();
      img_loops[i].parentNode.style.height = `${img_loops[i].offsetHeight}px`;
    }
  } else {
    // in landscape
    var img_loops = document.getElementsByClassName("first-image-in-loop");
    for (var i = 0; i < img_loops.length; i++) {
      img_loops[i].parentNode.style.height = ``;
    }
  }
}

var mq = window.matchMedia("screen and (max-width: 900px)");
mq.addEventListener("change", handle_aspect_ratio);

function reportWindowSize() {
  handle_aspect_ratio(mq);
}

window.onresize = reportWindowSize;

let gDisplayErrs = false;

export default Tues;
