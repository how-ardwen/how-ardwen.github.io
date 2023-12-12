//random
function homeRedir(){
    location.href = "index.html";
};

function lastFM(){
    location.href = "https://www.last.fm/user/howurdwen";
};

// client info stuff
const auth = clientID + ":" + clientSecret;

//token settings
const authOptions = {
    method: "POST",
    headers:{
        'Content-Type' : 'application/x-www-form-urlencoded', 
        'Authorization': 'Basic ' + btoa(auth)
    },
    body: 'grant_type=client_credentials',
};

//get the access token
async function getAccessToken(){
    var accessToken;
    const resp = await fetch('https://accounts.spotify.com/api/token', authOptions)
        .then((response) => (response.json()))
        .then((data) => (accessToken = data['access_token']));
    return accessToken;
};

async function displayToken(){
    document.getElementById("token").innerHTML = await getAccessToken();
};

async function displayArtist(){
    //artist settings
    var artistSettings = {
        method: "GET",
        headers:{
            'Authorization': "Bearer " + await getAccessToken()
        }
    };

    var artistID = prompt("Enter artist ID").replace('https://open.spotify.com/artist/','').split('?')[0];
    var endpoint = 'https://api.spotify.com/v1/artists/' + artistID;
    var artistName, followerCount

    await fetch(endpoint, artistSettings)
        .then((response) => (response.json()))
        .then((data) => (artistName = data['name'], followerCount = data['followers']['total']));
    document.getElementById('result').innerHTML = artistName + " has " + followerCount + " followers!";
}