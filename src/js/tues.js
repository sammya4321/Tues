'use strict';

import * as constants from "./js/constants.js";
import { data } from "./js/fetched_data.js";

class ImgLoop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imgIndex: 0};
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    setInterval(this.tick, this.props.images.content.autoLoopDelay*1000);
  }

  tick() {
    let newIndex = this.state.imgIndex + 1;
    if ( this.state.imgIndex >= this.props.images.content.urls.length - 1) {
      newIndex = 0;
    }
    this.setState({imgIndex: newIndex});
  }

  render() {
    let ret = this.props.images.content.urls.map(
      (url, index) => <img
        className="media"
        src={url}
        key={index}
        style={{
          width: `calc(var(--column-size)*${this.props.images.width})`,
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
      style={{width: `calc(var(--column-size)*${this.props.media.width})`}}
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
  if ( props.content.pic ) {
    return (
      <img 
        className="text-img"
        src={props.content.pic.path}
        style={{width: `calc(var(--column-size)*${props.content.pic.width})`}}
        key={0}
      />);
  } else {
    return null;
  }
}

function PanelText(props) {
  if (props.content.text.contents.find(elm => elm.content.length > 1))
  {console.warn('Might have missed some text content?!'); console.log(props);}

  let text = props.content.text.contents.map( (elm, i) => {
    return (
      <p 
        style={{width: `calc(var(--column-size)*${props.content.text.width})`}}
        className="text"
        key={i}
      >
        {elm.content[0].value}
      </p>
    )
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
  if ( props.name.display ) {
    return <h1 className="panel-title">{props.name.name}</h1>;
  }
  return null;
}

function Panel(props) {
  let panelData = props.panel;
  let panel = (
    <div className="panel">
      <div 
        className="left-panel"
        style={{width: `calc(var(--column-size) * ${props.columns.leftPanel})`}}
      >
        <LeftImg content={panelData.text}/>
        <PanelTitle name={panelData.panelName}/>
        <PanelText content={panelData.text}/>
      </div>
      <div
        className="right-panel"
        style={{
          width: `calc(var(--column-size) * ${props.columns.rightPanel})`,
          left: `calc(${props.columns.leftPanel}*var(--column-size))`}}
      >
        <PanelMedia media={panelData.media}/>
      </div>
    </div>
  );

  return panel;
}

function Tues(props) {
  let content = [];
  let tuesData;

  tuesData = {
    panelSizes: {leftPanel: constants.PANEL_COLUMNS, rightPanel: constants.PANEL_COLUMNS},
    panels: data
  };
  content.push(<PanelBanner key={0} img={{type:  constants.mediaTypes.VID, path: constants.BANNER_PATH}}/>);
  for (let i = 0; i < tuesData.panels.length; i++) {
    let panel = tuesData.panels[i];
    content.push(<Panel panel={panel} key={i+1} columns={tuesData.panelSizes}/>);    
  }

  return content;
}

const domContainer = document.querySelector('#tues');
const root = ReactDOM.createRoot(domContainer);
root.render(<Tues/>);
