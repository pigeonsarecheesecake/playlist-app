import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../SearchBar/SearchBar.js' 
import SearchResults from '../SearchResults/SearchResults';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      searchResults: [
        {
          name:'Glimpse of Us',
          artist: 'Joji',
          album: 'smitheerens',
          id:'1'
        }
      ]
    };
  }

  render(){
    return (
      // Outer Element
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
  
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            {/* <Playlist /> */}
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

