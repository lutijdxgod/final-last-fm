// import { API_CONFIG, fetchLastFmData, showErrorToUser } from './script.js';

// /**
//  * Performs search across artists, albums and tracks
//  * @param {string} query - Search query
//  */
// async function performSearch(query) {
//   try {
//     showLoadingState(true);
    
//     const [artists, albums, tracks] = await Promise.all([
//       searchArtists(query),
//       searchAlbums(query),
//       searchTracks(query)
//     ]);
    
//     renderArtists(artists);
//     renderAlbums(albums);
//     renderTracks(tracks);
//   } catch (error) {
//     console.error('Search failed:', error);
//     showErrorToUser('Search failed. Please try a different query.');
//   } finally {
//     showLoadingState(false);
//   }
// }

// /**
//  * Searches for artists
//  * @param {string} query - Search query
//  * @param {number} [limit=10] - Number of results
//  * @returns {Promise<Array>} Array of artist objects
//  */
// async function searchArtists(query, limit = 10) {
//   const data = await fetchLastFmData({
//     method: 'artist.search',
//     artist: query,
//     limit
//   });
//   return data.results.artistmatches.artist;
// }

// /**
//  * Searches for albums
//  * @param {string} query - Search query
//  * @param {number} [limit=10] - Number of results
//  * @returns {Promise<Array>} Array of album objects
//  */
// async function searchAlbums(query, limit = 10) {
//   const data = await fetchLastFmData({
//     method: 'album.search',
//     album: query,
//     limit
//   });
//   return data.results.albummatches.album;
// }

// /**
//  * Searches for tracks
//  * @param {string} query - Search query
//  * @param {number} [limit=20] - Number of results
//  * @returns {Promise<Array>} Array of track objects
//  */
// async function searchTracks(query, limit = 20) {
//   const data = await fetchLastFmData({
//     method: 'track.search',
//     track: query,
//     limit
//   });
//   return data.results.trackmatches.track;
// }

// /**
//  * Renders albums grid
//  * @param {Array} albums - Array of album objects
//  */
// function renderAlbums(albums) {
//   try {
//     const container = document.querySelector('.album-grid');
//     if (!container) throw new Error('Albums container not found');

//     container.innerHTML = albums?.length ? albums.map(album => `
//       <div class="album-card">
//         <img src="${album.image[2]?.["#text"] || API_CONFIG.DEFAULT_IMAGE}" 
//              alt="${album.name}" 
//              onerror="this.src='${API_CONFIG.DEFAULT_IMAGE}'">
//         <h3>${album.name}</h3>
//         <p>${album.artist}</p>
//       </div>
//     `).join('') : '<p>No albums found</p>';
//   } catch (error) {
//     console.error('Failed to render albums:', error);
//     showErrorToUser('Failed to display albums.');
//   }
// }

// /**
//  * Renders tracks list with player controls
//  * @param {Array} tracks - Array of track objects
//  */
// function renderTracks(tracks) {
//   try {
//     const container = document.querySelector('.track-list');
//     if (!container) throw new Error('Tracks container not found');

//     container.innerHTML = tracks?.length ? tracks.map(track => `
//       <div class="track-row">
//         <button class="track-play-btn" aria-label="Play ${track.name}">
//           <i class="fas fa-play"></i>
//         </button>
//         <img src="${track.image[0]?.["#text"] || API_CONFIG.SMALL_IMAGE}" 
//              class="track-cover-small" 
//              alt="${track.name}"
//              onerror="this.src='${API_CONFIG.SMALL_IMAGE}'">
//         <button class="track-fav-btn" aria-label="Add ${track.name} to favorites">
//           <i class="far fa-heart"></i>
//         </button>
//         <div class="track-info">
//           <h3>${track.name}</h3>
//           <p>${track.artist}</p>
//         </div>
//         <span class="track-duration">${formatDuration(track.duration)}</span>
//       </div>
//     `).join('') : '<p>No tracks found</p>';

//     setupTrackControls();
//   } catch (error) {
//     console.error('Failed to render tracks:', error);
//     showErrorToUser('Failed to display tracks.');
//   }
// }

// /**
//  * Formats duration in seconds to MM:SS
//  * @param {number} seconds - Duration in seconds
//  * @returns {string} Formatted duration
//  */
// function formatDuration(seconds) {
//   if (!seconds) return '';
//   const mins = Math.floor(seconds / 60);
//   const secs = seconds % 60;
//   return `${mins}:${secs.toString().padStart(2, '0')}`;
// }

// /**
//  * Sets up event listeners for track controls
//  */
// function setupTrackControls() {
//   document.querySelectorAll('.track-play-btn').forEach(btn => {
//     btn.addEventListener('click', handlePlayTrack);
//   });

//   document.querySelectorAll('.track-fav-btn').forEach(btn => {
//     btn.addEventListener('click', handleFavoriteTrack);
//   });
// }

// /**
//  * Handles play track button click
//  * @param {Event} event - Click event
//  */
// function handlePlayTrack(event) {
//   event.stopPropagation();
//   const trackRow = event.target.closest('.track-row');
//   const trackName = trackRow?.querySelector('.track-info h3')?.textContent;
//   console.log(`Playing track: ${trackName}`);
//   // Implement actual play functionality here
// }

// /**
//  * Handles favorite track button click
//  * @param {Event} event - Click event
//  */
// function handleFavoriteTrack(event) {
//   event.stopPropagation();
//   const btn = event.currentTarget;
//   btn.classList.toggle('favorited');
//   btn.innerHTML = btn.classList.contains('favorited') 
//     ? '<i class="fas fa-heart"></i>' 
//     : '<i class="far fa-heart"></i>';
// }

// /**
//  * Shows or hides loading state
//  * @param {boolean} isLoading - Whether to show loading state
//  */
// function showLoadingState(isLoading) {
//   const loader = document.getElementById('loading-indicator') || 
//     document.createElement('div');
  
//   if (isLoading) {
//     loader.id = 'loading-indicator';
//     loader.className = 'loading-indicator';
//     loader.textContent = 'Loading...';
//     document.body.appendChild(loader);
//   } else {
//     loader.remove();
//   }
// }

// /**
//  * Initializes search page
//  */
// function initializeSearchPage() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const query = urlParams.get('q');
  
//   if (query) {
//     document.getElementById('search-input').value = query;
//     performSearch(query);
//   }

//   setupTabSwitcher();
//   setupSearchForm();
// }

// /**
//  * Sets up tab switching functionality
//  */
// function setupTabSwitcher() {
//   const tabButtons = document.querySelectorAll('.tab-btn');
//   tabButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       tabButtons.forEach(btn => btn.classList.remove('active'));
//       document.querySelectorAll('.results-section').forEach(section => {
//         section.classList.remove('active');
//       });

//       button.classList.add('active');
//       const tabId = button.getAttribute('data-tab');
//       document.getElementById(tabId).classList.add('active');
//     });
//   });
// }

// function setupSearchForm() {
//   const searchForm = document.querySelector('.search-bar');
//   if (!searchForm) return;

//   searchForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const query = document.getElementById('search-input').value.trim();
//     if (query) {
//       window.location.href = `search.html?q=${encodeURIComponent(query)}`;
//     }
//   });
// }

// document.addEventListener('DOMContentLoaded', initializeSearchPage);