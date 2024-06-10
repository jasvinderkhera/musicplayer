import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Songslist from './components/songslist';
import Songlist from './components/songlist';
import Song from './components/song';

function App() {
 
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* <Route path='/' element={<Songslist />} /> */}
          <Route path='/' element={<Songlist />} />
          <Route path='/song/:id' element={<Song />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
