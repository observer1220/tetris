import React, { useRef, useState } from "react";
import tetrisMusic from "../assets/03_A-Type Music(Korobeiniki).mp3";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(event.target.value);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <audio ref={audioRef} loop>
        <source src={tetrisMusic} type="audio/mpeg" />
      </audio>
      {!isPlaying ? (
        <button onClick={handlePlay}>播放音樂</button>
      ) : (
        <button onClick={handlePause}>暫停音樂</button>
      )}
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        defaultValue="0.2"
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default MusicPlayer;
