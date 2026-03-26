import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./Engine.css"; // Updated import

export default function Engine(props) { // Renamed from Dictionary
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);

  function handleDictionaryResponse(response) {
    setResults(response.data[0]);
  }

  function handlePexelsResponse(response) {
    setPhotos(response.data.photos);
  }

  function search() {
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(apiUrl).then(handleDictionaryResponse);

    let pexelsApiKey =
      "lKPqM6DvjJM6mSxLIMa1hq7YTUUlILnOpnCxNCro8Brl5BYrNQiirCVc";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
    let headers = { Authorization: `${pexelsApiKey}` };
    axios.get(pexelsApiUrl, { headers: headers }).then(handlePexelsResponse);
  }

  function handleSubmit(event) {
    event.preventDefault(); 
    search();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function load() {
    setLoaded(true);
    search();
  }

  if (loaded) {
    return (
      <div className="Engine"> {/* Renamed class from Dictionary */}
        <section>
          <form onSubmit={handleSubmit} className="d-flex justify-content-center">
            <input
              type="search"
              onChange={handleKeywordChange}
              placeholder="know your word"
              autoFocus
              className="form-control me-2" 
              style={{ maxWidth: "70%" }}
            />
            <button type="submit" className="btn btn-primary fw-bold px-4">
              Enter
            </button>
          </form>
          <div className="hint text-center mt-2">Suggested words: sunset, coffee, flower</div>
        </section>
        <Results results={results} />
        <Photos photos={photos} />
      </div>
    );
  } else {
    load();
    return "Loading...";
  }
}