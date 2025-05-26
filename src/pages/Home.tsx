import { useEffect, useState } from 'react';
import { fetchPopularArtists, fetchPopularTracks, API_CONFIG } from '../api/lastfm';

export function Home() {
  const [artists, setArtists] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');
        
        const [artistsData, tracksData] = await Promise.all([
          fetchPopularArtists(),
          fetchPopularTracks()
        ]);
        
        setArtists(artistsData);
        setTracks(tracksData);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className="loading-indicator">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <main>
      <h1 className="main-title">Music</h1>

      <section className="hot-artists">
        <h2>Hot Right Now</h2>
        <div className="artist-grid">
          {artists.map(artist => (
            <div className="artist-card" key={artist.name}>
              <img 
                src={artist.image[2]?.["#text"] || API_CONFIG.DEFAULT_IMAGE} 
                alt={artist.name}
                onError={(e) => (e.currentTarget.src = API_CONFIG.DEFAULT_IMAGE)}
              />
              <h3>{artist.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="popular-tracks">
        <h2>Popular Tracks</h2>
        <div className="track-grid">
          {tracks.map(track => (
            <div className="track-card" key={`${track.artist.name}-${track.name}`}>
              <img 
                src={track.image[3]?.["#text"] || API_CONFIG.DEFAULT_IMAGE} 
                alt={track.name}
                onError={(e) => (e.currentTarget.src = API_CONFIG.DEFAULT_IMAGE)}
              />
              <div className="track-info">
                <h3>{track.name}</h3>
                <p>{track.artist.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}