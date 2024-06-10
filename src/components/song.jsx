import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Song() {
  const { id } = useParams();
  const [songs, setSongs] = useState(null);

  useEffect(function () {
    const url =
      "https://deezerdevs-deezer.p.rapidapi.com/track/"+id;
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
        setSongs(result)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
  {(songs!=null)?
    <div className="container pt-4">
        <img src={songs.album.cover_medium} className="img-fluid mb-3 border rounded-2" />
        <h4 className="mb-2">{songs.title}</h4>
        <h6 className="mb-2">Artist: {songs.artist.name}</h6>
        <h6 className="mb-2">Album: {songs.album.title}</h6>
        <audio src={songs.preview} controls></audio>
    </div>
    :"Loading..."}
    </div>
  );
}

export default Song;
