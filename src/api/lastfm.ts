interface ApiConfig {
  BASE_URL: string;
  KEY: string;
  DEFAULT_IMAGE: string;
  SMALL_IMAGE: string;
}

export const API_CONFIG: ApiConfig = {
  BASE_URL: 'https://ws.audioscrobbler.com/2.0/',
  KEY: '144b300560a52ac8bdd8982871ccae90',
  DEFAULT_IMAGE: 'https://placehold.co/150?text=No+Image',
  SMALL_IMAGE: 'https://placehold.co/40?text=No+Image'
};

interface LastFmParams {
  method: string;
  [key: string]: string | number;
}

export async function fetchLastFmData(params: LastFmParams): Promise<any> {
  try {
    const urlParams = new URLSearchParams({
      ...params,
      api_key: API_CONFIG.KEY,
      format: 'json'
    });
    const response = await fetch(`${API_CONFIG.BASE_URL}?${urlParams}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(`API error: ${data.message}`);
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}

export async function fetchPopularArtists(limit = 10): Promise<any[]> {
  const data = await fetchLastFmData({
    method: 'chart.gettopartists',
    limit
  });
  return data.artists.artist;
}

export async function fetchPopularTracks(limit = 21): Promise<any[]> {
  const data = await fetchLastFmData({
    method: 'chart.gettoptracks',
    limit
  });
  return data.tracks.track;
}

export async function searchArtists(query: string, limit = 10): Promise<any[]> {
  const data = await fetchLastFmData({
    method: 'artist.search',
    artist: query,
    limit
  });
  return data.results.artistmatches.artist;
}

export async function searchAlbums(query: string, limit = 10): Promise<any[]> {
  const data = await fetchLastFmData({
    method: 'album.search',
    album: query,
    limit
  });
  return data.results.albummatches.album;
}

export async function searchTracks(query: string, limit = 20): Promise<any[]> {
  const data = await fetchLastFmData({
    method: 'track.search',
    track: query,
    limit
  });
  return data.results.trackmatches.track;
}

export function formatDuration(seconds: number): string {
  if (!seconds) return '';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}