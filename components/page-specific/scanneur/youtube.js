import React from 'react'

let videoId
let playerAPI

export default class YoutubePlayer extends React.Component {
  render = (props) => {
    videoId = this.props.videoId
    return (
      <div>
        <div id="player" />
      </div>
    )
  }

  onPlayerReady = (event) => {
    playerAPI = event.target
    if (this.props.shouldPlay) {
      playerAPI.playVideo()
    }
  }

  // https://developers.google.com/youtube/iframe_api_reference

  // Horrible cheat: To circumvent the API's window-bound events,
  // I reference the component's scope in `window.YTS`

  componentDidMount = (prevProps) => {
    window.YTS = this
    let opts = {
      height: '200',
      width: '300',
      videoId: videoId,
      events: {
        'onReady': YTS.onPlayerReady,
        'onStateChange': YTS.onPlayerStateChange
      }
    }

    if (typeof(YT) !== 'undefined') {
      playerAPI = new YT.Player('player', opts )
    } else {
      let tag = document.createElement('script')
      tag.src = "https://www.youtube.com/iframe_api"

      var firstScript = document.getElementsByTagName('script')[0]
      firstScript.parentNode.insertBefore(tag, firstScript)

      window.onYouTubeIframeAPIReady = function () {
        playerAPI = new YT.Player('player', opts )
      }
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.shouldPlay == false && prevProps.shouldPlay) {
      playerAPI.pauseVideo()
    }

    if (this.props.shouldPlay &&  prevProps.shouldPlay == false) {
      playerAPI.playVideo()
    }
  }

}
