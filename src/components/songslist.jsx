import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Songslist() {
  const[songs,setSongs] = useState([])
  useEffect(() => {
    const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=bilalsaeed';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8ff42f5a13msh5d53310c275da13p11a388jsncd03ad360459',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    };

    async function fetchData() {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const songs = await result.data
        console.log(songs)
        setSongs(songs);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  },[])
  return (
    <div>
      <div className="container pt-4">
        <h2>Music Player</h2>
        <hr />
        <div className="row">
          {(songs.length!=0)?songs.map(function(item){
            return(
            <div key={item.id} className="col-md-3 mb-4">
              <Link to={'/song/'+item.id}>
              <img src={item.album.cover_medium} className='img-fluid'/>
              <div className="row mt-4">
              <h4 className='fw-light'>{item.title}</h4>
              <h6>{item.artist.name}</h6>
              </div>
              </Link>
            </div>
            )
          }):""}
        </div>
      </div>
    </div>
  )
}

export default Songslist