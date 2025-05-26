import { FaPlay, FaStepBackward, FaStepForward } from 'react-icons/fa';

interface PlayerControlsProps {
  trackTitle: string;
  trackArtist: string;
  trackCover: string;
}

export function PlayerControls({ trackTitle, trackArtist, trackCover }: PlayerControlsProps) {
  return (
    <div className="now-playing">
      <img src={trackCover} alt="Now Playing" className="track-cover" />
      <div className="track-info">
        <p className="track-title">{trackTitle}</p>
        <p className="track-artist">{trackArtist}</p>
      </div>
      <div className="player-controls">
        <button className="control-btn"><FaStepBackward /></button>
        <button className="control-btn"><FaPlay /></button>
        <button className="control-btn"><FaStepForward /></button>
      </div>
    </div>
  );
}