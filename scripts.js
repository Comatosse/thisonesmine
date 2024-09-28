const apiKey = '5E1FCBD1FE49A3B39D1B732FB06B30E9';  // Replace with your API key
const steamId = '76561199202128879';  // Replace with your Steam ID

// Function to fetch owned games
async function fetchOwnedGames() {
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.response && data.response.games) {
            displayGames(data.response.games);
        } else {
            console.error("Error fetching games data");
        }
    } catch (error) {
        console.error("API fetch failed", error);
    }
}

// Function to display games on the page
function displayGames(games) {
    const gamesContainer = document.getElementById('gamesList');

    games.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.className = 'game';

        gameElement.innerHTML = `
            <img src="https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>Playtime: ${(game.playtime_forever / 60).toFixed(2)} hours</p>
        `;

        gamesContainer.appendChild(gameElement);
    });
}

// Call the function to fetch and display games
fetchOwnedGames();
