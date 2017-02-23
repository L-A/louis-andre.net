import React from 'react'
import Head from '~/components/head'
import Page from '~/layouts/page'
import Logo from '~/components/logo'
import Icon from '~/components/icon.js'
import Link from 'next/prefetch'

import { MediaSource, Selector, PlayerAntenna } from '~/components/page-specific/scanneur/components'
import { CreateStore } from '~/components/page-specific/scanneur/store'
import { readCookie, writeCookie } from '~/helpers/cookie'

let PlayerStore
let appSources = {
  radio: [
    {
      name: "Québec: Urgences",
      value: "emt-qc",
      type: "audio-player",
      url: "http://audio7.broadcastify.com/tf7nydb81psj.mp3"
    },
    {
      name: "Montréal: Urgences",
      value: "emt-mtl",
      type: "audio-player",
      url: "http://audio10.broadcastify.com/610588345.mp3"
    },
    {
      name: "Detroit: Police",
      value: "emt-detroit",
      type: "audio-player",
      url: "http://audio5.broadcastify.com/516072174.mp3"
    },
    {
      name: "Staten Island: Urgences (FDNY)",
      value: "emt-ny",
      type: "audio-player",
      url: "http://audio2.broadcastify.com/838989288.mp3"
    }
  ],
  music: [
    {
      name: "Le Scanneur (hip-hop)",
      value: "sc-scanneur",
      type: "soundcloud",
      url: "https://soundcloud.com/lalabadie/sets/instrumental-beats"
    },
    {
      name: "Chillhop Cafe Live",
      value: "chillhop",
      type: "youtube",
      videoID: "ljQsRLN2dXA",
      "url": "https://www.youtube.com/embed/ljQsRLN2dXA"
    },
    {
      name: "Instrumentals (trap)",
      value: "sc-traps",
      type: "soundcloud",
      url: "https://soundcloud.com/samuriiibe47/sets/instrumental"
    },
  ]
}

const initialState = {
  radioPlayer: {
    picked: "emt-qc",
    playing: true
  },
  musicPlayer: {
    picked: "sc-scanneur",
    playing: true
  }
}

const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_RADIO':
      return {
        ...state,
        radioPlayer: {
          ...state.radioPlayer,
          picked: action.value
        }
      }
    case 'CHANGE_MUSIC':
      return {
        ...state,
        musicPlayer: {
          ...state.musicPlayer,
          picked: action.value
        }
      }
    case 'PLAY_ALL':
      return {
        ...state,
        radioPlayer: {
          ...state.radioPlayer,
          playing: true
        },
        musicPlayer: {
          ...state.musicPlayer,
          playing: true
        }
      }
    case 'STOP_ALL':
      return {
        ...state,
        radioPlayer: {
          ...state.radioPlayer,
          playing: false
        },
        musicPlayer: {
          ...state.musicPlayer,
          playing: false
        }
      }
    default:
      return state
  }
}

export default class extends React.Component {

  actions = {
    play: () => {PlayerStore.dispatch({type: "PLAY_ALL"})},
    stop: () => {PlayerStore.dispatch({type: "STOP_ALL"})},
    changeRadio: (value) => {PlayerStore.dispatch({type: "CHANGE_RADIO", value: value})},
    changeMusic: (value) => {PlayerStore.dispatch({type: "CHANGE_MUSIC", value: value})}
  }

  // When coming from within the site, getInitialProps will
  // be client-side. Otherwise, it runs once, server-side.
  // So we check if a state is available in the headers.

  static async getInitialProps ({ req }) {
    let cookie = readCookie('scanneur_state', req)
    console.log(cookie)
    return {
      startingState: JSON.parse(cookie)
    }
  }

  constructor (props) {
    super(props)
    this.state = props.startingState
  }

  receiveState = (newState) => {
    this.setState(newState)
    this.setCookie(newState)
  }

  setCookie = (state) => {
    writeCookie('scanneur_state', JSON.stringify(state))
  }

  componentDidMount = () => {
    PlayerStore = CreateStore(playerReducer, this.props.startingState)
    PlayerStore.subscribe(this.receiveState)
  }

  render = (props) => {
    let pickedRadio, pickedMusic, stateSource

    appSources.radio.forEach(s => { if (s.value == this.state.radioPlayer.picked) { pickedRadio = s } })
    appSources.music.forEach(s => { if (s.value == this.state.musicPlayer.picked) { pickedMusic = s } })

    return (
      <div className="avenir min-vh-100 pa2">
        <div className="center mw2 pv4 pv5-ns">
          <Link href="/">
            <a>
              <Logo fill="#000"/>
            </a>
          </Link>
        </div>
        <Head title="Le Scanneur" />
        <Player radioPlayer={this.state.radioPlayer} musicPlayer={this.state.musicPlayer} actions={this.actions}/>
        <img className="wire db center" src="static/images/le-scanneur/wire.svg" />
        <div className="media-sources tc pv4">
          <h3 className="f6 normal code silver mb4">Sources:</h3>
          <MediaSource source={pickedRadio} shouldPlay={this.state.radioPlayer.playing} />
          <MediaSource source={pickedMusic} shouldPlay={this.state.musicPlayer.playing} />
        </div>
        <style jsx>{`
          .media-sources {
            background-color: #eef0f5;
            margin:0;
          }
          .wire {
            padding-right: 33px;
          }
        `}</style>
      </div>
    )
  }
}

class Player extends React.Component {
  render = (props) => {
    let shouldOfferStop = this.props.radioPlayer.playing || this.props.musicPlayer.playing
    let toggleDirection = shouldOfferStop ? this.props.actions.stop : this.props.actions.play

    return (
      <div className="player-body center pa2 pv4-ns">
        <Selector name="radio" sources={appSources.radio} playing={this.props.radioPlayer.playing} onChange={this.props.actions.changeRadio} picked={this.props.radioPlayer.picked}/>
        <Selector name="music" sources={appSources.music} playing={this.props.musicPlayer.playing} onChange={this.props.actions.changeMusic} picked={this.props.musicPlayer.picked}/>
        <PlayButton  togglePlay={toggleDirection} shouldOfferStop={shouldOfferStop} />
        <style jsx>{`
          .player-body {
            background: linear-gradient(to bottom, #f7f9fb 0%,#eef0f4 100%);
            border-radius: 20px;
            box-shadow: inset 0 0 0 2px #fff, 0 0 0 2px #767d8a;
            max-width: 370px;
            position: relative;
          }
        `}</style>
      </div>
    )
  }
}

let PlayButton = (props) => (
  <div className="">
    <div className="db center tc button" onClick={props.togglePlay}>
      {props.shouldOfferStop ? "◼" : " ▶︎"}
    </div>
    <style jsx>{`
      .button {
        background: linear-gradient(to bottom, #f7f9fb 0%,#eef0f4 100%);
        border-radius: 50%;
        box-shadow: inset 0 0 0 2px #fff, 0 0 0 2px #767d8a;
        color: #85b697;
        height: 44px;
        width: 44px;
        padding: 14.5px 0 0 1.5px;

        position: absolute;
        left: 50%;
        margin-left: -22px;
        bottom: -23px;
        cursor: pointer;
      }
    `}</style>
  </div>
)
