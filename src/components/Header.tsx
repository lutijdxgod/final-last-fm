import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { PlayerControls } from './PlayerControls';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header>
      <PlayerControls 
        trackTitle="Blinding Lights" 
        trackArtist="The Weeknd" 
        trackCover="https://placehold.co/50" 
      />

      <nav className="main-nav">
        <a href="/" className="nav-link active">Home</a>
        <a href="#" className="nav-link">Live</a>
        <a href="#" className="nav-link">Music</a>
        <a href="#" className="nav-link">Charts</a>
        <a href="#" className="nav-link">Events</a>
        <a href="#" className="nav-link">Features</a>
      </nav>

      <form className="search-bar" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search artists or tracks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn"><FaSearch /></button>
      </form>
    </header>
  );
}