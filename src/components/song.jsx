import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Song() {
  const { id } = useParams();
  const [song, setSong] = useState(null);

  useEffect(() => {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/track/${id}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8ff42f5a13msh5d53310c275da13p11a388jsncd03ad360459",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    async function fetchData() {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        setSong(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div 
      className="bgcover" 
      style={song ? { backgroundImage: `url(${song.album.cover_big})` } : {}}
    >
      <div className="glass-effect">
        {song ? (
          <div className="container pt-4">
            <img src={song.album.cover_medium} className="img-fluid mb-3 border rounded-2" alt={`${song.title} cover`} />
            <h4 className="mb-2">{song.title}</h4>
            <h6 className="mb-2">Artist: {song.artist.name}</h6>
            <h6 className="mb-4">Album: {song.album.title}</h6>
            <audio src={song.preview} controls></audio>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
}

export default Song;
