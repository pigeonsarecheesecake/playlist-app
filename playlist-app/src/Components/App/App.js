import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../SearchBar/SearchBar.js' 

class App extends React.Component{
  render(){
    return (
      // Outer Element
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
  
          <div className="App-playlist">
            {/* <SearchResults />
            <Playlist /> */}
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

