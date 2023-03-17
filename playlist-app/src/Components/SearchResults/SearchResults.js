import React from 'react';
import './SearchResults.css'
import TrackList from '../TrackList/TrackList'

export default class SearchResults extends React.Component{
    render(){
        return(
            <div className="SearchResults">
            <h2>Results</h2>
                {/* Renders Tracklist component by passing in searchResults prop from App.js */}
                <TrackList 
                    tracks={this.props.searchResults} 
                    onAdd={this.props.onAdd} 
                    isRemoval={false} /> 
            </div>
        )
    }
}