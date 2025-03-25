import React, { useState } from 'react';
import { usePlayerStore } from '../store/usePlayerStore';
import { Play, Pause, Plus, Trash2, Music } from 'lucide-react';
import { Song } from '../types';

export const Library: React.FC = () => {
  const { songs, currentSongIndex, isPlaying, play, pause, setCurrentSongIndex, addSong, removeSong, addSongAtPosition } = usePlayerStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [position, setPosition] = useState<number>(songs.length);

  const handleAddSong = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newSong: Song = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      artist: formData.get('artist') as string,
      album: formData.get('album') as string,
      cover: formData.get('cover') as string || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
      url: formData.get('url') as string,
      duration: parseInt(formData.get('duration') as string) || 0
    };

    if (position === songs.length) {
      addSong(newSong);
    } else {
      addSongAtPosition(newSong, position);
    }
    
    setShowAddForm(false);
    e.currentTarget.reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pb-32">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Library</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" />
          Add Song
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSong} className="mb-8 bg-white p-6 rounded-lg shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist</label>
              <input
                type="text"
                name="artist"
                id="artist"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="album" className="block text-sm font-medium text-gray-700">Album</label>
              <input
                type="text"
                name="album"
                id="album"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="cover" className="block text-sm font-medium text-gray-700">Cover URL</label>
              <input
                type="url"
                name="cover"
                id="cover"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">Audio URL</label>
              <input
                type="url"
                name="url"
                id="url"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (seconds)</label>
              <input
                type="number"
                name="duration"
                id="duration"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
            <select
              name="position"
              id="position"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {songs.map((_, index) => (
                <option key={index} value={index}>Position {index + 1}</option>
              ))}
              <option value={songs.length}>At the end</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Song
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {songs.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Your library is empty. Add some songs to get started!</p>
          </div>
        ) : (
          songs.map((song, index) => (
            <div
              key={song.id}
              className={`flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 ${
                currentSongIndex === index ? 'bg-gray-50' : ''
              }`}
            >
              <img
                src={song.cover}
                alt={song.album}
                className="w-16 h-16 rounded object-cover"
              />
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => {
                  setCurrentSongIndex(index);
                  play();
                }}
              >
                <h3 className="font-semibold">{song.title}</h3>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
              <div className="flex items-center gap-2">
                {currentSongIndex === index && (
                  <button
                    onClick={() => isPlaying ? pause() : play()}
                    className="p-2 hover:bg-gray-200 rounded-full"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>
                )}
                <button
                  onClick={() => removeSong(song.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};