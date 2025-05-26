// const API_CONFIG = {
//   BASE_URL: 'https://ws.audioscrobbler.com/2.0/',
//   KEY: '144b300560a52ac8bdd8982871ccae90',
//   DEFAULT_IMAGE: 'https://placehold.co/150?text=No+Image',
//   SMALL_IMAGE: 'https://placehold.co/40?text=No+Image'
// };

// /**
//  * Fetches data from Last.fm API
//  * @param {Object} params - API method parameters
//  * @returns {Promise<Object>} API response data
//  * @throws {Error} When network request fails or API returns error
//  */
// async function fetchLastFmData(params) {
//   try {
//     const urlParams = new URLSearchParams({
//       ...params,
//       api_key: API_CONFIG.KEY,
//       format: 'json'
//     });
//     const response = await fetch(`${API_CONFIG.BASE_URL}?${urlParams}`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     if (data.error) {
//       throw new Error(`API error: ${data.message}`);
//     }

//     return data;
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//     showErrorToUser('Failed to load data. Please try again later.');
//     throw error;
//   }
// }

// /**
//  * Fetches popular artists
//  * @param {number} [limit=10] - Number of artists to fetch
//  * @returns {Promise<Array>} Array of artist objects
//  */
// async function fetchPopularArtists(limit = 10) {
//   const data = await fetchLastFmData({
//     method: 'chart.gettopartists',
//     limit
//   });
//   return data.artists.artist;
// }

// /**
//  * Fetches popular tracks
//  * @param {number} [limit=21] - Number of tracks to fetch
//  * @returns {Promise<Array>} Array of track objects
//  */
// async function fetchPopularTracks(limit = 21) {
//   const data = await fetchLastFmData({
//     method: 'chart.gettoptracks',
//     limit
//   });
//   return data.tracks.track;
// }

// /**
//  * Renders artists grid
//  * @param {Array} artists - Array of artist objects
//  * @param {string} [containerSelector='.artist-grid'] - CSS selector for container
//  */
// function renderArtists(artists, containerSelector = '.artist-grid') {
//   try {
//     const container = document.querySelector(containerSelector);
//     if (!container) throw new Error('Container element not found');

//     container.innerHTML = artists.map(artist => `
//       <div class="artist-card">
//         <img src="${artist.image[2]?.["#text"] || API_CONFIG.DEFAULT_IMAGE}" 
//              alt="${artist.name}" 
//              onerror="this.src='${API_CONFIG.DEFAULT_IMAGE}'">
//         <h3>${artist.name}</h3>
//       </div>
//     `).join('');
//   } catch (error) {
//     console.error('Failed to render artists:', error);
//     showErrorToUser('Failed to display artists.');
//   }
// }

// /**
//  * Renders tracks grid
//  * @param {Array} tracks - Array of track objects
//  * @param {string} [containerSelector='.track-grid'] - CSS selector for container
//  */
// function renderTracks(tracks, containerSelector = '.track-grid') {
//   try {
//     const container = document.querySelector(containerSelector);
//     if (!container) throw new Error('Container element not found');

//     container.innerHTML = tracks.map(track => `
//       <div class="track-card">
//         <img src="${track.image[3]?.["#text"] || API_CONFIG.DEFAULT_IMAGE}" 
//              alt="${track.name}" 
//              onerror="this.src='${API_CONFIG.DEFAULT_IMAGE}'">
//         <div class="track-info">
//           <h3>${track.name}</h3>
//           <p>${track.artist.name}</p>
//         </div>
//       </div>
//     `).join('');
//   } catch (error) {
//     console.error('Failed to render tracks:', error);
//     showErrorToUser('Failed to display tracks.');
//   }
// }

// /**
//  * Displays error message to user
//  * @param {string} message - Error message to display
//  */
// function showErrorToUser(message) {
//   const errorElement = document.createElement('div');
//   errorElement.className = 'error-message';
//   errorElement.textContent = message;
//   document.body.prepend(errorElement);
  
//   setTimeout(() => {
//     errorElement.remove();
//   }, 5000);
// }

// /**
//  * Initializes the application
//  */
// async function initializeApp() {
//   try {
//     const [artists, tracks] = await Promise.all([
//       fetchPopularArtists(),
//       fetchPopularTracks()
//     ]);
    
//     renderArtists(artists);
//     renderTracks(tracks);
    
//     setupSearchForm();
//   } catch (error) {
//     console.error('Initialization failed:', error);
//     showErrorToUser('Failed to initialize application. Please refresh the page.');
//   }
// }

// /**
//  * Sets up search form event listeners
//  */
// function setupSearchForm() {
//   const searchForm = document.querySelector('.search-bar');
//   if (!searchForm) return;

//   searchForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const input = searchForm.querySelector('input');
//     const query = input.value.trim();
    
//     if (query) {
//       window.location.href = `search.html?q=${encodeURIComponent(query)}`;
//     }
//   });
// }

// document.addEventListener('DOMContentLoaded', initializeApp);