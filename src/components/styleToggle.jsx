import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function StyleToggle() {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("amrindergill"); // Default search query
  const [isLoading, setIsLoading] = useState(false);
  const [currentStyle, setCurrentStyle] = useState("Style_1"); // Manage current style

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (query = searchQuery) => {
    setIsLoading(true);
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8ff42f5a13msh5d53310c275da13p11a388jsncd03ad360459",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const songs = result.data;
      console.log(songs);
      setSongs(songs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const toggleStyle = () => {
    setCurrentStyle(currentStyle === "Style_1" ? "Style_2" : "Style_1");
  };

  return (
    <div>
      <div className="container pt-4">
        <h2 className="mb-3">Music Player</h2>
        <div className="mb-3">
          <input
            type="text"
            value={searchQuery}
            onKeyDown={handleKeyPress}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for an artist or track"
            className="form-control mb-3"
          />
          <button onClick={handleSearch} className="btn btn-primary mt-2">
            Search
          </button>
        </div>
       <div className="d-flex justify-content-end"> <button onClick={toggleStyle} className="btn bg-info mb-3">
          Toggle Style
        </button></div>
        <hr />

        {currentStyle === "Style_1" ? (
          <div className="Style_1">
            {isLoading
              ? "Loading..."
              : songs.length !== 0
              ? songs.map((item) => (
                  <div key={item.id} className="col ">
                    <Link to={"/song/" + item.id}>
                      <ul className="list-group ">
                        <li className="list-group-item d-flex justify-content-between align-items-center image_cover">
                          <div className="cover">
                            <img
                              src={item.album.cover_small}
                              className="img-fluid"
                              alt={`${item.title} cover`}
                            />
                            <div className="wrap">
                              <i
                                className="fa-regular fa-circle-play"
                                style={{ color: "#ffffff" }}
                              ></i>
                            </div>
                          </div>
                          <h4 className="fw-light">{item.title}</h4>
                          <h6>{item.artist.name}</h6>
                        </li>
                      </ul>
                    </Link>
                  </div>
                ))
              : "No songs found."}
          </div>
        ) : (
          <div className="Style_2">
            <div className="row">
              {isLoading
                ? "Loading..."
                : songs.map((item) => (
                    <div key={item.id} className="col-md-3 mb-4">
                      <Link to={"/song/" + item.id}>
                        <img
                          src={item.album.cover_medium}
                          className="img-fluid cover"
                          alt={`${item.title}`}
                        />
                        <div className="row mt-4">
                          <h4 className="fw-light">{item.title}</h4>
                          <h6>{item.artist.name}</h6>
                        </div>
                      </Link>
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StyleToggle;
