import { create } from 'zustand';
import { Song } from '../types';
import { songs as initialSongs } from '../lib/songs';

interface PlayerState {
  songs: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  setCurrentSongIndex: (index: number) => void;
  addSong: (song: Song) => void;
  removeSong: (id: string) => void;
  addSongAtPosition: (song: Song, position: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  songs: initialSongs,
  currentSongIndex: 0,
  isPlaying: false,
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  next: () => {
    const { currentSongIndex, songs } = get();
    const nextIndex = (currentSongIndex + 1) % songs.length;
    set({ currentSongIndex: nextIndex });
  },
  previous: () => {
    const { currentSongIndex, songs } = get();
    const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    set({ currentSongIndex: prevIndex });
  },
  setCurrentSongIndex: (index: number) => set({ currentSongIndex: index }),
  addSong: (song: Song) => {
    const { songs } = get();
    set({ songs: [...songs, song] });
  },
  removeSong: (id: string) => {
    const { songs, currentSongIndex } = get();
    const index = songs.findIndex(song => song.id === id);
    const newSongs = songs.filter(song => song.id !== id);
    
    // Adjust currentSongIndex if necessary
    let newIndex = currentSongIndex;
    if (index <= currentSongIndex && currentSongIndex > 0) {
      newIndex = currentSongIndex - 1;
    }
    
    set({ 
      songs: newSongs,
      currentSongIndex: newIndex >= newSongs.length ? 0 : newIndex
    });
  },
  addSongAtPosition: (song: Song, position: number) => {
    const { songs } = get();
    const newSongs = [...songs];
    newSongs.splice(position, 0, song);
    set({ songs: newSongs });
  }
}));