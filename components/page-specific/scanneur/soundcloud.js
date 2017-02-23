import React from 'react'

let playerAPI
let currentSongIndex = 0
let songIndexes

const EMBED_PREFIX = "https://w.soundcloud.com/player/?url="
const EMBED_SUFFIX = "&buying=false&liking=false&download=false&visual=false&show_artwork=false"
const completeURL = (nakedUrl) => (EMBED_PREFIX + nakedUrl + EMBED_SUFFIX)
const playerOpts = {
  color: "222222",
  show_comments: false,
  show_artwork: false,
  visual: false
}

const Shuffle = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

export default class Soundcloud extends React.Component {

  render = (props) => {
    return (
      <div>
        <iframe id="sc-player"
          frameBorder="no"
          scrolling="no"
          width="300"
          src={completeURL(this.props.url)}
        />
      </div>
    )
  }

  componentDidMount = (prevProps) => {
    if (typeof(SC) !== 'undefined') {
      playerAPI = SC.Widget('sc-player')
      this.setupPlayer(this.props.url)
    } else {
      let tag = document.createElement('script')
      var firstScript = document.getElementsByTagName('script')[0]
      firstScript.parentNode.insertBefore(tag, firstScript)

      tag.onload = () => {
        playerAPI = SC.Widget('sc-player')
        this.setupPlayer(this.props.url)
      }

      tag.src = "https://w.soundcloud.com/player/api.js"
    }
  }

  setupPlayer = (url) => {
    playerAPI.load(url, playerOpts)
    playerAPI.bind(SC.Widget.Events.READY, () => {

      // Shuffling by hand, this prepares the songIndexes array
      // .getSounds() is async and will cause a race condition
      // if .play() is called outside of it

      playerAPI.getSounds((sounds) => {
        let indexes = []
        let numberOfSongs = sounds.length
        for (let i = 0; i<numberOfSongs; i++) {indexes.push(i)}
        songIndexes = Shuffle(indexes)

        if (this.props.shouldPlay) {
          playerAPI.skip(songIndexes[currentSongIndex]) // 0 when initialized
          playerAPI.play()
        }
      })


      playerAPI.unbind(SC.Widget.Events.FINISH)
      playerAPI.bind(SC.Widget.Events.FINISH, () => {
        this.nextSong()
      })
    })
  }

  nextSong = () => {
    currentSongIndex++

    if (currentSongIndex >= songIndexes.length) {currentSongIndex = 0}
    let playerTrackIndex = songIndexes[currentSongIndex]
    playerAPI.skip(playerTrackIndex)
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.url != prevProps.url) {
      this.setupPlayer(this.props.url)
    }

    else if (this.props.shouldPlay == false) {
      playerAPI.pause()
    }

    else if (this.props.shouldPlay == true) {
      playerAPI.play()
    }
  }
}

console.log(currentSongIndex)
