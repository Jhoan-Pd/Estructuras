import React, { useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';

export const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { 
    songs,
    currentSongIndex,
    isPlaying,
    play,
    pause,
    next,
    previous
  } = usePlayerStore();

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentSongIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#292626] border-t border-gray-700 p-4">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onEnded={next}
      />
      
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        <img
          src={currentSong.cover}
          alt={currentSong.album}
          className="w-16 h-16 rounded-lg object-cover"
        />
        
        <div className="flex-1">
          <h3 className="font-semibold text-white">{currentSong.title}</h3>
          <p className="text-sm text-gray-400">{currentSong.artist}</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={previous}
            className="p-2 hover:bg-gray-800 rounded-full"
          >
            <SkipBack className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={isPlaying ? pause : play}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={next}
            className="p-2 hover:bg-gray-800 rounded-full"
          >
            <SkipForward className="w-6 h-6 text-white" />
          </button>

          <Volume2 className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
};
