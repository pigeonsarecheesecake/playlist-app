let userToken = null;
const clientID = "a14c7c4b197e41bc99bc67380dfb3e29";
const redirectURI = "http://localhost:3000/";
const Spotify = {
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
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }
        // If not in the url, redirects to the site below
        else{
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
    },

    search(searchTerm){
        const accessToken = Spotify.getAccessToken;
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
            if(jsonResponse.)
        })
    }
};


export default Spotify;