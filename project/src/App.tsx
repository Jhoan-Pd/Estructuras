import React from 'react';
import { Player } from './components/Player';
import { Library } from './components/Library';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Library />
      <Player />
    </div>
  );
}

export default App;