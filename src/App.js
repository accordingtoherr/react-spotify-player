import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0
    };
    this.getRecommendation = this.getRecommendation.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getRecommendation(_token);
    }
  }

getCurrentlyPlaying(token) {
  
 $.ajax({
       url: "https://api.spotify.com/v1/me/player",
       type: "GET",
       beforeSend: xhr => {
         xhr.setRequestHeader("Authorization", "Bearer " + token);
       },
      success: data => {
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms
        });
      }
    });
  }

getRecommendation() {
   
    let token = "BQBGSK0RUIeFx9guJbHuk7vNF3ObVbhpTFxbHwIAXfuneVVjeMvZHAhuFDHr-IJDx-WQOQVN2wRyzVXJyNp1agLeuaJNx57rMJ9hQnIPCutc7zOBymVnoBpT8DRnFk9gXZ-LN8XkD4enK05Frll5EQXe0rTydbK1Ai_7fyhAAPjefWSs-K5oMthLSaEXOKTG5sNcBo8-srKpmWLuXehdpgUCnZHlgaBQIHFyUQ_nhA";
    $.ajax({
      "url": "https://api.spotify.com/v1/artists?ids=0oSGxfWSnnOXhD2fKuz2Gy,3dBVyJ7JuOMt4GE9607Qin",

      "type": "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        console.log(data);
        this.setState({
          // item: data.item,
          ids: "5BvJzeQpmsdsFp4HGUYUEx"
      
      
      
        })}
    });
  }





  render() {
    return (
      <div className="App">
        <header className="App-header">
        
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            ;
            </a>
          )}
          {this.state.token && (
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.progress_ms}
            />
          )}

          
        </header>
      </div>
    );
  }
}

export default App;