import React from 'react'
import './SearchBar.css'

export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state={term:''};
        this.search=this.search.bind(this);
        this.handleTermChange=this.handleTermChange.bind(this);
    }
    // This sets the term state to the value passed in by the input element
    handleTermChange(e){
        this.setState({term:e.target.value})
    }

    search(){
        this.props.onSearch(this.state.term);
    }
    
    render(){
        return(
            <div className="SearchBar">
                {/* When user puts a value in, it sets new state with the new value */}
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}

