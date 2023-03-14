import React from 'react';
import './TrackList.css';
import Track from '../Track/Track'

export default class TrackList extends React.Component{
    render(){
        return(
            <div className="TrackList">
                {/* Iterates through each track */}
                {
                    this.props.tracks.map((track)=>{
                        return <Track key={track.id} track={track}/>
                    })
                }
            </div>
        )
    }
}