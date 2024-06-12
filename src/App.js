import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Song from './components/song';
import StyleToggle from './components/styleToggle';

function App() {
 
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<StyleToggle/>} />
          <Route path='/song/:id' element={<Song />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
