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
    this.getRecommendation= this.getRecommendation.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
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

getAnayze() {
   
    let token = "BQAHqpJzF-BPQgEhGhj6y0iBAHa5ymL_e6naa97rjGh2OxuUMga12cgypSt8gSqjXgIi_RFE4PF-QmYJ4qhB8OG2eg9it2FC9TWFWwXeSEJZrtwGqt9k2Syc4Vg65_0WUOUvGuRK4elW1hB-_sn4vgU4B6gxBtAsRGDQqlqL4bTR2KtZ2c-RGIuOginxkNe28z8Q69o7xIpTXaScJU0DC1SHUqX5OtK9_Wi_I07pDA";
    $.ajax({
      "url": "hhttps://api.spotify.com/v1/audio-features/06AKEBrKUckW0KREUWRnvT",

      "type": "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        console.log(data);
        this.setState({
          // item: data.item,
        ids:"7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B"
         
        
      
      
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