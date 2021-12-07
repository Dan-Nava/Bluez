import React from "react";
import configs from "../../../config";

import "./styles.css";

export default class MusicianMode extends React.Component {
  constructor(props) {
    super(props);
    this.data_url = null;
    this.props.audio_object.ontimeupdate = this.pos_value.bind(this);
  }

  async get_data() {
    let lyricResults = await fetch(
      `${configs.SERVER_URL}/music/lyrics?name=${this.props.song}`
    ).then((res) => res.json());

    let chordResults = await fetch(
      `${configs.SERVER_URL}/music/chords?name=${this.props.song}`
    ).then((res) => res.json());

    let timestamps = lyricResults.timestamps
      .replaceAll("\\n", " ")
      .split(" ")
      .map(function (x) {
        return parseInt(x);
      });

    let lyrics = lyricResults.lyrics.split("\\n");
    let chords = chordResults.lyrics.split("\\n"); //there is a misname here?

    this.props.stateChangeHandler("lyrics", lyrics);
    this.props.stateChangeHandler("chords", chords);
    this.props.stateChangeHandler("timestamps", timestamps);
  }

  async get_art() {
    let art = await fetch(
      `${configs.SERVER_URL}/music/albumArt?name=${this.props.song}`
    ).then((res) => res.json());
    this.props.stateChangeHandler("albumArt", art.album_art);
  }

  get_album() {
    return this.props.albumArt;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.lyrics === null || prevProps.song !== this.props.song) {
      this.get_data();
      if (prevProps.song !== this.props.song) {
        this.get_art();
      }
    }
	if (this.props.chords === null || prevProps.song !== this.props.song) {
		this.get_data();
		if (prevProps.song !== this.props.song) {
		  this.get_art();
		}
	  }
  }

  componentDidMount() {
    if (this.props.lyrics === null) {
      this.get_data();
    }
	if (this.props.chords === null) {
		this.get_data();
	}
    if (this.props.albumArt === null) {
      this.get_art();
    }
    
  }

  pos_value() {
    if (this.props.audio_object && this.props.timestamps) {
      for (let i = 0; i < this.props.timestamps.length - 1; i++) {
        if (
          this.props.audio_object.currentTime >= this.props.timestamps[i] &&
          this.props.audio_object.currentTime < this.props.timestamps[i + 1] &&
          i !== this.props.pos
        ) {
          this.props.stateChangeHandler("pos", i);
        }
      }
    }
  }

  scrollUp() {
    if (this.props.pos > 0) {
      this.props.stateChangeHandler("pos", this.props.pos - 1);
    }
  }

  scrollDown() {
    if (this.props.pos < this.props.timestamps.length - 5) {
      this.props.stateChangeHandler("pos", this.props.pos + 1);
    }
  }

  loaded_lyrics() {
    if (this.props.lyrics) {
      return (
        <div className="musician-lyrics">
          <p className="lyric">{this.props.lyrics[this.props.pos]}</p>
          <p className="lyric">{this.props.lyrics[this.props.pos + 1]}</p>
          <p className="lyric">{this.props.lyrics[this.props.pos + 2]}</p>
          <p className="lyric">{this.props.lyrics[this.props.pos + 3]}</p>
          <p className="lyric">{this.props.lyrics[this.props.pos + 4]}</p>
        </div>
      );
    } else {
      return (
        <div className="lyrics">
          <p className="lyric"></p>
          <p className="lyric"></p>
          <p className="lyric"></p>
          <p className="lyric"></p>
          <p className="lyric"></p>
        </div>
      );
    }
  }

  loaded_chords() {
    if (this.props.chords) {
      return (
        <div className="chords">
          <p className="chord">{this.props.chords[this.props.pos]}</p>
          <p className="chord">{this.props.chords[this.props.pos + 1]}</p>
          <p className="chord">{this.props.chords[this.props.pos + 2]}</p>
          <p className="chord">{this.props.chords[this.props.pos + 3]}</p>
          <p className="chord">{this.props.chords[this.props.pos + 4]}</p>
        </div>
      );
    } else {
      return (
        <div className="chords">
          <p className="chords"></p>
          <p className="chords"></p>
          <p className="chords"></p>
          <p className="chords"></p>
          <p className="chords"></p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.loaded_lyrics()}
        {this.loaded_chords()}
        {this.props.albumArt ? (
          <img src={this.props.albumArt} className="back-cover" alt="" />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
