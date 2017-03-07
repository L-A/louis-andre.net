import React from 'react'
import Icon from '~/components/icon.js'
import YoutubePlayer from '~/components/page-specific/scanneur/youtube'
import SoundcloudPlayer from '~/components/page-specific/scanneur/soundcloud'

const PLAYING_COLOR = "#85b697";
const OFF_COLOR = "#cbd1cd";

class MediaSource extends React.Component {
  render = (props) => {
    let source = this.props.source
    let AudioSource
    let propsData

    switch (source.type) {
      case "audio-player":
        AudioSource = AudioPlayer
        propsData = {
          url: source.url,
          name: source.value
        }
        break
      case "soundcloud":
        AudioSource = SoundcloudPlayer
        propsData = {
          url: source.url,
          name: source.value
        }
        break
      case "youtube":
        AudioSource = YoutubePlayer
        propsData = {
          videoId: source.videoID,
          name: source.value
        }
        break
      case "8tracks":
        AudioSource = IFramePlayer
        propsData = {
          yankOnStop: true,
          url: source.url,
          name: source.value
        }
        break
      default:
        AudioSource = IFramePlayer
        propsData = {
          url: source.url,
          name: source.value
        }
    }

    return (
      <AudioSource {...propsData} shouldPlay={this.props.shouldPlay}/>
    )
  }
}

let IFramePlayer = (props) => (
  <iframe width="300" height="240" src={(!props.shouldPlay && props.yankOnStop) ? "" : props.url + "/autoplay+shuffle"} frameBorder="0" width="300" height="200">
  </iframe>
)

class AudioPlayer extends React.Component {
  render = (props) => (
    <audio controls autoPlay={this.props.shouldPlay} id={this.props.name}>
      <source src={this.props.url}></source>
      <style jsx>{`
        audio { width: 300px }
      `}</style>
    </audio>
  )

  componentDidUpdate = (prevProps) => {
    let audioElement = document.querySelector("#" + this.props.name)

    if (this.props.url !== prevProps.url) {
      audioElement.load()
    }

    if (this.props.shouldPlay == true) {
      audioElement.play()
    } else {
      audioElement.pause()
    }

  }
}

class Selector extends React.Component {
  render = (props) => {
    let options = []
    let children = []

    let handleChange = (event) => {
      this.props.onChange(event.target.value)
    }

    this.props.sources.forEach(source => {
      options.push(source)

      children.push(
        <option value={source.value} key={source.value}>
          {source.name}
        </option>
      )
    })

    return (
      <div className="selector-row center tc mv3">
        <Icon iconName={this.props.name} />
        <select name={this.props.name} className="border-box dib m0 ml3 code gray bn bg-transparent input-reset" onChange={handleChange} value={this.props.picked}>
          {children}
        </select>
        <StatusLight active={this.props.playing} />
        <style jsx>{`
          .selector-row {
            font-size: 14px;
          }
          select {
            background: url(/static/images/icons/icon_chevron.svg) right 6px no-repeat;
            background-size: 20px;
            height: 1.8em;
            padding-right: 26px;
            width: 220px;
            vertical-align: bottom;
          }
        `}</style>
      </div>
    )
}
}

const StatusLight = (props) => (
  <span style={{backgroundColor: props.active ? PLAYING_COLOR : OFF_COLOR}}>
    <style jsx>{`
      span {
        border-radius: 50%;
        display: inline-block;
        height: 4px;
        width: 4px;
        margin-bottom: 8px;
        margin-left: 4px;
      }
    `}</style>
  </span>
)

export { MediaSource, Selector }
