let userToken ;
const clientID = "a14c7c4b197e41bc99bc67380dfb3e29";
const redirectURI = "http://localhost:3000/";
const Spotify = {
    // Retrieves access token
    getAccessToken() {
        // If userToken exists, assign it to userToken
        if(userToken){
            return userToken;
        }
        
        // Checking if userToken and expiresIn exist in the URL
        const userTokenExists = window.location.href.match(/access_token=([^&]*)/);
        const expiresInExists = window.location.href.match(/expires_in=([^&]*)/);
        if( userTokenExists && expiresInExists){
            userToken = userTokenExists[1]
            const expiresIn = Number(expiresInExists[1]);
            // Empties the url
            window.setTimeout(() => userToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userToken;
        }
        // If not in the url, redirects to the site below
        else{
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
    },

    search(searchTerm){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, 
        {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(jsonResponse => {
            // If the search engine couldnt find the songs
            if(!jsonResponse.tracks){
                return [];
            }
            
            return jsonResponse.tracks.items.map(track => ({
                id:track.id,
                name:track.name,
                artist:track.artists[0].name,
                album:track.album.name,
                uri:track.uri
            }))
            
        })
    },

    savePlaylist (playlistName, trackUris){
        // Check if playlist name or uris array empty or not
        if(!playlistName || !trackUris.length){
            return;
        }
        // Variables
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        let userID;
        // Return a promise
        return fetch(`https://api.spotify.com/v1/me`,
        {headers:headers}).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(responseJson => {
            userID = responseJson.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
            {
                headers:headers,
                method:'POST',
                body: JSON.stringify({name:playlistName})
            })
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(result => {
            const playlistID = result.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
                headers:headers,
                method: 'POST',
                body: JSON.stringify({uris:trackUris})
            })
        })
    }
};


export default Spotify;