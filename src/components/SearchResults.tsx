import { useEffect, useState } from 'react';
import { FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa';
import { searchArtists, searchAlbums, searchTracks, formatDuration, API_CONFIG } from '../api/lastfm';
import { TabSwitcher } from './TabSwitcher';

interface SearchResultsProps {
  query: string;
}

export function SearchResults({ query }: SearchResultsProps) {
  const [artists, setArtists] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const performSearch = async () => {
      try {
        setLoading(true);
        setError('');
        
        const [artistsData, albumsData, tracksData] = await Promise.all([
          searchArtists(query),
          searchAlbums(query),
          searchTracks(query)
        ]);
        
        setArtists(artistsData);
        setAlbums(albumsData);
        setTracks(tracksData);
      } catch (err) {
        setError('Failed to load search results. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      performSearch();
    }
  }, [query]);

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (trackId: string) => {
    setFavorites(prev => ({
      ...prev,
      [trackId]: !prev[trackId]
    }));
  };

  if (loading) return <div className="loading-indicator">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <TabSwitcher
      tabs={[
        { id: 'artists', label: 'Artists' },
        { id: 'albums', label: 'Albums' },
        { id: 'tracks', label: 'Tracks' }
      ]}
    >
      {(activeTab) => (
        <div className="results-section active">
          {activeTab === 'artists' && (
            <>
              <h2>Artists</h2>
              <div className="artist-grid">
                {artists.length > 0 ? (
                  artists.map(artist => (
                    <div className="artist-card" key={artist.name}>
                      <img 
                        src={artist.image[2]?.["#text"] || API_CONFIG.DEFAULT_IMAGE} 
                        alt={artist.name}
                        onError={(e) => (e.currentTarget.src = API_CONFIG.DEFAULT_IMAGE)}
                      />
                      <h3>{artist.name}</h3>
                    </div>
                  ))
                ) : (
                  <p>No artists found</p>
                )}
              </div>
            </>
          )}

          {activeTab === 'albums' && (
            <>
              <h2>Albums</h2>
              <div className="album-grid">
                {albums.length > 0 ? (
                  albums.map(album => (
                    <div className="album-card" key={`${album.artist}-${album.name}`}>
                      <img 
                        src={album.image[2]?.["#text"] || API_CONFIG.DEFAULT_IMAGE} 
                        alt={album.name}
                        onError={(e) => (e.currentTarget.src = API_CONFIG.DEFAULT_IMAGE)}
                      />
                      <h3>{album.name}</h3>
                      <p>{album.artist}</p>
                    </div>
                  ))
                ) : (
                  <p>No albums found</p>
                )}
              </div>
            </>
          )}

          {activeTab === 'tracks' && (
            <>
              <h2>Tracks</h2>
              <div className="track-list">
                {tracks.length > 0 ? (
                  tracks.map(track => (
                    <div className="track-row" key={`${track.artist}-${track.name}`}>
                      <button className="track-play-btn" aria-label={`Play ${track.name}`}>
                        <FaPlay />
                      </button>
                      <img 
                        src={track.image[0]?.["#text"] || API_CONFIG.SMALL_IMAGE} 
                        className="track-cover-small" 
                        alt={track.name}
                        onError={(e) => (e.currentTarget.src = API_CONFIG.SMALL_IMAGE)}
                      />
                      <button 
                        className="track-fav-btn" 
                        aria-label={`Add ${track.name} to favorites`}
                        onClick={() => toggleFavorite(`${track.artist}-${track.name}`)}
                      >
                        {favorites[`${track.artist}-${track.name}`] ? <FaHeart /> : <FaRegHeart />}
                      </button>
                      <div className="track-info">
                        <h3>{track.name}</h3>
                        <p>{track.artist}</p>
                      </div>
                      <span className="track-duration">{formatDuration(track.duration)}</span>
                    </div>
                  ))
                ) : (
                  <p>No tracks found</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </TabSwitcher>
  );
}