import './App.css'
import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from '../SearchBar/SearchBar.js' 
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      // Initial State
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    }
    // Binding event listeners
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // Adding tracks method (adds songs to this.playlistTracks)
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else{
      // Makes a new playlist with a new track
      const newPlaylist=[...this.state.playlistTracks,track]
      this.setState({playlistTracks:newPlaylist});
    }
  }

  // Removing tracks method (removes songs to this.playlistTracks)
  removeTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      const newPlaylist=this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id )
      this.setState({playlistTracks:newPlaylist})
    } else{
      return;
    }
  }

  // Updates playlist name
  updatePlaylistName(name){
    this.setState({playlistName:name})
  }

  // Saves playlist to user account
  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(()=>{
      this.setState({playlistName:'newPlaylist',
    playlistTracks:[]})
    })
  }
 
  // Search songs
  search(searchTerm){
    Spotify.search(searchTerm).then(tracks => {this.setState({searchResults:tracks})})
  }

  render(){
    return (
      // Outer Element
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* Search Bar */}
          <SearchBar onSearch={this.search}/>
          {/* Tracks */}
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}/>
            {/* Playlist Component */}
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


export default App;

